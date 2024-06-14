export enum UserQueries {
    INSERT_INTO_USER =  'INSERT INTO users (username, email, role) VALUES ($1, $2, $3);'  ,
    GET_USER_BY_ID = 'SELECT * FROM users WHERE id = $1;' ,
    GET_ALL_USERS = 'SELECT * from users;'
}

export enum ItemQueries {
    INSERT_INTO_ITEMS = 'INSERT INTO items (name, price, quantity) VALUES ($1, $2, $3);', 
    GET_ITEM_BY_ID = 'SELECT * FROM items WHERE id = $1;',
    GET_ALL_ITEMS = 'SELECT * from items;',
    REMOVE_ITEM_BY_ID = 'DELETE FROM items WHERE id = $1;',
    UPDATE_ITEM_BY_ID = `UPDATE items SET name = $1, price = $2, quantity = $3 WHERE id = $4;`,
    UPDATE_ITEM_DECREASE_INVENTORY = `UPDATE items SET quantity = quantity - $1 WHERE id = $2`
}
