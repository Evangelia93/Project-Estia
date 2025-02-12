import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import './styles/styles.scss';
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
        const { name, value } = e.target;
        
        if (name === 'streetNbr' || name === 'postalCode') {
            const numericValue = value.replace(/\D/g, '');
            setFormData(prev => ({
                ...prev,
                [name]: numericValue
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setFileName(selectedFile ? selectedFile.name : 'No file chosen');
    };

    const validateForm = () => {
        const requiredFields = ['name', 'description', 'country', 'city', 'streetName', 'streetNbr', 'postalCode'];
        for (const field of requiredFields) {
            if (!formData[field]) {
                toast.error(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
                return false;
            }
        }
        return true;
    };

    const getCoordinates = async (address) => {
        try {
            const response = await fetch(
                `https://geocode.maps.co/search?street=${address.streetNbr}+${address.streetName}&city=${address.city}&country=${address.country}`
            );
            const data = await response.json();
            
            if (data && data[0]) {
                return {
                    latitude: parseFloat(data[0].lat),
                    longitude: parseFloat(data[0].lon)
                };
            }
            throw new Error('Could not get coordinates');
        } catch (error) {
            console.error('Error getting coordinates:', error);
            return { latitude: 0, longitude: 0 };
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

                if (businessData && typeof businessData === 'object') {
                    console.log('Response keys:', Object.keys(businessData));
                    const possibleId = businessData.data.id;
                    
                    if (possibleId && file) {
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
            </div>
            
            <form className="form-container" onSubmit={handleSubmit}>
                <input
                    className="form-control"
                    type="text"
                    id="name"
                    placeholder="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                />
                <input
                    className="form-control"
                    type="text"
                    id="description"
                    placeholder="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                />
                <select
                    className="form-control"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    required
                    defaultValue=""
                >
                    <option value="" disabled>Select a country</option>
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
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                />
                <input
                    className="form-control"
                    type="text"
                    id="streetName"
                    placeholder="Street"
                    name="streetName"
                    value={formData.streetName}
                    onChange={handleInputChange}
                />
                <input
                    className="form-control"
                    type="text"
                    id="streetNbr"
                    placeholder="Street number"
                    name="streetNbr"
                    value={formData.streetNbr}
                    onChange={handleInputChange}
                />
                <input
                    className="form-control"
                    type="text"
                    id="postalCode"
                    placeholder="Postal code"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                />

                <div className="custom-file-upload">
                    <input
                        type="file"
                        id="file"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    <label htmlFor="file" className="btn btn-secondary">Choose File</label>
                    <p id="fileName" className={file ? 'has-file' : ''}>
                        {fileName}
                    </p>
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
