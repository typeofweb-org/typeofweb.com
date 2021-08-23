import { withSentry } from '@sentry/nextjs';
import Yaml from 'js-yaml';

import { DELIMITER, host } from '../../constants';
import { allCategories, categoryMappings } from '../../utils/categories';
import { allSeries } from '../../utils/series';

import type { NetlifyConfigSchema } from './_netlifySchema';
import type { NextApiHandler } from 'next';

const adminConfigYmlHandler: NextApiHandler = async (req, res) => {
  const result: NetlifyConfigSchema = await config();
  res.setHeader('Content-Type', 'text/yaml; charset=utf-8');
  res.send(Yaml.dump(result));
};

export default withSentry(adminConfigYmlHandler);

const urlPattern = ['https?://.*', 'Podaj pełny adres'];

const legacyCategories = Object.keys(categoryMappings)
  .flatMap((x) => x.split('+'))
  .filter((x, idx, arr) => arr.indexOf(x) === idx);

const config = async (): Promise<NetlifyConfigSchema> => {
  return {
    local_backend: process.env.NODE_ENV === 'development',
    locale: 'pl',
    display_url: host,
    logo_url: `${host}/logo-typeofweb-black.svg`,
    backend: {
      name: 'github',
      repo: 'typeofweb/typeofweb.com',
      branch: 'main',
      base_url: host,
      site_url: host,
      auth_endpoint: 'api/auth',
      preview_context: 'Deployment has completed',
      squash_merges: true,
      open_authoring: true,
      commit_messages: {
        create: `Dodano {{collection}} „{{slug}}”`,
        update: `Zaktualizowano {{collection}} „{{slug}}”`,
        delete: `Usunięto {{collection}} „{{slug}}”`,
        uploadMedia: `Wgrano „{{path}}”`,
        deleteMedia: `Usunięto „{{path}}”`,
        openAuthoring: `{{message}} (@{{author-login}} - {{author-name}})`,
      },
    },
    publish_mode: 'editorial_workflow',
    show_preview_links: true,
    search: false,
    slug: {
      encoding: 'ascii',
      clean_accents: true,
    },
    summary: '{{title}} ({{commit_author}} @ {{commit_date}})',
    media_folder: 'public/media/',
    public_folder: '/media/',
    // @todo: How to make it public?
    // media_library: {
    //   name: 'cloudinary',
    //   config: {
    //     cloud_name: 'type-of-web',
    //     api_key: '936784498493233',
    //   },
    // },
    collections: [await posts(), legacyWordpressCollection(), await pages(), settings()],
  };
};

function settings() {
  return {
    name: 'settings',
    label: 'Ustawienia',
    files: [
      {
        name: 'authors',
        label: 'Autorzy i autorki',
        file: 'authors.json',
        fields: [
          {
            name: 'authors',
            label: 'Autorzy i autorki',
            summary: '{{displayName}}',
            widget: 'list',
            fields: [
              { label: 'Nazwa uproszczona', hint: 'do adresu strony', name: 'slug', widget: 'string' },
              {
                label: 'Dane',
                name: 'meta',
                widget: 'object',
                collapsed: false,
                fields: [
                  { label: 'Imię', name: 'first_name', widget: 'string', required: true },
                  { label: 'Nazwisko', name: 'last_name', widget: 'string', required: true },
                  {
                    label: 'Forma zwrotów',
                    name: 'gender',
                    widget: 'select',
                    hint: 'on / ona',
                    options: [
                      { label: 'męska', value: 'm' },
                      { label: 'żeńska', value: 'f' },
                    ],
                  },
                  { label: 'Opis', name: 'description', widget: 'text', required: false },
                  { label: 'Twitter', name: 'twitter', widget: 'string', pattern: urlPattern, required: false },
                  { label: 'Facebook', name: 'facebook', widget: 'string', pattern: urlPattern, required: false },
                  { label: 'GitHub', name: 'github', widget: 'string', pattern: urlPattern, required: false },
                  { label: 'Strona WWW', name: 'website', widget: 'string', pattern: urlPattern, required: false },
                ],
              },
              { label: 'Nazwa', name: 'displayName', widget: 'hidden' },
              { label: 'Avatar', name: 'avatarUrl', widget: 'image', choose_url: true, required: false },
            ],
          },
        ],
      },
    ],
  };
}

