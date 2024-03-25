// Taken the problem statement from the 100xDevs course

const { dir } = require('console');
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const router = express.Router();

const port = process.env.port || 5500;

/* 
    1. GET / files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files 
*/

app.get('/:dir', (req, res) => {
    try {
        const dataDir = path.join(__dirname, '..', req.params.dir);
        const filenames = fs.readdirSync(dataDir);
        res.send('Files in data directory:' + filenames);
    } catch (err) {
        console.error(err)
        res.status(404).send("Error!")
    }
    
})

/* 
2. GET / file /: filename - Returns content of given file by name
Description: Use the filename from the request path parameter to read the file from `./files/` directory
Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found.Should return `File not found` as text if file is not found
Example: GET http://localhost:3000/file/example.txt 
*/

app.get('/:dir/:filename', (req, res) => {
    try {
        const fileDir = path.join(__dirname, '..', req.params.dir, req.params.filename);
        // console.log(fileDir);
        fs.readFile(fileDir, 'utf8', (err, data) => {
            if(err) {
                res.status(404).send("Error!")
            }
            res.send(data);
        })

    } catch (err) {
        console.error(err)
        res.status(404).send("Error!")
    }

})

app.listen(port, () => {
    console.log("Listening on port" + port);
});

module.exports = app;