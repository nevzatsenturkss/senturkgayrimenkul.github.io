<!doctype html public "-//W3C//DTD HTML 4.0 //EN">

<html>

<head>
<title>Demos :  99Points.info : Fresh Facebook Style TextArea with Wall Posting Script using jQuery PHP and Ajax</title>

<script type="text/javascript" src="jquery-1.2.6.min.js"></script>
<script type="text/javascript" src="jquery.livequery.js"></script>
<link href="dependencies/screen.css" type="text/css" rel="stylesheet" />

<script type="text/javascript">

	// <![CDATA[	

	$(document).ready(function(){	
	
		$('.ViewComments').livequery("click",function(e){
			
			var parent  = $(this).parent();
			var getID   =  parent.attr('id').replace('collapsed-','');
			
			var total_comments = $("#totals-"+getID).val();
						
			$("#loader-"+getID).html('<img src="loader.gif" alt="" />');
			
			$.post("view_comments.php?postId="+getID+"&totals="+total_comments, {
	
			}, function(response){
				
				$('#CommentPosted'+getID).prepend($(response).fadeIn('slow'));
				$('#collapsed-'+getID).hide();
				
			});
		});	
		
		/// like 
		
		$('.LikeThis').livequery("click",function(e){
			
			var getID   =  $(this).attr('id').replace('post_id','');
			
			$("#like-loader-"+getID).html('<img src="loader.gif" alt="" />');
			
			$.post("like.php?postId="+getID, {
	
			}, function(response){
				
				$('#like-stats-'+getID).html(response);
				
				$('#like-panel-'+getID).html('<a href="javascript: void(0)" id="post_id'+getID+'" class="Unlike">Unlike</a>');
				
				$("#like-loader-"+getID).html('');
			});
		});	
		
		/// unlike 
		
		$('.Unlike').livequery("click",function(e){
			
			var getID   =  $(this).attr('id').replace('post_id','');
			
			$("#like-loader-"+getID).html('<img src="loader.gif" alt="" />');
			
			$.post("unlike.php?postId="+getID, {
	
			}, function(response){
				
				$('#like-stats-'+getID).html(response);
				
				$('#like-panel-'+getID).html('<a href="javascript: void(0)" id="post_id'+getID+'" class="LikeThis">Like</a>');
				
				$("#like-loader-"+getID).html('');
			});
		});	
		
		
		
	});	

	// ]]>

</script>

</head>

<body>

	<div align="center">
	
		<br clear="all" />
	
		<div id="posting" align="center">
	
		<?php
		include('dbcon.php');
		
		include_once('posts.php');?>
		  
		</div>
	</div>

<br clear="all" /><br clear="all" /><br clear="all" />
<br clear="all" />
			  
</body>

</html>

