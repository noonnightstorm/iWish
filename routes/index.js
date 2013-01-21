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
	user_id : String ,
	password : String
});
var Comment = new Schema({
	content : String ,
	user : {
		name : String,
		avatar : String
	} ,
	project_id : String ,
	status : String,
	score: Number,
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
	/*console.log(req.session.user_id);*/
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
	var user = new Persons();
	user.mail = req.body.mail;
	user.password = req.body.password;
	user.name = req.body.nickname;
	user.avatar = req.body.avatar;
	user.save();
	/*Persons.findOne({_id:user._id},function(err,obj){
		console.log(obj);
	});*/
	req.session.user_id = user._id;
	req.session.user_name = user.name;
	req.session.user_avatar = user.avatar;
	res.redirect("/pro_list");
}
exports.projectList = function(req,res){
	Projects.find({},function(err,projects){
		if(req.session.user_id){
			res.render("pro_list",{
				projects : projects,
				user_name : req.session.user_name
			});
		}
		else{
			res.redirect("/");
		}
	});
}
exports.myProjectList = function(req,res){
	if(req.session.user_id == null){
		res.redirect("/");
		return ;
	}
	else{
		Projects.find({user_id:req.session.user_id},function(err,projects){
			/*console.log(projects);*/
			res.render("Mypro_list",{
				projects : projects,
				user_name : req.session.user_name
			});
		});
	}
}
exports.createProject = function(req,res){
	if(req.session.user_id == null){
		res.redirect("/");
		return ;
	}
	res.render("create_pro",{
		user_name : req.session.user_name
	});
}
exports.insertsProject = function(req,res){
	if(req.session.user_id){
		var project = new Projects();
		project.name = req.body.name;
		project.content = req.body.content;
		project.password = req.body.password;
		project.user_id = req.session.user_id;
		project.save();
		res.redirect("/wish_tree/"+project._id);
	}
	else{
		res.redirect("/");
	}
}
exports.wishTree = function(req,res){
	if(req.session.user_id == null){
		req.redirect("/");
		return;
	}
	Projects.findOne({_id:req.params.project_id},function(err,project){
		Comments.find({project_id:req.params.project_id},function(err,comments){
			/*console.log(comments);*/
			res.render("wish_tree",{
				project : project,
				comments : comments,
				user_name : req.session.user_name
			});
		});
	});
}
exports.finishTree = function (req,res){
	if(req.session.user_id == null){
		res.redirect("/");
		return ;
	}
	Projects.findOne({_id:req.params.project_id},function(err,project){
		Comments.find({project_id:req.params.project_id,status:"finish"},function(err,comments){
			/*console.log(comments);*/
			res.render("finish_tree",{
				project : project,
				comments : comments,
				user_name : req.session.user_name
			});
		});
	});
}
exports.insertComment = function(req,res){
	Persons.findOne({_id:req.session.user_id},function(err,user){
		var date = new Date();
		var comment = new Comments();
		comment.content = req.body.content;
		comment.project_id = req.params.project_id;
		comment.user.name = user.name;
		comment.user.avatar = user.avatar;
		comment.status = "iwish";
		comment.score = 0;
		comment.date = date.getFullYear()+"-"+(parseInt(date.getMonth())+1)+"-"+date.getDate();
		comment.save();
		res.writeHead(200, {'content-type': 'text/json' });
		res.write( JSON.stringify({ result : "success"}) );
		res.end('\n');
		/*Comments.findOne({_id:comment._id},function(err,obj){
			console.log(obj);
		});*/
	});
	/*Comments.remove({},function(err,obj){});
	Persons.remove({},function(err,obj){});
	Projects.remove({},function(err,obj){});*/
}
exports.updateWishList = function (req,res){
	Comments.find({project_id:req.params.project_id},function(err,comments){
		res.writeHead(200, {'content-type': 'text/json' });
		res.write( JSON.stringify({ comments : comments}) );
		res.end('\n');
	});

} 
exports.showOperate = function(req,res){
	Projects.find({_id:req.body.project_id,user_id:req.session.user_id,password:req.body.project_code},function(err,obj){
		if(obj.length > 0){
			res.writeHead(200, {'content-type': 'text/json' });
			res.write( JSON.stringify({ result : "true"}) );
			res.end('\n');
		}
	});
}
exports.modifyIwishStatus = function (req,res){
	Comments.update({_id:req.params.comment_id},{$set:{status:"ongoing"}},function(err,obj){
		if(obj){
			res.writeHead(200, {'content-type': 'text/json' });
			res.write( JSON.stringify({ result : "true"}) );
			res.end('\n');
		}
	});
}
exports.modifyGoingStatus = function (req,res){
	Comments.update({_id:req.params.comment_id},{$set:{status:"finish"}},function(err,obj){
		if(obj){
			res.writeHead(200, {'content-type': 'text/json' });
			res.write( JSON.stringify({ result : "true"}) );
			res.end('\n');
		}
	});
}
exports.deteleComment = function (req,res){
	if(req.body.info == "detele"){
		Comments.remove({_id:req.params.comment_id},function(err,obj){
			if(err){
				res.writeHead(200, {'content-type': 'text/json' });
				res.write( JSON.stringify({ result : "false"}) );
				res.end('\n');
			}
			else{
				res.writeHead(200, {'content-type': 'text/json' });
				res.write( JSON.stringify({ result : "true"}) );
				res.end('\n');
			}
		});
	}
}
exports.addScore = function (req,res){
	/*Comments.update({_id:req.params.comment_id},{$inc:{score:1}},function(err){
		if(obj){
			res.writeHead(200, {'content-type': 'text/json' });
			res.write( JSON.stringify({ result : "true",score : }) );
			res.end('\n');
		}

	});*/
	Comments.update({_id:req.params.comment_id},{$inc:{score:1}},function(err,comment){
		Comments.findOne({_id:req.params.comment_id},function(err,obj){
			res.writeHead(200, {'content-type': 'text/json' });
			res.write( JSON.stringify({ result : "true",score : obj.score}) );
			res.end('\n');
		});
	});
}
exports.signOut = function (req,res){
	if(req.body.info == "signOut"){
		init(req);
		res.redirect("/");
	}
}


function init(req){
	req.session.user_id = null;
	req.session.user_name = null;
	req.session.user_avatar = null;
}