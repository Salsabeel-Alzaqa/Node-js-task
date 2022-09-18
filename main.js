'use strict';
let http = require('http');
const inputFile = '/Users/User/users.csv';
const fs = require('fs');
const { parse } = require('csv-parse');
var users = []; 
var bufferString; 
function readJsonFile(){
    let filej = fs.readFileSync('/Users/User/users.json');
    let output = JSON.parse(filej);
    console.log(output);
}
function saveToFile(){
    const jsonContent = JSON.stringify(users);
    fs.writeFile('/Users/User/users.json', jsonContent, 'utf8', function (err)
    {
    if (err){
        return console.log(err);
    }
    console.log("The file was saved!");
}); 
}
function readCSV() {
    try {
        fs.createReadStream(inputFile).pipe(parse({ delimiter: ',', from_line: 2 })).on('data', (data) => {
        // it will start from 2nd row
        bufferString = data.toString(); 
        users.push(bufferString.split('\n')); 
        saveToFile(users);
    })
} catch (err) {
    console.log(err);
  }
}
readCSV();
readJsonFile();
http.createServer(function (req, res) {
    res.write("thanks"); //write a response to the client
    res.end(); //end the response
  }).listen(8080);
