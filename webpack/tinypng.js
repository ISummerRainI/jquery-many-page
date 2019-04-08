const path = require('path');
const fs = require('fs');
const tinify = require('tinify');
const activityData = require('./config.js');
const chalk = require('chalk');
if (activityData.tinypngKey === '') {
  console.log(chalk.red('请在package.json 文件配置tinypng的key，如果没有key，请前往【https://tinypng.com/developers】申请'));
  return;
}
tinify.key = activityData.tinypngKey;
const filePath = path.join(__dirname, `../src/${activityData.name}/static/img`);
const files = fs.readdirSync(filePath);
const reg = /\.(jpg|png)$/;
console.log(chalk.yellow(`图片压缩中...`));

files.forEach(item => {
  if (reg.test(item)) {
    tinify.fromFile(`${filePath}/${item}`).toFile(`${filePath}/${item}`).then(() => {
      console.log(chalk.green(`图片${item}压缩完成`));
    });
  }
})
