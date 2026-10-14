import mysql from "mysql2"
import dotenv from "dotenv";
dotenv.config();

const connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : process.env.Database_Password,
    database : process.env.Database_Name
});

const connectt = connection.connect();//this does not return a promise, so we cannot use await here. It will return an error if the connection fails, otherwise it will return undefined.
if(!connectt){//that's why when !connectt is true, it means the connection was successful, and when it's false, it means the connection failed.
    console.log("Database connected successfully");
}
if(connectt){
    console.log("Database connection failed");
}
export default connection;