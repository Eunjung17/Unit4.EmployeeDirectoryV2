const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => {

  `Listening on port ${PORT}...`;

  console.log(`I am listening on port ${PORT}`);
});

app.use((req, res, next) => {
  
  const token = req.header("authorization");
  
  if(token) next();
  else res.status(403).send("Please log in");

});

app.use("/api", require("./api/employees"));
