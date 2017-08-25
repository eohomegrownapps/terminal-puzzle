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
if (isset($_POST['command'])){
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
					switch ($coms[0]) {
						case 'ls':
							if (count($coms)!=1){
								echo "<span class='red'>Error: the command 'ls' does not take any arguments</span><br>";
							} else {
								$str = "";
								foreach ($users->$real_user->files as $key => $value) {
									$str = $str.$key."<br>";
								}
								echo $str;
							}
							break;
						case 'cat':
							if (count($coms)!=2){
								echo "<span class='red'>Error: the command 'cat' takes exactly one argument</span><br>";
							} else if (property_exists($users->$real_user->files, $coms[1])){
                                                                $file_name = $coms[1];
								echo $users->$real_user->files->$file_name."<br>";
							} else {
								echo "<span class='red'>Error: file '".$coms[1]."' not found</span><br>";
							}
							break;
						default:
							echo "<span class='red'>Error: command '".$coms[0]."' not recognised</span><br>";
							break;
					}
				}
			} else {
				echo "<span class='red'>Error: the security of the web shell has been compromised</span><br>";
			}
		} else {
			echo "<span class='red'>Error: the security of the web shell has been compromised</span><br>";
		}
	}

} else {
	echo "<span class='red'>Error: command not specified</span><br>";
}
?>
