let fs = require('fs');

let package = require('../package.json');

//////////////////////////////////////////////////////////////////////

! function () {

    delete package.private;
    delete package.scripts;
    delete package.devDependencies;

    package.main = package.main.replace('src/', '');
    package.bin.webox = package.bin.webox.replace('src/', '');

    package.version = package.version.replace(/(\d+)$/, ($0, $1) => {
        return ++$1;
    });

    fs.writeFileSync('dist/package.json', JSON.stringify(package));

    // update index.js

}()

! function () {

    let version = package.version;

    let text = fs.readFileSync('dist/index.js').toString();
    text = text.replace('&version=dev', `&version=${version}`);
    fs.writeFileSync('dist/index.js', text);

}()


! function () {

    let version = package.version;

    let text = fs.readFileSync('package.json').toString();
    text = text.replace(/("version": ").+?(")/, `$1${version}$2`);
    fs.writeFileSync('package.json', text);

}()
