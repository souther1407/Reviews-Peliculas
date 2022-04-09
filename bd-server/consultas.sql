SELECT * FROM categories;

SELECT * FROM movies;

SELECT * FROM movies
INNER JOIN directors ON "directorId" = directors.id
INNER JOIN categories ON 

SELECT * FROM categories_movies_belongs
INNER JOIN movies ON "movieId" = movies.id
INNER JOIN categories ON "categoryId" = categories.id


SELECT movies.id,movies.title,movies.year,movies.description,movies.img,COUNT(*) AS totalReviews FROM reviews
INNER JOIN movies ON movies.id = "movieId"
GROUP BY movies.id
ORDER BY totalReviews DESC;

SELECT movies.*,COUNT(*) AS totalReviews FROM reviews
INNER JOIN movies ON movies.id = "movieId"
GROUP BY movies.id
ORDER BY totalReviews DESC;

