import Calendar from '../../images/calendar.svg';
import DocumentText from '../../images/document-text.svg';
import ExternalLink from '../../images/external-link.svg';
import PresentationChartLine from '../../images/presentation-chart-line.svg';
import Terminal from '../../images/terminal.svg';
import Video from '../../images/video.svg';

import type { ComponentType } from 'react';
const NBSP = '\u00A0';
const items: readonly Item[] = [
  {
    date: '2021.02.23',
    stillOn: true,
    title: 'Type of Web na YouTube',
    subtitle: 'Kanał Type of Web na YouTube',
    links: [{ kind: 'video', value: 'https://www.youtube.com/c/Typeofweb/videos' }],
  },
  {
    date: '2020.01.26',
    stillOn: true,
    title: 'Śniadanie z Programowaniem',
    subtitle: 'Prowadzący od odcinka #21 aż do dzisiaj',
    links: [{ kind: 'video', value: 'https://www.youtube.com/watch?v=OdYAkiCsgAY' }],
  },
  {
    date: '2021.07.22',
    title: 'devmentor.pl',
    subtitle: 'Czas na TypeScript. Umacniający się język programowania',
    links: [{ kind: 'video', value: 'https://www.youtube.com/watch?v=TFQBb4r207c' }],
  },
  {
    date: '2021.04.09',
    title: 'Escola Talks',
    subtitle: 'Funkcyjny TypeScript Node.js Live Coding. Mattermost Tempo integration',
    links: [{ kind: 'video', value: 'https://www.youtube.com/watch?v=Tlodk6k3alU' }],
  },
  {
    date: '2020.06.22',
    title: 'Junior Senior #16',
    subtitle: 'Zaawansowany TypeScript',
    links: [{ kind: 'video', value: 'https://www.youtube.com/watch?v=WDCNEe4X8PE' }],
  },
  {
    date: '2020.12.30',
    title: 'Przeprogramowani ft. Gość #6',
    subtitle: 'Front-End 2025, czyli o tym co nadchodzi',
    links: [{ kind: 'video', value: 'https://www.youtube.com/watch?v=JU9hfj3QX0g' }],
  },
  {
    date: '2020.12.19',
    title: 'Require Podcast | require(#25)',
    subtitle: 'JS w 2020 - Podsumowanie feat. Michał z ToW',
    links: [{ kind: 'video', value: 'https://www.youtube.com/watch?v=G0Zp6ykWDRg' }],
  },
  {
    date: '2020.09.10',
    title: 'Typescript z Type of Web (podejście drugie)',
    subtitle: 'Od Wordpressa przez Backbone.js, Angular do React. Skad pomysl na książkę o Typescript?',
    links: [{ kind: 'video', value: 'https://www.youtube.com/watch?v=rico0ATwwOY' }],
  },
  {
    date: '2020.09.10',
    title: 'TypeScript: rewolucja czy ewolucja - JSDżem LIVE',
    subtitle: 'Rozmowa o tym, co daje TypeScript',
    links: [{ kind: 'video', value: 'https://www.youtube.com/watch?v=O8xhIdVOapw' }],
  },
  {
    date: '2020.09.03',
    title: 'Developer Wannabe LIVE',
    subtitle: '„O Typescript z Type of Web” – rozmowa z Jędrzejem Paulusem',
    links: [{ kind: 'video', value: 'https://www.youtube.com/watch?v=CmzGJiBwpTg' }],
  },
  {
    date: '2020.09.02',
    title: 'Porozmawiajmy o IT 079',
    subtitle: 'Rozmowa na temat TypeScripta z Krzysztofem Kempińskim',
    links: [{ kind: 'video', value: 'https://www.youtube.com/watch?v=jzMms8YdPIc' }],
  },
  {
    date: '2020.08.19',
    title: 'Quiz z Just Join IT!',
    subtitle: 'Rozmowa na temat szkoleń i bootcampów',
    links: [{ kind: 'video', value: 'https://www.youtube.com/watch?v=_W3b8w8xIJo' }],
  },
  {
    date: '2019.07.04',
    title: `Across Stack #4 API w Hapi i TypeScript`,
    subtitle: `Webinar dla infoshare Academy`,
    links: [{ kind: 'video', value: `https://www.youtube.com/watch?v=k1-CIR-NJeE` }],
  },
  {
    date: '2019.06.24',
    title: `Server Side Rendering With JavaScript`,
    subtitle: `Prezentacja na meet.js Wrocław`,
    links: [{ kind: 'event', value: `https://www.meetup.com/meet-js-wroclaw/events/jvdlcryzjbgc/` }],
  },
  {
    date: '2019.04.03',
    title: `A saner approach to testing`,
    subtitle: `Artykuł dla X-Team`,
    links: [{ kind: 'article', value: `https://x-team.com/blog/saner-approach-to-testing/` }],
  },
  {
    date: '2019.02.25',
    title: `Praca zdalna, TypeOfWeb i JS`,
    subtitle: `Podcast Fullstak`,
    links: [{ kind: 'link', value: `https://fullstak.pl/2` }],
  },
  {
    date: '2018.08.31',
    title: `Server-Side Rendering i JavaScript`,
    subtitle: `Prezentacja na meet.js Szczecin`,
    links: [
      { kind: 'video', value: `https://www.youtube.com/watch?v=eQEOAflR7uc` },
      { kind: 'event', value: `https://www.meetup.com/meetjs-szczecin/events/254002857/` },
    ],
  },
  {
    date: '2018.06.21',
    title: `What's the reason to use Reason?`,
    subtitle: `Prezentacja na meet.js Gdańsk`,
    links: [{ kind: 'event', value: `https://www.facebook.com/events/1289980281132172/` }],
  },
  {
    date: '2018.04.03',
    title: `Kiedyś próbowałem wytłumaczyć teściowi, co to jest Kubernetes`,
    subtitle: `Rozmowa w Just Geek It`,
    links: [
      {
        kind: 'article',
        value: `https://geek.justjoin.it/wiekszosc-przedmiotow-studiach-strata-czasu-karol-stepniewski-vmware/`,
      },
    ],
  },
  {
    date: '2018.03.28',
    title: `Michał Miszczyszyn on wizards and wands`,
    subtitle: `Wywiad dla X-Team`,
    links: [{ kind: 'article', value: `https://x-team.com/blog/interview-michal-miszczyszyn/` }],
  },
  {
    date: '2018.03.22',
    title: `Wprowadzenie do strumieni`,
    subtitle: `Prezentacja na Angular Tricity #1`,
    links: [{ kind: 'event', value: `https://crossweb.pl/en/events/angular-tricity-1` }],
  },
  {
    date: '2018.03.15',
    title: `Przeszłość i przyszłość tworzenia aplikacji Internetowych`,
    subtitle: `Prezentacja na ByteBay 2018`,
    links: [{ kind: 'event', value: `https://bytebay.pl/2018/speakers/#speaker-19` }],
  },
  {
    date: '2018.03.05',
    title: `Fefaq – nowa aplikacja z pytaniami rekrutacyjnymi dla frontendowców`,
    subtitle: `Wywiad dla Just Geek It`,
    links: [
      {
        kind: 'article',
        value: `https://geek.justjoin.it/fefaq-nowa-aplikacja-z-pytaniami-rekrutacyjnymi-dla-frontendowcow/`,
      },
    ],
  },
  {
    date: '2018.02.21',
    title: `Od Juniora do Seniora: Odpowiedzi na pytania społeczności #3`,
    subtitle: `Artykuł dla Just Geek It`,
    links: [{ kind: 'article', value: `https://geek.justjoin.it/juniora-seniora-odpowiedzi-pytania-spolecznosci-3/` }],
  },
  {
    date: '2018.02.01',
    title: `Od Juniora do Seniora: Odpowiedzi na pytania społeczności #1`,
    subtitle: `Artykuł dla Just Geek It`,
    links: [
      {
        kind: 'article',
        value: `https://geek.justjoin.it/od-juniora-do-seniora-odpowiedzi-na-pytania-spolecznosci-1/`,
      },
    ],
  },
  {
    date: '2017.12.13',
    title: `CSS Hacking`,
    subtitle: `Prezentacja na meet.js Gdańsk`,
    links: [{ kind: 'event', value: `https://www.facebook.com/events/149652705793012/` }],
  },
  {
    date: '2017.10.24',
    title: `Hacking with CSS: A New Range of Vulnerabilities`,
    subtitle: `Prezentacja na UnleashConf`,
    links: [
      { kind: 'video', value: `https://youtu.be/VStxR3KCAKM` },
      { kind: 'presentation', value: `https://github.com/mmiszy/unleashconf-css-hacking-2017` },
      { kind: 'event', value: `https://x-team.com/unleashconf/` },
    ],
  },
  {
    date: '2017.10.11',
    title: `6 simple examples which will make you love observables (rxjs 5)`,
    subtitle: `Artykuł dla X-Team`,
    links: [{ kind: 'article', value: `https://x-team.com/blog/rxjs-observables/` }],
  },
  {
    date: '2017.09.28',
    title: `Polscy programiści na świecie #3!`,
    subtitle: `Livestream dla Just Join IT`,
    links: [{ kind: 'video', value: `https://www.youtube.com/watch?v=7QYy_cPY0vw` }],
  },
  {
    title: `Wywiad dla Zbyszka Tenerowicza na meet.js Summit 2018`,
    subtitle: ``,
    date: '2017.09.18',
    links: [{ kind: 'link', value: `https://soundcloud.com/naugtur/meetjs-summit-2017-od-zaplecza)` }],
  },
  {
    date: '2016.11.28',
    title: `I Ty możesz być cyfrowym nomadą!`,
    subtitle: `Prezentacja na PyGDA #20`,
    links: [
      { kind: 'presentation', value: `https://mmiszy.github.io/2016-11-28.PyGda/` },
      { kind: 'event', value: `https://www.meetup.com/PyGda-pl/events/235402519/` },
    ],
  },
  {
    title: `TDD and TypeScript`,
    date: '2016.11.26',
    subtitle: `Warsztat dla XFive`,
    links: [],
  },
  {
    date: '2016.11.15',
    title: `36 Angular 2 - O co tyle krzyku?`,
    subtitle: `Prezentacja na tech.3camp`,
    links: [
      { kind: 'video', value: `https://vimeo.com/192910605` },
      { kind: 'event', value: `https://evenea.pl/event/tech3camp151116/` },
      { kind: 'presentation', value: `https://mmiszy.github.io/3camp-angular-2-slides/#/1)` },
    ],
  },
  {
    title: `Why code readability matters?`,
    date: '2016.10.21',
    subtitle: `Webinar dla XFive`,
    links: [],
  },
  {
    date: '2015.03.10',
    title: `Everything You Always Wanted to Know About AngularJS But Were Afraid to Ask`,
    subtitle: `Prezentacja na meet.js Szczecin`,
    links: [
      {
        kind: 'presentation',
        value: `https://speakerdeck.com/mmiszy/everything-you-always-wanted-to-know-about-angularjs-but-were-afraid-to-ask`,
      },
    ],
  },
  {
    date: '2014.11.20',
    title: `AngularJS 1.3.0 - let's talk about changes!`,
    subtitle: `Prezentacja na ng-poznan #6`,
    links: [
      {
        kind: 'presentation',
        value: `https://speakerdeck.com/mmiszy/angularjs-1-dot-3-0-lets-talk-about-changes-ngpoznan`,
      },
      { kind: 'presentation', value: `http://mmiszy.github.io/angular-comparison/` },
      { kind: 'code', value: `https://github.com/mmiszy/angular-comparison/` },
      { kind: 'event', value: `https://www.meetup.com/ng-poznan-meetup/events/211926672/` },
    ],
  },
  {
    title: `Wywiad dla meet.js Summit 2014`,
    subtitle: ``,
    date: '2014.09.27',
    links: [{ kind: 'video', value: `https://www.youtube.com/watch?v=UvBegle7x-A` }],
  },
  {
    date: '2014.07.02',
    title: `Case study aplikacji mobilnej w AngularJS: W 8 godzin od pomysłu do implementacji`,
    subtitle: `Prezentacja na meet.js Gdańsk`,
    links: [
      { kind: 'video', value: `https://www.youtube.com/watch?v=OVWomXA-a2s` },
      {
        kind: 'presentation',
        value: `https://speakerdeck.com/mmiszy/case-study-aplikacji-mobilnej-w-angularjs-w-8-godzin-od-pomyslu-do-implementacji`,
      },
      { kind: 'code', value: `https://github.com/mmiszy/lunch-button/tree/meet_js` },
    ],
  },
  {
    date: '2013.03.11',
    title: `JavaScript: Kto w ogóle chciałby w tym kodzić?`,
    subtitle: `Prezentacja na meet.js Gdańsk`,
    links: [
      {
        kind: 'presentation',
        value: `https://github.com/meetjspl/gdansk/blob/300eff7562e19af0925bf27b37afff2f83bcc90c/media/1/presentation-mm.pdf`,
      },
      { kind: 'event', value: `https://www.facebook.com/events/471484796247910/` },
    ],
  },
].sort((a, b) => {
  if (a.stillOn === b.stillOn) {
    return b.date.localeCompare(a.date);
  }
  return Number(a.stillOn) - Number(b.stillOn);
});

