async function main() {
  async function sendData(func, vars) {
    const formData = new FormData();
    formData.append("func", func);
    if (vars != null) formData.append("vars", vars);
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
    constructor(id_osoba, imie, nazwisko, dataUr, nrTel, plec) {
      this.id_osoba = id_osoba;
      this.imie = imie;
      this.nazwisko = nazwisko;
      this.dataUr = dataUr;
      this.nrTel = nrTel;
      this.plec = plec;
    }
    setOsoba() {

    }
    zadzwon() {
      window.open("tel:" + this.nrTel);
    }
  }
  class Klient extends Osoba {
    constructor(id_osoba, imie, nazwisko, dataUr, nrTel, plec, id_klient, samochody, pieniadzeWGroszach) {
      super(id_osoba, imie, nazwisko, dataUr, nrTel, plec);
      this.id_klient = id_klient;
      this.samochody = samochody;
      this.pieniadzeWGroszach = pieniadzeWGroszach;
    }
  }
  class Mechanik extends Osoba {
    constructor(id_osoba, imie, nazwisko, dataUr, nrTel, plec, id_mechanik, wyplataWGroszach, dataZatrudnienia, wyksztalcenie, etat) {
      super(id_osoba, imie, nazwisko, dataUr, nrTel, plec);
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
  // alert(await sendData(funcname, JSON.stringify(json)));
}
main();