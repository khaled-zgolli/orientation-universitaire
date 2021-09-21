//import B
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require('cors');

//import routes
const signup = require("./Routes/signupUser");
const login = require("./Routes/Route_login");
const forgot = require ("./Routes/Password_forgot")
const getData = require ("./Routes/Dashboard")
const affiche = require ("./Routes/profilEtud")
const visio = require ("./Routes/Visio")

//import file env
const dotenv = require("dotenv");
dotenv.config();

//MongoDB config
require("./connection/db");

const app = express();

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(cookieParser());
app.use(logger("dev"));
app.use(cors());



// user routes
app.use("/api/user", signup);
app.use("/api/userlogin", login);
app.use("/api/userforgot", forgot)
app.use("/api/data",getData)
app.use("/api/Affiche", affiche)
app.use("/api/visio", visio)

//listen //port 5000
app.listen(process.env.PORT || 4000);