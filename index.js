const express = require('express')
const mongoose = require('mongoose');
const path = require("path");
const User = require('./models/User')
const Review = require('./models/Review')
var cors = require('cors')

const app = express()
app.use(cors())

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

let cart = []
let userReviews = []
const stores = [
  { name: "C. T. Pundole & Sons", lat: 18.512422546418026, lng:73.87870023765875, address: "67, M.G.Road, Pune,<br>Maharashtra, 411001<br>India" },
  { name: "Rolex Boutique - Khimji Watches", lat: 19.065877728378922, lng: 72.86686712428545, address: "UNIT 01-03B, Elevated Ground Floor , C 64, G Block BKC, Jio World Center JWC, JIO Trade Centre Road Jio World Center JWC<br<Mumbai, Maharashtra, 400051<br>India"},
  { name: "Rolex Boutique - Time Avenue", lat: 19.05965819568778, lng: 72.83496171079277, address: "189 Turner Road, Next to Popleys Gold Plaza, Bandra<br>Mumbai, Maharashtra, 400050<br>India"},
  { name: "Rolex Boutique - Simone Ventures Pvt Ltd", lat: 18.957387442832395, lng: 72.81252841449185, address: "Zaveri House, Shop No 1 Hughes Road, Zaveri House<br>Mumbai, Maharashtra, 400007<br>India"},
  { name: "Dia", lat: 18.921876212791826, lng: 72.8332135242816, address: "The Heritage Wing, The Taj Mahal Palace & Tower Hotel, Apollo Bunder<br>Mumbai, Maharashtra, 400001<br>India" },
];

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

app.get('/cart', (req, res)=>{
  res.render('cart', { cart });
})

app.get('/submit-review', (req, res)=>{
  res.render(__dirname+'/review.html')
})

app.get('/find-store', (req, res) => {
  res.render('find-store', { stores });
});

app.get('/payment', (req, res) => {
  res.render('payment', { cart });  // Render the payment.ejs page
});

app.get('/about-rolex', async (req, res) => {
  try {
    const data = await Review.find({}); // Get all reviews from the collection
    for (let i = 0; i < data.length; i++) {
      const { user, title, body } = data[i];
      const review = {
          user: user,
          title: title,
          body: body
      }
      userReviews.push(review)
    }
    res.render('about-rolex', { userReviews })

  } catch (err) {
    console.error('Error fetching reviews:', err);
  }
})

app.listen(3000, ()=>{
  console.log("App listening on port 3000...")
})

// API Encdpoints
app.get('/api/stores', (req, res) => {
  res.json(stores);
});

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

app.post('/api/addtocart', async (req, res) => {
  try {
      var data = req.body
      cart.push(data)
      res.render('cart', { cart });
  } catch (error){
      res.status(400).json({ error: error.message });
  }
})

app.post('/api/removefromcart', async (req, res) => {
  try {
      var name = req.body.name
      console.log(name)
      cart = cart.filter(items => items.name !== name);
      res.render('cart', { cart });
  } catch (error){
      res.status(400).json({ error: error.message });
  }
})

app.post('/api/createreview', async (req, res) => {
  try{
      console.log(req.body)
      const { user, title, body } = req.body;
      const newReview = new Review({
          user, title, body
      });
      const savedReview = await newReview.save(); 
      res.status(201).json({ message: "Review created successfully!"});
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
})

