<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>



# Ejecutar en desarrolo
1. Clonar el repositorio
2. Ejecutar
```
npm install 
```
3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```

4. Levantar la base de dates

```
docker-compose up -d
```


5. Clonar el arvivo __.env.template__  y renombrar la copia a __.env__

6.Llenar las variables de entrono definidas

7. ejecutar la aplicacion en dev:

```
npm run start:dev
```


7. Reconstruir la base de datos con la semilla

 ```
 http://localhost:3001/api/v2/seed
 ```



## Stack Usado
* MongoDB
* Nest

