<?php
//Change this
require 'gamedata.php';

$users = json_decode($user);
function authenticate($username,$password){
	global $users;
	if (property_exists($users,$username)){
		if ($users->$username->password==$password){
			return true;
		}
	}
	return false;
}

function returnText($text, $cwd){
	$arr = array($text, $cwd);
	$json = json_encode($arr);
	echo $json;
}

if (isset($_POST['command'])&&isset($_POST['cwd'])){
	//handle su separately
	if ($_POST['command']=="su"){
		if (isset($_POST['username'])&&isset($_POST['password'])){
			if (authenticate($_POST['username'],$_POST['password'])){
								$real_user = $_POST['username'];
				echo $users->$real_user->greeting;
								die();
			}
		}
		echo "error";
		die();
	} else {
		if (isset($_POST['username'])&&isset($_POST['password'])){
			if (authenticate($_POST['username'],$_POST['password'])){
								$real_user = $_POST['username'];
				$coms = explode(" ", $_POST['command']);
				if ($coms[0]==""){
					die();
				} else {
					$cwd = $_POST['cwd'];
					switch ($coms[0]) {
						case 'ls':
							if (count($coms) > 2){
								returnText("<span class='red'>Error: the command 'ls' takes a maximum of one argument</span><br>",$cwd);
							} else if (count($coms) == 2) {
								$struc_array = explode("/", $coms[1]);
								$end_dir = array_pop($struc_array);
								$r_prop = $users->$real_user->files;
								foreach ($struc_array as $dir) {
										$r_prop = $r_prop->$dir;
								}
								if (property_exists($r_prop, $end_dir)) {
									$str = "";
									foreach ($r_prop->$end_dir as $key => $value) {
										$str = $str.$key."<br>";
									}
									returnText($str,$cwd);;
								} else {
									returnText("<span class='red'>Error: there is no such file or directory '".$end_dir."'</span><br>",$cwd);
								}
							} else {
								$str = "";
								foreach ($users->$real_user->files as $key => $value) {
										$str = $str.$key."<br>";
								}
								returnText($str,$cwd);;
							}
							break;
						case 'cat':
							$struc_array = explode("/", $coms[1]);
							$r_filename = array_pop($struc_array);
							$r_prop = $users->$real_user->files;
							foreach ($struc_array as $dir) {
									$r_prop = $r_prop->$dir;
							}
							if (count($coms)!=2){
								returnText("<span class='red'>Error: the command 'cat' takes exactly one argument</span><br>",$cwd);
							} else if (property_exists($r_prop, $r_filename)) {
								returnText($r_prop->$r_filename."<br>",$cwd);
							} else {
								returnText("<span class='red'>Error: file '".$coms[1]."' not found</span><br>",$cwd);
							}
							break;
						case 'cd':
							$com_text = rtrim($coms[1], '/');
							$struc_array = explode("/", $com_text);
							$end_dir = array_pop($struc_array);
							if ($struc_array[0] == "") {
								returnText("<span class='red'>Error: root-based 'cd' is not permitted</span><br>",$cwd);
							}
							if ($struc_array[0] == "~") {
								if (count($struc_array) > 1) {
									$firstelem = array_shift($struc_array);
									$r_prop = $users->$real_user->files;
									foreach ($struc_array as $dir) {
										$r_prop = $r_prop->$dir;
									}
									if (property_exists($r_prop, $end_dir)) {
										$cwd = implode("/", $struc_array);
									} else {
										returnText("<span class='red'>Error: there is no such directory '".$end_dir."'</span><br>",$cwd);
									}
								}
								else {
									$cwd = "";
								}
							}
							else {
								$r_prop = $users->$real_user->files;
								foreach ($struc_array as $dir) {
									$r_prop = $r_prop->$dir;
								}
								if (property_exists($r_prop, $end_dir)) {
									$cwd .= $com_text;
								} else {
									returnText("<span class='red'>Error: there is no such directory '".$end_dir."'</span><br>",$cwd);
								}
							}
							returnText("",$cwd);
						default:
							returnText("<span class='red'>Error: command '".$coms[0]."' not recognised</span><br>",$cwd);;
							break;
					}
				}
			} else {
				returnText("<span class='red'>Error: the security of the web shell has been compromised</span><br>","");
			}
		} else {
			returnText("<span class='red'>Error: the security of the web shell has been compromised</span><br>","");
		}
	}

} else {
	returnText("<span class='red'>Error: command not specified</span><br>",$_POST['cwd']);
}
?>
