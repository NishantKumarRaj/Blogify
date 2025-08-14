require('dotenv').config()
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const Blog=require("./models/blog")

const UserRouter = require("./routes/user");
const BlogRouter = require("./routes/blog");
const { checkForAuthenticationCookie } = require("./middleware/authenticaton");

const app = express();
const PORT = process.env.PORT || 8001;

mongoose
  // .connect("mongodb://localhost:27017/blogify")
  // .connect(process.env.MONGO_URL)
  .connect("mongodb+srv://nishantkrraj111:PFV9blriwonJui5y@cluster0.aycmnnn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then((e) => console.log("MongoDB Connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.use(express.static(path.resolve("./Public")));

app.get("/", async (req, res) => {
  const allBlogs=await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs:allBlogs,
  });
});

app.use("/user", UserRouter);
app.use("/blog", BlogRouter);


app.listen(PORT, () => console.log(`Server is Started at PORT:${PORT} `));
