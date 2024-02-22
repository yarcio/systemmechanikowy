<?php
session_start();
session_destroy();
?>
<script src="/js/main.js"></script>
<p>Imie:<br /><input type='text' id='imie'/></p>
<p>Nazwisko:<br /><input type='text' id='nazwisko'/></p>
<p>Data urodzenia:<br /><input type='date' id='dataUr'/></p>
<p>Numer telefonu:<br /><input type='text' id='nrTel'/></p>
<p>Płeć: <output id="jakaplec">0</output><br>
    K<input id="plec" type="range" min="-1" max="1" step="0.01" oninput="sliderRefresh()" value=0>M</p>
<p>Nazwa użytkownika:<br /><input type='text' id='nazwa'/></p>
<p>Hasło:<br /><input type="password" id="haslo"/></p>
<p>Potwierdź hasło:<br /><input type="password" id="powtwierdzhaslo"/></p>
<button onclick="rejestracja()">Zarejestruj</button>