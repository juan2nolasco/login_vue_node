'use strict';

const mongoose = require('mongoose');
const app = require('../app');

/*mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/mevn-secure', { promiseLibrary: require('bluebird') })
   .then(() => console.log('connection succesful'))
   .catch((err) => console.log(err));*/
mongoose.connect('mongodb://localhost/mevn-secure', (err, res) => {
   if (err) {
      return console.log(`Error al conectar a la base de datos: ${err}`);
   }
   console.log('Conexion a la base de datos establecida ...');
   app.listen(app.get('port'), () => {
      console.log(`Listening on port ${app.get('port')}`);
   });
});





