项目API测试

基于mocha chai supertest 自带测试报告mochawesome-report


package.json配置 npm启动方式
{
  "name": "LaserboxApiTest",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "./node_modules/mocha/bin/mocha  "
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "chai": "^4.2.0",
    "istanbul-lib-coverage": "^2.0.3",
    "mocha": "^6.0.2",
    "mochawesome": "^3.1.1",
    "supertest": "^4.0.2"
  }
}


mocha 操作参数配置文件  mocha.opts

test/CameraService/*.js
test/networkService/*.js
test/electricalService/*.js

--recursive
--reporter mochawesome
--growl
--watch
-t 10000