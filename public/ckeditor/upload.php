<?php
	require __DIR__.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'setting.php';
	
	$clean = filter_input_array(INPUT_GET, array('CKEditorFuncNum' => FILTER_VALIDATE_INT));

	$clean['upload']=check_file($_FILES['upload']);
	move_file($clean['upload'],'ckeditor',$_SESSION['USER_ID']);
	
  require WEBROOT_DIRECTORY . DIRECTORY_SEPARATOR . 'phpThumb' . DIRECTORY_SEPARATOR . 'phpThumb.config.php';
	$url=htmlspecialchars(phpThumbURL('src=/../uploads/ckeditor/'.$_SESSION['USER_ID'].'/'.$clean['upload']['name'].'&w=400&h=300', '/phpThumb/phpThumb.php'));

	echo '<script type="text/javascript">window.parent.CKEDITOR.tools.callFunction('.$clean['CKEditorFuncNum'].',"'.$url.'","'.$clean['CKEditorFuncNum'].'")</script>';
