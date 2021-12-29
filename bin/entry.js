const fs = require('fs');
const path = require('path');
const uppercamelize = require('uppercamelcase');

function indexEntry() {

const Components = fs.readdirSync(path.resolve(__dirname, '../src'))
					.filter(name => name.indexOf('.vue') > 0)
					.map(name => name.slice(0,-4));
const importList = Components.map(name => `import ${uppercamelize(name)} from './src/${name}.vue';`)
const vueuseList = Components.map(name => `Vue.component('${name}', ${uppercamelize(name)});`)
const exportList = Components.map(name => `${uppercamelize(name)}`);

const tips = `/**
 * CopyRight (C) 2019-2022 Wlniao Studio.
 * Created by Abler on 19/05/17
 */
`
const content = `${tips}
${importList.join('\n')}
${vueuseList.join('\n')}

export {
  ${exportList.join(',\n  ')}
};
`
  fs.writeFileSync(path.join(__dirname, '../index.js'), content);
}

indexEntry();
