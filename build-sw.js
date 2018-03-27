const workboxBuild = require('workbox-build');
const path = require("path");

workboxBuild.injectManifest({
        // sw.js为配置预缓存模板文件
        swSrc: path.join(__dirname, './', 'sw.js'),
        // sw.dev.js为通过workbox-build构建插件动态生成的预缓存列表文件，生产用，指定生成后文件路径
        swDest: path.join(__dirname, './', 'sw.dev.js'),
        globDirectory: '.\\',
        // 需要缓存文件列表的正则匹配(当匹配的文件不存在时，无法正常生成sw.dev.js中的预缓存列表内容)
        globPatterns: [
            '**\/*.{html,js,css,png,jpeg,PNG}', 
            // '../../common/css/comm.css', 
            // "../../common/js/seajs2.0/sea.js",
            //  "../../common/js/seaConfig/config.js", 
            //  "../../common/js/zepto/zepto-1.1.6.js",
            //  "../../common/js/build/wt.min.js",
           
        ],
        // 不需要缓存的文件列表的正则匹配
        globIgnores: ["sw.js", "sw-register.js", "build/*.js", "workbox-cli-config.js", "webpack.config.js", "build-sw.js", "Gruntfile.js", "package.json", "batlog.log", 'node_modules/**', "js/lib/**"],
        // globIgnores: ["sw.js", "build/*.js", "workbox-cli-config.js", "webpack.config.js", "build-sw.js", "Gruntfile.js", "package.json", "batlog.log", 'node_modules/**', "js/lib/**"],
        templatedUrls: {
            // '/shell': ['dev/templates/app-shell.html', 'dev/**\/*.css'],
        },

        // 要替换的预留代码区正则
        injectionPointRegexp: /(\.precacheAndRoute\()\s*\[\s*\]\s*(\))/,
    }).then(function() {
        console.log("注入预缓存文件列表，sw.dev.js生成");
    })
    .catch(err => {
        console.error(`Unable to inject the precache manifest into sw.js`);
        console.error(err);
        throw err;
    });
