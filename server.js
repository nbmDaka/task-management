const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE;
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((con) => {
        console.log("DB connection successful");
    });

const port = process.env.PORT || 4123;
app.listen(port, () => {
    console.log(`App is running on port ${port}...`);
});