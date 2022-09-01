const Generator = require('yeoman-generator');
module.exports = class extends Generator {
    writing() {
        // 这是新建文件
        // this.fs.write(
            // this.destinationPath('line.txt'),
            // Math.random.toString()
        // )
        // 模板文件路径
        const tmpl = this.templatePath('tmp')
        const output = this.destinationPath('tmp')
        const context = {
            title: 'hello, zxm~',
            success: false,
        }
        this.fs.copyTpl(tmpl, output, context)
    }
}

// develop change44

// develop change22
// develop change23


// develop change1
// develop change2