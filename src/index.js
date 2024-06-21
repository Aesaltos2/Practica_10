import express from 'express'
import { PORT } from './config/config.js'
import { createUser, deleteById, getAll, updateUsers } from './controller.js'

const app = express()
app.use(express.json())

app.post('/usuarios', createUser)
app.get('/usuarios', getAll)
app.delete('/usuarios/:id', deleteById)
app.put('/usuarios/:id', updateUsers)

app.listen(PORT, () => console.log(`Servidor ejecutandose http://localhost:${PORT}`))
