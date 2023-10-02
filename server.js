import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

var db = process.env.DB_NAME;
var username = process.env.USER_NAME;
var password = process.env.PASSWD;


var conn = mysql.createConnection({ host: "db4free.net", user: username, password: password, database: db });

conn.connect((error) => {
    if(error) {
        console.log(error);
    }
    else {
        console.log("Connected!");
        //var qry = "INSERT INTO user (name, password) VALUES ('vignesh', 'vignesh123');"
        var qry = "SELECT * FROM user;";
        conn.query(qry, (error, value) => {
            if(error) {
                console.log(error);
            }
            else {
                console.log(value);
            }
        });
        // after connected we can execute queries
    }
});

