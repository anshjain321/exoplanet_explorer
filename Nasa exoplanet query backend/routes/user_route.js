const express = require('express');
const user = express();
const multer = require('multer');
const path = require('path');
const bodyparser = require('body-parser');
user.use(bodyparser.urlencoded({extended:true}));

user.use(express.static(path.resolve(__dirname ,'../public/uploads')));

let storage = multer.diskStorage({
destination:(req ,file , cb) =>{
  cb(null,path.resolve(__dirname ,'../public/uploads'))
},
filename:(req , file , cb)=>{
cb(null ,file.originalname)
}
});

var uploads = multer({storage : storage});
const usercontrolller = require('../controller/usercontroller');
user.post('/importuser' ,uploads.single('file'),usercontrolller.importuser);
module.exports = user;