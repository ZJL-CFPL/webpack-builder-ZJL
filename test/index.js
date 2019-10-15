const path = require('path');

process.chdir(path.join(__dirname,'smoke/template'))

describe('webpack-builder test case',()=>{
  require('./unit/webpack-base-test');
})