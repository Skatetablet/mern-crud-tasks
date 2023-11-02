import {createPool} from "mysql2/promise"

export const pool = createPool({
    host: "mern-tasks.c0emjvov8z5u.us-east-2.rds.amazonaws.com",
    port: 3306,
    user: "admin",
    password: "L3chonpachon!",
    database: "tasks"
});

export default pool;