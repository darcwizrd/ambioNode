const express = require('express');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `${__dirname}/../files`);
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}.wav`);
  },
});

const upload = multer({ storage });

const app = express();

const staticFileHandler = require('./handlers/staticFiles.js');
const jsonHandler = require('./handlers/json.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

app.use((req, res, next) => {
  next();
});

app.use(express.static('client'));

app.get('/', (req, res) => {
  res.sendFile(path.join(staticFileHandler.getIndex()));
});

app.post('/getBeyondVerbal', upload.single('test'), (req, res, next) => {
  jsonHandler.getBeyondVerbal(req, res);
});

app.use((req, res) => {
  res.send('404, not found');
});

app.listen(port, () => {
  console.log(`Example app listening on port: ${port}!`);
});


