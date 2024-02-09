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
	
	$result = mysql_query("SELECT *,
	UNIX_TIMESTAMP() - date_created AS TimeSpent FROM facebook_collapsed_posts order by p_id desc limit 0,10");
	
	$userip = $_SERVER['REMOTE_ADDR'];
	
	while ($row = mysql_fetch_array($result))
	{
		$like_ip = mysql_query("SELECT count(*) FROM facebook_collapsed_ip where post_id = ".$row['p_id']." AND userip='".$userip."'");
		$like_ip_num = mysql_num_rows($like_ip);
		
		$total_comments = mysql_query("SELECT count(*) FROM facebook_collapsed_comments where post_id = ".$row['p_id']." order by date_created asc");
		$records = mysql_fetch_array($total_comments);
		$records = $records[0];
		
		$total_likes = mysql_query("SELECT * FROM facebook_collapsed_likes where post_id = ".$row['p_id']." ");
		$likes = mysql_fetch_array($total_likes);
		$likes = $likes['likes'];
		
		$comments = mysql_query("SELECT *,
		UNIX_TIMESTAMP() - date_created AS CommentTimeSpent FROM facebook_collapsed_comments where post_id = ".$row['p_id']." order by date_created asc limit 0,4");
		
		$comment_num_row = mysql_num_rows(@$comments);?>
		
	   <div class="friends_area">

	   <img src="zee.jpg" style="float:left;" width="60" alt="" />

		   <label style="float:left" class="name">

		   <b><a href="http://www.facebook.com/zishan.rasool" target="_blank"><?php echo $row['f_name'];?></a></b>

		   <em><?php  echo clickable_link($row['post']);?></em>
		   <br clear="all" />

		   <span>
		   <?php  
		   
		    $days = floor($row['TimeSpent'] / (60 * 60 * 24));
			$remainder = $row['TimeSpent'] % (60 * 60 * 24);
			$hours = floor($remainder / (60 * 60));
			$remainder = $remainder % (60 * 60);
			$minutes = floor($remainder / 60);
			$seconds = $remainder % 60;
			
			if($days > 0)
			echo date('F d Y', $row['date_created']);
			elseif($days == 0 && $hours == 0 && $minutes == 0)
			echo "few seconds ago";		
			elseif($days == 0 && $hours == 0)
			echo $minutes.' minutes ago';
			elseif($days == 0 && $hours > 0)
			echo $hours.' hour ago';
			else
			echo "few seconds ago";	?>
		   
		   </span>
		   
		   	&nbsp;&nbsp;&nbsp;&nbsp;
			
			<span id="like-panel-<?php  echo $row['p_id']?>">
				
			<?php
			if($like_ip_num > 0){?>
				<a href="javascript: void(0)" id="post_id<?php  echo $row['p_id']?>" class="Unlike">Unlike</a>
			<?php }else{?>
				<a href="javascript: void(0)" id="post_id<?php  echo $row['p_id']?>" class="LikeThis">Like</a>
			<?php }?>
				
			</span>
			
		   </label>
		   <?php
			$userip = $_SERVER['REMOTE_ADDR'];
			if($row['userip'] == $userip){?>
		  	<a href="#" class="delete"> Remove</a>
		   <?php
			}?>
			
			<input type="hidden" value="<?php echo $records?>" id="totals-<?php  echo $row['p_id'];?>" />
			
		    <br clear="all" />
			
			<div class="commentPanel" align="left">
				<img src="like.png" style="float:left;" alt="" />
				
				<span id="like-stats-<?php  echo $row['p_id'];?>"> <?php echo $likes;?> </span> people like this.
				
				<span id="like-loader-<?php  echo $row['p_id']?>">&nbsp;</span>
			</div>
			<?php
			if ($records > 4)
			{
				$collapsed = true;?>
			<div class="commentPanel" id="collapsed-<?php  echo $row['p_id'];?>" align="left">
				<img src="cicon.png" style="float:left;" alt="" />
				<a href="javascript: void(0)" class="ViewComments">
				View all <?php echo $records;?> comments 
				</a>
				<span id="loader-<?php  echo $row['p_id']?>">&nbsp;</span>
			</div>
			<?php
			}?>
			<div id="CommentPosted<?php  echo $row['p_id']?>">
				<?php
				
				if($comment_num_row > 0)
				{
					while ($rows = mysql_fetch_array($comments))
					{
						$days2 = floor($rows['CommentTimeSpent'] / (60 * 60 * 24));
						$remainder = $rows['CommentTimeSpent'] % (60 * 60 * 24);
						$hours = floor($remainder / (60 * 60));
						$remainder = $remainder % (60 * 60);
						$minutes = floor($remainder / 60);
						$seconds = $remainder % 60;						
						?>
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
						elseif($days == 0 && $hours > 0)
						echo $hours.' hour ago';
						else
						echo "few seconds ago";	
						?>
						</span>
						
					</div>
					<?php
					}?>				
					<?php
				}?>
			</div>
	   </div>
	<?php
	}?>
	