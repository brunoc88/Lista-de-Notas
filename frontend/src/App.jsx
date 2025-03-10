import { useState, useEffect } from 'react';
import { getAll, create, eliminar} from './services/notesService'
import { Notas, Form, Mensaje } from './components/nota'

const App = () =>{
  const [notas, setNotas] = useState([]);
  const [nuevaNota, setNuevaNota] = useState('');
  const [mensaje, setMensaje] = useState({exito: '', error: ''});

  useEffect(()=>{
    getAll()
    .then(prev => {
      setNotas(prev);
    })
    .catch(error => {
      console.log(error);
    })
  },[])

  const handlerNota = (event) =>{
    setNuevaNota(event.target.value);
    console.log(nuevaNota);
  }

  const agregar = (event) =>{
    event.preventDefault();
    
    create(nuevaNota)
    .then(response =>{
      setNotas(notas.concat(response)); //agrego la nueva nota
      setNuevaNota(''); //limpio el input
      setMensaje({exito: 'Nota Creda con exito!',error:''})
      setTimeout(() => {
        setMensaje({exito: '',error:''})
      }, 3500);
    })
    .catch(error =>{
      console.log(error);
      setMensaje({exito: '',error:'Error al crear Nota!'})
      setTimeout(() => {
        setMensaje({exito: '',error:''})
      }, 3500);
    })
  }

  const eliminarNota = (id) =>{
    eliminar(id)
    .then(() => {
      setNotas(notas.filter(n=> n.id !== id));
      setMensaje({exito: 'Nota Eliminada con exito!',error:''})
      setTimeout(() => {
        setMensaje({exito: '',error:''})
      }, 3500);
    })
    .catch(error => {console.log(error)
      setMensaje({exito: '',error:'Error al eliminar Nota!'})
      setTimeout(() => {
        setMensaje({exito: '',error:''})
      }, 3500);
    })
  }


  return (
    <div>
      <h1>Listado de Notas</h1>
      <Mensaje mensaje = {mensaje}/>
      <h2>Crea una Nota!</h2>
      <Form handler = {handlerNota} noteValue ={nuevaNota} addNota = {agregar}/>
      <Notas notas = { notas } eliminarNota = {eliminarNota}/>
    </div>
  )
}

export default App;