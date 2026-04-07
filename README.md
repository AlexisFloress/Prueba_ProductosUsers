# Gestión de Productos — Full Stack

Aplicación web full stack con autenticación JWT, gestión de productos y control de roles.

## Tecnologías

- **Backend:** .NET 10, Entity Framework Core, SQL Server
- **Frontend:** React 19, TypeScript, Vite

---

## Requisitos previos

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) v18 o superior
- [SQL Server](https://www.microsoft.com/sql-server) o SQL Server Express
- [SQL Server Management Studio](https://learn.microsoft.com/sql/ssms/download-sql-server-management-studio-ssms) (opcional pero recomendado)

---

## Configuración del Backend

### 1. Crear la base de datos

Abrí SQL Server Management Studio y ejecutá el script que está en: "DataBaseQuery\SQLQuery1.sql"

### 2. Configurar la cadena de conexión

Abrí el archivo `backend/ProductosApi/appsettings.json` y editá la cadena de conexión con tus datos:
```json
"ConnectionStrings": {
  "DefaultConnection": "Server=TU_SERVIDOR;Database=ProductosDb;Trusted_Connection=True;TrustServerCertificate=True;"
}
```

Reemplazá `TU_SERVIDOR` por el nombre de tu instancia de SQL Server. Ejemplos comunes:
- Si usás SQL Server local: `Server=localhost`
- Si usás una instancia con nombre: `Server=localhost\SQLEXPRESS`

### 3. Levantar el backend

Abrí el proyecto en Visual Studio y presioná `F5`, o desde la terminal:
```bash
cd backend/ProductosApi
dotnet run
```

La API va a quedar corriendo en una URL similar a `https://localhost:7289`.
Podés verificar los endpoints en `https://localhost:7289/swagger/index.html`.

---

## Configuración del Frontend

### 1. Configurar la URL de la API

Abrí el archivo `frontend/src/services/api.ts` y reemplazá la URL con la de tu backend:
```typescript
const api = axios.create({
  baseURL: 'https://localhost:TU_PUERTO/api'
})
```

El puerto lo encontrás cuando levantás el backend en Visual Studio — aparece en la barra del navegador o en la consola.

### 2. Instalar dependencias
```bash
cd frontend
npm install
```

### 3. Levantar el frontend
```bash
npm run dev
```

El frontend va a quedar disponible en `http://localhost:5173`.

---
### Nota sobre el puerto del backend

Si tu backend corre en un puerto diferente al del proyecto original, tenés que actualizarlo en dos archivos:

**1. `FrontEnd_productosUser/src/services/api.ts`**
```typescript
const api = axios.create({
  baseURL: 'https://localhost:TU_PUERTO/api' // cambiá TU_PUERTO
})
```

**2. `FrontEnd_productosUser/vite.config.ts`**
```typescript
server: {
  proxy: {
    '/api': 'https://localhost:TU_PUERTO' // cambiá TU_PUERTO
  }
}
```

El puerto lo encontrás cuando levantás el backend en Visual Studio — aparece en la consola o en la barra del navegador al abrirse Swagger. Normalmente es algo como `7289`, `5001` o `5000`.

## Uso de la aplicación

1. Abrí `http://localhost:5173` en el navegador
2. Hacé click en **Registrate** para crear un usuario nuevo
3. Iniciá sesión con el email y contraseña registrados
4. Una vez autenticado podés listar, crear, editar y eliminar productos

## Roles disponibles

| Rol | Descripción |
|-----|-------------|
| `user` | Acceso a gestión de productos |
| `admin` | Acceso completo |

---

## Estructura del proyecto