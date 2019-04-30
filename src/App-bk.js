import React, { useState, useEffect, Fragment } from 'react';


function Cita({cita, Index, eliminarCita})  {

  return(

    <div className="cita">

      <p>Mascota: <span>{cita.mascota}</span></p>
      <p>Dueño: <span>{cita.propietario}</span></p>
      <p>Fecha: <span>{cita.fecha}</span></p>
      <p>Hora: <span>{cita.hora}</span></p>
      <p>Síntomas: <span>{cita.sintomas}</span></p>
      <button
        onClick={() => eliminarCita(Index)}
        type="button" className="button eliminar u-full-width">Eliminar X</button>
    </div>
  )

}


function Formulario({crearCita}) {

  //iniciamos el state


  const stateInicial = {

    mascota : '',
    propietario: '',
    fecha: '',
    hora: '',
    sintomas: ''

  }

  // cita = state actual
  // actualiza el state
  const [cita, actualizarCita] = useState(stateInicial);

  //actualiza el state
  const actualizarState = (e) => {

    actualizarCita({
      //recojo una copia de lo que hay en el state
      ...cita,
      // recogemos el valor del formulario
      [e.target.name]: e.target.value
    })
  }


  //pasamos la cita al componente principal
  const enviarCita = (e) => {

    e.preventDefault();

    //pasar la cita hacia el componente principal
    crearCita(cita)
    // reiniciar el state (reiniciar el form)


    console.log(cita);

    actualizarCita(stateInicial)

  }



  return (
        <Fragment>
        <h5>Crear Cita</h5>

        <form onSubmit={enviarCita}>
                    <label>Nombre Mascota</label>
                    <input 
                      type="text" 
                      name="mascota"
                      className="u-full-width" 
                      placeholder="Nombre Mascota" 
                      onChange={actualizarState}
                      value={cita.mascota}
                    />

                    <label>Nombre Dueño</label>
                    <input 
                      type="text" 
                      name="propietario"
                      className="u-full-width"  
                      placeholder="Nombre Dueño de la Mascota" 
                      onChange={actualizarState}
                      value={cita.propietario}
                    />

                    <label>Fecha</label>
                    <input 
                      type="date" 
                      className="u-full-width"
                      name="fecha"
                      onChange={actualizarState}
                      value={cita.fecha}
                    />               

                    <label>Hora</label>
                    <input 
                      type="time" 
                      className="u-full-width"
                      name="hora" 
                      onChange={actualizarState}
                      value={cita.hora}
                    />

                    <label>Sintomas</label>
                    <textarea 
                      className="u-full-width"
                      name="sintomas"
                      onChange={actualizarState}
                      value={cita.sintomas}
                    >
                    </textarea>

                    <button type="submit" className="button-primary u-full-width">Agregar</button>
            </form>
    </Fragment>

  )
}



function App() {

// cargar las citas de localstorage como state inicial
let citasIniciales = JSON.parse(localStorage.getItem('citas'));
if(!citasIniciales) {
  citasIniciales = [];
} 

// iniciamos con esta const los Hooks
const [citas, guardarCita] = useState([citasIniciales]);

const crearCita = cita => {

  const nuevasCitas = [...citas, cita];
  // guardamos en el state
  guardarCita(nuevasCitas);
}


//elimina citas del state
const eliminarCita = index => {

  const nuevasCitas = [...citas];
  nuevasCitas.splice(index,1);
  guardarCita(nuevasCitas);

}

// se ejecuta cuando hay un evento
useEffect(
  () => {

    let citasIniciales = JSON.parse(localStorage.getItem('citas'));

    if(citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify([]))
    }
  }, [citas] 
)

// cargar condicionalmente un titulo
const titulo = Object.keys(citas).length === 0 ? 'No hay citas' : 'Administrar citas aquí';


  return(
    <Fragment>
        <h5>Administrador de Pacientes</h5>
        <div className="container">
          <div className="row">
              <div className="one-half column">
                  <Formulario 
                    crearCita = {crearCita}
                  />
              </div>
              <div className="one-half column">
               <h5>{titulo}</h5>
                {citas.map((cita, index) => (
                  <Cita
                    key={index}
                    index={index}
                    cita={cita}
                    eliminarCita={eliminarCita}
                  />

                ))}
              </div>
          </div>
        </div>
    </Fragment>
  )


}

export default App;