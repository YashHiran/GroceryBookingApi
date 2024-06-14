export enum UserQueries {
    INSERT_INTO_USER =  'INSERT INTO users (username, email, role) VALUES ($1, $2, $3);'  ,
    GET_USER_BY_ID = 'SELECT * FROM users WHERE id = $1;' ,
    GET_ALL_USERS = 'SELECT * from users;'
}
