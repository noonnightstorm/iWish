var db = require ("../db");
var tool = require("../tool");
/*
 * GET home page.
 */
exports.index = function(req, res){
  res.render('index', { 
  	title: 'Express'
  });
}
exports.register = function(req,res){
	res.render("register",{});
}
exports.login = function(req,res){
	var info = {
		req : req,
		res : res,
		mail : req.query["mail"],
		password : req.query["password"],
		callback : tool.loginResult
	};
	db.checkLogin(info);
}
exports.insertUser = function(req,res){
	if(req.body.password != req.body.password2){
		console.log("password again is not right");
	}
	else{
		var info = {
			req : req,
			res : res,
			mail : req.body.mail,
			password : req.body.password,
			nickname : req.body.nickname,
			avatar : req.body.avatar
		};
		console.log("insert success");
		db.insertUser(info);
	}
}
exports.projectList = function(req,res){
	var info = {
		req : req,
		res : res,
		callback : tool.projectList
	};
	db.projectList(info);
}