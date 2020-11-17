const http = require("http");
const app = require("./app");

const port = process.env.PORT || 3000;
const host = '0.0.0.0';

const server = http.createServer(app);

server.listen(port,host,()=>{
    console.log(`Server is running at port ${port}`);
});
