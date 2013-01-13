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
	user_id : String ,
	project_id : String ,
	status : String 
});

var Persons = mongoose.model( 'Person', Person );
var Projects = mongoose.model( 'Projects', Project );
var Comments = mongoose.model( 'Comments', Comment );

/*var m = new Persons();
m.mail = "123";
m.password = "123";
m.name = "storm";
m.avatar = "storm";
m.save();*/
exports.checkLogin = function (info){
	var mark = false;
	var user = Persons.findOne({mail:info.mail,password:info.password},function(err,docs){
		if(err){
			info.callback(req,res,err);
		}
		else{
			if(docs)
				info.callback(info.req,info.res,null);
			else
				info.callback(info.req,info.res,"wrong");
		}
	});
}
exports.insertUser = function (info){
	var user = new Persons();
	user.mail = info.mail;
	user.password = info.password;
	user.name = info.name;
	user.avatar = info.avatar;
	user.save();
	Persons.findOne({mail:info.mail,password:info.password},function(err,obj){
		console.log(obj);
	});
}
exports.projectList = function (info){
	Projects.find({},function(err,projects){
		if(err){
			info.callback(req,res,err);
		}
		else{
			info.callback(req,res,projects);
		}

	});
}