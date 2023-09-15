import * as s from 'shelljs';
const config = require('./tsconfig.json'); // it's going to be /dist anyway either for "dev" and for "prod" (in tsconfig.prod.json)
const outDir = config.compilerOptions.outDir;
const srcDir = 'src';

s.rm('-rf', outDir);
s.mkdir(outDir);
// s.cp('config.json', `${outDir}/config.json`);
// TODO: emplear outDir i ?srcDir?
if (process.platform === 'win32') {
  s.exec(`bin\\cwrsync_5.7.2_x86_free\\bin\\rsync.exe -a --prune-empty-dirs --include '*/' --include '*.pug' --include '*.html' --include '_workflows/*' --exclude '*' ${srcDir}/ ${outDir}/`);
} else { // *nix
  s.exec(`rsync -a --prune-empty-dirs --include '*/' --include '*.pug' --include '*.html' --include '_workflows/*' --exclude '*' ${srcDir}/ ${outDir}/`);
}
