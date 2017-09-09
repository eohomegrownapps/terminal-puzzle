<?php
$user = '{
	"jbloggs": {
		"password": "Password1",
		"greeting": "Welcome, Joe Bloggs. Your security clearance level is 1.",
		"files": {
			"MyTest.txt": "boehgowajopwejaofpnwongpw",
			"OtherFile.txt": "Lorem ipsum dolor sit amet",
			"secret_password": "The password to jdoe\u0027s account is <br>123456789"
		}
	},
	"jdoe": {
		"password": "123456789",
		"greeting": "Welcome, John Doe. Your security clearance level is 2.",
		"files": {
			"blah.txt": "123456789<br>12345678<br>234567<br>2345678",
                        "mydir": {
                            "test.txt": "blah"
                        }
		}
	}
}';
?>
