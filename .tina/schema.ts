import { defineSchema } from '@tinacms/cli';

export const allSeries = [
  { slug: 'self-publishing', name: 'Self Publishing' },
  { slug: 'react-js', name: 'React.js' },
  { slug: 'piece-of-cake', name: 'Piece of cake' },
  { slug: 'buddy-works', name: 'CI/CD z Buddy.works' },
  { slug: 'vue-js', name: 'Vue.js' },
  { slug: 'hapijs', name: 'HapiJS' },
  { slug: 'typescript', name: 'TypeScript' },
  { slug: 'angular-2', name: 'Angular 2' },
];

export const allCategories = [
  { slug: 'javascript', name: 'JavaScript' },
  { slug: 'typescript', name: 'TypeScript' },
  { slug: 'opinie', name: 'Opinie' },
  { slug: 'dobry-kod', name: 'Dobry Kod' },
  { slug: 'praca-zdalna', name: 'Praca Zdalna' },
];

export default defineSchema({
  collections: [
    {
      label: 'Artykuły',
      name: 'posts',
      path: '_posts',
      fields: [
        {
          label: 'Tytuł',
          name: 'title',
          type: 'string',
        },
        {
          label: 'permalink',
          name: 'permalink',
          type: 'string',
        },
        {
          label: 'type',
          name: 'type',
          type: 'string',
          // default: 'post',
        },
        {
          label: 'Data',
          name: 'date',
          type: 'datetime',
        },
        {
          label: 'Treść',
          name: 'body',
          type: 'string',
          isBody: true,
        },
        // {
        //   label: 'Autorzy',
        //   name: 'authors',
        //   type: 'string',
        //   list: true,
        //   options: Authors.authors.map((a) => a.slug),
        // },
        {
          label: 'Zdjęcie',
          name: 'thumbnail',
          type: 'object',
          required: false,
          fields: [
            {
              label: 'url',
              name: 'url',
              type: 'image',
            },
            {
              label: 'width',
              name: 'width',
              type: 'number',
            },
            {
              label: 'height',
              name: 'height',
              type: 'number',
            },
          ],
        },
        {
          label: 'Kategorie',
          name: 'category',
          type: 'string',
          options: allCategories.map((c) => c.slug),
        },
        {
          label: 'Seria',
          name: 'series',
          type: 'string',
          options: allSeries.map((s) => s.slug),
          required: false,
        },
        {
          label: 'SEO',
          name: 'seo',
          type: 'object',
          fields: [
            {
              label: 'focusKeywords',
              name: 'focusKeywords',
              type: 'string',
              list: true,
              required: false,
            },
            {
              label: 'focusKeywordSynonyms',
              name: 'focusKeywordSynonyms',
              type: 'string',
              list: true,
              required: false,
            },
            {
              label: 'metadesc',
              name: 'metadesc',
              type: 'string',
              ui: { component: 'textarea' },
              required: false,
            },
            {
              label: 'title',
              name: 'title',
              type: 'string',
              required: false,
            },
          ],
        },
      ],
    },
  ],
});
