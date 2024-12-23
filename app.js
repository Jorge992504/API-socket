import express ,{request} from "express";
import routers from "./routes/routes.js";
import socket from "./ServerS/server_socket.js";
const app = express()



app.use(express.json())
app.use(routers)

app.listen(2000, ()=>{
    console.log('')
    console.log('|--------------------------------|')
    console.log('| API rodando na porta 2000      |')
    console.log('|--------------------------------|')
    console.log('')
});

socket();