import Image from 'next/image';

import { Card } from '../atoms/Card';
import { LinkUnderlineEffect } from '../atoms/LinkUnderlineEffect';
import { SectionTitle } from '../atoms/SectionTitle';
import { ArticleMeta } from '../molecules/ArticleMeta';

import type { Author } from '../molecules/ArticleMeta';

interface SingleArticleProps {
  readonly coverUrl?: string;
  readonly id: number;
  readonly title: string;
  readonly authors: readonly Author[];
  readonly mainCategory: string;
  readonly href: string;
}

export const SingleArticle = ({ coverUrl, id, title, authors, mainCategory, href }: SingleArticleProps) => {
  return (
    <Card as="article" roundAllCorners={true} moreSpace={false}>
      <header className="bg-gray-200">
        <div className={`px-7 sm:px-8 lg:px-12 rounded-t-xl bg-gray-100 pb-4 ${coverUrl ? 'pt-6' : 'mb-6'}`}>
          <a href={href}>
            <SectionTitle size="large">
              {title}
              <span
                aria-label={`Artykuł numer ${id}`}
                title={`Artykuł numer ${id}`}
                className="text-stroke absolute -left-7 top-1 text-gray-500 font-sans text-xl font-semibold"
              >
                {id}
              </span>
            </SectionTitle>
          </a>
          <div className="article-content mt-4 pb-2">
            <p className="!font-bold">
              Wielu osobom wydaje się, że im stajemy się starsi, tym czas szybciej płynie. Mamy tysiące wspomnień ze
              wczesnej młodości, a później trudno nam odróżnić rok od roku. Ale czy aby na pewno tylko nam się wydaje?
              Czy to zjawisko jest jakoś opisane i uzasadnione?{' '}
            </p>
          </div>
          <div className="mt-2">
            <ArticleMeta authors={authors} mainCategory={mainCategory} />
          </div>
        </div>

        {coverUrl && (
          <div className="text-[length:0] -mx-4 mb-8 overflow-hidden">
            <Image
              width={800}
              height={450}
              className="duration-[10s] hover:scale-110 transition-transform ease-in hover:ease-out"
              src={coverUrl}
              alt=""
            />
          </div>
        )}
      </header>
      <div className="article-content prose lg:prose-xl pb-2 px-7 sm:px-8 lg:px-12">
        <h2>Gęstość zdarzeń a postrzeganie czasu</h2>
        <p>
          Pisanie czytelnego kodu sprawia wielu programistom ogromne kłopoty. Ta uwaga bynajmniej nie&nbsp;dotyczy
          wyłącznie osób początkujących, ale&nbsp;niestety także tych z&nbsp;latami doświadczenia. Z&nbsp;czego wynika
          problem? Jak sprawić, aby pisany kod był bardziej czytelny i&nbsp;przystępny? Co to&nbsp;jest czysty kod?
        </p>
        <p>
          Ostatnio mam okazję prowadzić webinary, warsztaty i&nbsp;szkolenia. Dodatkowo od&nbsp;dłuższego czasu staram
          się kontynuować inicjatywę{' '}
          <LinkUnderlineEffect>
            <a href="https://www.facebook.com/groups/1131907053499522/">Weekly JavaScript Challenge</a>
          </LinkUnderlineEffect>
          . Dzięki temu mam kontakt z&nbsp;wieloma programistami o&nbsp;różnym poziomie doświadczenia
          i&nbsp;z&nbsp;nieudawanym przerażeniem stwierdzam, że&nbsp;
          <strong>czytelność kodu nadal traktowana jest jako coś mało istotnego</strong>. Nic bardziej błędnego!
        </p>
        <p>
          Programiści przez&nbsp;zdecydowaną większość czasu czytają, a&nbsp;nie&nbsp;piszą kod źródłowy. Dodanie
          krótkiego fragmentu do&nbsp;istniejącego projektu często wymaga przeczytania kilku lub kilkunastu linii kodu.
          To&nbsp;jeden z&nbsp;powodów, dla których&nbsp;czytelność powinna stać na&nbsp;pierwszym miejscu.{' '}
          <strong>Nieczytelny kod znacznie wydłuża czas potrzebny do&nbsp;napisania czegokolwiek nowego</strong>.
          Na&nbsp;domiar złego, niejasny i&nbsp;zagmatwany kod prowadzi do&nbsp;powstawania{' '}
          <strong>nieprzewidzianych błędów w&nbsp;aplikacjach</strong>, wynikających z&nbsp;niezrozumienia przepływu
          danych albo&nbsp;niespodziewanych efektów ubocznych.
        </p>
        <p>
          Dlaczego więc&nbsp;czytelność kodu traktowana jest drugorzędowo? Zapytałem kilku znajomych programistów
          <sup id="fnref-1">
            <a href="#fn-1" rel="footnote">
              1
            </a>
          </sup>
          .
        </p>
        <h2 id="wydajemisie">Wydaje mi się, że…</h2>
        <blockquote>
          <p>
            Wydaje mi się, że&nbsp;napisanie tego fragmentu w&nbsp;taki, a&nbsp;nie&nbsp;inny sposób, sprawia,
            że&nbsp;aplikacja działa znacznie szybciej.
            <br />
            <br />– Małgorzata, Junior Software Developer w&nbsp;korporacji; 1&nbsp;rok komercyjnego doświadczenia
          </p>
        </blockquote>
        <p>
          Cieszę się, Gosiu, że&nbsp;poruszyłaś ten wątek. Mój&nbsp;dziadek często powtarzał, że&nbsp;„
          <em>na&nbsp;oko to&nbsp;chłop w&nbsp;szpitalu umarł</em>”. Niby głupie powiedzenie, ale&nbsp;jednak często
          okazuje się bardzo prawdziwe.
        </p>
        <p>
          Gdy&nbsp;ktoś mówi o&nbsp;wydajności i&nbsp;używa zwrotu „wydaje mi się”, to&nbsp;każdemu powinna
          się&nbsp;zapalić ostrzegawcza lampka. Jakie jest przyspieszenie? Ile milisekund? Ile procent? Jaki to&nbsp;ma
          wpływ na&nbsp;postrzeganą&nbsp;prędkość aplikacji i&nbsp;na&nbsp;UX?{' '}
          <strong>
            Są to&nbsp;niezwykle ważne pytania, a&nbsp;bez&nbsp;odpowiedzi na&nbsp;nie&nbsp;cała „optymalizacja”
            nie&nbsp;ma żadnego sensu.
          </strong>
        </p>
        <p>Co oznacza zwrot „wydaje mi się”? Oznacza on „jestem zbyt leniwy i&nbsp;arogancki, by&nbsp;sprawdzić”.</p>
        <p>Brałem udział w&nbsp;dyskusji, gdzie jedna z&nbsp;osób użyła takiego argumentu:</p>
        <blockquote>
          <p>
            Jestem pewien, że&nbsp;to&nbsp;działa szybciej. Operacje na&nbsp;gołym DOM muszą być szybsze niż framework,
            to&nbsp;chyba oczywiste?
          </p>
        </blockquote>
        <p>
          To&nbsp;chyba najgorszy rodzaj arogancji: opinia przedstawiona jako oczywisty fakt. Jest to&nbsp;całkowicie
          puste stwierdzenie. Panie kolego, prosimy o&nbsp;rzeczowe argumenty, a&nbsp;nie&nbsp;krzykliwe hasła. Warto
          też zwrócić uwagę, że&nbsp;nawet jeśli ta wypowiedź wydaje się być sensowna, to&nbsp;jednak nie&nbsp;jest
          prawdziwa – istnieją biblioteki, które dzięki mądrym rozwiązaniom, potrafią renderować&nbsp;HTML szybciej niż
          gdybyśmy ręcznie operowali na&nbsp;gołym DOM.
        </p>
        <blockquote>
          <p>
            Jeśli optymalizujesz kod i&nbsp;nie&nbsp;wykonujesz pomiarów by&nbsp;potwierdzić wzrost wydajności, jedyne
            czego możesz być pewien to&nbsp;fakt, iż&nbsp;sprawiłeś, że&nbsp;Twój&nbsp;kod stał się mniej czytelny.
            <br />
            <br />– Martin Fowler,{' '}
            <LinkUnderlineEffect>
              <a href="http://www.martinfowler.com/ieeeSoftware/yetOptimization.pdf">
                “Yet Another Optimization
                <br />
                Article”
              </a>
            </LinkUnderlineEffect>{' '}
            (czysty kod)
          </p>
        </blockquote>
        <p>
          Gosi możemy wybaczyć z&nbsp;racji małego doświadczenia. Rada od&nbsp;bardziej doświadczonego kolegi:
          Od&nbsp;teraz, gdy&nbsp;ktoś&nbsp;Ci powie, że&nbsp;jedna wersja kodu jest szybsza od&nbsp;drugiej, zawsze
          zapytaj: „O ile?”. To&nbsp;zachowanie godne profesjonalisty i&nbsp;czystego kodu.
        </p>
        <h2 id="alemniesitojawijakokolory">Ale&nbsp;mnie się to&nbsp;jawi jako kolory…</h2>
        <blockquote>
          <p>
            Gdy&nbsp;piszę swój kod, to&nbsp;od&nbsp;razu dostrzegam miejsca, które w&nbsp;oczywisty sposób mogą zostać
            zoptymalizowane. Nauczyli mnie tego na&nbsp;studiach: gdy&nbsp;programowałem mikroprocesory z&nbsp;8KB RAM
            w&nbsp;języku C to&nbsp;często robiłem wstawki asemblerowe, żeby&nbsp;było szybciej. Czytelność jest ważna,
            ale&nbsp;na&nbsp;pewno nie&nbsp;najważniejsza.
            <br />
            <br />– Tomek, Full-Stack Ninja JavaScript Rockstar Crusader we&nbsp;własnej jednoosobowej firmie;
            2&nbsp;lata komercyjnego doświadczenia
          </p>
        </blockquote>
        <p>
          Tomek ma rację, o&nbsp;ile cofniemy się&nbsp;15&nbsp;lat w&nbsp;czasie i&nbsp;będziemy programować Amigę.
          W&nbsp;innym wypadku – nie&nbsp;(chyba, że&nbsp;Tomasz ma magiczną kryształową kulę). Niestety takie podejście
          bardzo często pokutuje wśród osób przyzwyczajonych do&nbsp;programowania w&nbsp;językach niskopoziomowych.
          Najczęstsze grzechy to&nbsp;obawa przed&nbsp;tworzeniem wielu małych funkcji i&nbsp;ręczne{' '}
          <em>cache’owanie</em> zmiennych. Często też enigmatyczne nazwy – wszak w&nbsp;Fortranie obowiązywał limit
          liczby znaków na&nbsp;zmienną! Cierpi na&nbsp;tym głównie czysty kod.
        </p>
        <p>
          Sama wiedza o&nbsp;tym, że&nbsp;każda operacja <code>JMP</code> w&nbsp;asmie to&nbsp;dużo zachodu dla
          procesora nie&nbsp;szkodzi. Cóż, wiedza chyba nigdy nie&nbsp;przeszkadza! Ale&nbsp;próba stosowania zwyczajów
          i&nbsp;porad wyniesionych z&nbsp;dawnych lat, albo&nbsp;z&nbsp;języków niskopoziomowych w&nbsp;językach
          nowoczesnych nie&nbsp;tylko&nbsp;nikomu nie&nbsp;pomaga, ale&nbsp;wręcz szkodzi.
        </p>
        <p>
          Dzisiejsze kompilatory to&nbsp;bardzo zaawansowane narzędzia. Niemal dzieła sztuki, wynik lat prac
          i&nbsp;badań matematyków i&nbsp;informatyków.{' '}
          <strong>
            Czy&nbsp;naprawdę&nbsp;wydaje Ci się, że&nbsp;jesteś w&nbsp;stanie zoptymalizować kod bardziej
            niż&nbsp;kompilator?
          </strong>{' '}
          Nie&nbsp;jesteś
          <sup id="fnref-2">
            <a href="#fn-2" rel="footnote">
              2
            </a>
          </sup>
          . Możesz być o&nbsp;tym przekonany. Jest to&nbsp;w&nbsp;szczególności istotne w&nbsp;językach kompilowanych{' '}
          <em>Just In Time</em> (JIT), gdzie kompilator czyni cuda (dosłownie!) i&nbsp;przykładowo inteligentnie
          bardziej optymalizuje fragmenty kodu, które są częściej uruchamiane.
        </p>
        <p>
          Jednym z&nbsp;takich języków jest JavaScript. Nie&nbsp;sposób jest dzisiaj przewidzieć, czy&nbsp;pierwsza
          wersja kodu będzie bardziej wydajna od&nbsp;drugiej. Nie&nbsp;dość, że&nbsp;
          <strong>
            mały fragment może zostać skompilowany zupełnie inaczej niż&nbsp;ten sam kod w&nbsp;kontekście całej
            aplikacji
          </strong>
          , to&nbsp;jeszcze dochodzi do&nbsp;tego fakt, że&nbsp;
          <strong>sposób pracy kompilatorów może zmieniać się z&nbsp;każdą nową wersją przeglądarek</strong>. Dlatego,
          należy pisać przede wszystkim czytelny kod i&nbsp;czysty kod. Z&nbsp;tego samego powodu wyniki typu jsperf
          rzadko są merytorycznym argumentem w&nbsp;dyskusji.
        </p>
        <p className="important">Optymalizację kodu w&nbsp;większości przypadków lepiej zostawić maszynom.</p>
        <h3 id="optymalizacjatonieproces">Optymalizacja to&nbsp;nie&nbsp;proces</h3>
        <p>
          Gosi wybaczyliśmy optymalizowanie kodu „na oko”. Ale&nbsp;czy&nbsp;możemy wybaczyć&nbsp;Tomkowi,
          który&nbsp;twierdzi, że&nbsp;jest gwiazdą rocka programowania?
        </p>
        <p>
          Tomku. Optymalizacja to&nbsp;nie&nbsp;proces.{' '}
          <strong>Niemożliwe jest napisanie całkowicie optymalnego kodu od&nbsp;zera</strong> z&nbsp;przynajmniej dwóch
          powodów. Po&nbsp;pierwsze, jak już wspomniałem, nie&nbsp;wiesz jak dokładnie zadziała kompilator
          w&nbsp;kontekście dużej aplikacji, więc&nbsp;optymalizowanie małych fragmentów nie&nbsp;ma sensu.
          Po&nbsp;drugie, nie&nbsp;wiesz jeszcze, w&nbsp;jaki sposób dokładnie Twoja aplikacja będzie wykorzystywana
          przez&nbsp;użytkowników.
        </p>
        <p>
          Jeśli tego nie&nbsp;wiesz, to&nbsp;skąd wiesz co tak&nbsp;właściwie optymalizujesz? A&nbsp;może właśnie
          pogarszasz czas działania aplikacji? Prosty przykład. Dla wielu osób oczywisty. Który&nbsp;z&nbsp;poniższych
          kodów zadziała szybciej?
        </p>
        <p>
          Jeśli powiedziałeś, że&nbsp;wersja 1, to&nbsp;odpowiedziałeś błędnie. <br />
          Jeśli powiedziałeś, że&nbsp;wersja 2, to&nbsp;również odpowiedziałeś błędnie. <br />
          Nie ma jednoznacznej prawidłowej odpowiedzi. Jedyne co powinieneś powiedzieć to: „Zależy.”
        </p>
        <p>
          <strong>
            Nawet tak&nbsp;prosty, teoretycznie oczywisty przypadek, pozostawia pole do&nbsp;interpretacji dla
            kompilatora
          </strong>
          . Zazwyczaj oba te fragmenty kodu zostaną skompilowane dokładnie do&nbsp;tego samego kodu wykonywalnego.
          Zazwyczaj. Jednak znany jest przypadek, gdy&nbsp;
          <LinkUnderlineEffect>
            <a href="http://mrale.ph/blog/2014/12/24/array-length-caching.html">
              wersja 2&nbsp;działała wolniej niż wersja 1
            </a>
          </LinkUnderlineEffect>
          .
        </p>
        <p>
          Tomku, nie&nbsp;dość, że&nbsp;pogorszyłeś czytelność kodu i&nbsp;odpuściłeś sobie całkowicie czysty kod,
          to&nbsp;jeszcze zmarnowałeś&nbsp;przy tym sporo czasu na&nbsp;myślenie o&nbsp;różnych mikrooptymalizacjach.
          Ani współpracownicy, ani przełożeni nie&nbsp;byliby zadowoleni, gdybyś&nbsp;oczywiście ich miał.{' '}
          <em>Shame on you</em>.
        </p>
        <h3 id="jaky">Jak żyć i&nbsp;tworzyć dobry kod?</h3>
        <p>
          Stwórz aplikację. Pisz czysty kod i&nbsp;czytelny kod. Poszukaj problemów z&nbsp;wydajnością. Zmierz
          i&nbsp;zidentyfikuj co dokładnie jest przyczyną. Będziesz zaskoczony rezultatami.{' '}
          <strong>Wtedy optymalizuj to, co ma sens.</strong>
        </p>
        <p>
          Jakiś czas temu miałem zoptymalizować pewną aplikację internetową. Jej zadaniem było rysowanie różnych
          wykresów w&nbsp;przeglądarce, a&nbsp;całość była oparta o&nbsp;framework AngularJS. W&nbsp;pierwszej chwili
          pomyślałem: „No oczywiście, wydajność rysowania na&nbsp;pewno jest do&nbsp;poprawki, a&nbsp;w&nbsp;drugiej
          kolejności to&nbsp;pewnie framework sprawia problemy”. Nie&nbsp;zabrałem się jednak do&nbsp;optymalizowania
          na&nbsp;oślep, lecz&nbsp;odpaliłem narzędzia developerskie. Rezultat pomiarów? Ani framework, ani nawet
          rysowanie SVG nie&nbsp;były żadnym problemem. Problemem była zła architektura aplikacji i&nbsp;przepływ danych
          oraz&nbsp;zdarzeń, przez&nbsp;które wykres często był przerysowywany kilkukrotnie bez&nbsp;żadnych zmian. Kto
          by&nbsp;pomyślał! Poprawki zajęły sporo czasu, ale&nbsp;efekty były bardzo dobre: poprawa czasów renderowania
          o&nbsp;75%.
        </p>
        <h2 id="nieczytelnietoznaczyszybciejprzecie">Nieczytelnie to&nbsp;znaczy szybciej przecież…</h2>
        <blockquote>
          <p>
            Tworzę swój startup i&nbsp;tutaj wszystko zmienia się ciągle jak w&nbsp;kalejdoskopie. Nie&nbsp;mamy czasu
            na&nbsp;przejmowanie się&nbsp;czytelnością kodu, bo za&nbsp;dwa miesiące połowa aplikacji
            i&nbsp;tak&nbsp;zostanie zaorana.
            <br />
            <br />
            –&nbsp;Maciej, CEO, CTO, CFO i&nbsp;COO jednego z&nbsp;polskich startupów; 5&nbsp;lat komercyjnego
            doświadczenia
          </p>
        </blockquote>
        <p>
          Macieju, życzę powodzenia w&nbsp;budowaniu biznesu. Jednak założenia, na&nbsp;których&nbsp;oparłeś swoją
          wypowiedź są niestety błędne i&nbsp;nie&nbsp;wróżę sukcesów w&nbsp;prędkim rozwijaniu aplikacji.
        </p>
        <p>
          Stwierdzenie, że&nbsp;pisanie nieczytelnego kodu jest szybsze, niż pisanie czytelnego kodu to&nbsp;absurd.
          Całkowita sprzeczność. Wszak{' '}
          <strong>jedną z&nbsp;głównych zalet pisania dobrego kodu jest szybkość rozwoju aplikacji</strong>!
        </p>
        <p>
          Zastanówmy się czy&nbsp;w&nbsp;ogóle pisanie kodu byle jak jest szybsze. Jest? Nazywając zmienną{' '}
          <code>x</code> zamiast <code>playerPosition</code> zyskujemy ok. 1&nbsp;sekundy. Jeśli pomnożymy to&nbsp;razy
          10000&nbsp;linii kodu to&nbsp;otrzymujemy prawie 3&nbsp;godziny. Co za&nbsp;wynik, będziemy pierwsi
          na&nbsp;rynku, hurra!
        </p>
        <p>
          Co na&nbsp;tym tracimy? Przede wszystkim{' '}
          <strong>
            godziny, a&nbsp;może nawet dni na&nbsp;wdrażaniu nowych programistów do&nbsp;zespołu. Dni, tygodnie
            na&nbsp;implementowaniu nowych funkcji
          </strong>{' '}
          w&nbsp;gąszczu niezrozumiałego kodu. Setki błędów na&nbsp;produkcji, które nie&nbsp;powinny się wydarzyć.
          Czy&nbsp;to&nbsp;ważne aspekty w&nbsp;szybko rozwijającym się startupie, który&nbsp;prędko zatrudnia nowe
          osoby i&nbsp;intensywnie pracuje nad&nbsp;nowymi funkcjami? Pozostawiam to&nbsp;do&nbsp;oceny Maćka.
        </p>
        <p>
          <strong>
            Nawet jeśli za&nbsp;dwa miesiące połowa aplikacji ma pójść do&nbsp;kosza, to&nbsp;zdecydowanie łatwiej
            będzie to&nbsp;zrobić, jeśli kod będzie zrozumiały
          </strong>
          , granice pomiędzy komponentami dobrze ustalone, a&nbsp;architektura jasna i&nbsp;klarowna.
          Nie&nbsp;chcielibyśmy przecież przypadkiem usunąć modułu C, od&nbsp;którego&nbsp;zależy moduł B,
          od&nbsp;którego&nbsp;zależy moduł A, który&nbsp;jednak miał zostać… Może i&nbsp;nie&nbsp;znam się
          na&nbsp;uprawie rolnej, ale&nbsp;jestem pewien, że&nbsp;orka jest łatwiejsza, jeśli na&nbsp;polu nie&nbsp;leżą
          miny. Nieczytelny kod to&nbsp;właśnie taka mina. Taka tam alegoria.
        </p>
        <h2 id="dlarwnowagi">Dobry kod dla równowagi…</h2>
        <p>
          Nie&nbsp;panikujmy jeszcze, nie&nbsp;jest aż tak&nbsp;źle! To&nbsp;nie&nbsp;jest przecież tak, że&nbsp;wszyscy
          programiści w&nbsp;Polsce mają w&nbsp;poważaniu jakość pisanego kodu, a&nbsp;czytelny kod to&nbsp;dla nich
          czarna magia. Nie&nbsp;każdy od&nbsp;razu używa{' '}
          <LinkUnderlineEffect>
            <a href="https://typeofweb.com/dolar-na-poczatku-dolar-na-koncu-czyli-o-notacji-wegierskiej-w-js/">
              notacji węgierskiej
            </a>
          </LinkUnderlineEffect>
          . Dla równowagi nieco inna wypowiedź:
        </p>
        <blockquote>
          <p>
            Czytelność kodu i&nbsp;dobra architektura zawsze idą w&nbsp;parze. Ja i&nbsp;cały mój&nbsp;zespół stawiamy
            je na&nbsp;pierwszym miejscu. Czytelny kod nie&nbsp;jest ani mniej wydajny, ani nie&nbsp;zabiera więcej
            czasu, gdy&nbsp;się go tworzy – wystarczy tylko&nbsp;nieco zmienić nastawienie i&nbsp;nabrać&nbsp;kilku
            dobrych zwyczajów. Często optymalizuję tworzone aplikacje, szczególnie na&nbsp;urządzenia mobilne, jednak
            rzadko kiedy pogarszam przez&nbsp;to&nbsp;czytelność&nbsp;kodu. Najczęstsze problemy związane są
            z&nbsp;renderowaniem albo&nbsp;komunikacją z&nbsp;API, a&nbsp;na&nbsp;to&nbsp;żadne mikrooptymalizacje
            i&nbsp;tak&nbsp;nie&nbsp;pomogą.
            <br />
            <br />– Łukasz, Software Developer; 5&nbsp;lat komercyjnego doświadczenia
          </p>
        </blockquote>
        <h2 id="wnioski">Dobry kod i&nbsp;wnioski</h2>
        <p>Z&nbsp;tegu długiego wpisu zapamiętajmy dwa wnioski:</p>
        <ol>
          <li>Optymalizacje to&nbsp;nie&nbsp;proces.</li>
          <li>Czytelność kodu stawiaj na&nbsp;pierwszy miejscu.</li>
          <li>Serio, po&nbsp;prostu pisz czytelny kod i&nbsp;nie&nbsp;martw się resztą.</li>
        </ol>
        <p>
          Zrozumienie i&nbsp;stosowanie tych dwóch zasad ma ogromną wartość dodaną dla każdego profesjonalisty. Dzięki
          nim masz szansę pisać kod lepszy i&nbsp;bardziej zrozumiały, a&nbsp;do&nbsp;tego rozszerzalny. Łatwiej też
          będzie Ci wdrożyć nowe osoby do&nbsp;zespołu, a&nbsp;gdy&nbsp;już nabierzesz pewnych nawyków, zaoszczędzisz
          masę czasu na&nbsp;czytaniu kodu własnego i&nbsp;innych. <strong>Czy&nbsp;są pytania?</strong>
        </p>
        <p>
          Koniecznie przeczytaj{' '}
          <LinkUnderlineEffect>
            <a href="http://helion.pl/view/117666/czykov.htm" target="_blank" rel="noopener noreferrer">
              książkę na&nbsp;temat czystego kodu
            </a>
          </LinkUnderlineEffect>
          :
        </p>
        <p>
          <a href="http://helion.pl/view/117666/czykov.htm" target="_blank" rel="noopener noreferrer">
            <img
              src="http://helion.pl/okladki/181x236/czykov.jpg"
              width="181"
              height="236"
              alt="Okładka książki Czysty Kod mówiącej, jak pisać czytelny kod"
            />
          </a>
        </p>
        <div className="footnotes">
          <ol>
            <li className="footnote" id="fn-1">
              <p>
                Imiona zostały zmienione.{' '}
                <a href="#fnref-1" title="return to&nbsp;article">
                  ↩
                </a>
              </p>
            </li>
            <li className="footnote" id="fn-2">
              <p>
                W&nbsp;99,9% przypadków. Optymalizować warto, gdy&nbsp;udało się zlokalizować przyczynę, ale&nbsp;nigdy
                na&nbsp;oślep.{' '}
                <a href="#fnref-2" title="return to&nbsp;article">
                  ↩
                </a>
              </p>
            </li>
          </ol>
        </div>
      </div>
    </Card>
  );
};
