import { useEffect, useState } from 'react';

export default function Modal() {

    const [selectedButtons, setSelectedButtons] = useState([]);
    const [isModalActive, setIsModalActive] = useState(false);

    function toggleModal() {
        setIsModalActive(!isModalActive);
    }

    function handleButtonSelection(event) {
        event.preventDefault()
        const value = event.target.value;

        if (!selectedButtons.includes(value)) {
            setSelectedButtons([...selectedButtons, value]);
        } else {
            setSelectedButtons((previous) => previous.filter((item) => item !== value));
        }
    }

    const meal_options = ['Breakfast', 'Lunch', 'Brunch', 'Dinner', 'Cafe'];
    const playground_options = ['Indoor', 'Outdoor'];
    const feature_options = ['Animators', 'Pets Allowed', 'Parking', 'Wheelchair friendly'];
    const postal_codes = ['1000', '1030', '1050', '1090'];

    const ButtonGroup = ({ options, category, onClick }) => (
        <div className={`${category}-container`}>
            <label>{category}</label>
            <div className="buttons-container">
                {options.map((option) => (
                    <button
                        key={option}
                        value={option.toLowerCase()}
                        className={`button-modal ${category} ${selectedButtons.includes(option.toLowerCase()) ? 'selected' : ''}`}
                        onClick={onClick}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );

    return (

        <>
            <div className="filter-sort-container">
                <button className="filter-button button" onClick={toggleModal} >Filters</button>
            </div>

            <div className="modal-background" onClick={toggleModal}  style={{ display: isModalActive ? 'flex' : 'none' }}></div>
            <div className="modal" style={{ display: isModalActive ? 'flex' : 'none' }}>
                
                <div className="modal-wrapper">
                    <h3>Filters</h3>
                    <hr />

                    <div className="modal-container">
                        <div className="postal-code-container">
                            <label>Location</label>
                            <select defaultValue="" name="postal-code" id="postal-code">
                                <option value="" disabled>Select postal code</option>
                                {postal_codes.map(code => (
                                    <option key={code} value={code}>{code}</option>
                                ))}
                            </select>
                        </div>
                        <hr />
                        <ButtonGroup options={meal_options} category="Meals" onClick={handleButtonSelection} />
                        <hr />
                        <ButtonGroup options={playground_options} category="Playgrounds" onClick={handleButtonSelection} />
                        <hr />
                        <ButtonGroup options={feature_options} category="Features" onClick={handleButtonSelection} />
                    </div>

                    <hr />

                    <div className="reset-apply-button-container">
                        <button onClick={() => setSelectedButtons([])} className="button reset">Reset</button>
                        <button  onClick={toggleModal} className="button apply">Apply</button>
                    </div>
                </div>
            </div>
        </>
    );
}