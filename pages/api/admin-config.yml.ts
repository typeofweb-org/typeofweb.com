import Yaml from 'js-yaml';

import { host } from '../../constants';
import { allCategories, categoryMappings } from '../../utils/categories';
import { allSeries } from '../../utils/series';

import type { NetlifyConfigSchema } from './_netlifySchema';
import type { NextApiHandler } from 'next';

const adminConfigYmlHandler: NextApiHandler = async (req, res) => {
  const result: NetlifyConfigSchema = await config();
  res.setHeader('Content-Type', 'text/yaml; charset=utf-8');
  res.send(Yaml.dump(result));
};

export default adminConfigYmlHandler;

const legacyCategories = Object.keys(categoryMappings)
  .flatMap((x) => x.split('+'))
  .filter((x, idx, arr) => arr.indexOf(x) === idx);

const config = async (): Promise<NetlifyConfigSchema> => {
  return {
    locale: 'pl',
    backend: {
      name: 'github',
      repo: 'typeofweb/design-tailwind',
      branch: 'main',
      base_url: host,
      site_url: host,
      auth_endpoint: 'api/auth',
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
    slug: {
      encoding: 'ascii',
      clean_accents: true,
    },
    summary: '{{title}} ({{commit_author}} @ {{commit_date}})',
    media_folder: 'public/media/',
    public_folder: '/media/',
    collections: [await posts(), legacyWordpressCollection(), pages()],
  };
};

function legacyWordpressCollection(): import('./_netlifySchema').CollectionItems {
  return {
    name: 'legacy_posts',
    label: 'Posty z wordpressa',
    summary: '{{title}} – {{fields.authors}}',
    description:
      'Stare posty zaimportowane z WordPressa. Nie wszystkie są napisane w poprawnym Markdownie, niektóre używają HTML.',
    path: '{{year}}/{{month}}/{{slug}}',
    folder: '_wordpress_posts',
    create: false,
    slug: '{{slug}}',
    preview_path: '{{slug}}',
    sortable_fields: ['date'],
    extension: 'md',
    editor: {
      preview: true,
    },
    fields: [
      {
        label: 'index',
        name: 'index',
        widget: 'number',
        value_type: 'int',
      },
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
            required: true,
          },
          {
            label: 'width',
            name: 'width',
            widget: 'number',
            value_type: 'int',
          },
          {
            label: 'height',
            name: 'height',
            widget: 'number',
            value_type: 'int',
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

async function posts(): Promise<import('./_netlifySchema').CollectionItems> {
  const authors = (await import(/* webpackChunkName: "authors" */ '../../authors.json')).default;
  return {
    name: 'posts',
    label: 'Artykuły',
    label_singular: 'Artykuł',
    summary: '{{title}} – {{fields.authors}}',
    path: '{{year}}/{{month}}/{{slug}}',
    folder: '_posts',
    slug: '{{slug}}',
    create: true,
    preview_path: '{{slug}}',
    sortable_fields: ['date'],
    format: 'yaml-frontmatter',
    extension: 'mdx',
    editor: {
      preview: true,
    },
    fields: [
      {
        label: 'index',
        name: 'index',
        widget: 'number',
        value_type: 'int',
      },
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
        required: true,
        fields: [
          {
            label: 'url',
            name: 'url',
            widget: 'image',
            choose_url: false,
            required: true,
          },
          {
            label: 'width',
            name: 'width',
            widget: 'number',
            value_type: 'int',
          },
          {
            label: 'height',
            name: 'height',
            widget: 'number',
            value_type: 'int',
          },
        ],
      },
      {
        label: 'Kategorie',
        name: 'categories',
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

function pages(): import('./_netlifySchema').CollectionItems {
  return {
    ...legacyWordpressCollection(),
    summary: '{{title}} – {{fields.authors}}',
    name: 'pages',
    label: 'Strony',
    label_singular: 'Strona',
    description: '',
    path: '',
    sortable_fields: [],
  };
}
