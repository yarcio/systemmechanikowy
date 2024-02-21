<!DOCTYPE html>
<html lang="pl-PL">
	<head>
	    <meta charset="UTF-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	    <title>MECHANIK Z PASJI</title>
		<link rel="stylesheet" href="stylesheet/style.css">
	</head>
	<body>
	    <h1>WITAMY U <i>Mechanika z pasji</i></h1>
		<div class="pad">
			<div class="kolumna">
			<form action="/" method="POST">
    <input type="text" name="username" required/>
    <input type="password" name="password" required/>
    <input type="submit" name="submit" title="zaloguj" />
</form>
<?php
session_start();
session_destroy();
if (isset($_POST["submit"])) {
    include $_SERVER["DOCUMENT_ROOT"]."/php/main.php";
    login($_POST["username"], $_POST["password"]);
}
?>
			</div>
		</div>
	</body>
</html>