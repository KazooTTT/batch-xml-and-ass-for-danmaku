// 获取当前目录下有哪些文件
const fs = require("fs");
const path = require("path");
const files = fs.readdirSync(__dirname);
const targetFiles = files.filter((f) => {
  return f.endsWith(".xml");
});

const convertXml = (element) => {
  // 读取xml文件的所有内容
  const content = fs.readFileSync(path.join(__dirname, element), "utf-8");
  // 单独读取每一行的数据
  const lines = content.split("\n");
  const resultLines = [];
  // 读取每一行的数据
  lines.forEach((line) => {
    // 如果是user="hanser"的行
    if (line.match(/.*user="hanser".*/)) {
      // 获取><内部的值
      const value = line.match(/>(.*)</)?.[1];
      // 打印一下它的值
      console.log(line, value);
      // 把它替换成><内部的值
      resultLines.push(line.replace(/>(.*)</, `>【Hanser:${value}】<`));
    } else {
      // 不做任何操作
      resultLines.push(line);
    }
  });

  // 把所有的行拼接起来
  const result = resultLines.join("\n");
  // 创建一个新的文件
  fs.writeFileSync(path.join(__dirname + "/result", element), result);
};

// 读取每一个文件
targetFiles.forEach((element) => {
  convertXml(element);
});
