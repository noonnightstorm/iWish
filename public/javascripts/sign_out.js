window.onload = function (){
	$(".sign-out").click(function(){
		signOut();
	});
}
function signOut(){
	var params = {
		info : "signOut"
	};
	$.ajax({
		url: '/sign_out',
		type: 'post', 
		data: params,
		datatype: 'json',
		success: function(date){
			 window.location.href = "/";
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			console.log(XMLHttpRequest + '#' + textStatus + '#' + errorThrown);
		},
		complete: function(a,b){
			console.log(a + 'complete#' + b);
		}
	});
}