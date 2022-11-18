# **Requisitos del proyecto** 💻

> El proyecto comprende en un reto de la creación de una API con NodeJS, Express, Firebase y MySQL. Por ello para poder ejecutar el proyecto se debe de tener instalado ***[Node.js](https://nodejs.org/) v16 +***, de igual manera para la base de datos en este caso esta en un contenedor por lo que necesitarás ***[Docker](https://docs.docker.com/get-docker/)*** y para poder autenticarse se utiliza el servicio de ***[Firebase](https://firebase.google.com/)***. Una ves que tengas todos estos requisitos procedemos a seguir los siguientes pasos para la ejecución del proyecto.

## ***Clonar proyecto*** 🛡️

Lo primero que se debe de hacer es descarga el repositorio o clonarlo con la siguiente linea:

```bash
git clone https://github.com/CharlesVP15/challenge-backend.git
```

Una ves clonado procedemos a entrar a la carpeta del proyecto y ejecutamos los siguientes comandos:

```bash
cd challenge-backend
npm install
```

## ***Generar la Base de Datos*** 🎖️

Antes de generar la base de datos es necesario colocar nuestras propias credenciales, para ello se deben de cambiar los siguientes archivos:

```properties
docker-compose.yml

> MYSQL_DATABASE: 'coursesdb'
> MYSQL_USER: 'dev'
> MYSQL_PASSWORD: 'mypassdev'
> MYSQL_ROOT_PASSWORD: 'devchallenge'
```

Luego de ello generamos la base de datos del contener de docker con el comando:

```bash
docker compose up -d
```

La ***-d*** para que se mantenga escuchando la instancia del contenedor. </br>
Si todo se ejecutó de manera correcta la base de datos se creará de manera automática. Recordando que **coursesdb** es la principal y **testdb** es la que se usará para correr los test, y así evitar la modificación de datos innecesarios en la DB original. </br>

En tal caso de mantener las credenciales por defecto, serán las siguientes:

```properties
User root:
> username: root
> password: devchallenge

Other user:
> username: dev
> password: mypassdev
```

## ***Variables de entorno*** 💯

Una ves configurado todos los pasos anteriores, se procede a configurar las variables de entorno del todo el proyecto:

```properties
Variables de la conexión de la DB
> DB_HOST=localhost
> DB_PORT=3306
> DB_NAME=coursesdb
> DB_USER=root
> DB_PASSWORD=devchallenge

Variable para el cambio de DB para los test
> NODE_ENV=
```

## ***Firebase*** 🔥

Para poder usar el servicio de autenticación de firebase se debe de generar las credenciales desde la pagina oficial, el cual arrojará un archivo *[JSON](./firebaseCredentials.example.json)*, con los datos necesarios de permisos de conexión.

## ***Ejecutar el proyecto*** 🚧

Una ves culminada todos los pasos anteriores para correr el proyecto se debe de ejecutar el siguiente comando:

```bash
npm run dev
```

El cual ejecutar el proyecto en el puerto ***4000***, siendo accesible a traves del navegador con *[http://localhost:4000]*

Y en tal caso quisieramos correr los test, lo ejecutamos con el comando:

```bash
npm run test
```

Y el archivo *[peticiones.http](./peticiones.http)* es el que contiene los query para probar cada uno de los endpoints del proyecto.

## ***Tomar en cuenta*** 👀

- ***NOTA #1:*** En cada petición del archivo ***[.http](./peticiones.http)*** o de los *test*, se deberá de copiar el ID del estudainte por lo que ese será la relación entre tablas.

- ***NOTA #2:*** Las credenciales declaradas dentro del ***[README](./README.md)*** son las originales, pero si lo desean en producción deben de agregarles sus propias credenciales y no divulgarlas.

- ***NOTA #3:*** Si lo desean mejorar no hay problema, estaré al pendiente ante algún cambio que se realice.

## ***Errores o bugs no resueltos*** 🤯❌

***BUG #1:*** *La sintaxis de verificación según la documentación está correcta, pero no se sabe del porque el error. Por ello cada ruta tiene comentado el middleware de protección.*

```json
{
   "errorInfo": {
      "code": "auth/argument-error",
      "message": "Decoding Firebase ID token failed. Make sure you passed the entire string JWT which represents an ID token. See https://firebase.google.com/docs/auth/admin/verify-id-tokens for details on how to retrieve an ID token."
   },
   "codePrefix": "auth"
}
```

## License

**Código Libre, CharlsDEV!**