function legacyWordpressCollection() {
  return {
    name: 'legacy_posts',
    label: 'Posty z wordpressa',
    summary: [
      '',
      '{{fields.thumbnail.url}}',
      '{{fields.title}}',
      '{{fields.categories[0].name}}',
      '{{fields.date}}',
      '{{fields.authors}}',
    ].join(DELIMITER),
    description:
      'Stare posty zaimportowane z WordPressa. Nie wszystkie są napisane w poprawnym Markdownie, niektóre używają HTML.',
    path: '{{year}}/{{month}}/{{slug}}',
    folder: '_wordpress_posts',
    create: false,
    slug: '{{slug}}',
    preview_path: '{{fields.permalink}}',
    sortable_fields: ['date'],
    extension: 'md',
    editor: {
      preview: true,
    },
    fields: [
      {
        label: 'title',
        name: 'title',
        widget: 'string',
      },
      {
        label: 'date',
        name: 'date',
        widget: 'datetime',
      },
      {
        label: 'isMarkdown',
        name: 'isMarkdown',
        widget: 'boolean',
        default: true,
      },
      {
        label: 'Body',
        name: 'body',
        widget: 'markdown',
        modes: ['raw'],
      },
      {
        label: 'permalink',
        name: 'permalink',
        widget: 'string',
      },
      {
        label: 'authors',
        name: 'authors',
        widget: 'list',
        allow_add: false,
      },
      {
        label: 'type',
        name: 'type',
        widget: 'string',
      },
      {
        label: 'thumbnail',
        name: 'thumbnail',
        widget: 'object',
        summary: '{{fields.url}}',
        collapsed: false,
        required: false,
        fields: [
          {
            label: 'url',
            name: 'url',
            widget: 'image',
            choose_url: true,
            required: false,
          },
          {
            label: 'width',
            name: 'width',
            widget: 'number',
            value_type: 'int',
            required: false,
          },
          {
            label: 'height',
            name: 'height',
            widget: 'number',
            value_type: 'int',
            required: false,
          },
        ],
      },
      {
        label: 'categories',
        name: 'categories',
        widget: 'list',
        required: true,
        summary: '{{fields.slug}}',
        fields: [
          {
            label: 'slug',
            name: 'slug',
            widget: 'select',
            options: legacyCategories,
          },
        ],
      },
      {
        label: 'series',
        name: 'series',
        widget: 'object',
        required: true,
        summary: '{{fields.slug}}',
        fields: [
          {
            label: 'slug',
            name: 'slug',
            widget: 'select',
            options: allSeries.map((s) => s.slug),
          },
        ],
      },
      {
        label: 'seo',
        name: 'seo',
        widget: 'object',
        collapsed: true,
        fields: [
          {
            label: 'focusKeywords',
            name: 'focusKeywords',
            widget: 'list',
            required: false,
          },
          {
            label: 'focusKeywordSynonyms',
            name: 'focusKeywordSynonyms',
            widget: 'list',
            required: false,
          },
          {
            label: 'metadesc',
            name: 'metadesc',
            widget: 'text',
            required: false,
          },
          {
            label: 'title',
            name: 'title',
            widget: 'string',
            required: false,
          },
        ],
      },
    ],
  };
}

async function posts() {
  const authors = (await import(/* webpackChunkName: "authors" */ '../../authors.json')).default.authors;
  return {
    name: 'posts',
    label: 'Artykuły',
    label_singular: 'Artykuł',
    summary: [
      '',
      '{{fields.thumbnail.url}}',
      '{{fields.title}}',
      '{{fields.category}}',
      '{{fields.date}}',
      '{{fields.authors}}',
    ].join(DELIMITER),
    path: '{{year}}/{{month}}/{{slug}}',
    folder: '_posts',
    slug: '{{slug}}',
    create: true,
    preview_path: '{{fields.permalink}}',
    sortable_fields: ['date'],
    format: 'yaml-frontmatter',
    extension: 'mdx',
    editor: {
      preview: true,
    },
    fields: [
      {
        label: 'Tytuł',
        name: 'title',
        widget: 'string',
      },
      {
        label: 'permalink',
        name: 'permalink',
        widget: 'hidden',
      },
      {
        label: 'type',
        name: 'type',
        widget: 'hidden',
        default: 'post',
      },
      {
        label: 'Data',
        name: 'date',
        widget: 'datetime',
      },
      {
        label: 'Treść',
        name: 'body',
        widget: 'markdown',
      },
      {
        label: 'Autorzy',
        name: 'authors',
        widget: 'select',
        options: authors.map((a) => a.slug),
        multiple: true,
        min: 1,
      },
      {
        label: 'Zdjęcie',
        name: 'thumbnail',
        widget: 'object',
        summary: '{{fields.url}}',
        collapsed: false,
        required: false,
        fields: [
          {
            label: 'url',
            name: 'url',
            widget: 'image',
            choose_url: false,
            required: false,
            allow_multiple: false,
            media_folder: '/public/media',
          },
          {
            label: 'width',
            name: 'width',
            widget: 'number',
            value_type: 'int',
            required: false,
          },
          {
            label: 'height',
            name: 'height',
            widget: 'number',
            value_type: 'int',
            required: false,
          },
        ],
      },
      {
        label: 'Kategorie',
        name: 'category',
        widget: 'select',
        options: allCategories.map((c) => c.slug),
        multiple: false,
        min: 1,
      },
      {
        label: 'Seria',
        name: 'series',
        widget: 'select',
        options: allSeries.map((s) => s.slug),
        multiple: false,
        required: false,
      },
      {
        label: 'SEO',
        name: 'seo',
        widget: 'object',
        collapsed: true,
        fields: [
          {
            label: 'focusKeywords',
            name: 'focusKeywords',
            widget: 'list',
            required: false,
          },
          {
            label: 'focusKeywordSynonyms',
            name: 'focusKeywordSynonyms',
            widget: 'list',
            required: false,
          },
          {
            label: 'metadesc',
            name: 'metadesc',
            widget: 'text',
            required: false,
          },
          {
            label: 'title',
            name: 'title',
            widget: 'string',
            required: false,
          },
        ],
      },
    ],
  };
}

async function pages(): Promise<import('./_netlifySchema').CollectionItems> {
  const props = await posts();

  return {
    ...props,
    summary: ['', '{{fields.thumbnail.url}}', '{{fields.title}}', '', '{{fields.date}}', ''].join(DELIMITER),
    name: 'pages',
    label: 'Strony',
    label_singular: 'Strona',
    description: '',
    sortable_fields: [],
    path: '{{slug}}',
    folder: '_pages',
    fields: [
      ...props.fields.filter((f) => !['authors', 'categories', 'series', 'type'].includes(f.name)),
      {
        label: 'type',
        name: 'type',
        widget: 'hidden',
        default: 'page',
      },
    ],
  };
}
