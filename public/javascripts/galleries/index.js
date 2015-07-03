$(document).ready(function() {
  $("a.simple_image").fancybox({
        'opacity'   : true,
        'overlayShow'        : true,
        'overlayColor': '#000000',
        'overlayOpacity'     : 0.9,
        'titleShow':true,
        'openEffect'  : 'elastic',
        'closeEffect' : 'elastic'
      });
	
  $("#sl_gallery_slide .item a").click(function(){
    var galleryId=$.uri.setUri($(this).attr('href')).param('id');
    $.getJSON('/galleries/view/'+galleryId+'.json',{'json':true},function(data){
      $("#sl_gallery_left a").attr('href','/files/gallery/photo/'+data.Gallery.id+'/'+data.Gallery.photo).attr('title',data.Gallery.title);
      $("#sl_gallery_left span").text(data.Gallery.title).css('bottom',-30);
      $("#sl_gallery_left img").attr('src','/files/gallery/photo/'+data.Gallery.id+'/small_'+data.Gallery.photo).animate({ opacity: "1" }, 400,function(){	
        $("#sl_gallery_left span").animate({bottom:0,opacity:'0.8'},400);
              });
      $("#sl_gallery_right div:first").html(nl2br(data.Gallery.content));
      $("#sl_gallery_menu a:first").attr('href','/galleries/edit/'+data.Gallery.id);
      $("#sl_gallery_menu form:first").attr('action','/galleries/delete/'+data.Gallery.id);
      document.title=data.Gallery.title+''+'';
      if (history && history.pushState) {
      history.pushState('','gallery_'+galleryId,'/galleries?id='+galleryId);
            }
          });
    return false;
    });  

  $('.scrollable').scrollable({circular: true, mousewheel: true}).navigator().autoscroll({interval: 3000});
});

function nl2br (str, is_xhtml) {
  var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br ' + '/>' : '<br>';
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}
