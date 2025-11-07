# Documentación del Proyecto: Frontend Prompt

## 🧭 Descripción General

**Frontend Prompt** es una aplicación web construida con **React + Vite**, diseñada como interfaz para consumir la API REST del proyecto **Backend Prompt**.  
El objetivo es ofrecer un entorno funcional donde los alumnos puedan practicar integración frontend-backend y el uso de prompts de IA para optimizar el flujo de trabajo.

Este proyecto se despliega en **Vercel**, mientras que el backend se aloja en **Render.com** y la base de datos en **MongoDB Atlas**.

---

## 🧱 Estructura del Proyecto

```
frontend/
│
├── .env                         # Variables de entorno
├── .gitignore                   # Archivos y carpetas ignorados por Git
├── eslint.config.js             # Configuración del linter
├── index.html                   # Punto de entrada principal de la app
├── package.json                 # Dependencias y scripts de npm
├── vite.config.js               # Configuración de Vite
│
├── src/
│   ├── components/              # Componentes reutilizables (formularios, botones, etc.)
│   ├── context/                 # Contexto global de usuario y autenticación
│   ├── hooks/                   # Hooks personalizados
│   ├── pages/                   # Páginas del sitio (Login, Registro, Dashboard, etc.)
│   ├── services/                # Conexión con el backend mediante fetch/axios
│   ├── App.jsx                  # Componente raíz
│   ├── main.jsx                 # Renderizado principal de ReactDOM
│   └── styles/                  # Archivos CSS globales
│
└── public/                      # Recursos estáticos
```

---

## ⚙️ Tecnologías Utilizadas

- **React 18** – Librería principal de la UI.
- **Vite** – Herramienta de desarrollo rápida y moderna.
- **React Router DOM** – Enrutamiento de páginas.
- **Zod** – Validación de datos en formularios.
- **Fetch / Axios** – Comunicación con el backend.
- **Tailwind CSS** o **CSS Modules** – Estilado (según configuración).
- **Vercel** – Hosting del frontend.

---

## 🌐 Comunicación con el Backend

El frontend consume los endpoints del proyecto **Backend Prompt**, manejando autenticación JWT y operaciones CRUD sobre tareas.

Ejemplo de configuración del endpoint base:

```js
// src/services/api.js
const API_URL = import.meta.env.VITE_API_URL;

export const getTasks = async (token) => {
  const res = await fetch(`${API_URL}/api/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};
```

---

## 🔑 Autenticación

La app implementa un **contexto global de usuario** (`UserContext`) que gestiona:

- Almacenamiento del token JWT en `localStorage`.
- Estado de sesión (logueado/no logueado).
- Cierre de sesión automático si el token expira.

Ejemplo simplificado:

```js
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUser({ token });
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
```

---

## 🧩 Páginas Principales

| Página | Descripción |
|--------|--------------|
| **Login** | Permite iniciar sesión y guardar token JWT. |
| **Registro** | Crea nuevos usuarios y muestra mensajes de validación. |
| **Dashboard** | Lista tareas del usuario autenticado. |
| **Crear tarea** | Permite agregar una nueva tarea. |
| **Editar tarea** | Permite modificar una tarea existente. |
| **404** | Página de error en caso de ruta inexistente. |

---

## ⚡ Variables de Entorno

El archivo `.env` define variables necesarias para conectar con el backend:

```
VITE_API_URL=https://backend-prompt.onrender.com
VITE_ENV=production
```

Durante el desarrollo local puede apuntar a `http://localhost:3000`.

---

## 🚀 Scripts Disponibles

| Comando | Descripción |
|----------|-------------|
| `npm run dev` | Ejecuta el servidor local de desarrollo (Vite). |
| `npm run build` | Genera la versión optimizada para producción. |
| `npm run preview` | Sirve la build generada localmente. |
| `npm run lint` | Ejecuta análisis de código con ESLint. |

---

## 💡 Buenas Prácticas de Prompts en el Curso

Este frontend se utiliza en el marco del **Curso de Prompt Engineering para Desarrolladores FrontEnd**.  
Algunos ejemplos de prompts aplicados en el proyecto:

- Generar textos de error o validación más claros.
- Pedir optimización de UI con Tailwind CSS.
- Crear estructuras de componentes o hooks reutilizables.
- Generar mensajes de confirmación accesibles e inclusivos.

---

## 🧠 Conclusión

El **Frontend Prompt** es un entorno de práctica para consolidar habilidades de desarrollo moderno en React, integrando la comunicación con un backend real y el uso de IA para acelerar el trabajo diario.  
Su estructura modular y el uso de contextos, hooks y validaciones lo convierten en una base sólida para proyectos educativos o productivos.

