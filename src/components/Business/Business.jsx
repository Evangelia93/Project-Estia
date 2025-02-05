import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './boostrap-design/assets/bootstrap/css/bootstrap.min.css';
import './boostrap-design/assets/css/styles.css';

export default function Business() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        country: '',
        city: '',
        street: '',
        streetNo: '',
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
        

        if (id === 'bStreetNo' || id === 'bPostalCode') {

            const numericValue = value.replace(/[^0-9]/g, '');
            setFormData(prev => ({
                ...prev,
                [id.replace('b', '').toLowerCase()]: numericValue
            }));
            return;
        }

        setFormData(prev => ({
            ...prev,
            [id.replace('b', '').toLowerCase()]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        setFileName(file ? file.name : 'No file chosen');
    };

    const validateForm = () => {
        const fields = {
            name: 'Name',
            description: 'Description',
            country: 'Country',
            city: 'City',
            street: 'Street',
            streetNo: 'Street Number',
            postalCode: 'Postal Code'
        };

        for (const [key, label] of Object.entries(fields)) {
            if (!formData[key]) {
                toast.error(`Please fill the ${label} field`);
                return false;
            }
        }

        if (!file) {
            toast.error('Please choose a file');
            return false;
        }

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log(formData, file);
            toast.success('Form submitted successfully!');
        }
    };

    return (
        <>
            <form className="form-container" onSubmit={handleSubmit}>
                <input 
                    className="form-control" 
                    type="text" 
                    id="bName" 
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                />
                <input 
                    className="form-control" 
                    type="text" 
                    id="bDescription" 
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleInputChange}
                />
                <select 
                    className="form-control" 
                    id="bCountry" 
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
                    id="bCity" 
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                />
                <input 
                    className="form-control" 
                    type="text" 
                    id="bStreet" 
                    placeholder="Street"
                    value={formData.street}
                    onChange={handleInputChange}
                />
                <input 
                    className="form-control" 
                    type="text" 
                    id="bStreetNo" 
                    placeholder="Street number"
                    value={formData.streetNo}
                    onChange={handleInputChange}
                />
                <input 
                    className="form-control" 
                    type="text" 
                    id="bPostalCode" 
                    placeholder="Postal code"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                />
                
                <div className="custom-file-upload">
                    <input 
                        type="file" 
                        id="fileInput" 
                        style={{display: 'none'}}
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
        </>
    );
}