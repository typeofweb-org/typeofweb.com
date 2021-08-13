---
index: 37
title: Symlink, zip i upload plików – łatwo padniesz łupem hackera
date: 2017-10-17T11:45:29.000Z
isMarkdown: false
status: publish
permalink: symlink-zip-upload-plikow-dla-hackera
authors:
  - michal-miszczyszyn
type: post
thumbnail:
  url: https://res.cloudinary.com/type-of-web/wp-content/uploads/2017/10/hacking-1685092_1920.jpg
  width: 1920
  height: 1439
categories:
  - slug: dobry-kod
    name: Dobry Kod
  - slug: back-end
    name: Back-end
seo:
  focusKeywords:
    - Symlink
  metadesc: >-
    Pozornie niewinne fragmenty kodu mogą prowadzić do katastrofy. Zip, symlink,
    upload plików – jeśli nie wiesz co mam na myśli to musisz przeczytać ten
    wpis!
---

Bardzo często ścieram się z sytuacjami gdzie ktoś kopiuje kod z Internetu do aplikacji bez zweryfikowania co ten kod do końca robi… Zresztą: Kto nie wykorzystał gotowca ze StackOverflow bez czytania opisu i komentarzy niech pierwszy rzuci kamień ;) Czasem jednak pozornie niewinne fragmenty kodu mogą doprowadzić do katastrofy. Weźmy prosty przykład: Upload plików. Wszystko działa, wszędzie prawidłowa sanityzacja i obsługa błędów… ale czy na pewno? <strong>Przeoczenie jednego małego szczegółu sprawia, że aplikacja staje się celem dla hackerów.</strong> Oto prawdziwa historia o symlinkach, zipach i uploadzie plików.

<h2>Projekt</h2>
Pewien czas temu pracowałem nad projektem dla sporej firmy, której danych nie chcę w tym momencie ujawniać. Na potrzeby tego wpisu możesz sobie wyobrazić aplikację, która pozwała użytkownikom wrzucać i wyświetlać różnego rodzaju aktualności – w tym dane statystyczne i liczbowe. W tym celu <strong>zaimplementowaliśmy możliwość wrzucania na serwer plików</strong>. Pliki te z założenia (wymagania od klienta) miały być archiwami ZIP, w środku których znajdowały się wyłącznie pliki tekstowe. Nazwa pliku była identyfikatorem, a treść najczęściej miała format CSV, czyli były to różne liczby lub tekst oddzielone od siebie przecinkami. Po wgraniu takiego archiwum, <strong>system miał je automatycznie rozpakować, a następnie od razu wyświetlić użytkownikowi ich treść.</strong>
<h2>Potencjalne dziury</h2>
Spostrzegawczy czytelnik na pewno dostrzega kilka miejsc, w których może znajdować się potencjalny błąd bezpieczeństwa:
<ul>
 	<li>pliki w archiwum nie są tekstowe – wykonanie kodu?</li>
 	<li>nazwy plików wyświetlane na stronie – miejsce na XSS?</li>
 	<li>treść pliku wyświetlana na stronie – XSS?</li>
