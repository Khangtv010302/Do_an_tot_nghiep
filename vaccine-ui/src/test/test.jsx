import React, { useEffect, useState } from "react";
import { Checkbox, Col, Row } from 'antd';
const onChange = (checkedValues) => {
  console.log('checked = ', checkedValues);
};
function Test() {
          // Assuming listVaccine is managed by useState
        const [listVaccine, setListVaccine] = useState([
          { id: 1, name: 'Vaccine A', storage: 0 },
          { id: 2, name: 'Vaccine B', storage: 0 },
          // Other vaccine objects...
        ]);

        const updateVaccineById = (vaccineId, newValues) => {
          // Update listVaccine using setListVaccine
          setListVaccine(prevList => {
              return prevList.map(vaccine => {
                  if (vaccine.id === vaccineId) {
                      // If vaccine ID matches, update the vaccine with new values
                      return { ...vaccine, ...newValues };
                  }
                  return vaccine; // Otherwise, return unchanged vaccine
              });
          });
        };
        console.log(listVaccine)
// Usage: Update vaccine with ID 2 with new values
    updateVaccineById(1, { storage: 1 });
    return (
      <div>
        {listVaccine}
      </div>
    );
    
}

export default Test;