window.onload = function(){
	var suggest = document.getElementById("suggest");
	var screen = document.getElementById("all-screen");
	screen.onclick = function(){
		WriteWish.clearScreen();
	}
	suggest.onclick = function(){
		WriteWish.btnClick();
	}
	$("#wish-box").submit(function(e){
		PostWish.postWish(e);
	});
	$(".add-score-btn").click(function(){
		AddScore.addScore(this);
	});
	$(".detele-comment").click(function(){
		ManageComment.postDeteleRequest(this);
	});
}

var WriteWish = {
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

var PostWish = {
	postWish : function(event){
		this.sendWish(event);
		this.clearForm();
		WriteWish.clearScreen();
		this.updateWishList(event);
	},
	sendWish : function(event){
		event.preventDefault();
		form = event.target;
		var params = {
			content : $("#wish-content").val()
		};
		$.ajax({
			url: '/add_comment/'+form.submit.value,
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
		return false;
	},
	clearForm : function(){
		$("#wish-box-reset-btn").trigger("click");
	},
	updateWishList : function(event){
		var project_id = event.target.submit.value;
		var params = {
			info : "wish-lish"
		};
		$.ajax({
			url: '/update_wish_list/'+project_id,
			type: 'get', 
			data: params,
			datatype: 'json',
			success: function(date){
				$("#status-going").children().remove();
				$("#status-iwish").children().remove();	
				var comments = date.comments;
				comments.forEach(function(comment){
					// here is some problem ,because clone a array,I should correct here later
					var nodes = $(".comment-box .comment-item-demo").clone(true);
					var node = nodes[0];
					if(comment.status == "iwish"){
						PostWish.createWishList("iwish",node,comment);
					}
					else if(comment.status == "ongoing"){
						PostWish.createWishList("ongoing",node,comment);
					}
				});
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				console.log(XMLHttpRequest + '#' + textStatus + '#' + errorThrown);
			},
			complete: function(a,b){
			}
		});
	},
	createWishList : function (type,node,comment){
		$(node).css("display","block");
		$(node).find(".comment-title .comment-info").html(comment.user.name + " @ " + comment.date);
		$(node).find(".comment-content").html(comment.content);
		$(node).find(".comment-vote .comment-vote-score").html(comment.score);
		$(node).find(".detele-comment").attr("value",comment._id);
		if(type == "iwish"){
			$(node).find(".comment-title .comment-status").attr("src","/images/status-iwish.png");
			$(node).find(".comment-avatar .comment-avatar-img").attr("src","/images/Avatar-" + comment.user.avatar + ".png");
			$(node).find(".modify-comment").html("批准").attr("value",comment._id);
			$("#status-iwish").append(node);
		}
		else if(type == "ongoing"){
			$(node).find(".comment-title .comment-status").attr("src","/images/status-ongoing.png");
			$(node).find(".comment-avatar .comment-avatar-img").attr("src","/images/Avatar-" + comment.user.avatar + ".png");
			$(node).find(".modify-comment").html("完成").attr("value",comment._id);
			$("#status-going").append(node);
		}
	}
};

var ManageComment = {
	postManageCode : function (){

	},
	showChoice : function (){

	},
	postDeteleRequest : function (obj){
		var params = {
			info : "detele"
		};
		$.ajax({
			url: '/detele_comment/'+obj.value,
			type: 'post', 
			data: params,
			datatype: 'json',
			success: function(date){
				if(date.result == "true"){
					$(obj).parents().parents().parents(".comment-item").remove();
				}	
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				console.log(XMLHttpRequest + '#' + textStatus + '#' + errorThrown);
			},
			complete: function(a,b){
			}
		});
	},
	postModifyRequest : function (){

	}
};

var AddScore = {
	addScore : function(obj){
		this.postScore();
		this.showScore(obj);
	},
	postScore : function(){

	},
	showScore : function(obj){
		/*var score = parseInt($(obj).siblings()[0].textContent)+1;
		$(obj).siblings()[0].textContent = score;*/
	}
};
/*function postWish(event){
	event.preventDefault();
	form = event.target;
	var params = {
		content : $("#wish-content").val()
	};
	$.ajax({
		url: '/add_comment/'+form.submit.value,
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
	return false;
}*/