# PWA
### 项目流程：
```
index.html-->引入sw-register.js + Date.now()-->注册sw.dev.js + buildVersion -->加载precacheList 静态资源文件和其他相关serviceWork逻辑代码
```
各个文件的作用:
```
   index.html--项目首页
   sw-register.js--用来判断是否浏览器是否支持serviceWork，如果支持就注册
   sw.dev.js--生成预缓存列表后的serviceWork文件
   build-sw.js--配置如何生成预缓存列表的匹配规则
   sw.js--判断是否支持workbox，并写入生成预缓存配置项，路由匹配缓存规则，缓存更细策略等的逻辑代码
```


执行如下代码可以依据sw.js文件生成sw.dev.js文件（生成预缓存列表）

```js
    node build-sw.js
```
