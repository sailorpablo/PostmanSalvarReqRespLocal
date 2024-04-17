date = new Date();

let year = date.getFullYear(),
month = date.getMonth() + 1, 
day = date.getDate(),
hour = date.getHours(),
minutes = date.getMinutes(),
seconds = date.getSeconds();


let dataAgora =  day + '-'+ month + '-' + year;

const express = require('express'),
  app = express(),
  fs = require('fs'),
  shell = require('shelljs'),

   // Modify the folder path in which responses need to be stored
  folderPath = './Responses/',
  folderPathReq = folderPath + dataAgora +'/'
  defaultFileExtension = 'json', // Change the default file extension
  bodyParser = require('body-parser'),
  DEFAULT_MODE = 'writeFile', // appendFile ou writeFile
  path = require('path');






// Create the folder path in case it doesn't exist
shell.mkdir('-p', folderPath);
shell.mkdir('-p', folderPathReq);

 // Change the limits according to your response size
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); 

app.get('/', (req, res) => res.send('Hello, I write data to file. Send them requests!'));

app.post('/write', (req, res) => {

  const d = new Date();    

  let extension = req.body.fileExtension || defaultFileExtension,
      fsMode = req.body.mode || DEFAULT_MODE,
      uniqueIdentifier = req.body.uniqueIdentifier ? typeof req.body.uniqueIdentifier === 'boolean' ? Date.now() : req.body.uniqueIdentifier : false,
      filename = `${req.body.requestName}${uniqueIdentifier || ''}`,
      filePath = `${path.join(folderPathReq, filename)}.${extension}`,
      options = req.body.options || undefined;
      hour = d.getHours(),
      minutes = d.getMinutes(),
      seconds = d.getSeconds(),

  console.log('OK ' + hour + ':'+ minutes + ':' + seconds)


  fs[fsMode](filePath, req.body.responseData, options, (err) => {
    if (err) {
      console.log(err);
      res.send('Error');
    }
    else {
      res.send('Success');
    }
  });
});

app.listen(3000, () => {
  console.log('Aplicativo de captura de requests/responses rodando, pode da-le!');
  console.log(`Dados estão sendo salvos na pasta: ${path.join(process.cwd(), folderPath)}`);
});