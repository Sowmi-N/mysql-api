import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();
var host = process.env.MYSQL_HOST;
var db = process.env.MYSQL_DB_NAME;
var username = process.env.MYSQL_USER_NAME;
var password = process.env.MYSQL_PASSWD;

const pool = mysql.createPool({
    host: host,
    user: username,
    password: password,
    database: db
}).promise(); //necessary to tell the mysql2 library to use the new promises so we can use "async await"!!

//const notes = await getNotes();
//console.log(notes);
//var onenote = await getNote(1);
//console.log("The id = 1 note is : ");
//console.log(onenote);
//var insertnote = await createNote("TEsT", "This note is test note created from the backend.");
//console.log(insertnote);
//var deletetest = await deleteNote(3);
//console.log(deletetest);


export async function getNotes() {
    const [notes] = await pool.query("SELECT * FROM notes;"); // use "destructuting" and async promise is returned
    return notes;
}

export async function getNote(id) {
    const [notes] = await pool.query(`
        SELECT *
        FROM notes
        WHERE id = ?
        `, [id]);
    return notes;
}

export async function createNote(title, content) {
    const result = await pool.query(`
        INSERT INTO notes (title, content)
        VALUES (?, ?);
    `, [title, content]);
    return result;
}

export async function deleteNote(id) {
    const result = await pool.query(`
        DELETE FROM notes
        WHERE id = ?
    `, [id]);
    return result;
}


export async function deleteNotes() {
    const result = await pool.query(`
        DELETE FROM notes;
    `);
    return result;
}

