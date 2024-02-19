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
  } catch (e) {
    console.error(e);
  }
}
class Osoba {
  constructor(id_osoba, imie, nazwisko, dataUr, nrTel, plec, nazwa) {
    this.nazwa=nazwa;
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
  constructor(id_osoba, imie, nazwisko, dataUr, nrTel, plec, nazwa, id_klient, samochody, pieniadzeWGroszach) {
    super(id_osoba, imie, nazwisko, dataUr, nrTel, plec, nazwa);
    this.id_klient = id_klient;
    this.samochody = samochody;
    this.pieniadzeWGroszach = pieniadzeWGroszach;
  }
  setUpdPieniadze() {
    
  }
  setPieniadze() {

  }
  getPieniadze() {

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
  wyplata() {
    //func
  }
  zwolnij() {
    //func
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
  console.log(kontoklient)
  document.getElementById("data").innerHTML = `<p>Imie:<br/><input type='text' id='imie' value='` +kontoklient.imie+`'/></p>
  <p>Nazwisko:<br/><input type='text' id='nazwisko' value='` +kontoklient.nazwisko+`'/></p>
  <p>Data urodzenia:<br/><input type='date' id='dataUr' value='` +kontoklient.dataUr+`'/></p>
  <p>Numer telefonu:<br/><input type='text' id='nrTel' value='` +kontoklient.nrTel+`'/></p>
  <p>Data urodzenia:<br/><input type='date' id='dataUr' value='` +kontoklient.dataUr+`'/></p>
  <p>Płeć: <output id="jakaplec">` +kontoklient.plec+ `</output><br>
  K<input id="plec" type="range" min="-1" max="1" step="0.01" value=` +kontoklient.plec+ ` oninput="sliderRefresh()">M</p>
  <p>Nazwa użytkownika:<br/><input type='text' id='nazwa' value='` +kontoklient.nazwa+`'/></p>
  <p>Hasło:<br/><input type="password" id="haslo"/></p>
  <p>Potwierdź hasło:<br/><input type="password" id="powtwierdzhaslo"/></p>
  <p><input type="submit" value="Zaktualizuj" onclick="zaktualizujKonto()"/></p>`;
}
function zaktualizujKonto() {
  if (document.getElementById("haslo").value!=document.getElementById("powtwierdzhaslo").value) alert("Hasła nie są takie same!");
  else if (document.getElementById("haslo").value.length<4) alert("Hasło musi mieć przynajmniej 4 znaki!");
  else kontoklient.setUpdOsoba(document.getElementById("imie").value, document.getElementById("nazwisko").value, document.getElementById("dataUr").value, document.getElementById("nrTel").value, document.getElementById("plec").value, document.getElementById("nazwa").value, document.getElementById("haslo").value);

}
function sliderRefresh() {
  document.getElementById("jakaplec").innerHTML = document.getElementById("plec").value;
}