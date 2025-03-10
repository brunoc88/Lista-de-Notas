
const Notas = ({ notas, eliminarNota}) => {
    if(!notas || notas.length === 0){
        return(
            <div>Escribe tu primera nota!</div>
        )
    }
    return (
        <div>
            <ul>
                {notas.map(n => {
                    return (
                        <li key={n.id}>
                            <Nota id={n.id} nota = {n.nota} fecha = {n.fecha} elimnar = {eliminarNota}/>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

const Nota = ({id, nota, fecha, elimnar}) =>{
    return(
        <div>
            <p><strong>Nota: {nota}</strong></p>
            <p>Fecha: {fecha}</p>
            <button onClick={()=>elimnar(id)}>Eliminar</button>
        </div>
    )
}

const Form = ({noteValue, handler, addNota}) =>{
    return(
        <div>
            <form onSubmit={addNota}>
            <input type="text" value={noteValue} onChange={handler}/>
            <button type="submit">Enviar</button>
            </form>
        </div>
    )
}

const Mensaje = ({mensaje}) =>{
    if(!mensaje.exito || mensaje.error){
        return null;
    }
    if(mensaje.exito){
        return(
            <div className="exito">{mensaje.exito}</div>
        )
    }
    if(mensaje.error){
        return(
            <div className="error">{mensaje.error}</div>
        )
    }
}

export {Notas, Form, Mensaje}