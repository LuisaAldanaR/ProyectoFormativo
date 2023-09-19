import React, {useState, useEffect} from "react";
import "./main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

// Define an object with initial values for the form
const initialForm = {
  cupos: "",
  goal: "",
  networkId: null,
};

const CrudTableRow = ({ el, setDataToEdit, }) => {
  // Destructure the properties of the 'el' object passed as an argument
  let {  oNetwork } = el;
  const [form, setForm] = useState(initialForm);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!form.goal.trim() || !form.cupos.trim() || !form.networkId.trim()) {
      alert("Incomplete data");
      return;
    }

    // Clear the form and reset dataToEdit to null
    handleReset();
  };
  
  

  // Function to clear the form and edit data
  const handleReset = (e) => {
    setForm(initialForm);
    setDataToEdit(null);
  };

  return (
    // Render a table row with the data from the 'el' object
    <tr>
      {/* Render the network name ('oNetwork.networkName') or a loading message if it's not defined */}
      <td className="tdTableRow">
        {oNetwork ? (
          oNetwork.networkName
        ) : (
          el.loading ? (<span>Cargando...</span>) : null // Check if the 'el' object has a 'loading' property
        )}
      </td>
      <td className="tdTableRow">
        <input
          type="number"
          name="goal"
          placeholder="Meta del trimestre"
          className="form-control"
          onChange={handleSubmit}
          value={form.goal}
        />
      </td>

      <td className="tdTableRow">
      <input
          type="number"
          name="cupos"
          placeholder="Cupos Antiguos"
          className="form-control"
          onChange={handleSubmit}
          value={form.cupos}
        />
      </td>

      <th className="tdTableRow">
      {/* Edit button with FontAwesome icon */}
        <button className="btn btn-success" onClick={() => {
          setDataToEdit(el); // Set the 'el' object as the data to edit
        }}><FontAwesomeIcon icon={faPaperPlane} /></button>&nbsp;
      </th>
    </tr>
  );
};

// Export the CrudTableRow component for use in other parts of the application
export default CrudTableRow;