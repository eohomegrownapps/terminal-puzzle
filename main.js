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
	this.username = "jbloggs";
	this.password = "Password1";
	this.terminalName = "imnotcreative";
        //this.computerGreeting = " ▄████████    ▄████████ ███▄▄▄▄   ████████▄   ▄█  ████████▄  ████████▄   ▄██████▄     ▄████████<br/> ███    ███   ███    ███ ███▀▀▀██▄ ███   ▀███ ███  ███   ▀███ ███   ▀███ ███    ███   ███    ███<br/> ███    █▀    ███    ███ ███   ███ ███    ███ ███▌ ███    ███ ███    ███ ███    ███   ███    █▀<br/>███          ███    ███ ███   ███ ███    ███ ███▌ ███    ███ ███    ███ ███    ███   █</br>███        ▀███████████ ███   ███ ███    ███ ███▌ ███    ███ ███    ███ ███    ███ ▀███████████<br/> ███    █▄    ███    ███ ███   ███ ███    ███ ███  ███    ███ ███    ███ ███    ███          ███<br/> ███    ███   ███    ███ ███   ███ ███   ▄███ ███  ███   ▄███ ███   ▄███ ███    ███    ▄█    ███<br/> ████████▀    ███    █▀   ▀█   █▀  ████████▀  █▀   ████████▀  ████████▀   ▀██████▀   ▄████████▀";
	//this.computerGreeting = "   ____                     ____                ____   ___   ___   ___  <br>  / ___|___  _ __ ___  _ __/ ___| _   _ ___    |___ \\ / _ \\ / _ \\ / _ \\ <br> | |   / _ \\| '_ ` _ \\| '_ \\___ \\| | | / __|     __) | | | | | | | | | |<br> | |__| (_) | | | | | | |_) |__) | |_| \\__ \\    / __/| |_| | |_| | |_| |<br>  \\____\\___/|_| |_| |_| .__/____/ \\__, |___/   |_____|\\___/ \\___/ \\___/ <br>                      |_|         |___/                                 <br><br>THIS 'CompSys 2000' COMPUTER SYSTEM IS LICENSED TO VERONICS INC. NO UNAUTHORISED ACCESS.";
	//this.computerGreeting = "          _             _                   _             _             _        _            _            _            _<br/>        /\ \           / /\                /\ \     _    /\ \          /\ \     /\ \         /\ \         /\ \         / /\<br/>       /  \ \         / /  \              /  \ \   /\_\ /  \ \____     \ \ \   /  \ \____   /  \ \____   /  \ \       / /  \<br/>      / /\ \ \       / / /\ \            / /\ \ \_/ / // /\ \_____\    /\ \_\ / /\ \_____\ / /\ \_____\ / /\ \ \     / / /\ \__<br/>     / / /\ \ \     / / /\ \ \          / / /\ \___/ // / /\/___  /   / /\/_// / /\/___  // / /\/___  // / /\ \ \   / / /\ \___\<br/>    / / /  \ \_\   / / /  \ \ \        / / /  \/____// / /   / / /   / / /  / / /   / / // / /   / / // / /  \ \_\  \ \ \ \/___/<br/>   / / /    \/_/  / / /___/ /\ \      / / /    / / // / /   / / /   / / /  / / /   / / // / /   / / // / /   / / /   \ \ \<br/>  / / /          / / /_____/ /\ \    / / /    / / // / /   / / /   / / /  / / /   / / // / /   / / // / /   / / /_    \ \ \<br/> / / /________  / /_________/\ \ \  / / /    / / / \ \ \__/ / /___/ / /__ \ \ \__/ / / \ \ \__/ / // / /___/ / //_/\__/ / /<br/>/ / /_________\/ / /_       __\ \_\/ / /    / / /   \ \___\/ //\__\/_/___\ \ \___\/ /   \ \___\/ // / /____\/ / \ \/___/ /<br/>\/____________/\_\___\     /____/_/\/_/     \/_/     \/_____/ \/_________/  \/_____/     \/_____/ \/_________/   \_____\/";
        this.computerGreeting = "   ______                ___     ______  ____  _____ <br/>  / ____/___ _____  ____/ (_)___/ / __ &#92;/ __ &#92;/ ___/<br/> / /   / __ `/ __ &#92;/ __  / / __  / / / / / / /&#92;__ &#92; <br/>/ /___/ /_/ / / / / /_/ / / /_/ / /_/ / /_/ /___/ / <br/>&#92;____/&#92;__,_/_/ /_/&#92;__,_/_/&#92;__,_/_____/&#92;____//____/";
        this.terminalinput = '<input onblur="this.focus()" autofocus type="text" id="command">';
	this.cookieExpiryDays = 10000;
	this.getNameHTML = '<html><head><link href="https://fonts.googleapis.com/css?family=Source+Code+Pro:400,500,600,700&subset=latin-ext" rel="stylesheet"><style>#realwrap {transform: translate(-50%, -50%); left: 50%; position: absolute; top: 50%;} body {display: flex;justify-content: center;align-items: center;background-color: black;width: 99vw;}* {color: white;width: 50vw;font-size: 2vw;font-family: "Source Code Pro", monospace;}.link {text-decoration: underline;}input {-webkit-appearance:none;border: none;background-color: black;width: 25vw;}input:focus {outline: none;}#submit, #cancel {cursor:pointer;}#submit:hover, #cancel:hover {color: #aaaaaa;}</style><script>function setCookie(cname, cvalue, exdays) {var d = new Date();d.setTime(d.getTime() + (exdays*24*60*60*1000));var expires = "expires="+ d.toUTCString();document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";}var first = \'<p id="transmission">Welcome, challenger. Please enter your name so as the rewards of your victories can be given </p><br/><p>&gt; <input autofocus="autofocus" id="name"></input></p><input id="submit" type="submit" value="Submit" onmouseover="caret(this)" onmouseout="decaret(this)" onclick="subname(1)">\';var second = \'<p id="transmission">Your name is \';var third = \'? </p><br/><input id="submit" type="submit" value="Submit" onmouseover="caret(this)" onmouseout="decaret(this)" onclick="subname(2)"><input id="cancel" type="submit" value="Cancel" onmouseover="caret(this)" onmouseout="decaret(this)" onclick="ret()">\';var name;function caret(e) {e.value = "> " + e.value + " <";}function decaret(e) {e.value = e.value.substring(2, e.value.length-2);}function subname(attempt) {if (attempt == 1 && document.getElementById("name").value.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(\s\g,"") != "") {name = document.getElementById("name").value;document.getElementById("realWrap").innerHTML = second + name + third;}else if (attempt == 2) {setCookie("realname", name, 10000);location.reload();}}function ret() {document.getElementById("realWrap").innerHTML = first;}</script></head><body><div id="container">';
        this.getNameHTML2 = '<center id="realWrap"><p id="transmission">Welcome, challenger. Please enter your name so as the rewards of your victories can be given </p><br/><p>&gt; <input autofocus="autofocus" id="name"></input></p><input id="submit" type="submit" value="Submit" onmouseover="caret(this)" onmouseout="decaret(this)" onclick="subname(1)"></center></div></body></html>';
	this.suFlag = false;
	this.suData = "";
	this.envstack = [];
	this.history = [];
	this.historypointer = -1;

	this.init = function(){
                if (getCookie("realname") == "") {
                       document.write(this.getNameHTML + this.getNameHTML2);
                }

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
					t.output(xmlhttp.responseText);
				} else {
					t.output("<span class='red'>Error: connection lost</span><br>");
				}
			}
		};
		xmlhttp.open("POST", "commands.php", true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send("command="+command+"&username="+this.username+"&password="+this.password);
	}

	this.output = function(text){
		if (document.contains(document.getElementById("command"))) {
			document.getElementById("terminaloutput").removeChild(document.getElementById("command"));
		}
		document.getElementById("terminaloutput").innerHTML+=text+"<span class='bold'>"+this.username+"@"+this.terminalName+":~ $ </span>"+this.terminalinput;
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
		xmlhttp.send("command=su&username="+username+"&password="+password+"&contestant="+escape(getCookie("realname")));
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
