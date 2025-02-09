import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './boostrap-design/assets/bootstrap/css/bootstrap.min.css';

import './boostrap-design/assets/css/styles.scss';
import './boostrap-design/assets/css/styles.scss';

const API_BASE_URL = 'https://estiaproject-b3ef95234cdd.herokuapp.com/api/v1/business';

export default function AddBusiness() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        country: '',
        city: '',
        streetName: '',
        streetNbr: '',
        postalCode: '',
    });

    const [fileName, setFileName] = useState('No file chosen');
    const [file, setFile] = useState(null);
    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCountries = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('https://restcountries.com/v3.1/all');
                const data = await response.json();
                const sortedCountries = data
                    .map(country => country.name.common)
                    .sort((a, b) => a.localeCompare(b));
                setCountries(sortedCountries);
            } catch (err) {
                setError('Failed to fetch countries');
                console.error('Error fetching countries:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCountries();
    }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        
        if (id === 'streetNbr' || id === 'postalCode') {
            const numericValue = value.replace(/\D/g, '');
            setFormData(prev => ({
                ...prev,
                [id]: numericValue
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [id]: value
            }));
        }
    };


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        setFileName(file ? file.name : 'No file chosen');
    };


    const validateForm = () => {
        const requiredFields = {
            name: 'Name',
            description: 'Description',
            country: 'Country',
            city: 'City',
            streetName: 'Street',
            streetNbr: 'Street Number',
            postalCode: 'Postal Code'
        };

        for (const [key, label] of Object.entries(requiredFields)) {
            if (!formData[key]) {
                toast.error(`Please fill the ${label} field`);
                return false;
            }
        }

        return true;
    };

    const getCoordinates = async (address) => {
        try {
            const query = encodeURIComponent(
                `${address.streetNbr} ${address.streetName}, ${address.city}, ${address.country}`
            );
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1`
            );
            const data = await response.json();
            
            if (data && data.length > 0) {
                return {
                    latitude: parseFloat(data[0].lat),
                    longitude: parseFloat(data[0].lon)
                };
            }
            throw new Error('No coordinates found for this address');
        } catch (error) {
            console.error('Error getting coordinates:', error);
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const coordinates = await getCoordinates({
                    streetNbr: formData.streetNbr,
                    streetName: formData.streetName,
                    city: formData.city,
                    country: formData.country
                });

                const payload = {
                    name: formData.name.trim(),
                    description: formData.description.trim(),
                    country: formData.country,
                    city: formData.city.trim(),
                    streetName: formData.streetName.trim(),
                    streetNbr: parseInt(formData.streetNbr),
                    postalCode: formData.postalCode,
                    latitude: coordinates.latitude,
                    longitude: coordinates.longitude
                };

                console.log('Sending payload:', payload);

                const businessResponse = await fetch(`${API_BASE_URL}/add/new`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload)
                });

                if (!businessResponse.ok) {
                    throw new Error('Failed to create business');
                }

                const businessData = await businessResponse.json();
                console.log('Server response:', businessData);

                // check if the response is an object
                if (businessData && typeof businessData === 'object') {
                    console.log('Response keys:', Object.keys(businessData));
                    // check if the id is stored under a different name
                    const possibleId = businessData.id || businessData.businessId || businessData.business_id;
                    
                    if (possibleId) {
                        // continue with the image upload
                        if (file) {
                            const formDataForImage = new FormData();
                            formDataForImage.append('picture', file);

                            console.log('Uploading image for business ID:', possibleId);

                            const imageResponse = await fetch(
                                `${API_BASE_URL}/uploadImageToBusiness/?idBusiness=${possibleId}&isPrimary=1`,
                                {
                                    method: 'POST',
                                    body: formDataForImage
                                }
                            );

                            const imageResult = await imageResponse.json();
                            console.log('Image upload result:', imageResult);
                        }
                    } else {
                        console.error('Response structure:', businessData);
                        throw new Error('Business created but ID not found in response');
                    }
                }

                toast.success('Business added successfully!');
                setFormData({
                    name: '',
                    description: '',
                    country: '',
                    city: '',
                    streetName: '',
                    streetNbr: '',
                    postalCode: '',
                });
                setFile(null);
                setFileName('No file chosen');

            } catch (error) {
                console.error('Error:', error);
                toast.error(error.message);
            }
        }
    };

    return (
        <div className="add-business-container">
            <div className="header-section">
                <h1 className="main-title">Add Your Business</h1>
                {/* <p className="subtitle">Join our community by listing your business in our directory</p> */}
            </div>
            
            <form className="form-container" onSubmit={handleSubmit}>
                <input
                    className="form-control"
                    type="text"
                    id="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                />
                <input
                    className="form-control"
                    type="text"
                    id="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleInputChange}
                />
                <select
                    className="form-control"
                    id="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    disabled={isLoading}
                >
                    <option value="">Select a country</option>
                    {countries.map((country) => (
                        <option key={country} value={country}>
                            {country}
                        </option>
                    ))}
                </select>
                <input
                    className="form-control"
                    type="text"
                    id="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                />
                <input
                    className="form-control"
                    type="text"
                    id="streetName"
                    placeholder="Street"
                    value={formData.streetName}
                    onChange={handleInputChange}
                />
                <input
                    className="form-control"
                    type="text"
                    id="streetNbr"
                    placeholder="Street number"
                    value={formData.streetNbr}
                    onChange={handleInputChange}
                />
                <input
                    className="form-control"
                    type="text"
                    id="postalCode"
                    placeholder="Postal code"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                />

                <div className="custom-file-upload">
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    <label htmlFor="fileInput" className="btn btn-secondary">
                        Choose File
                    </label>
                    <span id="fileName">{fileName}</span>
                </div>

                {error && <div className="text-danger">{error}</div>}

                <button
                    className="btn d-xl-flex btn-secondary"
                    id="addBusiness"
                    type="submit"
                >
                    Submit
                </button>
            </form>
            
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}
