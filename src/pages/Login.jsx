import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiAuth from "../services/apiAuth";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiAuth.login(email, password);
      navigate("/tasks");
    } catch (err) {
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="title">🎙️ Vox Recorder</h1>
        <p className="subtitle">Iniciá sesión para continuar</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Ingresar</button>
          {error && <p className="error">{error}</p>}
        </form>
        <p className="register-link" onClick={() => navigate("/register")}>
          ¿No tenés cuenta? <span>Crear cuenta</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
