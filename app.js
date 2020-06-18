 //app configuration
var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var methodoveride = require('method-override');
var expresssani = require('express-sanitizer');


mongoose.connect("mongodb+srv://anshoo:anshooman@cluster0-wftpq.mongodb.net/<dbname>?retryWrites=true&w=majority",
				 { useNewUrlParser: true, 
				  useUnifiedTopology: true,
				 useCreateIndex: true});
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.use(expresssani());
app.use(methodoveride("_method"));

//mongoose configuration
var blogschema = new mongoose.Schema({
	Name:String,
	imagesrc:String,
	description:String,
	created: {type:Date, default: Date.now}
})
var Blog = mongoose.model("Blog",blogschema);
// Blog.create({
//   "Name": "Apple",
//   "imagesrc": "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
//   "description": "red, small"
// },{
//   "Name": "Cake",
//   "imagesrc": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
//   "description": "brown, 1/2 kg"
// },{
//   "Name": "Cat",
//   "imagesrc": "https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
//   "description": "white, furry"
// },
// {
//   "Name": "Pen",
//   "imagesrc": "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1866&q=80",
//   "description": "blue"
// });


//restful routing configuration
app.get("/",function(req,res){
	res.redirect("/blogs");
});
//index route
app.get("/blogs",function(req, res){
	Blog.find({},function(err, blogs){
		if(err){
			console.log(err);
		}
		else{
			res.render("index",{blogs: blogs});
		}
	});
});
//NEW ROUTE
app.get("/blogs/new",function(req,res){
	res.render("new");
});
// CREATE ROUTEE
app.post("/blogs",function(req,res){
	//create blogs
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.create(req.body.blog, function(err, newBlog){
		if(err){
			console.log(err);
		}
		else{
			//redirect to index page
			res.redirect("/blogs");
		}
	});
});
//show route
app.get("/blogs/:id", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			console.log(err);
		}
		else{
			res.render("show",{blog: foundBlog});
		}
	});
});

//EDIT ROUTEE
app.get("/blogs/:id/edit",function(req, res){
	Blog.findById(req.params.id,function(err, foundBlog){
		if(err){
			console.log(err);
		}
		else{
			res.render("edit",{blog: foundBlog});
		}
	});
});

//UPDATE ROUTEE
app.put("/blogs/:id",function(req,res){
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog,function(err, updatedblog){
		if(err){
			console.log(err);
		}
		else{
			res.redirect("/blogs/" + req.params.id);
		}
	});
});
//DELETE ROUTEE
app.delete("/blogs/:id",function(req, res){
	//delete blogs
	Blog.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/blogs");
		}
		else{
			res.redirect("/blogs");
		}
	});
});


var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log("server started");
});