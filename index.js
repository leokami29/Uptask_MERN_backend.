import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import conectarDB from './config/db.js'
import usuarioRoutes from './routes/usuarioRoute.js'
import proyectoRoute from './routes/proyectoRoute.js'
import tareaRoutes from './routes/tareaRoutes.js'

const app = express()
app.use(express.json())

dotenv.config()

conectarDB();

//Configurar cors
const whitelist = [process.env.FRONTED_URL]

const corsOptions = {
    origin: function (origin, callback){
        if (whitelist.includes(origin)) {
            //Puede consultar la api
            callback (null, true)
        }else {
            //No esta permitido
            callback ( new Error('Error de Cros'))
        }
    }
}

app.use(cors({origin:"*"}))

//Routing
app.use('/api/usuarios', usuarioRoutes)
app.use('/api/proyectos', proyectoRoute)
app.use('/api/tareas', tareaRoutes)

const PORT = process.env.PORT || 4000;

const servidor = app.listen(PORT, () => {
    console.log(`Servidor Corriendo en le puerto ${PORT}`)
})

//socket io
import { Server, Socket } from 'socket.io'

const io = new Server(servidor, {
    pingTimeout:60000,
    cors:{
        origin: process.env.FRONTED_URL,
    }
})

io.on('connection', (socket) => {
    // console.log('conectado a socket.io')   

    //Definir los eventos de socket io
    socket.on('abrir proyecto', (proyecto) => {
        socket.join(proyecto)
    })

    socket.on('nueva tarea', (tarea) => {
        // const proyecto = tarea.proyecto
        socket.to(tarea.proyecto).emit('tarea agregada', tarea)
    })

    socket.on('eliminar tarea', tarea => {
         const proyecto = tarea.proyecto
        socket.to(proyecto).emit('tarea eliminada', tarea)
    })

    socket.on('actualizar tarea', (tarea) => {
        const proyecto = tarea.proyecto._id
        socket.to(proyecto).emit('tarea actualizada', tarea)
    })

    socket.on('cambiar estado', (tarea) => {
         const proyecto = tarea.proyecto._id
         socket.to(proyecto).emit('nuevo estado', tarea)
    })
})