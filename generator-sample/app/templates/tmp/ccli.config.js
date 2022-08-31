let path = require('path');
let packagejson = require('./package.json');
const ModuleToCdn = require('@cc/ccli-plugin-module-to-cdn')

module.exports = function ({
    // 是否为正式环境
    isProduction,
    // 当前运行的状态值，dev下为:"development"，打包到内网为:"beta"，打包到正式环境为:"production"
    mode
}) {
    const config = {
        // 设置环境变量
        env: {
            MODE: mode,
            NODE_ENV: isProduction ? 'production' : 'development'
            //dev下默认为 development，其它情况为 production
            // NODE_ENV: 'production', 
            // 同时地，也可以设置其它的变量
            // OHTER_ENV: 'ohter_env'
        },
    
        // 匹配入口文件
        entry: [
            'src/*.html',
            'src/entries/*/{index,dialog,mobPlugin,mobBigPlugin,webPlugin,tipsCard}.js',
            // 'src/entries/*/{index,}.js',
        ],
    
        build: {
            // 添加sentry的处理流程，如上传sourcemap，Default：false
            sentry: false,
            // 不启用ccli的eslint
            eslint: false,

            // 作用域提升(scope hoisting)，Default: false
            scopeHoisting: false,

            // 是否把css单独打包
            extractCSS: true,

            // 是否打包公共模块（就是打包出vendor、manifest文件）
            commonChunks: false,
    
            // 目前使用cdn插件，需要启用chunk排序
            fixChunksSort: true, 
            // webpack插件
            plugins: [
                new ModuleToCdn({
                    mode: mode,
                    verbose: false,  // 是否输出插件运行log
                }),
            ],

            babel: {
                plugins: [[require.resolve('babel-plugin-component'), {
                    libraryName: '@cc/ease-ui',
                    libDir: 'dist',
                    style: false,
                    camel2Dash: false
                }]]
            },

            // 对应 `webpack` 的 `resolve.alias`
            alias: {
                '@': path.resolve(__dirname, './'),
                '@src': path.resolve(__dirname, 'src'),
                '@pages': path.resolve(__dirname, 'src/pages'),
                '@img': path.resolve(__dirname, 'src/img'),
                '@styles': path.resolve(__dirname, 'src/styles'),
                '@js': path.resolve(__dirname, 'src/js'),
                '@components': path.resolve(__dirname, 'src/components'),
                '@mock': path.resolve(__dirname, 'src/mock'),
            },

            // styleResources: {
            //     scss: [
            //         path.resolve(__dirname, 'src/styles/funs.scss')
            //     ]
            // }
        },
    
        deploy: {
            // 提交到指定的目录
            dir: path.join(packagejson.path, packagejson.name).replace(/\\/g, '/'),
        }
    }

    return config;
}
  