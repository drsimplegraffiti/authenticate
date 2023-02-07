const app = require("./app");

// declare our port
const port = process.env.PORT;

//listen to express server
app.listen(port, () => {
  console.log("app is running on http://localhost:" + port);
  console.log(process.env.NODE_ENV);
});
