//w3schools cookie functions
function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function Terminal() {
	//Change these
	this.cwd = "";
	this.username = "jbloggs";
	this.password = "Password1";
	this.terminalName = "imnotcreative";
	this.computerGreeting = "   ____					 ____				____   ___   ___   ___  <br>  / ___|___  _ __ ___  _ __/ ___| _   _ ___	|___ \\ / _ \\ / _ \\ / _ \\ <br> | |   / _ \\| '_ ` _ \\| '_ \\___ \\| | | / __|	 __) | | | | | | | | | |<br> | |__| (_) | | | | | | |_) |__) | |_| \\__ \\	/ __/| |_| | |_| | |_| |<br>  \\____\\___/|_| |_| |_| .__/____/ \\__, |___/   |_____|\\___/ \\___/ \\___/ <br>					  |_|		 |___/								 <br><br>THIS 'CompSys 2000' COMPUTER SYSTEM IS LICENSED TO VERONICS INC. NO UNAUTHORISED ACCESS.";
	this.terminalinput = '<input onblur="this.focus()" autofocus type="text" id="command">';
	this.cookieExpiryDays = 10000;
	
	this.suFlag = false;
	this.suData = "";
	this.envstack = [];
	this.history = [];
	this.historypointer = -1;
	this.directorySplitMarker = "/";

	this.init = function(){
		if (getCookie("username")!=""&&getCookie("password")!=""){
			this.changeUser(getCookie("username"),getCookie("password"),false);
		} else {
			this.changeUser(this.username,this.password);
		}
		var t = this;
		window.addEventListener('keydown',function(evt){
			//console.log(evt.keyCode);
			if (evt.keyCode == 13){
				evt.preventDefault();
				if (t.suFlag){
					//console.log("su");
					t.suFlag = false;
					//console.log(document.getElementById("command").value);
					t.changeUser(t.suData,document.getElementById("command").value);
					document.getElementById("terminaloutput").innerHTML+="<br>";
					//console.log(t.suData);
				} else {
					t.enterPressed();
				}
			} else if (evt.keyCode==38){
				//console.log("up");
				//console.log(t.historypointer);
				evt.preventDefault();
				if (t.historypointer!=-1){
					if (t.historypointer>0){
						t.historypointer--;
					}
					document.getElementById("command").value = t.history[t.historypointer];
				}
			} else if (evt.keyCode==40){
				//console.log("down");
				//console.log(t.historypointer);
				evt.preventDefault();
				if (t.historypointer<t.history.length&&t.historypointer!=-1){
						t.historypointer++;
				}
				if (t.historypointer!=-1&&t.historypointer<t.history.length){
					document.getElementById("command").value = t.history[t.historypointer];
				} else {
					document.getElementById("command").value = "";
				}
			}
		});
	}

	this.enterPressed = function(){
		var command = document.getElementById("command").value;
		this.copyCommandFromInput(command);
		data = command.split(" ");
		if (data[0]==""){
			this.output("");
		} else {
			this.history.push(command);
			this.historypointer = this.history.length;
			//console.log(this.history);
			//console.log(this.historypointer);
			//locally handled commands
			switch(data[0]){
				case "su":
					this.su(data);
					break;
				case "exit":
					//console.log(this.envstack);
					if (this.envstack.length>1){
						this.envstack.pop();
					}
					this.output("logout<br>");
					this.changeUser(this.envstack[this.envstack.length-1].username,this.envstack[this.envstack.length-1].password,true);
					break;
				default:
					this.submitCommand(command);
			}
		}
	}

	this.copyCommandFromInput = function(command){
		if (document.contains(document.getElementById("command"))) {
			document.getElementById("terminaloutput").removeChild(document.getElementById("command"));
			document.getElementById("terminaloutput").innerHTML+=command+"<br>";
		}
	}

	this.submitCommand = function(command){
		var xmlhttp = new XMLHttpRequest();
		var t = this;
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState === XMLHttpRequest.DONE) {
				if (xmlhttp.status === 200) {
					var json = JSON.parse(xmlhttp.responseText);
					t.cwd=json[1];
					t.output(json[0]);
				} else {
					t.output("<span class='red'>Error: connection lost</span><br>");
				}
			}
		};
		xmlhttp.open("POST", "commands.php", true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send("command="+command+"&cwd="+this.cwd+"&username="+this.username+"&password="+this.password+"&cwd="+this.cwd);
	}

	this.output = function(text){
		if (document.contains(document.getElementById("command"))) {
			document.getElementById("terminaloutput").removeChild(document.getElementById("command"));
		}
		var cwduse;
		if (this.cwd==""){
			cwduse = "";
		} else {
			cwduse = this.cwd.split(this.directorySplitMarker)[-1];
		}
		document.getElementById("terminaloutput").innerHTML+=text+"<span class='bold'>"+this.username+"@"+this.terminalName+":~"+cwduse+" $ </span>"+this.terminalinput;
		document.getElementById("command").focus();
	}

	this.su = function(data){
		if (data.length>2){
			this.output("<span class='red'>Error: su takes exactly one argument</span><br>");
		} else if (data.length == 1){
			this.output("<span class='red'>Error: root has been disabled on this system</span><br>");
		} else {
			this.suFlag = true;
			this.suData = data[1];
			document.getElementById("terminaloutput").innerHTML+="Password: "+this.terminalinput;
			document.getElementById("command").type = "password";
			document.getElementById("command").focus();
		}
	}

	this.changeUser = function(username,password,nostack=false){
		var xmlhttp = new XMLHttpRequest();
		var t = this;
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState === XMLHttpRequest.DONE) {
				if (xmlhttp.status === 200) {
					if (xmlhttp.responseText=="error"){
						t.output("<span class='red'>Error: incorrect username / password</span><br>");
					} else {
						t.openEnvironment(username,password,xmlhttp.responseText,nostack);
					}
				} else {
					t.output("<span class='red'>Error: connection lost</span><br>");
				}
			}
		};
		xmlhttp.open("POST", "commands.php", true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send("command=su&cwd="+this.cwd+"&username="+username+"&password="+password);
	}

	this.openEnvironment = function(username,password,usergreet,nostack){
		document.getElementById("greet").innerHTML = this.computerGreeting;
		document.getElementById("usergreet").innerHTML = usergreet;
		document.getElementById("terminaloutput").innerHTML = "";
		if (!nostack){
			//console.log("push to envstack");
			var u = {"username":username,"password":password};
			this.envstack.push(u);
		}
		this.history = [];
		this.historypointer = -1;
		setCookie("username",username,10000);
		setCookie("password",password,10000);
		this.username = username;
		this.password = password;
		this.output("");
	}
}

function start(){
	var t = new Terminal();
	t.init();
}

window.onload = start;
