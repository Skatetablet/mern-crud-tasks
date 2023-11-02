import express from "express";
import cors from "cors"
import {PORT} from "./config.js"
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import indexRoutes from './routes/index.routes.js'
import taskRoutes from "./routes/tasks.routes.js"

const app = express();
const _dirname = dirname(fileURLToPath(import.meta.url))
console.log(_dirname );
app.use(cors())
app.use(express.json())

app.use(indexRoutes)
app.use(taskRoutes)



app.use(express.static(_dirname + '/dist'))

app.listen(process.env.PORT | PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
