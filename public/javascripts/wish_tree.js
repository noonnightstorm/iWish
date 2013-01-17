window.onload = function(){
	var suggest = document.getElementById("suggest");
	var screen = document.getElementById("all-screen");
	screen.onclick = function(){
		PushWish.clearScreen();
	}
	suggest.onclick = function(){
		PushWish.btnClick();
	}

	$("#post-wish-btn").click(function(){
		postWish(this.value);
	});	
}

var PushWish = {
	showScreen : function(){
		var screen = document.getElementById("all-screen");
		screen.style.display = "block";
	},
	showForm : function(){
		var wishBox = document.getElementById("wish-box");
		var top = -300;
		var time = setInterval(function(){
			top+=20;
			wishBox.style.top = top+"px";
			if(top>=100)
				clearInterval(time);
		},15);
	},
	btnClick : function(){
		this.showScreen();
		this.showForm();
	},
	clearScreen : function(){
		var wishBox = document.getElementById("wish-box");
		wishBox.style.top = "-300px";
		var screen = document.getElementById("all-screen");
		screen.style.display = "none";
	}
};

function postWish(projectId){
	var params = {
		content : $("#wish-content").val()
	};
	$.ajax({
		url: '/add_comment/'+projectId,
		type: 'post', 
		data: params,
		datatype: 'json',
		success: function(){
			alert("success!");
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			console.log(XMLHttpRequest + '#' + textStatus + '#' + errorThrown);
		},
		complete: function(a,b){
			console.log(a + 'complete#' + b);
		}
	});
}