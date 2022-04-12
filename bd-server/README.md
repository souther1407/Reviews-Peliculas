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

### directores

permite agregar  directores de las películas (mas adelante borrar y cambiar :D)

- ><span name="POST" style="color:blueviolet">POST</span> /director/add
    <p>agrega un nuevo director</p>
    recibe: `{
                "name":"Ignacio",
                "lastName:"Lestrada"
            }`<br>
    devuelve: status 201 `{ success: true, { id: 1, "name": "Ignacio", "lastName: "Lestrada" } }`<br>
    error: status 400 `{error...}`<br>


### peliculas

permite leer y agragar nuevas películas,(mas adelante borrar y cambiar :D)


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