</ul>
Jednak te fragmenty były dobrze zabezpieczone, poprawna sanityzacja oraz zawsze wczytywanie pliku jako tekstowy załatwiło sprawę. Co poszło nie tak? Spójrz na kod poniżej.
<h2>Omówienie kodu</h2>
Jest to uproszczona wersja tego fragmentu aplikacji napisana w PHP ( :( ). Pominąłem kilka nieistotnych operacji:
<pre class="line-numbers"><code class="language-php">&lt;?php

$uploaded_sheet_archive = $\_FILES['sheet_file']['tmp_name'];

if ($uploaded_sheet_archive) {
$sheets_dir = sys_get_temp_dir() . '/' . uniqid('archive', true);

    system('unzip -qq ' . escapeshellarg($uploaded_sheet_archive) . ' -d ' . $sheets_dir);

    $uploaded_sheets = array_values(array_diff(scandir($sheets_dir), array('.', '..')));

    foreach($uploaded_sheets as $key =&gt; $file) {
    	echo '&lt;section&gt;';
    	echo '&lt;h2&gt;File ' . ($key+1) . '&lt;/h2&gt;';
    	echo '&lt;pre&gt;' . htmlentities(file_get_contents($sheets_dir . '/' . $file)) . '&lt;/pre&gt;';
    	echo '&lt;/section&gt;';
    }

    system('rm -rf ' . escapeshellarg($sheets_dir));

}

?&gt;

&lt;form method="post" enctype="multipart/form-data" action="upload.php"&gt;
&lt;input type="file" name="sheet_file"&gt;
&lt;input type="submit" value="Send" accept=".zip"&gt;
&lt;/form&gt;
</code></pre>

<p class="important">Zamiast <code>system</code> można równie dobrze użyć <code>exec</code>, a zamiast <code>unzip</code> — <code>tar</code>. Zależnie od tego co oferuje akurat serwer, warto spróbować zamiennie kilku opcji.</p>
Omówię z grubsza co się tu dzieje:
<ul>
 	<li>5: sprawdź czy był wgrywany plik</li>
 	<li>6: wygeneruj ścieżkę do tymczasowego folderu o losowej nazwie, aby w nim rozpakować archiwum</li>
 	<li>8: rozpakuj plik używając systemowego unzip</li>
 	<li>10: pobierz listę plików z archiwum, pomiń <code>.</code> oraz <code>..</code></li>
 	<li>12–17: dla każdego pliku, wyświetl jego treść</li>
 	<li>19: skasuj rozpakowane archiwum</li>
 	<li>24–17: formularz do wrzucania plików</li>
</ul>
Należy zwrócić uwagę, że argumenty są raczej poprawnie sanityzowane (<code>escapeshellarg</code>, <code>htmlentities</code>). Tak wygląda skrypt po uruchomieniu:

<a href="https://res.cloudinary.com/type-of-web/wp-content/uploads/2017/10/Screenshot-2017-10-11-16.15.23.png"><img class="aligncenter size-large wp-image-571" src="https://res.cloudinary.com/type-of-web/wp-content/uploads/2017/10/Screenshot-2017-10-11-16.15.23-1024x545.png" alt="Skrypt upload.php" width="1024" height="545" /></a>

<h2>Błąd</h2>
Na czym polega błąd? Częściowo na bezmyślnym skopiowaniu kodu ze StackOverflow („Jak rozpakować ZIP w PHP?”), częściowo na użyciu funkcji system, <strong>ale głównie na braku weryfikacji czy archiwum nie zawiera symlinków</strong>.
<h3>Symlink</h3>
Co to jest symlink? Skrót od <em>symbolic link</em> – jest to wskazanie na inny plik lub folder. Można powiedzieć „skrót”, choć technicznie rzecz biorąc to różne pojęcia. W każdym razie, symlink wskazuje na inny plik. Gdy próbujemy otworzyć symlink, to tak jakbyśmy otwierali ten inny plik – super, prawda? :)
<h3>Symlink do <code>/etc/passwd</code></h3>
<strong>Co się stanie, jeśli w archiwum umieścimy symlink wskazujący na przykład na plik <code>/etc/passwd</code>?</strong> Sprawdźmy to! Jeśli chcesz sama/sam przetestować działanie skryptu, skopiuj powyższy kod do pliku i w tym samym folderze uruchom serwer PHP poleceniem <code>php -S localhost:8081</code>. Następnie odwiedź stronę <a href="http://localhost:8081/upload.php" target="_blank" rel="noopener">http://localhost:8081/upload.php</a> .

Na początek poprawne archiwum zawierające dwa pliki tekstowe. W drugim pliku umieściłem dodatkowo fragment HTML-a, aby pokazać, że znaczniki są poprawnie ignorowane:

<a href="https://res.cloudinary.com/type-of-web/wp-content/uploads/2017/10/Screenshot-2017-10-11-16.19.12.png"><img class="aligncenter size-full wp-image-672" src="https://res.cloudinary.com/type-of-web/wp-content/uploads/2017/10/Screenshot-2017-10-11-16.19.12.png" alt="Skrypt upload.php po wrzuceniu pliku" width="846" height="756" /></a>

Teraz preparuję złośliwe archiwum z symlinkiem do <code>/etc/passwd</code>:

