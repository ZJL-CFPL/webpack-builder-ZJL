const assert = require('assert');
describe('webpack.base.js test case',()=>{
  const baseConfig = require('../../lib/webpack.base.js');
  console.log(baseConfig);
  it('entry',()=>{
    assert.equal(baseConfig.entry.index,'G:/WebpackBuilder/test/smoke/template/src/index/index.js');
    assert.equal(baseConfig.entry.search,'G:/WebpackBuilder/test/smoke/template/src/search/index.js');
  })
})