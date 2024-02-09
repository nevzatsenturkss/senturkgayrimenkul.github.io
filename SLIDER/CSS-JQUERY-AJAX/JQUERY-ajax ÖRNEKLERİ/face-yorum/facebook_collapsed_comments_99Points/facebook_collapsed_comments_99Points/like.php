<?php
	include('dbcon.php');
	
	if($_REQUEST['postId'])
	{
		$userip = $_SERVER['REMOTE_ADDR'];
		
		mysql_query("update facebook_collapsed_likes set likes=likes+1 where post_id= ".$_REQUEST['postId']);
		
		mysql_query("INSERT INTO facebook_collapsed_ip (userip,post_id) VALUES('".$userip."','".$_REQUEST['postId']."')");
		
		$total_likes = mysql_query("SELECT * FROM facebook_collapsed_likes where post_id = ".$_REQUEST['postId']." ");
		$likes = mysql_fetch_array($total_likes);
		$likes = $likes['likes'];
	}
	echo $likes;
?>
