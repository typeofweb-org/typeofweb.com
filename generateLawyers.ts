/* eslint-disable @typescript-eslint/consistent-type-assertions -- it's a script, c'mon */
import Path from 'path';
import Url from 'url';

import { init } from 'license-checker';

import Pkg from './package.json';
const { dependencies, devDependencies } = Pkg;

const formatRow = (row: readonly (string | readonly string[] | undefined)[]) =>
  '| ' + row.map((v) => v ?? '').join(' | ') + ' |';

const columns = ['name', 'version', 'licenses', 'repository', 'publisher', 'url'];

init({ start: Path.dirname(Url.fileURLToPath(import.meta.url)) }, (err, ret) => {
  const headers = formatRow(columns);
  const emptyRow = formatRow(columns.map(() => '---'));
  const rows = Object.entries(ret)
    .map(([nameVersion, obj]) => {
      const [name, version] = nameVersion.split('@');
      const { licenses, repository, publisher, url } = obj;
      return { name, version, licenses, repository, publisher, url };
    })
    .filter(({ name, version }) => {
      return (
        dependencies[name as keyof typeof dependencies] === version ||
        devDependencies[name as keyof typeof devDependencies] === version
      );
    })
    .map(({ name, version, licenses, repository, publisher, url }) => {
      return formatRow([name, version, licenses, repository, publisher, url]);
    });

  console.log([headers, emptyRow, ...rows].join('\n'));
});
