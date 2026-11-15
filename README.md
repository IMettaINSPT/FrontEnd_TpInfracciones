# Sistema de Gestión de Infracciones de Tránsito Municipal — Frontend 🚦

Aplicación web cliente desarrollada en **React**, **TypeScript** y **Material UI (MUI)** para la gestión operativa de actas de infracción, padrón de vehículos/titulares, registro de descargos, cobros digitales y visualización de métricas municipales[cite: 82].

---

## 📋 Descripción General

El frontend consume la API REST del sistema implementando control de acceso por roles (`admin`, `administrativo`, `inspector`) y protección de rutas mediante JSON Web Tokens (JWT)[cite: 82].

### Módulos y Funcionalidades Principales
* **Autenticación y Seguridad:** Inicio de sesión con persistencia de token en `localStorage`, inyección automática de credenciales en peticiones HTTP y bloqueo de rutas privadas[cite: 82].
* **Panel de Control y Deudas:** Consulta en tiempo real de deuda exigible por patente o consolidada por titular, junto con estadísticas de recaudación y estado de actas[cite: 82].
* **Gestión de Infracciones:** Listado paginado y con filtros, labrado de nuevas actas (inspectores), carga de descargos y anulaciones fundamentadas[cite: 82].
* **Padrón de Titulares y Vehículos:** Administración de personas físicas/jurídicas y asociación de rodados[cite: 82].
* **Cobros Online:** Registro y consulta de pagos digitales (`tarjeta` / `billetera_virtual`)[cite: 82].

---

## 🛠️ Stack Tecnológico

* **Core:** React 18+ con TypeScript
* **Bundler / Dev Server:** Vite
* **Interfaz Visual:** Material UI (`@mui/material`, `@mui/icons-material`)[cite: 82]
* **Enrutamiento:** React Router DOM
* **Cliente HTTP:** Axios (con interceptores de request/response)[cite: 87]
* **Testing:** Vitest + React Testing Library + jsdom[cite: 82, 84]
* **Calidad de Código:** ESLint + Prettier[cite: 87]

---

## 📁 Estructura del Proyecto (`src/`)

```text
src/
├── components/   # Componentes de UI reutilizables (Layout, RequireAuth, tablas, modales)[cite: 87]
├── routes/       # Vistas/páginas asociadas a cada ruta[cite: 87]
├── hooks/        # Custom hooks (useFetch, useAuth)[cite: 87]
├── services/     # Cliente Axios configurado y servicios por entidad[cite: 87]
├── constants/    # Constantes globales, roles y estados de actas[cite: 87]
├── configs/      # Configuración de tema global de Material UI[cite: 87]
├── styles/       # Estilos CSS globales[cite: 87]
├── utils/        # Funciones auxiliares sin estado[cite: 87]
├── App.tsx       # Definición de rutas y proveedores globales[cite: 87]
└── main.tsx      # Punto de entrada[cite: 87]