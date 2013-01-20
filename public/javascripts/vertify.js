var Vertify = {
	loginVertify : function(){
		$("#login-account").css("background","#fff");
		$("#login-password").css("background","#fff");
		if($("#login-account").val() == ""){
			$("#login-account").css("background","#ffb9b9");
			return false;
		}
		if($("#login-password").val() == ""){
			$("#login-password").css("background","#ffb9b9");
			return false;
		}

		return true;
	},
	registerVertify : function(){
		$("#mail").css("background","#fff");
		$("#password").css("background","#fff");
		$("#nickname").css("background","#fff");
		$("#avatar").css("background","#fff");
		if($("#mail").val() == "" || $("#mail").val().length<6){
			$("#mail").css("background","#ffb9b9");
			return false;
		}
		if($("#password").val == ""||$("#password").val().length<6){
			$("#password").css("background","#ffb9b9");
			return false;
		}
		if($("#password-again").val() != $("#password").val()){
			$("#password-again").css("background","#ffb9b9");
			return false;
		}
		if($("#nickname").val() == ""){
			$("#nickname").css("background","#ffb9b9");
			return false;
		}
		if($("#avatar").val() == "default"){
			$("#avatar").css("background","#ffb9b9");
			return false;
		}
		return true;
	},
	projectVertify : function(){
		$("#name").css("background","#fff");
		$("#introduction").css("background","#fff");
		$("#password").css("background","#fff");
		$("#password-again").css("background","#fff");
		if($("#name").val() == ""){
			$("#name").css("background","#ffb9b9");
			return false;
		}
		if($("#introduction").val() == ""){
			$("#introduction").css("background","#ffb9b9");
			return false;
		}
		if($("#password").val() == ""){
			$("#password").css("background","#ffb9b9");
			return false;
		}
		if($("#password-again").val() != $("#password").val()){
			$("#password-again").css("background","#ffb9b9");
			return false;
		}
		return true;
	},
	commentVertify : function(){
		$("#wish-content").css("background","#FFF7F4");
		if($("#wish-content").val() == ""){
			$("#wish-content").css("background","#ffb9b9");
			return false;
		}
		return true;
	},
	projectEnterVertify : function(){
		$("#wish-menu-input").css("background","#FFF7F4");
		if($("#wish-menu-input").val() == ""){
			$("#wish-menu-input").css("background","#ffb9b9");
				return false;
		}
		return true;
	}
};