
# Proyecto: DIVIDILO - Aplicaciones Interactivas UADE - 2do cuatrimestre 2024

Este proyecto es una aplicación web desarrollada utilizando **React** para el cliente y **Node.js** para el servidor. Podes usar esta guía para configurar y ejecutar.

---

## Requisitos previos

Asegurate de tener instalados los siguientes programas en tu sistema:

- [Node.js](https://nodejs.org/) (v16 o superior)
- [npm](https://www.npmjs.com/) (v8 o superior)
- [Git](https://git-scm.com/)

---

## Configuración del proyecto

1. **Clona este repositorio**:
   ```bash
   git clone https://github.com/agrigaliunas/frontend-api-2do-cuat-2024.git
   cd frontend-api-2do-cuat-2024
   ```

2. **Instala las dependencias para el cliente y el servidor**:
   - Cliente (React):
     ```bash
     cd client
     npm install
     ```
   - Servidor (Node.js):
     ```bash
     cd ../server
     npm install
     ```

---

## Uso del proyecto

### Paso 1: Configurar las variables de entorno

Crea un archivo `.env` en la carpeta `server` con las siguientes variables:

```env
DEV_DB_NAME='api-2024'
DEV_DB_USERNAME='root'
DEV_DB_PASSWORD='root'
DEV_DB_HOST='127.0.0.1'
DEV_DB_PORT='3306'
JWT_SECRET='beebd5d2b1ee833a8a6c3cedcb7cfeca18b78c464fb6894b77c96136acf4293d698d568d79a3417bcbce4b5fe5dd99250b0f9b6cde74122f7386c9b85f393684f117e9406e959dd0cfb0ec8c46f907e5336e45e0ab102ce94afa51fc87f2b90a411ec8ae1e01654345dc5e6bf1c90d936d77ab114a153002add630abab9302d50c4de99005f11cc80977f3a4f4302c1b32771e94acbcd74274eb2ca82e459d0255087afed91f5c6f63a1407d0a2b596334dee9e0e50549df4ff5e08c0e7c6fade5cc81207e5638093facd4de9993d29d5314ca62da4f4e8ca5e0aeecdb8306d0eaa93ccb226ae70596d956e7d2aeccf2eb08c965964fe8ae16eafc4cef32c9d7'
RESEND_API_KEY='re_S9bugLhS_K4E9u7ww7mFBe1ohFA58QTg2'
CLOUD_NAME='dxcoyqzom'
CLOUDINARY_API_KEY='596988193922628'
CLOUDINARY_SECRET='7KNrHu5fx-f3vBQ9Pti-H0aS86o'
```

Asegurate de configurar correctamente la URL de la base de datos y otros valores necesarios.

---

### Paso 2: Ejecutar el proyecto

1. **Inicia el servidor**:
   ```bash
   cd server
   npm start
   ```

   El servidor estará disponible en `http://localhost:5000`.

2. **Inicia el cliente**:
   ```bash
   cd ../client
   npm run dev
   ```

   La aplicación React estará disponible en `http://localhost:3000`.

---

## Documentación de la API

La colección de postman se encuentra en el archivo Dividilo.postman_collection.

Para ver la documentación de Swagger, dentro de la carpeta /server hay un archivo llamado dividilo-api.yaml. Descarga ese archivo y pega el contenido en https://editor.swagger.io/

---
