// Importar express
const express = require("express");
// hacer una instancia de express
const db = require("./utils/database");
const ToDos = require("./models/toDos.model");
require('dotenv').config();

ToDos; //ejecutar el modelo (tabla)

const PORT = process.env.PORT ?? 8000;

db.authenticate()
  .then(() => {
    console.log("base conectada");
  })
  .catch((error) => console.log(error));

db.sync().then(() => console.log("base sincronizada"));

const app = express();
app.use(express.json());


// CREATE
app.post('/todos', async (req, res) => {
  try {
    // obtener la info del body la toDo
    const newToDo = req.body;
    // crear con la info obtenido
    const todo = await ToDos.create(newToDo);
    //responder la realizacion de la accion
    res.status(201).send();
  } catch (error) {
    res.status(400).json(error);
  }
});

//READ - all toDos
app.get('/todos', async(req, res) =>{
    try {
        //buscar  all toDos
        const todos = await ToDos.findAll({
            attributes: ['id', 'title', 'description']
        });
        res.json(todos);
    } catch (error) {
        res.status(400).json(error);
    }
});

// toDo by id
app.get('/todos/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const todoById = await ToDos.findByPk(id)
        res.json(todoById);
    } catch (error) {
        res.status(400).json(error);
    }
});

// UPDATE
app.put('/todos/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const toDoInfo = req.body;
        const todo = await ToDos.update(toDoInfo, {
            where: {id},
        })
        res.status(204).json(todo);
    } catch (error) {
        res.status(400).json(error);
    }
});

//DELETE
app.delete('/todos/:id', async (req, res) => {
    try {
        const {id} = req.params;
        await ToDos.destroy({
            where: {id}
        });
        res.status(204).send();
    } catch (error) {
        res.status(400).json(error);
    }
});

app.get("/", (req, res) => {
  try {
    res.send("Bienvendido a mi server ");
  } catch (error) {}
});

app.listen(PORT, () => {
  console.log(`server listen in port ${PORT}`);
});
