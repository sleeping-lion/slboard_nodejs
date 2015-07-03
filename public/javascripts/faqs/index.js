$(document).ready(function() {
	
//	$("#sl_faq_index ol li a").click(getList);
	$("#sl_faq_index article h3 a").click(getContent);
	
	function getList() {
		var tt=$(this);
		var parent=$(this).parent();		
		
		$.getJSON($(this).attr('href')+'.json',function(data){
			$("#sl_board_faq_index article").empty();
			if(data.list.length) {
				$.each(data.list,function(index,value){
					var a=$('<a class="title" href="/faqs/view/'+value.id+'">'+value.title+'</a>').click(getContent);
					var panel_heading=$('<h3>').addClass('panel-heading');
					var panel=$('<div>').addClass('panel panel-default');
					var panel_body=$('<div>').addClass('panel-body').hide();
					panel_heading.append(a).appendTo(panel);
					panel_body.appendTo(panel);
					$("#sl_board_faq_index article").append(panel);
					if(data.admin) {
						var div=$('<div class="sl_faq_menu"><a></a> &nbsp; | &nbsp; <a rel="nofollow" data-method="delete" data-confirm=""></a></div>');
						div.find('a:first').attr('href','/boards/faqs/edit.php?id='+value.id);
						div.find('a:eq(1)').attr('href','/boards/faqs/index.php?id='+value.id);
					}
				});
			} else {
				$('<dt></dt>').appendTo("#faqList");
			}

			$("#sl_board_faq_index ol li").removeClass('active');
			parent.addClass('active');
			
			var faqCategoryId=$.uri.setUri(tt.attr('href')).param("faq_category_id");			
			
			if(data.admin) {
				$("#faqCategoryList li .sl_faq_category_menu").remove();
				var dd=$('<div class="sl_faq_category_menu"><a></a><br /><a rel="nofollow" data-method="delete" data-confirm=""></a></div>');
				dd.find('a:first').attr('href','/faq_categories/edit.php?id='+faqCategoryId);
				dd.find('a:eq(1)').attr('href','/faq_categories/index.php?id='+faqCategoryId);
				parent.append(dd);
			}
			
			$('#sl_bottom_menu a:eq(1)').attr('href','/faqs/new?faq_category_id='+faqCategoryId);		
		});
		return false;
	}
	
	function getContent(){
		var gid=$.uri.setUri($(this).attr('href')).param("id");
		var panel=$(this).parent().parent();
		
		
		$.getJSON('/faqs/view/'+gid+'.json',function(data){
			
			$("#sl_faq_index article div.panel-primary").removeClass('panel-primary').addClass('panel-default');			
			$("#sl_faq_index article div.panel-body").hide();	
			panel.addClass('panel-primary');
			panel.find('.panel-body .faq_content').html(nl2br(data.FaqContent.content)).parent().slideDown();			
		});

		return false;
	}	
});

function nl2br (str, is_xhtml) {
	  var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br ' + '/>' : '<br>';
	  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}