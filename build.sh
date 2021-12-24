#!/bin/bash

sedi () {
  sed --version >/dev/null 2>&1 && sed -i -- "$@" || sed -i "" "$@"
}

ARGS=$@

if [[ ${ARGS[*]} =~ 'feed' ]]; then
  echo "Building feed and algolia index..."
  # Fuck node.js seriously
  sedi 's/  "type": "commonjs",/  "type": "module",/' package.json
  yarn feed
  yarn algolia
  sedi 's/  "type": "module",/  "type": "commonjs",/' package.json
  echo "Done building feed and algolia index..."
fi

if [[ ${ARGS[*]} =~ 'next' ]]; then
  echo "Building Next.js..."
  yarn next build
  echo "Done building Next.js..."
fi

if [[ ${ARGS[*]} =~ 'public' ]]; then
  echo "Building public..."
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
  echo "Done building public..."
fi
