/*
Challenge 1
Crea un 'custom component' llamado Page
Deberá regresar una lista desordenada (<ul>) con 4 razones por las que crees que es importante aprender React.
Añade en algún lugar el logo de React (incluído en la carpeta)

'Renderea' el componente en la página.

*/

function Page(){
    return(
        <div>
            <h1>Why to learn react</h1>
            <ul>
                <li>Más experiencia</li>
                <li>Utilizar una tecnología nueva</li>
                <li>Actualizar mis conocimientos</li>
                <li>Desarrollar mi habilidad en programación</li>
            </ul>
            <img src='./react.svg' width='40px' />
        </div>
    )
}

ReactDOM.render(<Page />, 
                document.getElementById('root')
);


