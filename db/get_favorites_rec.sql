SELECT *
FROM favorites
WHERE userid = $1 AND type = 'recipe';