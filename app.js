
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require("lodash");
const mongoose = require("mongoose");


const homeStartingContent = "A blog, also known as weblog, is a type of website that is like a diary or journal. Blog organizes content in the form of categories and posts. Posts on a blog are presented in reverse chronological order. That means your latest post goes to the top of the page. That way, when you make a new post, it will come first and the first post will go below it.";
const aboutContent = "Hey, This is Shagun Kumar Gauttam. I am pursuing third year B.Tech. in the department of computer science and engineering, from SKIT collage.I am a person with a lot of enthusiasm to learn new things and I follow the motto “Live Life to the Fullest”. I mainly believe that hard work really matters in our progress.I created this Blog website so that people share their thoughts about their interested topics..";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
mongoose.connect('mongodb://localhost:27017/blogDB', {useNewUrlParser: true});

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
 app.use(express.static("public"));

const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Post = mongoose.model('Post', postSchema);

app.get("/",function(req,res){

 Post.find({}, function(err, posts){

    res.render("home", { name: homeStartingContent, posts: posts  });
  })
 
});


app.get("/about",function(req,res){
  res.render("about",{about: aboutContent});
 });
 app.get("/contact",function(req,res){
  res.render("contact",{contact:contactContent});
 });
 app.get("/compose",function(req,res){
  res.render("compose");
 });

 app.post("/compose",function(req,res){


  const post = new Post({
    title : req.body.posttitle,
    content: req.body.postbody
  })
  post.save(function(err){

    if (!err){
 
      res.redirect("/");
 
    }
 
  });

});



app.get("/posts/:postId", function(req, res){

  const requestedPostId = req.params.postId;
  Post.findOne({_id: requestedPostId}, function(err, post){ 
    res.render("post", {

      heading: post.title,
 
      content: post.content
 
    });
  })

});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
