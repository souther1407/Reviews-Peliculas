SELECT * FROM categories;

SELECT * FROM movies;

SELECT * FROM movies
INNER JOIN directors ON "directorId" = directors.id
INNER JOIN categories ON 

SELECT * FROM categories_movies_belongs
INNER JOIN movies ON "movieId" = movies.id
INNER JOIN categories ON "categoryId" = categories.id