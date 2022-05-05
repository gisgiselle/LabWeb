# Actividad: Pruebas unitarias, autenticación y persistencia en MongoDB.
Para poder visualizar la actividad correctamente se debe tener el archivo `.env`, así como haber realizado el comando `npm i` y `npm run start`

En estos archivos se realizan las siguientes actividades:
1. Test unitarios para 
  - obtener el listado de bicicletas, agregar una bicicleta
  -  Crear una bicicleta, listar todas las bicicletas, añadir bicicleta, encontrar bici por código, eliminar bicicleta.
  -  Que un usuario reserve una bicicleta.
Para realizar las pruebas se debe escribir el comando `npm run mochatest` y se debe asegurar que Mocha haya sido instalado previamente
2. Autenticación de dos pasos, utilizando el envío de un correo para que el usuario verifique su identidad
3. Persistencia en MongoDB donde las bicicletas, los usuarios y las reservas queden almacenadas en la DB. 
Se utilizó la página https://www.coderrocketfuel.com/article/store-mongodb-credentials-as-environment-variables-in-nodejs para
la realización del archivo .env con MongoDB 
