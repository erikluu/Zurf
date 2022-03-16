//server.js
const app = require("./backend");
const port = 8000;

app.listen(process.env.PORT || port, () => {
    console.log("REST API is listening.");
});