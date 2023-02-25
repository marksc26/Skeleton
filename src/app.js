const express = require('express')

const responseHandlers = require('./utils/handleResponses')
const db = require('./utils/database')
const initModels = require('./models/initModels')


const userRouter = require('./users/users.router')
const authRouter = require('./auth/auth.router')

const app = express()

const configs = require("../../clone-chat-APi/config").api

app.use(express.json())

db.authenticate()
    .then(() => console.log('Database authenticated'))
    .catch(err => console.log(err))

db.sync()
    .then(() => console.log('Database Synced'))
    .catch(err => console.log(err))

initModels()

app.get('/', (req, res) => {
    responseHandlers.success({
        res,
        status: 200,
        message: 'Servidor inicializado correctamente',
        data: {
            "users": `${configs.host}/api/v1/users`,
            
        }
    })
})



app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)
git

//? Esta debe ser la ultima ruta en mi app
app.use('*', (req, res)=> {
    responseHandlers.error({
        res,
        status: 404,
        message: `URL not found, please try with ${configs.host}`,
    })
})

app.listen(configs.port,() => {
    console.log('Server started at port 9000')
})
