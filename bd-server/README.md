# Back-end del proyecto

## End points

### categiories

permite agregar las categorias de las películas (mas adelante borrar y cambiar :D)


- ><span name="GET" style="color:gold">GET</span> /categories
    <p>devuelve las categorias</p>
    devuelve: status 200`[
    {
    "id": 1,
    "name": "accion"
    },
    {
    "id": 2,
    "name": "comedia"
    },...]`

- ><span name="POST" style="color:blueviolet">POST</span> /categories/add
    <p>agrega una nueva categoria</p>
    recibe: `{"name":"accion"}`<br>
    devuelve: status 201 `{"id":1,"name":"accion"}`<br>
    error: status 400 `{error...}`<br>

- ><span name="PUT" style="color:blue">PUT</span> /categories/:id
    <p>modifica el nombre de una categoria</p>
    recibe: `{"name":"accion"}`<br>
    devuelve: status 201 `{success: true, msg: "categoria modificada "}`<br>
    error: status 400 `{error...}`<br>

- ><span name="DELETE" style="color:red">DELETE</span> /categories/:id
    <p>borra una categoria por id</p>
    devuelve: status 201 `{success: true, msg: "categoria borrada con éxito"}`<br>
    error: status 400 `{error...}`<br>

### directores

permite agregar  directores de las películas (mas adelante borrar y cambiar :D)

- ><span name="GET" style="color:gold">GET</span> /directors
    <p>devuelve los directores </p>
    devuelve: status 200`[
        {
        "id": 1,
        "name": "Quentin",
        "lastName": "Tarantino"
        },
        {
        "id": 2,
        "name": "James",
        "lastName": "Cameron"
        }
    ]`


- ><span name="POST" style="color:blueviolet">POST</span> /directors/add
    <p>agrega un nuevo director</p>
    recibe: `{
                "name":"Ignacio",
                "lastName:"Lestrada"
            }`<br>
    devuelve: status 201 `{ success: true, { id: 1, "name": "Ignacio", "lastName: "Lestrada" } }`<br>
    error: status 400 `{error...}`<br>

- ><span name="PUT" style="color:blue">PUT</span> /directors/:id
    <p>modifica un director por id </p>
    recibe: `{
                "name":"Ignacio",
                "lastName:"Lestrada"
            }`<br>
    devuelve: status 201 `{success: true, msg: "director modificado con exito"}`<br>
    error: status 400 `{error...}`<br>

- ><span name="DELETE" style="color:red">DELETE</span> /directors/:id
    <p>borra un director por id </p>
    devuelve: status 201 `{success: true, msg: "director borrado"}`<br>
    error: status 400 `{error...}`<br>

### peliculas

permite leer y agragar nuevas películas, además de cambiar y eliminar


- ><span name="GET" style="color:gold">GET</span> /movies <br>

    - title : filtra por título
    - year: filtra por año
    - max: limita la cantidad de resultados
    - category: filtra por categoria

    <p>devuelve las películas con su director y sus categorias</p>

    devuelve:
    ```json
    {
    "cantidad_resultados": 1,
    "results": [
        {
            "id": 1,
            "title": "Pulp Fiction",
            "year": 1994,
            "description": "Una pelicula basada en la vida de tu hermana",
            "img": "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2016/12/pulp-fiction.jpg?itok=3YZ8ygRT",
            "directorId": 1,
            "director": {
                "id": 1,
                "name": "Quentin",
                "lastName": "Tarantino"
                },
            "categories": [
                {
                    "id": 1,
                    "name": "accion",
                    "categories_movies_belongs": {
                    "categoryId": 1,
                    "movieId": 1
                }
                },
                {
                    "id": 2,
                    "name": "comedia",
                    "categories_movies_belongs": {
                    "categoryId": 2,
                    "movieId": 1
                    }
                }
            ]
        },
        ]
    }
    ```

