const express = require("express");
const db = require("./models");


const app = express();


require("./routes/client.route.js")(app);
require("./routes/fournisseur.route.js")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});