const kindToLabelIcon: Record<
  Kind,
  { readonly icon: ComponentType<React.SVGProps<SVGSVGElement>>; readonly label: string }
> = {
  article: { icon: DocumentText, label: 'Artykuł' },
  code: { icon: Terminal, label: 'Kod' },
  event: { icon: Calendar, label: 'Wydarzenie' },
  link: { icon: ExternalLink, label: 'Link' },
  presentation: { icon: PresentationChartLine, label: 'Prezentacja' },
  video: { icon: Video, label: 'Film' },
};

function formatDate(dateStr: string): string {
  const months = [
    'stycznia',
    'lutego',
    'marca',
    'kwietnia',
    'maja',
    'czerwca',
    'lipca',
    'sierpnia',
    'września',
    'października',
    'listopada',
    'grudnia',
  ];
  const [year, month, day] = dateStr.split('.').map(Number);
  return `${day} ${months[month - 1]} ${year}`;
}

interface Item {
  readonly date: string;
  readonly stillOn?: boolean;
  readonly title: string;
  readonly subtitle: string;
  readonly links: readonly Link[];
}
type Kind = 'article' | 'article' | 'code' | 'event' | 'link' | 'presentation' | 'video';
interface Link {
  readonly kind: Kind;
  readonly value: string;
}

