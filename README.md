Przeglądarka repozytoriów githuba


Lokalne uruchomienie:
(Do lokalnego uruchomienia potrzebny jest zainstalowany node.js)
1. Pobieramy wszystkie pliki.
2. Uruchamiamy terminal i wchodzimy do folderu gdzie pobraliśmy pliki.
3. Wpisujemy polecenie "npm install".
4. Wpisujemy polecenie "npm start".
Gdy wszystko przebiegnie pomyślnie otworzy się nowa karta przeglądarki z aplikacją.



Uwagi/komentarze:
API githuba nie udostępnia nam sortowania po liczbie gwiazdek, przez co gdy chcemy otrzymać poprawne sortowanie musimy pobrać wszystkie repozytoria i dopiero je posortować, 
co wydłuża czas pobierania danych. Czasami trzeba wysłać kilka zapytań, ponieważ można pobrać do 100 rekordów za jednym zapytaniem.
Sortowanie po liczbie gwiazdek po stronie serwera, umożliwiłoby to paginację pobieranych danych.
Aktualnie też można by było wyświetlać dane po kawałku by słabsze urządzenia nie miały problemów z wrzucaniem pokaźnej ilości treści, jednak obecnie nie 
jest to zaimplementowane i wszystkie dane wyświetlane są jednocześnie.

Założenia/Uproszczenia:
Ekran o minimalnej szerokości 480px.
Jest ograniczenie wysyłanych zapytań do API githuba do 60 na godzinę.


