const express = require("express");
const morgan = require("morgan");
const app = express();

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/tasksRoutes');

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(express.json());
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use("/api/tasks", taskRoutes)
app.use("/api/auth", authRoutes)

app.all("*", (req, res, next) => {
    next(new Error("Can't find url on this server!"));
});

module.exports = app;
