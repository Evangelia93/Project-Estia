import React from "react";

function FilterCheckboxes({ values = {}, onChange }) {
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const updatedCheckboxes = { ...values, [name]: checked };
    onChange(updatedCheckboxes);
  };

  return (
    <div>
      {/* Meals */}
      <div className="filter-section">
        <h4>Meals</h4>
        <label>
          <input
            type="checkbox"
            name="breakfast"
            checked={values.breakfast || false}
            onChange={handleCheckboxChange}
          />
          Breakfast
        </label>
        <label>
          <input
            type="checkbox"
            name="lunch"
            checked={values.lunch || false}
            onChange={handleCheckboxChange}
          />
          Lunch
        </label>
        <label>
          <input
            type="checkbox"
            name="brunch"
            checked={values.brunch || false}
            onChange={handleCheckboxChange}
          />
          Brunch
        </label>
        <label>
          <input
            type="checkbox"
            name="dinner"
            checked={values.dinner || false}
            onChange={handleCheckboxChange}
          />
          Dinner
        </label>
        <label>
          <input
            type="checkbox"
            name="cafe"
            checked={values.cafe || false}
            onChange={handleCheckboxChange}
          />
          Cafe
        </label>
      </div>

      <hr />

      {/* Playgrounds */}
      <div className="filter-section">
        <h4>Playgrounds</h4>
        <label>
          <input
            type="checkbox"
            name="indoorPlayground"
            checked={values.indoorPlayground || false}
            onChange={handleCheckboxChange}
          />
          Indoor playground
        </label>
        <label>
          <input
            type="checkbox"
            name="outdoorPlayground"
            checked={values.outdoorPlayground || false}
            onChange={handleCheckboxChange}
          />
          Outdoor playground
        </label>
      </div>

      <hr />

      {/* Features */}
      <div className="filter-section">
        <h4>Features</h4>
        <label>
          <input
            type="checkbox"
            name="animators"
            checked={values.animators || false}
            onChange={handleCheckboxChange}
          />
          Animators
        </label>
        <label>
          <input
            type="checkbox"
            name="petsAllowed"
            checked={values.petsAllowed || false}
            onChange={handleCheckboxChange}
          />
          Pets allowed
        </label>
        <label>
          <input
            type="checkbox"
            name="parking"
            checked={values.parking || false}
            onChange={handleCheckboxChange}
          />
          Parking
        </label>
        <label>
          <input
            type="checkbox"
            name="wheelchairAccessibility"
            checked={values.wheelchairAccessibility || false}
            onChange={handleCheckboxChange}
          />
          Wheelchair accessibility
        </label>
      </div>
    </div>
  );
}

export default FilterCheckboxes;