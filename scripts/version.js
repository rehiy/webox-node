let fs = require('fs');

let package = require('../package.json');

//////////////////////////////////////////////////////////////////////

! function () {

    delete pkg.private;
    delete pkg.scripts;
    delete pkg.devDependencies;

    pkg.main = pkg.main.replace('src/', '');
    pkg.bin.webox = pkg.bin.webox.replace('src/', '');

    pkg.version = pkg.version.replace(/(\d+)$/, ($0, $1) => {
        return ++$1;
    });

    fs.writeFileSync('dist/package.json', JSON.stringify(pkg));

}()

! function () {

    let text = fs.readFileSync('dist/cli.js').toString();
    text = `#!/usr/bin/env node\n` + text;
    fs.writeFileSync('dist/cli.js', text);

}()

! function () {

    let version = pkg.version;

    let text = fs.readFileSync('dist/main.js').toString();
    text = text.replace('&version=dev', `&version=${version}`);
    fs.writeFileSync('dist/main.js', text);

}()

! function () {

    let version = pkg.version;

    let text = fs.readFileSync('package.json').toString();
    text = text.replace(/("version": ").+?(")/, `$1${version}$2`);
    fs.writeFileSync('package.json', text);

}()
