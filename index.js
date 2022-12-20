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

app.use(cors(corsOptions))

//Routing
app.use('/api/usuarios', usuarioRoutes)
app.use('/api/proyectos', proyectoRoute)
app.use('/api/tareas', tareaRoutes)

const PORT = process.env.PORT || 4100;

app.listen(PORT, () => {
    console.log(`Servidor Corriendo en le puerto ${PORT}`)
})