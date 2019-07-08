const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');
const copydir = require('copy-dir');

const root = path.resolve(__dirname, '..');
const dist = path.resolve(__dirname, '../dist');
const src = path.resolve(__dirname, '../src');
const docs = path.resolve(__dirname, '../docs');

fse.emptyDirSync(dist);
fse.ensureDirSync(dist);
fse.ensureDirSync(path.resolve(dist, 'docs'));

copydir.sync(src, dist, {});
copydir.sync(docs, path.resolve(dist, 'docs'), {});
fse.copyFileSync(path.resolve(root, '.env.example'), path.resolve(dist, '.env.example'));
fse.copyFileSync(path.resolve(root, 'LICENSE'), path.resolve(dist, 'LICENSE'));
fse.copyFileSync(path.resolve(root, 'README.md'), path.resolve(dist, 'README.md'));

let package = fse.readJsonSync(path.resolve(__dirname, '../package.json'));
package.main = 'index.js';
fse.writeJSONSync(path.resolve(dist, 'package.json'), package, { spaces: 2 });
