	<?php
	include('dbcon.php');
	
	function clickable_link($text = '')
	{
		$text = preg_replace('#(script|about|applet|activex|chrome):#is', "\\1:", $text);
		$ret = ' ' . $text;
		$ret = preg_replace("#(^|[\n ])([\w]+?://[\w\#$%&~/.\-;:=,?@\[\]+]*)#is", "\\1<a href=\"\\2\" target=\"_blank\" rel=\"no_follow\">\\2</a>", $ret);
		
		$ret = preg_replace("#(^|[\n ])((www|ftp)\.[\w\#$%&~/.\-;:=,?@\[\]+]*)#is", "\\1<a href=\"http://\\2\" target=\"_blank\">\\2</a>", $ret);
		$ret = preg_replace("#(^|[\n ])([a-z0-9&\-_.]+?)@([\w\-]+\.([\w\-\.]+\.)*[\w]+)#i", "\\1<a href=\"mailto:\\2@\\3\">\\2@\\3</a>", $ret);
		$ret = substr($ret, 1);
		return $ret;
	}
	
	$comments = mysql_query("SELECT *,UNIX_TIMESTAMP() - date_created AS CommentTimeSpent FROM facebook_collapsed_comments where post_id = ".$_REQUEST['postId']." order by date_created asc limit 4, ".$_REQUEST['totals']);
		
	$comment_num_row = mysql_num_rows(@$comments);
	
	if($comment_num_row > 0)
	{
		while ($rows = mysql_fetch_array($comments))
		{
			$days2 = floor($rows['CommentTimeSpent'] / (60 * 60 * 24));
			$remainder = $rows['CommentTimeSpent'] % (60 * 60 * 24);
			$hours = floor($remainder / (60 * 60));
			$remainder = $remainder % (60 * 60);
			$minutes = floor($remainder / 60);
			$seconds = $remainder % 60;	?>
			
			<div class="commentPanel" align="left">
				<img src="small.jpg" width="35" class="CommentImg" style="float:left;" alt="" />
				<label class="postedComments">
					<?php  echo clickable_link($rows['comments']);?>
				</label>
				<br clear="all" />
				<span style="margin-left:43px; color:#666666; font-size:11px">
				<?php
				
				if($days2 > 0)
				echo date('F d Y', $rows['date_created']);
				elseif($days2 == 0 && $hours == 0 && $minutes == 0)
				echo "few seconds ago";		
				elseif($days2 == 0 && $hours == 0)
				echo $minutes.' minutes ago';
				elseif($days2 == 0 && $hours > 0)
				echo $hours.' hour ago';
				else
				echo "few seconds ago";	
				?>
				</span>
				
			</div>
		<?php
		}
	}?>
	
