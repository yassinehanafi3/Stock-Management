const express = require("express");
const db = require("./src/models");
const path = require("path");
const passport = require("passport");


const app = express();
app.use("/static",express.static(path.join(__dirname,"src","static")));
app.use(passport.initialize());

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