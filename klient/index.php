<?php
include $_SERVER["DOCUMENT_ROOT"]."/php/main.php";
checklogin("k");
?>
klient<a href="konto.php">konto</a>
<script src="/js/main.js"></script>
<div id="data"></div>
<script>listasamochody();</script>