const app = require("./app");
require("dotenv").config();

const port = process.env.PORT || 3000;

app.get("/",  (req, res) => {
    res.send("hello world");
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
