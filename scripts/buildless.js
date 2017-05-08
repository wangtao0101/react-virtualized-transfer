const NpmImportPlugin = require('less-plugin-npm-import');
const less = require('less');
const fs = require('fs');
const path = require('path');

const options = { plugins: [new NpmImportPlugin({ prefix: '~' })] };

if (fs.existsSync(path.join(__dirname, '../src/transfer.less'))) {
    const lessFile = fs.readFileSync(path.join(__dirname, '../src/transfer.less')).toString();
    less.render(lessFile, options)
    .then((output) => {
        fs.writeFileSync(path.join(process.cwd(), 'lib', 'transfer.css'), output.css);
    })
    .catch((err) => {
        // eslint-disable-next-line
        console.error(err);
    });
}
