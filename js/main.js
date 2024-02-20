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
    return await response.json();
    // let x = await response.text();
    // console.log(x);
    // return JSON.parse(x);
  } catch (e) {
    console.error(e);
  }
}
class Osoba {
  constructor(id_osoba, imie, nazwisko, dataUr, nrTel, plec, nazwa) {
    this.nazwa = nazwa;
    this.id_osoba = id_osoba;
    this.imie = imie;
    this.nazwisko = nazwisko;
    this.dataUr = dataUr;
    this.nrTel = nrTel;
    this.plec = plec;
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
    let response = await sendData("setUpdOsoba", vars);
    alert(response);
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

  async getSamochod(pos = 0) {
    let response = await sendData("getSamochod");
    this.id_samochod = response[pos]["id_samochod"];
    this.marka = response[pos]["marka"];
    this.rocznik = response[pos]["rocznik"];
    this.przebiegWCm = response[pos]["przebwcm"];
    this.model = response[pos]["model"];
    this.rejestracja = response[pos]["rejestracja"];
    this.status = response[pos]["status"];
  }
  setSamochod() {

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
  wyplata() {
    //func
  }
  zwolnij() {
    //func
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

// var funcname = "test";
// var json = [3, 4];
// alert(await sendData(funcname, json)));
var kontoklient;
async function konto() {
  kontoklient = new Osoba();
  await kontoklient.getOsoba();
  document.getElementById("data").innerHTML = `<p>Imie:<br/><input type='text' id='imie' value='${kontoklient.imie}'/></p>
  <p>Nazwisko:<br/><input type='text' id='nazwisko' value='${kontoklient.nazwisko}'/></p>
  <p>Data urodzenia:<br/><input type='date' id='dataUr' value='${kontoklient.dataUr}'/></p>
  <p>Numer telefonu:<br/><input type='text' id='nrTel' value='${kontoklient.nrTel}'/></p>
  <p>Data urodzenia:<br/><input type='date' id='dataUr' value='${kontoklient.dataUr}'/></p>
  <p>Płeć: <output id="jakaplec">${kontoklient.plec}</output><br>
  K<input id="plec" type="range" min="-1" max="1" step="0.01" value=${kontoklient.plec} oninput="sliderRefresh()">M</p>
  <p>Nazwa użytkownika:<br/><input type='text' id='nazwa' value='${kontoklient.nazwa}'/></p>
  <p>Hasło:<br/><input type="password" id="haslo"/></p>
  <p>Potwierdź hasło:<br/><input type="password" id="powtwierdzhaslo"/></p>
  <p><input type="submit" value="Zaktualizuj" onclick="zaktualizujKonto()"/></p>`;
}
function zaktualizujKonto() {
  if (document.getElementById("haslo").value != document.getElementById("powtwierdzhaslo").value) alert("Hasła nie są takie same!");
  else if (document.getElementById("haslo").value.length < 4) alert("Hasło musi mieć przynajmniej 4 znaki!");
  else kontoklient.setUpdOsoba(document.getElementById("imie").value, document.getElementById("nazwisko").value, document.getElementById("dataUr").value, document.getElementById("nrTel").value, document.getElementById("plec").value, document.getElementById("nazwa").value, document.getElementById("haslo").value);

}
function sliderRefresh() {
  document.getElementById("jakaplec").innerHTML = document.getElementById("plec").value;
}
var klientObj;
var samochody;
async function listasamochody() {
  klientObj = new Klient();
  await klientObj.getKlient();

  let samochodCount = await klientObj.getCountSamochod();
  let divdatastr = `<p>Pieniądze: ${klientObj.pieniadzeWGroszach}gr</p>`;
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
  divdatastr += `<p>Oddaj samochód do serwisu <button onclick="oddaj()">Wypełnij dane</button></p>`;
  document.getElementById("data").innerHTML = divdatastr;
}
function czesci(i){
  // sprawdz czy nie ma zleceń 
  let rand = parseInt((((getRandomInt(10)**(getRandomInt(6)+1))/(getRandomInt(3)+1))+samochody[i].rocznik*(getRandomInt(2)+1))*100);
  if (confirm("Wycena to: " + rand + "gr, czy napewno chcesz sprzedać?")==true) samochody[i].naczesci(rand);
}
function zlomowanie(i) {
  // sprawdz czy nie ma zleceń 
  let rand = parseInt((samochody[i].rocznik*(getRandomInt(2)+1))*getRandomInt(10));
  if (confirm("Wycena to: " + rand + "gr, czy napewno chcesz zezłomować?")==true) samochody[i].zezlomowanie(rand);
}
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}