const koa = require('koa');
const cache = require('./src/cache/index.js');
const constants = require('./src/constants');

const app = new koa();

app.use((ctx,next)=>{
  const url = ctx.url;
  if (url ==='/api/data/list') {
    const currentDate = +new Date();
    if (cache[url] && cache[url].data && currentDate < cache[url].invalidDate) {
      console.log('缓存数据')
      ctx.body = {
        type: '缓存数据',
        data: cache[url].data,
      }
    } else {
      // 获取数据
      const data = [{
        name: 'qiyangzhi',
        invalidDate: +new Date(new Date().toLocaleDateString()) + constants.ONEDAY
      }]
      ctx.body = {
        type: '实时数据',
        data: data,
      }
      cache[url] = {
        data,
        invalidDate: +new Date(new Date().toLocaleDateString()) + constants.ONEDAY
      };
    }
  }
})
app.listen(3000,function () {
  console.log('程序已经启动');
})