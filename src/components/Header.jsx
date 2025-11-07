
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export const Header = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const handleLogout = () => { logout(); navigate("/login") }

  return (
    <header className="header glass container" style={{marginTop:16}}>
      <div className="app-title">Vox – Grabadora</div>
      <nav className="nav-actions" aria-label="Usuario">
        {user ? (
          <>
            <span style={{marginRight:12}}>Hola, {user.email}</span>
            <button onClick={handleLogout}>Salir</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{marginRight:12}}>Ingresar</Link>
            <Link to="/register">Crear cuenta</Link>
          </>
        )}
      </nav>
    </header>
  )
}
