<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../stylesheet/styleklient.css?<?php echo time(); ?>">
  <title>Mechanik z pasji</title>
</head>
<body>
<h1>KLIENT</h1>
<script src="/js/main.js"></script>
<div id="data">
  <p>Pieniądze: 1300gr</p>
  <p>
    <table>
      <caption>Lista twoich samochodów</caption>
      <tr><th>Marka</th><th>Rocznik</th><th>Przebieg</th><th>Model</th><th>Rejestracja</th><th>Status</th><th>Działania</th></tr>
      <tr><td>Mercedes-AMG</td><td>2022r.</td><td>329353931cm</td><td>One</td><td>LBON258</td><td>W trakcie serwisu</td><td><button onclick="zlecenie(0)">Podgląd dokonywanych prac</button><br><button onclick="zlomowanie(0)">Zezłomuj</button><br><button onclick="czesci(0)">Sprzedaj na części</button></td></tr>
      <tr><td>Fiat</td><td>2002r.</td><td>47842329345cm</td><td>Multipla</td><td>GKA45764</td><td>Do odbioru</td><td><button onclick="odbierz(1)">Odbierz</button><br><button onclick="zlomowanie(1)">Zezłomuj</button><br><button onclick="czesci(1)">Sprzedaj na części</button></td></tr>
    </table>
  </p>
  <p>Oddaj samochód do serwisu <button onclick="dodajsamochod()">Wypełnij dane</button></p>
  <p><button onclick="konto()">Twoje konto</button></p></div>
<script>initKlient();</script></body>
