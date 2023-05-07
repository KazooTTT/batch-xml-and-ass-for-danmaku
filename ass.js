// 获取当前目录下有哪些文件
const fs = require('fs');
const path = require('path');
const files = fs.readdirSync(__dirname + "/result");
const xmlFiles = files.filter((f) => {
    return f.endsWith('.ass');
})


const convertXml = (element) => {
// 读取xml文件的所有内容
    const content = fs.readFileSync(path.join(__dirname+"/result", element), 'utf-8');
// 单独读取每一行的数据
    const lines = content.split('\n');
    const resultLines = []
// 读取每一行的数据
    lines.forEach((line) => {
        // 如果行内字符串有【Hanser:
        if (line.match("【Hanser:")) {
            // 替换一下fs38替换为fs45
            let newLine = line.replace(/fs38/, `fs55`)
            // } 替换为\u1}
            newLine = newLine.replace("【",`{\\u1\\c&H0081EE&}【`)
            resultLines.push(newLine)
        } else {
            // 不做任何操作
            resultLines.push(line)
        }
    })

// 把所有的行拼接起来
    const result = resultLines.join('\n')
    // 返回当前目录的上一个目录
    fs.writeFileSync(path.join(__dirname, element), result)
}

// 读取每一个文件
xmlFiles.forEach((element) => {
    convertXml(element)
})
