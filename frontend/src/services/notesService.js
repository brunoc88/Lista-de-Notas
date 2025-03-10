import axios from 'axios'
//const url = 'http://localhost:3000/notas'; //en modo desarrolo usar esta ruta
//ruta para produccion
const url = '/notas'

const getAll = () => axios.get(url).then(response => response.data);

const create = (nota) => axios.post(`${url}/alta`, { nota }).then(response => response.data);

const eliminar = (id) => axios.delete(`${url}/borrar/${id}`).then(response => response.data);

const actualizar = (id,nota) => axios.put(`${url}/actualizar/${id}`,{nota}).then(response => response.data);

export {getAll, create, eliminar, actualizar};