---
id: 2518
index: 132
title: Licencje na oprogramowanie
date: 2020-06-24T11:17:23.000Z
isMarkdown: true
status: publish
permalink: licencje-oprogramowania
authors:
  - paulina-piatek
guid: https://typeofweb.com/?p=2518
type: post
thumbnail:
  url: https://typeofweb.com/wp-content/uploads/2020/06/licencje-oprogramowania.png
  width: 1688
  height: 780
categories:
  - slug: opinie
    name: Opinie
seo: {}
---

Każdy szanujący się programista korzysta z oprogramowania open source. Warto pamiętać, że wykorzystując otwarte oprogramowanie musimy przestrzegać warunków licencji, na jakiej zostało ono udostępnione. Licencje typu open source z reguły udzielają zgody na używanie, modyfikowanie i dystrybucję oprogramowania w dowolnym celu, z zastrzeżeniem warunków chroniących jego pochodzenie i otwartość. Istnieje kilka licencji, które warto znać, aby sprawnie poruszać się w świecie open source i nie zostać posądzonym o naruszenie czyichś praw autorskich.

Wpis gościnny [radczyni prawnej Pauliny Piątek](https://paulinapiatek.pl/).

<!--more-->

## Licencja MIT (X11)

Swoją nazwę zawdzięcza Massachusetts Institute of Technology, z którego się wywodzi. Jest najpopularniejszą licencją open source, a to z uwagi na swoją prostotę i brak nadmiernych ograniczeń. Oprogramowanie na tej licencji może być w zasadzie wykorzystywane dowolnie (a w tym w celach komercyjnych i niekomercyjnych, w postaci źródłowej lub binarnej) pod warunkiem, że we wszystkich rozpowszechnianych wersjach zachowamy warunki licencyjne i informacje o autorze. Licencja ta zawiera wyłączenie odpowiedzialności autora za ewentualne błędy i za jakiekolwiek szkody wynikłe z użytkowania programu.

Tej licencji używają m.in. Rails, Babel czy [React.js](https://github.com/facebook/react/blob/master/LICENSE).

## Licencje BSD

BSD (Berkeley Software Distribution Licenses) to grupa licencji pochodzących z Uniwersytetu Kalifornijskiego w Berkeley. Obecnie, najczęściej mamy do czynienia z BSD 2-Clause License oraz BSD 3-Clause License. Pierwsza z nich, 2-klauzulowa, jest funkcjonalnie identyczna z MIT (X11). Druga z nich, 3-klauzulowa, zakazuje ponadto wykorzystywania nazwisk twórców do podpisywania lub promowania utworów pochodnych, bez uprzedniej pisemnej zgody tych osób.

Z tej licencji korzystają np. biblioteka d3 oraz edytor [Quill](https://github.com/quilljs/quill/blob/develop/LICENSE).

## Licencja ISC

Podobnie jak 2-klauzulowa BSD, również ta licencja uważana jest za zamiennik licencji MIT (X11). Została stworzona przez Internet Systems Consortium, a jej ogromną zaletą jest jeszcze prostszy język, pozbawiony prawniczych zwrotów, którym w przypadku MIT i BSD zarzuca się nieprecyzyjność. Oprogramowanie na tej licencji może być wykorzystywane dowolnie, pod warunkiem zachowania informacji o autorze wraz z treścią licencji. Również w tym przypadku wyłączona jest odpowiedzialność autora za jakość i działanie programu.

ISC zostało wybrane przez twórców biblioteki [node-semver](https://github.com/npm/node-semver/blob/master/LICENSE). Jest to także domyślna licencja przy tworzeniu nowego projektu w Node.js przy użyciu `npm init`!

## Licencje GNU: GPL, LGPL i AGPL

Licencje **GNU** powstały na użytek Projektu GNU zapoczątkowanego przez Richarda Stallmana, ale obecnie są wykorzystywane również przy wielu innych projektach. Każda z nich pozwala na swobodne kopiowanie, dystrybuowanie i modyfikowanie oprogramowania. Co odróżnia licencje GNU od pozostałych licencji open source, to dość restrykcyjne warunki, które użytkownicy muszą spełnić.

### GPL 3.0

W skrócie, licencja GPL 3.0, czyli General Public License, wymaga rejestrowania zmian w plikach źródłowych, a wszystko co powstanie z wykorzystaniem tak licencjonowanego oprogramowania, musi również zostać udostępnione na tej samej licencji.

Na GPL 3.0 licencjonowany jest choćby [bash](https://git.savannah.gnu.org/cgit/bash.git/tree/COPYING).

### LGPL 3.0

Licencja **LGPL 3.0**, czyli Lesser General Public License, powstała jako kompromis pomiędzy GPL, a przedstawionymi powyżej licencjami liberalnymi. Najważniejszą cechą odróżniającą ją od GPL jest fakt, że nakłada ona ograniczenia jedynie na poszczególne pliki źródłowe, a nie na cały program. Na licencji LGPL mamy zatem obowiązek udostępnić wyłącznie kod źródłowy (poszczególne pliki źródłowe), a nie kod całej aplikacji, która korzysta z tych plików. Ze względu na swój charakter, licencja LGPL w głównej mierze znajduje zastosowanie do bibliotek.

### AGPL 3.0

Z kolei **AGPL 3.0**, czyli Affero General Public License, powstała z myślą o oprogramowaniu webowym, uruchamianym po stronie serwera, gdy nie dochodzi do jego rzeczywistej dystrybucji. Licencja uwzględnia te same prawa i obowiązki, co GPL 3.0 i dodatkowo nakazuje, aby wraz z usługą świadczoną przez sieć, udostępniać pełny kod źródłowy.

AGPL jest licencją, na której Type of Web udostępniło [kod źrodłowy aplikacji DevFAQ.pl](https://github.com/typeofweb/devfaq)!

Wszystkie licencje z tej grupy wymagają zachowania informacji o autorze wraz z treścią licencji oraz wyłączają odpowiedzialność autora za jakość i działanie programu.

## Licencja Apache 2.0

Jest to licencja stworzona przez Apache Software Foundation, pozwalająca na używanie, modyfikowanie i dystrybucję programu w postaci źródłowej lub binarnej, bez obowiązku udostępniania kodu źródłowego. Warunkiem wykorzystania oprogramowania na tej licencji jest udokumentowanie wprowadzonych zmian i zachowanie informacji o autorze wraz z treścią licencji. W przypadku tej licencji mamy wyraźnie określony zakaz wykorzystywania nazw, znaków towarowych i innych oznaczeń twórcy. Również w tym przypadku wyłączona jest wszelka odpowiedzialność autora.

To licencja używana przez [Kubernetes](https://github.com/kubernetes/kubernetes/blob/master/LICENSE), a także [język Swift od Apple](https://github.com/apple/swift/blob/master/LICENSE.txt).

## Mozilla Public License 2.0

Ta licencja wymaga udostępnienia (na jednakowych zasadach) kodu źródłowego każdej wprowadzonej zmiany, ale możliwe jest łączenie oprogramowania na tej licencji z kodem prywatnym pod warunkiem, że kod na MPL jest przechowywany w osobnych plikach. Również w tym przypadku mamy obowiązek zachowania informacji o autorze wraz z treścią licencji, wyłączenie odpowiedzialności oraz wyraźny zakaz wykorzystywania znaków towarowych.

Z tej licencji korzysta Mozilla w swoim innowacyjnym silniku przeglądarki [Servo](https://github.com/servo/servo/blob/master/LICENSE).

## Przydatne linki

Więcej o poszczególnych licencjach przeczytasz tu:

- [https://opensource.org/licenses](https://opensource.org/licenses) – obszerna lista licencji zaakceptowanych przez amerykańską organizację OSI (Open Source Initiative)
- [https://choosealicense.com/](https://choosealicense.com/) - intuicyjna platforma pomagająca w wyborze właściwej licencji, prowadzona przez GitHub
- [https://tldrlegal.com/](https://tldrlegal.com/) - wyszukiwarka popularnych licencji oferująca krótkie, zrozumiałe opisy każdej z nich

## Podsumowanie

Wiedza na temat różnych licencji jest przydatna dla każdej osoby, która Open Source tworzy lub wykorzystuje. Od strony użytkownika należy pamiętać o obowiązkach, jakie niesie ze sobą używanie np. bibliotek licencjonowanych GPL i warto skonsultować ten aspekt, gdy tworzy się projekt o zamkniętym źródle. Natomiast jako twórcy Open Source, musimy dokładnie przeanalizować wszystkie za i przeciw każdej licencji, aby wybrać taką, która będzie odpowiednia dla naszego projektu. Przykładowo, Michał swoje biblioteki wypuszcza zawsze na MIT/ISC, ale [kod źródłowy DevFAQ.pl](https://github.com/typeofweb/devfaq) otworzył na licencji AGPL.
