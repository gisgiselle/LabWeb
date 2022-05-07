/*

Challenge 2

Reconstruye la siguiente página creando 3 'custom components' para cada elemento y llámalos: 

Header
MainContent
Footer

Crea un cuarto 'custom component' llamado Page, dentro de él incluye los 3 componentes anteriores.

'Renderea' Page en la página.


*/

function Header() {
    return(
        <header>
            <nav>
                <img src="./react.svg" width="40px" />
            </nav>
        </header>
    )
}

function MainContent() {
    return(
        <div>
            <h1>Razones para aprender React</h1>
            <ul>
                <li>Más experiencia</li>
                <li>Utilizar una tecnología nueva</li>
                <li>Actualizar mis conocimientos</li>
                <li>Desarrollar mi habilidad en programación</li>
            </ul>
        </div>
    )
}

function Footer() {
    return(
        <footer>
            <small>© 2022 TC3052. LDAW @ Tec CCM.</small>
        </footer>
    )
}

function Page() {
    return(
        <div>
            <Header />
            <MainContent />
            <Footer />
        </div>
    )
}


ReactDOM.render(<Page />,
                document.getElementById("root"))

