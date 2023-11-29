import React, { useEffect, useState } from "react";
import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";
import { helpHttp } from "../../helpers/helpHttp";
import Loader from "./Loader";
import Message from "./Message";
import "../../App.scss";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function show_alerta(mensaje, icono, foco = '') {
  onfocus(foco);
  const MySwal = withReactContent(Swal);
  MySwal.fire({
    title: mensaje,
    icon: icono
  })
}

function onfocus(foco) {
  if (foco !== '') {
    document.getElementById(foco).focus();
  }
}

const CrudAppFullTimeInstructor = () => {
  const [db, setDb] = useState([]);
  const [networkOptions, setNetworkOptions] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showRecords, setShowRecords] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const token = localStorage.getItem('jwtToken');
  let api = helpHttp();

  useEffect(() => {
    loadTableData();
    loadNetworkOptions();
  }, []);

  // Function to load the NetworkOptions from the API
  const loadNetworkOptions = () => {
    const urlNetwork = "https://www.cupibudget.somee.com/api/Network/List";
    const options = {
      headers: { 'Authorization': `Bearer ${token}` },
    };

    api.get(urlNetwork, options).then((res) => {
      if (!res.err) {
        setNetworkOptions(res.response);
      } else {
        console.error("Error al obtener las opciones de red:", res.err);
      }
    });
  };

  // Function to load table data
  const loadTableData = () => {
    let urlGet = "https://www.cupibudget.somee.com/api/FullTimeInstructor/List";

    let options = {
      headers: { 'Authorization': `Bearer ${token}`, },
    };

    api.get(urlGet, options).then((res) => {
      if (!res.err) {

        try {
          setDb(res.response);
          setTotalRecords(res.response.length);
          setError(null);
        } catch (error) {
          show_alerta('Error: Revisa tu conexión a Internet', 'error');
        }

      } else {
        setDb([]);
        setTotalRecords(0);
      }

      setLoading(false);
    });
  };

  // Function to create a new instructor

  const createData = (data) => {
    let urlPost = "https://www.cupibudget.somee.com/api/FullTimeInstructor/Save";

    let options = {
      body: data,
      headers: { "content-type": "application/json", 'Authorization': `Bearer ${token}`, },
    };

    api.post(urlPost, options).then((res) => {
      if (!res.err) {
        Swal.fire({
          title: '¡Agregado!',
          text: 'El registro ha sido agregado exitosamente.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          showTable();
        });

        loadTableData();
      } else {

        show_alerta('Acceso denegado', 'error');
      }
    });
  };

  // Function to update an existing instructor

  const updateData = (data) => {
    let urlPut = "https://www.cupibudget.somee.com/api/FullTimeInstructor/Edit";

    let options = { body: data, headers: { "content-type": "application/json", 'Authorization': `Bearer ${token}`, } };

    api.put(urlPut, options).then((res) => {
      if (!res.error) {
        Swal.fire({
          title: '¡Editado!',
          text: 'El registro ha sido editado exitosamente.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          let newData = db.map((el) =>
            el.idInstructor === data.idInstructor ? data : el
          );
          setDb(newData);
          loadTableData();
          showTable();
        });
      } else {

        show_alerta('Acceso denegado', 'error');
      }
    });
  };

  // Function to delete an instructor

  const deleteData = (idInstructor, data) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Estás seguro de eliminar al Instructor: '${data.name}'?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        let urlDel = "https://www.cupibudget.somee.com/api/FullTimeInstructor/Delete";
        let endPoint = `${urlDel}/${idInstructor}`;

        let options = { headers: { "content-type": "application/json", 'Authorization': `Bearer ${token}`, } };

        api.del(endPoint, options).then((res) => {
          if (!res.err) {
            let newData = db.filter((el) => el.idInstructor !== idInstructor);
            setDb(newData);

            Swal.fire(
              '¡Eliminado!',
              'El registro ha sido eliminado exitosamente.',
              'success'
            );
          } else {

            show_alerta('Acceso denegado', 'error');
          }
        });
      }
    });
  };

  // Function to show the form
  const showFormViewFullTimeInstructor = () => {

    if (dataToEdit) {
      setDataToEdit(null);
    }

    setShowForm(true);
    setShowRecords(false);
  };

  // Function to show the record table
  const showTable = () => {
    setShowForm(false);
    setShowRecords(true);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Message msg={`Error ${error.status}: ${error.statusText}`} bgColor="#dc3545" />;
  }

  let role = "";

  // Function to verify if the token is active
  function isTokenExpired(token) {
    const arrayToken = token.split('.');
    const tokenPayload = JSON.parse(atob(arrayToken[1]));
    role = (tokenPayload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
    return Math.floor(new Date().getTime / 1000) >= tokenPayload?.sub;
  }

  isTokenExpired(token);

  return (
    <div className="content">
      {showRecords && (
        <>

          <h3 className="h3Table">Instructores de Planta</h3>

          <div className="containerButtons">
            {role === 'Admin' && (
              <>
                <button className="btn addButton" onClick={showFormViewFullTimeInstructor}>
                  Registrar Nuevo Instructor
                </button>
              </>
            )}
          </div>
        </>
      )}

      {showForm && (
        <CrudForm
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
          showTable={showTable}
          networkOptions={networkOptions}
        />
      )}

      {showRecords && !loading && !error && db && (
        <CrudTable
          data={db}
          setDataToEdit={setDataToEdit}
          deleteData={deleteData}
          showFormViewFullTimeInstructor={showFormViewFullTimeInstructor}
        />
      )}

      <div className="loader">
        {loading && <Loader />}

        {error && (
          <Message msg={`Error ${error.status}: ${error.statusText}`} bgColor="#dc3545" />
        )}
      </div>



    </div>
  );
};

export default CrudAppFullTimeInstructor;