- ><span name="POST" style="color:blueviolet">POST</span> /movies/add
    <p>Agrega una película</p>

    recibe:
    ```json
    {
        "title":"ejemplo",
        "year":1999,
        "description":"apaa",
        "img":"http://sdas.com/apaa.png",
        "genres":["accion","suspense"],
        "director":{ //debe existir en la base
            "name":"Ignacio",
            "lastName":"Lestrada"
        }

    }
    ```

    retorna: status 201

    ```json
    {
        "id": 3,
        "title": "Bastardos sin gloria",
        "year": 2010,
        "description": "que bonito",
        "img": "https://pics.filmaffinity.com/Malditos_bastardos-687164478-large.jpg",
        "directorId": 1
    }
    ```

- ><span name="PUT" style="color:blue">PUT</span> /movies/:id
    <p>modifica una película por id</p>

    recibe:
    ```json
    {
        "title":"ejemplo",
        "year":1999,
        "description":"apaa",
        "img":"http://sdas.com/apaa.png",
        "genres":["accion","suspense"],
        "director":{ //debe existir en la base
            "name":"Ignacio",
            "lastName":"Lestrada"
        }

    }

    ```
    retorna: status 200

    ```json

        { "success": true, "msg": "pelicula modificada con éxito" }

    ```




- ><span name="DELETE" style="color:red">DELETE</span> /movies/:id
    <p>Borra una película por id</p>
    retorna:

    ```json

        { "success": true, "msg": "pelicula borrada con éxito" }

    ```

### reviews

permite agregar y obtener reviews de una pelicula (mas adelante poder borrar y modificar)


- ><span name="GET" style="color:gold">GET</span> /reviews/:idPelicula <br>

    <p>retorna las reviews asociadas al id de una película</p>

    retorna:
    ```json
    [
        {
            "id": 1,
            "score": "99",
            "content": "La mejor peli del mundo :D",
            "date_created": "2022-04-12T17:50:27.000Z",
            "movieId": 2,
            "userId": 1
        },
        {
            "id": 2,
            "score": "10",
            "content": "... Nah mentira, alta bosta",
            "date_created": "2022-04-12T17:50:27.000Z",
            "movieId": 2,
            "userId": 1
        }
    ]
    ```

- ><span name="POST" style="color:blueviolet">POST</span> /reviews/:idPelicula/add
    <p>Agrega una review a una pelicula por id</p>

    recibe:
    ```json
    {
        "score": "99",
        "content": "La mejor peli del mundo :D"

    }
    ```

    retorna: status 201

    ```json
    {
       "success": true
    }
    ```

- ><span name="PUT" style="color:blue">PUT</span> /reviews/:id
    <p>modifica una review por id</p>

    recibe:
    ```json
    {
        "score": "99",
        "content": "La mejor peli del mundo :D"

    }

    ```
    retorna: status 200

    ```json

        { "success": true}

    ```




- ><span name="DELETE" style="color:red">DELETE</span> /reviews/:id
    <p>Borra una review por id</p>
    retorna:
    ```json
        { "success": true, "msg":"pelicula borrada"}

    ```

### usuarios

Permite agragar, verificar credenciales y verificar si existen usuarios

- ><span name="POST" style="color:blueviolet">POST</span> /users/add

    <p>Agrega un nuevo usuario</p>
    
    recibe:
    ```json
    {
        "name":"lestra92",
        "password":"12345",
    }
    ```

    retorna:
    ```json
    { "success": true }
    ```

- ><span name="GET" style="color:gold">GET</span> /users/exist <br>

    <p>Verifica si un usuario existe</p>

    queries:
    - name: el nombre del usuario
    
    
    retorna: status 200
    ```json
    { "existe": true}
    ```


- ><span name="POST" style="color:blueviolet">POST</span> /users/login

    <p>Devuelve un JWT si el usuario ingreso las credenciales correctas</p>

    recibe:
    ```json
    {
        "user":"ignacio1407",
        "password":"12345"
    }
    ```

    retorna:
    ```json
    {
        "success":true,
        "token":"jfka8932uqpro25..."
    }
    ```
    error:
    ```json
    {
        "success":false
    }
    ```