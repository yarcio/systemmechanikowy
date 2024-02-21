//unique username test
async function sendData(func, vars) {
  const formData = new FormData();
  formData.append("func", func);
  if (vars != null) formData.append("vars", JSON.stringify(vars));
  try {
    const response = await fetch("/php/main.php", {
      method: "POST",
      body: formData,
    });

    // return await response.json();
    let x = await response.text();
    console.log(x);
    return JSON.parse(x);
    //^ Debug only
  } catch (e) {
    console.error(e);
  }
}
class Osoba {
  constructor(id_osoba, imie, nazwisko, dataUr, nrTel, plec, nazwa) {
    this.id_osoba = id_osoba;
    this.imie = imie;
    this.nazwisko = nazwisko;
    this.dataUr = dataUr;
    this.nrTel = nrTel;
    this.plec = plec;
    this.nazwa = nazwa;
  }
  async getOsoba(pos = 0) {
    let response = await sendData("getOsoba");
    this.id_osoba = response[pos]["id_osoba"];
    this.imie = response[pos]["imie"];
    this.nazwisko = response[pos]["nazwisko"];
    this.dataUr = response[pos]["dataUr"];
    this.nrTel = response[pos]["nrTel"];
    this.plec = response[pos]["plec"];
    this.nazwa = response[pos]["nazwa"];
  }
  setOsoba() {

  }
  async setUpdOsoba(imie, nazwisko, dataUr, nrTel, plec, nazwa, haslo) {
    let vars = [imie, nazwisko, dataUr, nrTel, plec, nazwa, haslo];
    await sendData("setUpdOsoba", vars);
    this.imie = imie;
    this.nazwisko = nazwisko;
    this.dataUr = dataUr;
    this.nrTel = nrTel;
    this.plec = plec;
    this.nazwa = nazwa;
    alert("Zaktualizowano dane");
  }
  zadzwon() {
    window.open("tel:" + this.nrTel);
  }
}
class Klient extends Osoba {
  constructor(id_osoba, imie, nazwisko, dataUr, nrTel, plec, nazwa, id_klient, pieniadzeWGroszach) {
    super(id_osoba, imie, nazwisko, dataUr, nrTel, plec, nazwa);
    this.id_klient = id_klient;
    this.pieniadzeWGroszach = pieniadzeWGroszach;
  }
  setUpdPieniadze() {

  }
  setRPieniadze() {

  }
  async getKlient(pos = 0, posK = 0) {
    let response = await sendData("getOsoba");
    this.id_osoba = response[pos]["id_osoba"];
    this.imie = response[pos]["imie"];
    this.nazwisko = response[pos]["nazwisko"];
    this.dataUr = response[pos]["dataUr"];
    this.nrTel = response[pos]["nrTel"];
    this.plec = response[pos]["plec"];
    this.nazwa = response[pos]["nazwa"];
    response = await sendData("getKlient");
    this.id_klient = response[posK]["id_klient"];
    this.pieniadzeWGroszach = response[posK]["pieniadzewgroszach"];
  }
  async getCountSamochod() {//id
    let response = await sendData("getCountSamochod");
    return response;
  }

}
class Samochod {
  constructor(id_samochod, marka, rocznik, przebiegWCm, model, rejestracja, status) {
    this.id_samochod = id_samochod;
    this.marka = marka;
    this.rocznik = rocznik;
    this.przebiegWCm = przebiegWCm;
    this.model = model;
    this.rejestracja = rejestracja;
    this.status = status;
  }

