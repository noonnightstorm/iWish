exports.loginResult = function (req,res,info){
	if(!info){
		console.log("login Success");
		/*res.redirect( '/register' );*/
	}
	else{
		console.log("login Fail");
		/*res.redirect( '/' );*/
	}
}
exports.projectList = function (req,res,info){
	if(info.constructor == Array){
		console.log(info);
	}
	else{
		console.log("there is something wrong with consult db");
	}
}