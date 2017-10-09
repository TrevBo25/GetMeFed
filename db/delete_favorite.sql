DELETE FROM favorites
WHERE name = $1 AND userid = $2;