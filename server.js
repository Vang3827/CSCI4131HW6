//imports
const express = require("express");

//basic configuration
const app = express()
app.set("view engine", "pug")
app.set("views", "templates")

app.use("/res",express.static("imagesEtc"))

//callbacks
app.get("/", (req, res) => {
    res.render("home")
})

//start the server
const port = 2024
app.listen(port, ()=>{
    console.log(`server running my guy. http://localhost:${port}`)
})