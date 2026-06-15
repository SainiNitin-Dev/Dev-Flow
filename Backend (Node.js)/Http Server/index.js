const http = require('http');
const os = require('os');
const fs = require('fs');

const server = http.createServer((req,res) => {
    const log = '${Date.now()}: ${req.url}: Request Recieved\n'
        fs.appendFile("log.txt" , log , (err,data) => {
            switch (req.url) {
                case  '/':
                    res.end("Homepage");
                    break;
                case '/about':
                    res.end("About Page");
                    break;
                default:
                    res.end("Error")
                    console.log(os.cpus.length);
                    break;
            }
        })
})

server.listen(8000,(err,data) => {
    if (err) throw err;
    console.log("Server is running")
})
