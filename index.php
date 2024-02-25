<!DOCTYPE html>
<html lang="pl-PL">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Mechank z pasji</title>
	<link rel="stylesheet" type="text/css" href="stylesheet/style.css?<?php echo time(); ?>">
</head>

<body>
	<form action="/" method="POST">
		<div class="margines">
			<div class="padding">
				<h1><b>Mechanik z pasji</b></h1>
				<input type="text" name="username" placeholder="NAZWA" required /><br>
				<input type="password" name="password" placeholder="HASŁO" required /><br>
				<div class="rejestracja"><a href="/rejestracja.php">Nie masz konta?</a></div>
				<div class="alignl"><input type="submit" name="submit" value="ZALOGUJ" /></div>
				<?php
				session_start();
				session_destroy();
				if (isset($_POST["submit"])) {
					include $_SERVER["DOCUMENT_ROOT"] . "/php/main.php";
					login($_POST["username"], $_POST["password"]);
				}
				?>
	</form>
	</div>
	</div>
	<p id="podpis">Mateusz Wachnik, Jan Walczak, Adam Rutecki i może Igor Zygmunt, ale tak 50/50</p>
</body>

</html>