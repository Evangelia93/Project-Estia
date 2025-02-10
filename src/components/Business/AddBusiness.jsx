import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import './styles/styles.scss';
const API_BASE_URL = 'https://estiaproject-b3ef95234cdd.herokuapp.com/api/v1/business';

// Component for adding a new business with form validation and image upload
export default function AddBusiness() {
    // Initialize form state with empty values
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        country: '',
        city: '',
        streetName: '',
        streetNbr: '',
        postalCode: '',
    });

    // State for handling file upload
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('No file chosen');
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

    // Handle input changes for all form fields
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

    // Handle file selection and update file name display
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setFileName(selectedFile ? selectedFile.name : 'No file chosen');
    };

    // Validates all required fields including the image upload
    const validateForm = () => {
        // Define required fields with their display labels
        const requiredFields = [
            { name: 'name', label: 'Name' },
            { name: 'description', label: 'Description' },
            { name: 'country', label: 'Country' },
            { name: 'city', label: 'City' },
            { name: 'streetName', label: 'Street Name' },
            { name: 'postalCode', label: 'Postal Code' }
        ];

        // Check each required text field
        for (const field of requiredFields) {
            if (!formData[field.name].trim()) {
                toast.error(`Please fill in the ${field.label}`);
                return false;
            }
        }

        // Special validation for street number (numbers only)
        const streetNbrPattern = /^\d+$/;
        if (!formData.streetNbr.trim() || !streetNbrPattern.test(formData.streetNbr.trim())) {
            toast.error('Street Number must contain only numbers');
            return false;
        }

        // Check if an image has been selected
        if (!file) {
            toast.error('Please select an image for your business');
            return false;
        }

        // All validations passed
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
                    streetNbr: formData.streetNbr.trim(),
                    postalCode: formData.postalCode,
                    latitude: coordinates.latitude,
                    longitude: coordinates.longitude
                };

                console.log('Sending payload:', payload);
                console.log('latitude:', coordinates.latitude);
                console.log('longitude:', coordinates.longitude);

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

                if (businessData && businessData.message === "Business added successfully") {
                    const businessId = businessData.data.id;
                    
                    if (businessId && file) {
                        const formDataForImage = new FormData();
                        formDataForImage.append('picture', file);

                        const imageResponse = await fetch(
                            `${API_BASE_URL}/uploadImageToBusiness/?idBusiness=${businessId}&isPrimary=1`,
                            {
                                method: 'POST',
                                body: formDataForImage
                            }
                        );

                        if (!imageResponse.ok) {
                            throw new Error('Failed to upload image');
                        }

                        const imageResult = await imageResponse.json();
                        console.log('Image upload result:', imageResult);
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
                } else {
                    throw new Error('Invalid server response');
                }

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
                {/* Business name input */}
                <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                />

                {/* Business description input */}
                <input
                    type="text"
                    className="form-control"
                    placeholder="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                />

                {/* Country selection dropdown */}
                <select
                    required
                    defaultValue=""
                    name="country"
                    onChange={handleInputChange}
                    value={formData.country}
                >
                    <option value="" disabled>Select a country</option>
                    {countries.map((country) => (
                        <option key={country} value={country}>
                            {country}
                        </option>
                    ))}
                </select>

                {/* City input */}
                <input
                    type="text"
                    className="form-control"
                    placeholder="City"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                />

                {/* Street name input */}
                <input
                    type="text"
                    className="form-control"
                    placeholder="Street"
                    name="streetName"
                    value={formData.streetName}
                    onChange={handleInputChange}
                />

                {/* Street number input - numbers only */}
                <input
                    type="number"
                    className="form-control"
                    placeholder="Street number"
                    name="streetNbr"
                    value={formData.streetNbr}
                    onChange={handleInputChange}
                />

                {/* Postal code input */}
                <input
                    type="text"
                    className="form-control"
                    placeholder="Postal code"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                />

                {/* File upload section */}
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

                {/* Submit button */}
                <button type="submit" className="btn btn-secondary" id="addBusiness">
                    Add Business
                </button>
            </form>
        </div>
    );
}
