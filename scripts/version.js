let fs = require('fs');

let package = require('../package.json');

//////////////////////////////////////////////////////////////////////

! function () {

    delete package.private;
    delete package.scripts;
    delete package.devDependencies;

    package.version = package.version.replace(/(\d+)$/, function ($0, $1) {
        return ++$1;
    });

    fs.writeFileSync('dist/package.json', JSON.stringify(package));

}()

! function () {

    let version = package.version;

    let text = fs.readFileSync('package.json').toString();
    text = text.replace(/("version": ").+?(")/, `$1${version}$2`);
    fs.writeFileSync('package.json', text);

}()
