import express from 'express';
import { getNotes, getNote, createNote, deleteNote, deleteNotes } from './database.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

//app.use((err, req, res, next) => {
//  console.error(err.stack)
//  res.status(500).send('Something broke!')
//})

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.EXPRESS_PORT;
app.listen(port, function() {
    console.log("Listening....");
});

app.get('/notes', async (request, response) => {
    const notes = await getNotes()
    response.send(notes);
});

app.get('/note/:id', async (request, response) => {
    var id = request.params.id;
    const note = await getNote(id);
    response.send(note);
});    

app.post('/note/create', async (request, response) => {
    const { title, content } = request.body;
    const result = createNote(title, content);
    response.status(201).send(result);
});

app.delete('/note/delete/:id', async (request, response) => {
    var id = request.params.id;
    var result = "";
    if(id === 'all') {
        result = await deleteNotes();
    }
    else {
        result = await deleteNote(id);
    }
    response.send(result);
});
