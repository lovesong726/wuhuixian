const whxExpress = require('express');
const whxFs = require('fs');
const whxPath = require('path');

const whxApp = whxExpress();
const whxPort = 3004;
const whxDbFile = whxPath.join(__dirname, 'db.json');
const whxSiteRoot = whxPath.join(__dirname, '..');

// 读取 db.json 并通过接口返回 poems 数组
function whxGetPoems(whxRequest, whxResponse) {
  try {
    const whxData = JSON.parse(whxFs.readFileSync(whxDbFile, 'utf8'));
    whxResponse.json(whxData.poems);
  } catch (whxError) {
    whxResponse.status(500).json({ message: '诗歌数据读取失败' });
  }
}

// 通过本地服务器中转 db.json 中记录的远程诗歌图片
async function whxGetPoemImage(whxRequest, whxResponse) {
  try {
    const whxImageResponse = await fetch(whxRequest.query.url);
    const whxContentType = whxImageResponse.headers.get('content-type') || '';
    if (!whxImageResponse.ok || !whxContentType.startsWith('image/')) throw new Error('图片响应无效');
    const whxImageBuffer = Buffer.from(await whxImageResponse.arrayBuffer());
    whxResponse.type(whxContentType).send(whxImageBuffer);
  } catch (whxError) {
    whxResponse.sendStatus(502);
  }
}

// 允许课堂静态页面从其他本地端口读取诗歌接口
function whxAllowLocalAccess(whxRequest, whxResponse, whxNext) {
  whxResponse.set('Access-Control-Allow-Origin', '*');
  whxNext();
}

// 输出本地数据服务器的访问地址
function whxOnServerStart() {
  console.log(`诗歌数据服务器已启动：http://localhost:${whxPort}/whx_poems.html`);
}

whxApp.use(whxAllowLocalAccess);
whxApp.get('/api/poems', whxGetPoems);
whxApp.get('/api/poem-image', whxGetPoemImage);
whxApp.use(whxExpress.static(whxSiteRoot));
whxApp.listen(whxPort, whxOnServerStart);
