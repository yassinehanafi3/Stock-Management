const express = require("express");
const db = require("./src/models");
const path = require("path");
const passport = require("passport");
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(passport.initialize());

app.set('view engine','ejs');
app.set('views',path.join(__dirname,"src","views"));
app.use("/static",express.static(path.join(__dirname,"src","static")));


require("./src/routes/client.route.js")(app);
require("./src/routes/fournisseur.route.js")(app);
require("./src/routes/admin.route.js")(app);
require("./src/routes/home.route.js")(app);
require("./src/routes/achat.route.js")(app);
require("./auth/passport.js");

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});