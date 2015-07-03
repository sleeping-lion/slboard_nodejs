$(document).ready(function(){
	$('.modal_link').click(function(event){
  	event.preventDefault();
  	$('#myModal').removeData("modal");
  	$('#myModal').load($(this).attr('href')+'?no_layout=true',function(){
  		$('#myModal').modal();
  		});
	});
	
  $('.scrollable').scrollable({circular: true, mousewheel: true}).navigator().autoscroll({interval: 3000});	
});