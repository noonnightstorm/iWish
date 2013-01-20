var Vertify = {
	//color is not right
	loginVertify : function(){
		if($("#login-account").val() == ""){
			$("#login-account").css("blackground-color","red");
			return false;
		}
		if($("#login-password").val() == ""){
			$("#login-password").css("blackground-color","red");
			return false;
		}
		console.log("true");
		return true;
	},
	registerVertify : function(){

	},
	projectVertify : function(){

	},
	commentVertify : function(){

	}
};