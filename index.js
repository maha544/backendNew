require("dotenv").config();
const express = require('express');
const App = express();
App.use(express.json());
App.use('/uploads', express.static('uploads'));

const mongoose = require("mongoose");

const authroute = require('./routes/authroute');
const userroute = require('./routes/userroute')
App.use('/users' , userroute);
App.use('/auth' , authroute);
const productroutes = require('./routes/productroute');
App.use('/products' , productroutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    App.listen(process.env.PORT, () => {
      console.log(`DB is connected & your server is listening on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to DB", err);
  });

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     App.listen(process.env.PORT, (err) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(`DB is connected & your server is listening on http://localhost:${process.env.PORT}`);
//       }
//     });
// })
//   .catch((err) => {
//     console.log("error connecting to DB", err);
// });

// 4hxfedv29JaetJL8

//  mongodb+srv://sohashahid75:<db_password>@clusterhackathon.wazfp.mongodb.net/