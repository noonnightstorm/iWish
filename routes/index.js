var mongoose = require( 'mongoose' );
mongoose.connect( 'mongodb://localhost/express-wish' );
var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var Person = new Schema({
	mail : String ,
	password : String ,
	name : String ,
	avatar : String 
});
var Project = new Schema({
	name : String ,
	content : String ,
	user_id : String
});
var Comment = new Schema({
	content : String ,
	user : {
		name : String,
		avatar : String
	} ,
	project_id : String ,
	status : String,
	date : String 
});

var Persons = mongoose.model( 'Person', Person );
var Projects = mongoose.model( 'Projects', Project );
var Comments = mongoose.model( 'Comments', Comment );
/*
 * GET home page.
 */

exports.index = function(req, res){
  init(req);
  res.render('index', { 
  	title: 'Express'
  });
}
exports.register = function(req,res){
	console.log(req.session.user_id);
	res.render("register",{});
}
exports.login = function(req,res){
	Persons.findOne({mail:req.query.mail,password:req.query.password},function(err,user){
		if(err){

		}
		else{
			if(user){
				req.session.user_id = user._id;
				req.session.user_name = user.name;
				req.session.user_avatar = user.avatar;
				res.redirect("/pro_list");
			}
			else{
				console.log("password is wrong!");
			}
		}
	});
}
exports.insertUser = function(req,res){
	if(req.body.password != req.body.password2){
		console.log("password again is not right");
	}
	else{
		var user = new Persons();
		user.mail = req.body.mail;
		user.password = req.body.password;
		user.name = req.body.name;
		user.avatar = req.body.avatar;
		user.save();
		Persons.findOne({_id:user._id},function(err,obj){
			console.log(obj);
		});
	}
}
exports.projectList = function(req,res){
	Projects.find({},function(err,projects){
		res.render("pro_list",{
			projects : projects
		});
	});
}
exports.myProjectList = function(req,res){
	if(req.session.user_id == null){
		res.redirect("/");
	}
	else{
		Projects.find({user_id:req.session.user_id},function(err,projects){
			res.render("Mypro_list",{
				projects : projects
			});
		});
	}
}
exports.createProject = function(req,res){
	res.render("create_pro",{});
}
exports.insertsProject = function(req,res){
	var project = new Projects();
	project.name = req.body.name;
	project.content = req.body.content;
	project.password = req.body.password;
	project.save();
	res.redirect("/wish_tree/"+project._id);
}
exports.wishTree = function(req,res){
	Projects.findOne({_id:req.params.project_id},function(err,project){
		Comments.find({project_id:req.params.project_id},function(err,comments){
			console.log(comments);
			res.render("wish_tree",{
				project : project,
				comments : comments
			});
		});
	});
}
exports.insertComment = function(req,res){
	/*console.log(req.params.project_id);
	console.log(req.body.content);*/
	Persons.findOne({_id:req.session.user_id},function(err,user){
		var comment = new Comments();
		comment.content = req.body.content;
		comment.project_id = req.params.project_id;
		comment.status = "iwish";
		console.log(user.name);
		comment.user.name = user.name;
		comment.user.avatar = user.avatar;
		comment.save();
		Comments.findOne({_id:comment._id},function(err,obj){
			console.log(obj);
		});
	});
	Comments.remove({},function(err,obj){});
}
function init(req){
	req.session.user_id = null;
	req.session.user_name = null;
	req.session.user_avatar = null;
}