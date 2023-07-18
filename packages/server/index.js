const express = require("express");
const cors = require("cors");
const PORT = 8080;
const routes = require("./src/routers/index");
const db = require("./src/database/db_connection.js");

const app = express();
app.use(cors());
// var allowedOrigins = ['http://localhost:3000',
//                       'http://127.0.0.1:3000'];
//                       app.use(cors({
//   origin: function(origin, callback){
//     // allow requests with no origin
//     // (like mobile apps or curl requests)
//     if(!origin) return callback(null, true);
//     if(allowedOrigins.indexOf(origin) === -1){
//       var msg = 'The CORS policy for this site does not ' +
//                 'allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   }
// }));

app.use(express.json());
routes(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
