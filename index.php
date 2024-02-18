<!DOCTYPE html>
<html lang="pl-PL">
	<head>
	    <meta charset="UTF-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	    <title>MECHANIK Z PASJI</title>
		<style>
			body {
				margin: 0;
				padding: 0;
			}
			h1 {
				background-color: rgb(2, 32, 2);
				color: rgb(204, 204, 204);
				margin: 0;
				padding: 20px;
				font-size: 50px;
			}
			h2 {
				padding: 10px;
				font-size: 30px;
			}
			.pad {
				padding: 5px;
			}
			a {
				text-decoration: none;
				padding: 6px;
				display: block;
				text-align: center;
				border-radius: 10px 10px;
				border: 2px rgb(15, 17, 31) solid;
				width: 70%;
				background-color: rgb(85, 92, 92);
				color: rgb(15, 17, 31);
				margin-left: auto;
				margin-right: auto;
				box-shadow: 0.3em 0.3em  1em rgba(53, 53, 53, 0.6);
			}
			.kolumna {
				width: calc(100%/3);
				margin-left: auto;
				margin-right: auto;
				float: left;
			}
			img {
				width: 90%;
				height: 250px;
				margin-left: 5%;
				margin-right: 5%;
			}
		</style>
	</head>
	<body>
	    <h1>WITAMY U <i>Mechanika z pasji</i></h1>
		<div class="pad">
			<div class="kolumna">
			<form action="/" method="POST">
    <input type="text" name="username" required/>
    <input type="password" name="password" required/>
    <input type="submit" name="submit"/>
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