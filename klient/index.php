<?php
include $_SERVER["DOCUMENT_ROOT"]."/php/main.php";
checklogin("k");
?>
<head>
    <link rel="stylesheet" href="../stylesheet/styleklient.css">
</head>
<body>
<h1>KLIENT</h1>
<script src="/js/main.js"></script>
<div id="data"></div>
<script>initKlient();</script>
</body>