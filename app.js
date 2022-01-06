const express = require("express");
const db = require("./src/models");


const app = express();


require("./src/routes/client.route.js")(app);
require("./src/routes/fournisseur.route.js")(app);
require("./src/routes/admin.route.js")(app);
require("./src/routes/home.route.js")(app);
require("./src/routes/achat.route.js")(app);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});