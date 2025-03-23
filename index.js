const express = require('express')
const mongoose = require('mongoose');
const path = require("path");
const User = require('./models/User')

const app = express()

mongoose.connect("mongodb://127.0.0.1:27017/foeprojects", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000, // 10 seconds timeout
})
.then(() => console.log("MongoDB Connected!"))
.catch(err => console.error("MongoDB Connection Failed:", err));

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.engine('html', require('ejs').renderFile);

app.get('/', (req, res)=>{
    res.render(__dirname+'/home.html')
})

app.get('/login', (req, res)=>{
  res.render(__dirname+'/loginpage.html')
})

app.get('/watches', (req, res)=>{
    res.render(__dirname+'/watches.html')
})

app.get('/signup', (req, res)=>{
    res.render(__dirname+'/signup.html')
})

app.listen(3000, ()=>{
    console.log("App listening on port 3000...")
})

app.post('/api/createuser', async (req, res) => {
  try{
      console.log(req.body)
      const { fname, lname, email, password } = req.body;
      const newUser = new User({
        fname, lname, email, password
      });
      const savedUser = await newUser.save(); 
      res.status(201).json({ message: "User created successfully!", user: newUser });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
})