sedi () {
  sed --version >/dev/null 2>&1 && sed -i -- "$@" || sed -i "" "$@"
}

# Fuck node.js seriously

sedi 's/  "type": "commonjs",/  "type": "module",/' package.json
yarn feed

sedi 's/  "type": "module",/  "type": "commonjs",/' package.json
yarn next build
