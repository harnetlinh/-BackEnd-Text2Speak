const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();
const routes = require("./routes/routes.js");
var path = require('path');
const app = express();
app.use('/mp3',express.static(path.join(__dirname, 'public')));
// const corsList = {
//     origin: "http://localhost:8080" //url được phép call API
// };
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
//app.use(dotenv);
app.use("/",routes);

app.listen(process.env.PORT,() =>{
    console.log("Server Is Running " + process.env.PORT);
  //  console.log(process.env.PORT);
})