<script type="text/javascript" src="https://asciinema.org/a/yCUFrZULLD8qK7iRS5Fg7sIlg.js" id="asciicast-yCUFrZULLD8qK7iRS5Fg7sIlg" async></script>
<ul>
 	<li><code>ln -s /etc/passwd ./moj-link</code></li>
 	<li><code>zip --symlinks -r -X archiwum.zip inny-plik.txt plik1.txt moj-link</code></li>
</ul>
Następnie taki plik wrzucam na stronie. Oto efekt:

<a href="https://res.cloudinary.com/type-of-web/wp-content/uploads/2017/10/Screenshot-2017-10-11-16.27.55.png"><img class="aligncenter size-large wp-image-674" src="https://res.cloudinary.com/type-of-web/wp-content/uploads/2017/10/Screenshot-2017-10-11-16.27.55-1024x851.png" alt="Atak ujawnia zawartość pliku /etc/passwd " width="1024" height="851" /></a>

Widoczna jest treść plik <code>/etc/passwd</code>, a w nim – nawet konto roota oraz wiele innych ciekawych rzeczy…

<h3>Inne zastosowania?</h3>
Właściwie <strong>możliwe jest teraz odczytanie dowolnego pliku z dysku</strong>. Oczywiście, poprawna konfiguracja użytkowników i uprawnień powinna to uniemożliwić. Czy wtedy atak jest bezużyteczny? Ależ nie! Nadal możemy przecież, metodą prób i błędów, albo bazując na jakichś innych przesłankach, odczytać dowolne pliki źródłowe aplikacji – w tym potencjalnie np. <strong>hasła do bazy danych</strong>.

Przykładowo, jeśli wiesz, że ten aplikacja na hostingu od <a href="http://www.mydevil.net/pp/9UVOSJRZIV" target="_blank" rel="noopener nofollow">MyDevil.net</a> to <em>najprawdopodobniej</em> ścieżka do głównego folderu to <code>/home/moj-login/domains/moja-domena.com/public_html</code> – łatwo można się o tym dowiedzieć jeśli po prostu założy się tam konto lub poczyta dokumentację. A wtedy spreparowanie odpowiedniego symlinka nie jest trudne i po wgraniu archiwum odczytujemy np. kod źródłowy pliku <code>upload.php</code>:

<a href="https://res.cloudinary.com/type-of-web/wp-content/uploads/2017/10/Screenshot-2017-10-11-16.29.21.png"><img class="aligncenter size-large wp-image-683" src="https://res.cloudinary.com/type-of-web/wp-content/uploads/2017/10/Screenshot-2017-10-11-16.29.21-1024x769.png" alt="Ujawniony kod źródłowy" width="1024" height="769" /></a>

<h2>Jak naprawić błąd?</h2>
Zrezygnować z wywołań funkcji <code>system</code> na rzecz innych, wbudowanych. Wpuszczenie niepowołanego kodu do funkcji <code>system</code> może mieć katastrofalne skutki. W tym przypadku do rozpakowania archiwum można skorzystać z klasy <code>ZipArchive</code>:
<pre><code class="language-php">$zip = new ZipArchive;
$res = $zip-&gt;open($uploaded_sheet_archive);
$zip-&gt;extractTo($sheets_dir);
$zip-&gt;close();</code></pre>
Ale przede wszystkim w tym przypadku: sprawdzać czy plik nie jest przypadkiem symlinkiem zanim się go otworzy – np. przez funkcję <code>is_link()</code>.
<h2>Podsumowanie</h2>
Chciałem napisać o tym ciekawym wektorze ataku, gdyż naprawdę natrafiliśmy na taki błąd, a korzystanie z funkcji <code>system('unzip …')</code> jest nagminne – nie tylko w PHP, ale też z jej odpowiedników w wielu innych językach (również NodeJS!). Mam nadzieję, że i Ciebie zainteresował ten sposób atakowania aplikacji.

Ale przede wszystkim morał z tego jest nieco inny: <strong>Nie kopiuj bezmyślnie kodu z Internetu</strong> :) Czytaj dokumentację, sprawdzaj dokładnie co robi dany kod i staraj się przewidzieć wszelkie konsekwencje.
