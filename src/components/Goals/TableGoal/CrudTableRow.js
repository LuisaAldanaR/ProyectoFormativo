import React from 'react';
import '../../../App.scss';
import Swal from 'sweetalert2';

const CrudTableRow = ({ goal, index, goalsKey, handleFormChange }) => {

  const handleChange = (e) => {
    handleFormChange(e, index, goalsKey);

  };

  if (!goal) {
    return null; // Handling undefined data
  }

  // Verifica la modalidad y asigna el nombre apropiado
  const levelName = goal.modality === "Presencial" || goal.modality === "Virtual"
    ? "Tecnólogo"
    : "Técnico Laborales y Otros";

  return (
    <tr>

      <td className='tdTableRow'>{levelName}</td>
      
      <td className='tdTableRow'>{goal.modality}</td>

      <td className="tdTableRow">
        <input className='select-net'
          type="number"
          name="target"
          placeholder="Meta"
          value={goal.target !== undefined ? goal.target : "0"}
          onChange={handleChange}
        />
      </td>
      <td className="tdTableRow">
        <input className='select-net'
          type="number"
          name="passes2021To2022"
          placeholder="Cupos Antiguos"
          value={goal.passes2021To2022 !== undefined ? goal.passes2021To2022 : "0"}
          onChange={handleChange}
        />
      </td>

      <td className='tdTableRow'>{goal.percentage}</td>

      <td className="tdTableRow">
        <input className='select-net'
          type="number"
          name="firstQuarterEnrollment"
          placeholder="1er trimestre"
          value={goal.firstQuarterEnrollment !== undefined ? goal.firstQuarterEnrollment : "0"}
          onChange={handleChange}
        />
      </td>

      <td className='tdTableRow'>{goal.firstQuarterTotal}</td>

      <td className='tdTableRow'>{goal.firstQuarterPercentage}</td>

      <td className='tdTableRow'>{goal.firstQuarterGroups}</td>


      <td className="tdTableRow">
        <input className='select-net'
          type="number"
          name="secondQuarterEnrollment"
          placeholder="2do trimestre"
          value={goal.secondQuarterEnrollment !== undefined ? goal.secondQuarterEnrollment : "0"}
          onChange={handleChange}
        />
      </td>

      <td className='tdTableRow'>{goal.secondQuarterTotal}</td>

      <td className='tdTableRow'>{goal.secondQuarterPercentage}</td>

      <td className='tdTableRow'>{goal.secondQuarterGroups}</td>

      
      <td className="tdTableRow">
        <input className='select-net'
          type="number"
          name="thirdQuarterEnrollment"
          placeholder="3er trimestre"
          value={goal.thirdQuarterEnrollment !== undefined ? goal.thirdQuarterEnrollment : "0"}
          onChange={handleChange}
        />
      </td>

      <td className='tdTableRow'>{goal.thirdQuarterTotal}</td>

      <td className='tdTableRow'>{goal.thirdQuarterPercentage}</td>

      <td className='tdTableRow'>{goal.thirdQuarterGroups}</td>


      <td className="tdTableRow">
        <input className='select-net'
          type="number"
          name="fourthQuarterEnrollment"
          placeholder="4to trimestre"
          value={goal.fourthQuarterEnrollment !== undefined ? goal.fourthQuarterEnrollment : "0"}
          onChange={handleChange}
        />
      </td>

      <td className='tdTableRow'>{goal.fourthQuarterTotal}</td>

      <td className='tdTableRow'>{goal.fourthQuarterPercentage}</td>

      <td className='tdTableRow'>{goal.fourthQuarterGroups}</td>

      <td className='tdTableRow'>{goal.margin}</td>
      
    </tr>
  );
};

export default CrudTableRow;