export const Timeline = () => {
  return (
    <ul className="m-0 p-2 bg-gray-100 rounded-xl sm:p-5 xl:p-6">
      {items.map((item) => (
        <li key={item.date + item.title} className="group">
          <article className="relative grid items-start px-3 py-4 hover:bg-white rounded-xl overflow-hidden transition-colors sm:px-5 md:grid-cols-12 xl:grid-cols-10 xl:px-6">
            <h3 className="mb-1 ml-9 text-gray-900 font-bold md:col-span-8 md:col-start-5 md:ml-0 xl:col-span-6 xl:col-start-5">
              {item.title}
            </h3>
            <time
              dateTime="2021-06-17T19:00:00.000Z"
              className="flex row-start-1 items-center mb-1 font-medium md:col-span-4 md:col-start-1 md:row-end-3 md:mb-0"
            >
              <svg
                viewBox="0 0 24 24"
                className="mr-6 w-5 h-5 text-gray-300 group-hover:text-pink-500 overflow-visible transition-colors"
              >
                <circle cx="12" cy="12" r="6" fill="currentColor" />
                <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M 12 -6 V -64"
                  fill="none"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="group-first:hidden text-gray-200"
                />
                <path
                  d="M 12 30 V 500"
                  fill="none"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="group-last:hidden text-gray-200"
                />
              </svg>
              {formatDate(item.date)}
              {item.stillOn ? ` –${NBSP}dziś` : ''}
            </time>
            {item.subtitle && (
              <p className="ml-9 text-gray-900 font-serif text-base md:col-span-8 md:col-start-5 md:ml-0 xl:col-span-6">
                {item.subtitle}
              </p>
            )}
            {item.links.length > 0 && (
              <ul className="flex flex-row gap-4 ml-9 md:col-span-8 md:col-start-5 md:ml-0 xl:col-span-6 xl:col-start-5">
                {item.links.map((link) => {
                  const Icon = kindToLabelIcon[link.kind].icon;
                  return (
                    <li key={link.value}>
                      <a
                        href={link.value}
                        className="inline-flex gap-1 items-center mt-1 hover:text-blue-500 text-gray-900 font-sans text-base transition-colors"
                      >
                        <Icon className="-ml-0.5 w-5" />
                        <span className="mt-1">{kindToLabelIcon[link.kind].label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </article>
        </li>
      ))}
    </ul>
  );
};
