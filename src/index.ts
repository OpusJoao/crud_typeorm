import express, { Request, Response } from 'express'
import { AppDataSource } from './data-source'
import routes from './routes'

AppDataSource.initialize()
.then(()=>{
    console.log('[1/2][Database] database connected')
    const app = express()
    app.use(express.json())
    app.use(routes)
    return app.listen(process.env.APP_PORT, () => {
        console.log(`[2/2][Server] app initialized succesfuly on PORT ${process.env.APP_PORT}`)
    })
})
.catch( e => {
    console.log('[1/2s][Database] error while trying to connect database', e?.message)
})