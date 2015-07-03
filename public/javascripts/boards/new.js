$(document).ready(function() {
  CKEDITOR.replace("sl_content", {
    fullPage: true,
    allowedContent: true,
		 filebrowserUploadUrl: '/ckeditor_assets/add'
  });
});