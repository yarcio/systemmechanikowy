<?php
include $_SERVER["DOCUMENT_ROOT"] . "/php/main.php";
checklogin("m");
?>

<!DOCTYPE html>
<html lang="pl-PL">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mechanik z pasji</title>
    <link rel="shortcut icon" href="../icon.png" type="image/x-icon">
    <link rel="stylesheet" href="../stylesheet/stylemechanik.css?<?php echo time(); ?>">
</head>

<body>
    <h1><a href="/"><img src="../powrot.png" alt="powrot"></a>MECHANIK</h1>
    <script src="/js/main.js"></script>
    <div id="data"></div>
    <script>initMechanik();</script>
</body>

</html>