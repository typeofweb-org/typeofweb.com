#!/bin/bash

sedi () {
  sed --version >/dev/null 2>&1 && sed -i -- "$@" || sed -i "" "$@"
}

ARGS=$@

if [[ ${ARGS[*]} =~ 'feed' ]]; then
  # Fuck node.js seriously
  sedi 's/  "type": "commonjs",/  "type": "module",/' package.json
  yarn feed
  sedi 's/  "type": "module",/  "type": "commonjs",/' package.json
fi

if [[ ${ARGS[*]} =~ 'next' ]]; then
  yarn next build
fi

if [[ ${ARGS[*]} =~ 'public' ]]; then
  # compress public JS files
  shopt -s nullglob
  FILES="./public/*.js"
  for f in $FILES
  do
    if !(echo "$f" | grep -q "\.min\.js$"); then
      NAME=`echo "$f" | sed -e 's/\(.*\)\.js$/\1\.min\.js/'`
      yarn terser --config-file terser.config.json -o $NAME $f
    fi
  done
fi
