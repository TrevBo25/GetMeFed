UPDATE favorites
SET notes = $1
WHERE name = $2 AND userid = $3;