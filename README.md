# Next.js Teslo-Shop app
Para correr localmente se necesita la base de datos

docker-compose up -d

* El -d, significa __detached__

MongoDB URL Local:

mongodb://localhost:27017/entriesdb

#configurar las variables de entorno
Renombrar el archivo __.env.template__a__.env__

#Llenar la base de datos con informacion de prueba usando la siguiente ruta

http://localhost:3000/api/seed

Usar npm install