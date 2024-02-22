insert into osoba (imie, nazwisko, dataur, nrtel, plec, nazwa, haslo) values ("Jan", "Kowalski", "1987-01-30", "+48 235753093", 1, "kowal", md5("Janeczek1987")), ("Marcel", "Pomieszczenie", "2001-09-27", "+48 921345768", 0.31, "nomemes", md5("lubieplacki")), ("Andrzej", "Instrument", "1993-12-13", "+48 539903403", 0.01, "szkot", md5("4zboza")), ("Justyna", "Pawłowska", "1995-04-26", "+48 958389987", -0.73, "Justi5", md5("Kleofacy11")), ("Mozzarella", "Fittipaldi", "2003-05-17", "+48 432678354", -0.16, "MozItalia", md5("pizzaFerrari"));
insert into klient (osoba_id, pieniadzewgroszach) values (2, 1300), (4, 200);
insert into mechanik (osoba_id, wyplatawgroszach, datazatrudnienia, wyksztalcenie, etat) values (3, 530000, "2013-10-30", "Inżynier mechaniki samochodowej", "Mechanik z uprawnieniami na tokarkę"), (5, 320000, "2023-07-15", "Zawód elektryk samochodowy", "Elektryk samochodowy oraz pomocnik mechanika");
insert into samochod (id_wlasciciel, marka, rocznik, przebwcm, model, rejestracja, status) values (1, "Mercedes-AMG", 2022, 329353931, "One", "LBON258", "W trakcie serwisu"), (1, "Fiat", 2002, 47842329345, "Multipla", "GKA45764", "Do odbioru"), (2, "Ford", 2000, 51278529437, "Focus I RS", "KNT94681", "Do odbioru"), (2, "Mazda", 1995, 43135484293, "MX-5", "WY1982X", "Oczekuje na przyjęcie zlecenia, powód wizyty: Przegląd");
insert into zlecenie (mechanik_id, samochod_id, problem, datarozpoczecia, datazakonczenia) values (1, 1, "Wymiana silnika", "2024-02-20", NULL), (2, 2, "Wymiana akmulatora", "2024-02-22", "2024-02-22"), (1, 2, "Odświeżenie klocków hamulcowych", "2024-02-22", "2024-02-24"), (1, 3, "Usuwanie rdzy", "2023-07-30", "2023-08-10"), (2, 3, "Przegląd ogólny", "2023-07-28", "2023-07-29");





#hans K6. JaHans biggercanon
insert into osoba (imie, nazwisko, dataur, nrtel, plec, nazwa, haslo) values ("Hans", "Frank", "1900-05-23", "+49 000000000", 0.01, "JaHans", md5("biggercanon"));
insert into klient (osoba_id, pieniadzewgroszach) values (6, 5);
insert into samochod (id_wlasciciel, marka, rocznik, przebwcm, model, rejestracja, status) values (3, "Panzerkampfwagen", 1943, 93298209443, "V Panther", "12 SS-Panzer-Division Hitlerjugend", "W trakcie gruntownej renowacji");
insert into zlecenie (mechanik_id, samochod_id, problem, dataRozpoczecia, datazakonczenia) values (1, 5, "Wymiana lufy", "1945-03-23", null);