  async getSamochod(start = 0, count = 1, id = null, pos = 0) {
    let response = await sendData("getSamochod", [start, count, id]);
    this.id_samochod = response[pos]["id_samochod"];
    this.marka = response[pos]["marka"];
    this.rocznik = response[pos]["rocznik"];
    this.przebiegWCm = response[pos]["przebwcm"];
    this.model = response[pos]["model"];
    this.rejestracja = response[pos]["rejestracja"];
    this.status = response[pos]["status"];
  }
  async addSamochod(marka, rocznik, przebiegWCm, model, rejestracja, status) {
    await sendData("addSamochod", [marka, rocznik, przebiegWCm, model, rejestracja, status]);
    listasamochody();
  }
  async removeSamochod() {
    await sendData("removeSamochod", [this.id_samochod]);
    listasamochody();
  }
  async zezlomowanie(val) {
    alert("Zezłomowałeś samochód");
    await sendData("setUpdPieniadze", [val])
    this.removeSamochod();
  }
  async naczesci(val) {
    alert("Sprzedałeś samochód na części");
    await sendData("setUpdPieniadze", [val])
    this.removeSamochod();
  }
}
class Mechanik extends Osoba {
  constructor(id_osoba, imie, nazwisko, dataUr, nrTel, plec, nazwa, id_mechanik, wyplataWGroszach, dataZatrudnienia, wyksztalcenie, etat) {
    super(id_osoba, imie, nazwisko, dataUr, nrTel, plec, nazwa);
    this.id_mechanik = id_mechanik;
    this.wyplataWGroszach = wyplataWGroszach;
    this.dataZatrudnienia = dataZatrudnienia;
    this.wyksztalcenie = wyksztalcenie;
    this.etat = etat;
  }
  async getMechanik(pos = 0, posM = 0) {
    let response = await sendData("getOsoba");
    this.id_osoba = response[pos]["id_osoba"];
    this.imie = response[pos]["imie"];
    this.nazwisko = response[pos]["nazwisko"];
    this.dataUr = response[pos]["dataUr"];
    this.nrTel = response[pos]["nrTel"];
    this.plec = response[pos]["plec"];
    this.nazwa = response[pos]["nazwa"];
    response = await sendData("getMechanik");
    this.id_mechanik = response[posM]["id_mechanik"];
    this.wyplataWGroszach = response[posM]["wyplatawgroszach"];
    this.dataZatrudnienia = response[posM]["datazatrudnienia"];
    this.wyksztalcenie = response[posM]["wyksztalcenie"];
    this.etat = response[posM]["etat"];
  }
  async getCountAllSamochod() {
    let response = await sendData("getCountSamochod", ["all"]);
    return response;
  }
  wyplata() {
    console.log("Wypłata");
  }
  zwolnij() {
    console.log("Zwolnienie");
  }
}
class Zlecenie {
  constructor(id_mechanik, id_samochod, problem, dataRozpoczecia, dataZakonczenia) {
    this.id_mechanik = id_mechanik;
    this.id_samochod = id_samochod;
    this.problem = problem;
    this.dataRozpoczecia = dataRozpoczecia;
    this.dataZakonczenia = dataZakonczenia;
  }
}
async function konto() {
  document.getElementById("data").innerHTML = `<p>Imie:<br/><input type='text' id='imie' value='${user.imie}'/></p>
  <p>Nazwisko:<br/><input type='text' id='nazwisko' value='${user.nazwisko}'/></p>
  <p>Data urodzenia:<br/><input type='date' id='dataUr' value='${user.dataUr}'/></p>
  <p>Numer telefonu:<br/><input type='text' id='nrTel' value='${user.nrTel}'/></p>
  <p>Płeć: <output id="jakaplec">${user.plec}</output><br>
  K<input id="plec" type="range" min="-1" max="1" step="0.01" value=${user.plec} oninput="sliderRefresh()">M</p>
  <p>Nazwa użytkownika:<br/><input type='text' id='nazwa' value='${user.nazwa}'/></p>
  <p>Hasło:<br/><input type="password" id="haslo"/></p>
  <p>Potwierdź hasło:<br/><input type="password" id="powtwierdzhaslo"/></p>
  <p><button onclick="backKonto()">Powrót</button> <input type="submit" value="Zaktualizuj" onclick="zaktualizujKonto()"/></p>`;
  //sprawdź unikatowość nazwy użytkownika NAJLEPIEJ PRZED
}
function backKonto() {
  if (mode == "k") listasamochody();
  else if (mode == "m") listazlecenia();
  else window.location("/");
}
function zaktualizujKonto() {
  if (document.getElementById("haslo").value != document.getElementById("powtwierdzhaslo").value) alert("Hasła nie są takie same!");
  else if (document.getElementById("haslo").value.length < 4) alert("Hasło musi mieć przynajmniej 4 znaki!");
  else user.setUpdOsoba(document.getElementById("imie").value, document.getElementById("nazwisko").value, document.getElementById("dataUr").value, document.getElementById("nrTel").value, document.getElementById("plec").value, document.getElementById("nazwa").value, document.getElementById("haslo").value);

}
function sliderRefresh() {
  document.getElementById("jakaplec").innerHTML = document.getElementById("plec").value;
}
var mode;
var user;
var samochody;
async function initKlient() {
  mode = "k";
  user = new Klient();
  await user.getKlient();
  listasamochody();
}
async function listasamochody() {
  let samochodCount = await user.getCountSamochod();
  let divdatastr = `<p>Pieniądze: ${user.pieniadzeWGroszach}gr</p>`;
  if (samochodCount > 0) {
    samochody = [];
    divdatastr += `<p><table><caption>Lista twoich samochodów</caption><tr><th>Marka</th><th>Rocznik</th><th>Przebieg</th><th>Model</th><th>Rejestracja</th><th>Status</th><th>Działania</th></tr>`;
    for (let i = 0; i < samochodCount; i++) {
      samochody[i] = new Samochod();
      await samochody[i].getSamochod(i);
      divdatastr += `<tr><td>${samochody[i].marka}</td><td>${samochody[i].rocznik}r.</td><td>${samochody[i].przebiegWCm}cm</td>
    <td>${samochody[i].model}</td><td>${samochody[i].rejestracja}</td><td>${samochody[i].status}</td><td>`;
      if (samochody[i].status != "Do odbioru") divdatastr += `<button onclick="zlecenie(${i})">Podgląd dokonywanych prac</button>`;
      else divdatastr += `<button onclick="odbierz(${i})">Odbierz</button>`;
      divdatastr += `<br/><button onclick="zlomowanie(${i})">Zezłomuj</button><br/><button onclick="czesci(${i})">Sprzedaj na części</button></td></tr>`;
    }
    divdatastr += `</table></p>`;
  } else {
    divdatastr += `<p>Nie masz jeszcze samochodu w naszym serwisie</p>`;
  }
  divdatastr += `<p>Oddaj samochód do serwisu <button onclick="dodajsamochod()">Wypełnij dane</button></p>
  <p><button onclick='konto()'>Twoje konto</button></p>`;
  document.getElementById("data").innerHTML = divdatastr;
}
var nowysamochod;
function dodajsamochod() {
  nowysamochod = new Samochod();
  document.getElementById("data").innerHTML = `
  <p>Marka:<br/><input type="text" id="marka"/></p>
  <p>Rocznik:<br/><input type="number" id="rocznik"/></p>
  <p>Przebieg (cm):<br/><input type="number" id="przebieg"/></p>
  <p>Model:<br/><input type="text" id="model"/></p>
  <p>Rejestracja:<br/><input type="text" id="rejestracja"/></p>
  <p>Powód odwiedzin w serwisie:<br/><input type="text" id="status"/></p>
  <button onclick="listasamochody()">Anuluj</button> 
  <button onclick='nowysamochod.addSamochod(document.getElementById("marka").value, document.getElementById("rocznik").value, document.getElementById("przebieg").value, document.getElementById("model").value, document.getElementById("rejestracja").value, "Oczekuje na przyjęcie zlecenia, powód wizyty: " + document.getElementById("status").value)'>Zatwierdź</button>`;
}
function czesci(i) {
  let rand = parseInt((((getRandomInt(10) ** (getRandomInt(6) + 1)) / (getRandomInt(3) + 1)) + samochody[i].rocznik * (getRandomInt(2) + 1)) * 100);
  if (confirm("Wycena to: " + rand + "gr, czy napewno chcesz sprzedać? Działanie te anuluje wszystkie zlecenia") == true) samochody[i].naczesci(rand);
}
function zlomowanie(i) {
  let rand = parseInt((samochody[i].rocznik * (getRandomInt(2) + 1)) * getRandomInt(10));
  if (confirm("Wycena to: " + rand + "gr, czy napewno chcesz zezłomować? Działanie te anuluje wszystkie zlecenia") == true) samochody[i].zezlomowanie(rand);
}
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
async function initMechanik() {
  mode = "m";
  user = new Mechanik();
  await user.getMechanik();
  listazlecenia();
}
function mechanikinfo() {
  document.getElementById("data").innerHTML = `<p>Wypłata miesięczna:<br/>${user.wyplataWGroszach}gr</p>
  <p>Data zatrudnienia:<br/>${user.dataZatrudnienia}</p>
  <p>Wykształcenie:<br/>${user.wyksztalcenie}</p>
  <p>Etat:<br/>${user.etat}</p>
  <p><button onclick="listazlecenia()">Powrót</button></p>`;
}
async function listazlecenia() {
  let divdatastr = "";
  divdatastr += `<p>Podejmij się nowego zlecenia <button onclick="nowezlecenie()">Wybierz samochód</button></p>
  <p><button onclick='konto()'>Twoje konto</button> <button onclick="mechanikinfo()">Informacje o tobie</button></p>`;
  document.getElementById("data").innerHTML = divdatastr;
}
var textarea;
async function nowezlecenie() {
  let samochodCount = await user.getCountAllSamochod();
  console.log(samochodCount);
  let divdatastr = "";
  if (samochodCount > 0) {
    samochody = [];
    divdatastr += `<p><table><caption>Lista samochodów w serwisie</caption><tr><th>Marka</th><th>Rocznik</th><th>Przebieg</th><th>Model</th><th>Rejestracja</th><th>Status</th><th>Działania</th></tr>`;
    for (let i = 0; i < samochodCount; i++) {
      samochody[i] = new Samochod();
      await samochody[i].getSamochod(i, 1, "all");
      divdatastr += `<tr><td>${samochody[i].marka}</td><td>${samochody[i].rocznik}r.</td><td>${samochody[i].przebiegWCm}cm</td>
    <td>${samochody[i].model}</td><td>${samochody[i].rejestracja}</td><td><textarea oninput="autoResize(this);" onclick="autoResize(this);" spellcheck="false" id="status${i}">${samochody[i].status}</textarea></td><td>`;
      divdatastr += `<button onclick="podejmijzlecenie(${i})">Podejmij się zlecenia</button><br/><button onclick="zmienstatus(${i})">Zmień status</button><br/>
      <button onclick="kradziez(${i})">Ukradnij</button></td></tr>`;
    }
    divdatastr += `</table></p>`;
  } else {
    divdatastr += `<p>Nie ma aktualnie samochodów w serwisie</p>`;
  }
  // textarea = document.getElementsByClassName("textAreaResize");
  // textarea.addEventListener('input', autoResize, false);
  divdatastr += `<p><button onclick="listazlecenia()">Powrót</button></p>`;
  document.getElementById("data").innerHTML = divdatastr;
}


function autoResize(a) {
  a.style.height = 'auto';
  a.style.height = a.scrollHeight + 'px';
}