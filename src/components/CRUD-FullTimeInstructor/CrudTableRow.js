import React from "react";
import "../../App.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const CrudTableRow = ({ el, setDataToEdit, deleteData, showFormViewFullTimeInstructor,  isRowSelected,
  onRowSelect, }) => {
  // Destructure the properties of the 'el' object passed as an argument
  let { idInstructor, name, position, oNetwork, endDateCourse } = el;
  const endDateCourseAsDate = new Date(endDateCourse);

  // Options to format the date in Spanish
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  return (
    // Render a table row with data from the 'el' object
    <tr>
      <td className="tdTableRow">{name}</td> 
      <td className="tdTableRow">{position}</td> 
      <td className="tdTableRow">{endDateCourseAsDate.toLocaleDateString('es-ES', options)}</td>
      {/* Render the network name ('oNetwork.networkName') or a loading message if not defined */}
      <td className="tdTableRow">
        {oNetwork ? (
          oNetwork.networkName
        ) : (
          el.loading ? (<span>Cargando...</span>) : null 
        )}
      </td>
      <td className="tdTableRow">
        {/* Edit button that calls the 'setDataToEdit' function with the 'el' object */}
        <button className="btn btn-warning" onClick={() => {
          setDataToEdit(el); // Set the 'el' object as the data to edit
          showFormViewFullTimeInstructor(); // Call the 'showFormViewFullTimeInstructor' function to show the form
        }}><FontAwesomeIcon icon={faUserPen}/></button>&nbsp; 
        {/* Delete button that calls the 'deleteData' function with 'idInstructor' as an argument */}
        <button className="btn btn-danger" onClick={() => deleteData(idInstructor, el)}>
        <FontAwesomeIcon icon={faTrash}/></button>
      </td> 
      
    </tr>
    
    
  );
};

// Export the CrudTableRow component for use in other parts of the application
export default CrudTableRow;
