// workbox 2.x 是将 workbox 核心内容放在 workbox-sw node_modules 包里维护的
// workbox 3.x 开始是将 workbox 核心 lib 放在 CDN 维护
// 当然也可以挪到自己的 CDN 维护
//importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0-alpha.3/workbox-sw.js');
importScripts('./js/lib/3.0.0-alpha.3/workbox-sw.js');
if (!workbox) {
    console.log(`Boo! workbox did not load 😬`);
} else {
    console.log("workbox---", workbox);
    console.log(`Yay! workbox is loaded 🎉`);
    console.log("workbox precaching", workbox.precaching);
    console.log("self.__precacheManifest", self.__precacheManifest);

    // 安装阶段跳过等待，直接进入 active
    self.addEventListener('install', function (event) {
        event.waitUntil(self.skipWaiting());
    });
    
    //配置项
    workbox.core.setCacheNameDetails({
        prefix: 'my-app',
        suffix: 'v4',
        precache: 'custom-precache-name',// 不设置的话默认值为 'precache',但是在workerbox中这个设置似乎不起作用
        runtime: 'custom-runtime-name' // 不设置的话默认值为 'runtime'
    });

    workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

    // 通常项目中的sw.js源文件都是通过这样预留一个空数组的方式来预缓存内容列表的
    // 以下这段代码会在Service Worker 安装成功的时候下载 预缓存列表中的 文件，
    // 并且会以构造路由的方式将这些文件都存储到 Cache Storage 中
    workbox.precaching.precacheAndRoute([]);



    // 预缓存列表中的缓存级别高于下面路由设置的缓存


    // 路由请求缓存是通过文件路由匹配的模式分别对指定的路由文件做不同策略缓存的方式
    //路由匹配的三种方式：
    // 1、字符串匹配 可以直接是当前项目下的绝对路径
    workbox.routing.registerRoute(
        '/images/newer.png',
        // networkOnly 比较直接的策略，直接强制使用正常的网络请求，
        // 并将结果返回给客户端，这种策略比较适合对实时性要求非常高的请求。
        workbox.strategies.networkOnly() // handler 是做缓存策略的回调函数，通常指讲到的 '缓存策略函数'
    );
    workbox.routing.registerRoute(
        '/images/lifting.png',
        // cacheOnly 比较直接的策略，直接使用 Cache 缓存的结果，并将结果返回给客户端，
        // workbox.strategies.cacheOnly() 
        //cacheFirst这个策略的意思就是当匹配到请求之后直接从 Cache 缓存中取得结果，如果 Cache 缓存中没有结果，
        // 那就会发起网络请求，拿到网络请求结果并将结果更新至 Cache 缓存，并将结果返回给客户端。
        workbox.strategies.cacheFirst()
    );
    workbox.routing.registerRoute(
        '/home.html',
        //networkFirst这种策略就是当请求路由是被匹配的，就采用网络优先的策略，
        // 也就是优先尝试拿到网络请求的返回结果，如果拿到网络请求的结果，
        // 就将结果返回给客户端并且写入 Cache 缓存，如果网络请求失败，
        // 那最后被缓存的 Cache 缓存结果就会被返回到客户端，
        workbox.strategies.networkFirst() 
    );
    workbox.routing.registerRoute(
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534871569524&di=e6d2ca7af86e5b5033779b56c5c89d41&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F17%2F35%2F96%2F54c58PICBKb_1024.jpg',
        // staleWhileRevalidate这种策略的意思是当请求的路由有对应的 Cache 缓存结果就直接返回，
        // 在返回 Cache 缓存结果的同时会在后台发起网络请求拿到请求结果并更新 Cache 缓存，
        // 如果本来就没有 Cache 缓存的话，直接就发起网络请求并返回结果
        workbox.strategies.staleWhileRevalidate() 
    );
    workbox.routing.registerRoute(
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534871569524&di=e6d2ca7af86e5b5033779b56c5c89d41&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F17%2F35%2F96%2F54c58PICBKb_1024.jpg',
        // 第三方缓存时，cacheFirst也可以走service worker缓存
        // workbox.strategies.cacheFirst() 
        workbox.strategies.staleWhileRevalidate()
    );
    workbox.routing.registerRoute(
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534871569524&di=e6d2ca7af86e5b5033779b56c5c89d41&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F17%2F35%2F96%2F54c58PICBKb_1024.jpg',
        // workbox.strategies.cacheFirst() 
        workbox.strategies.staleWhileRevalidate()
    );
    workbox.routing.registerRoute(
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534871569524&di=e6d2ca7af86e5b5033779b56c5c89d41&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F17%2F35%2F96%2F54c58PICBKb_1024.jpg',
         workbox.strategies.staleWhileRevalidate()
        // workbox.strategies.cacheOnly() 缓存第三方数据时不能使用cacheOnly，否则会报错
    );
    workbox.routing.registerRoute(
        '/static/info/stockschoolpwa/sw.dev.js',
        workbox.strategies.networkFirst() 
        // workbox.strategies.staleWhileRevalidate() 
    );
    /* workbox.routing.registerRoute(
         /.*\.(?:png|jpg|jpeg|svg|gif)/g,
         new workbox.strategies.CacheFirst({
             cacheName: 'my-image-cache',
         })
     );*/
    /*workbox.routing.registerRoute(
        '/info/stockschoolpwa/index.html',
        workbox.strategies.networkOnly() // handler 是做缓存策略的回调函数，通常指后面所会讲到的 '缓存策略函数'
    );*/
    //2、正则匹配
    /* workbox.routing.registerRoute(
         new RegExp('.*\.js'), // 这里是任何正则都行，只要能匹配得上的请求路由地址
         workbox.strategies.cacheFirst()
     );*/
    //3、回调函数匹配
    // 通过回调函数来匹配请求路由将会让策略更加灵活
    /*const matchFunction = ({url, event}) => {
        // 如果请求路由匹配了就返回 true，也可以返回一个参数对象以供 handler 接收处理
        return false;
    };

    workbox.routing.registerRoute(
        matchFunction,
        workbox.strategies.cacheFirst()
    );*/

    //自定义路由匹配规则及缓存策略
    /*workbox.routing.registerRoute(
        ({ url, event }) => {
            return {
                name: 'workbox',
                type: 'guide',
            };
        },
        ({ url, event, params }) => {
            // 返回的结果是：A guide on workbox
            return new Response(
                `A ${params.type} on ${params.name}`
            );
        }
    );*/

    //处理html缓存导致的
    /*this.addEventListener("fetch", function(event) {
        event.respondWith(
            caches.match(event.request).then(response => {
                // cache hit
                if (response) {
                    //如果取的是html，则看发个请求看html是否更新了
                    if (response.headers.get("Content-Type").indexOf("text/html") >= 0) {
                        console.log("update html");
                        let url = new URL(event.request.url);
                        util.updateHtmlPage(url, event.request.clone(), event.clientId);
                    }
                    return response;
                }

                return util.fetchPut(event.request.clone());
            })
        );
    });*/

    // 新的service worker线程被激活（其实和离线包一样存在"二次生效"的机理）
    //service-worker更新完成后 通知客户端 postMessage
    self.addEventListener('activate', function(event) {
         event.waitUntil(
             // 获取到caches Storage缓存列表的key值
            caches.keys().then(function(cacheList) {
                console.log(cacheList);
                return Promise.all(
                    // 删除之前的缓存的操作 balabala ...
                    cacheList.map(function (cacheName) {
                        console.log(cacheName);
                        if (cacheName !== 'workbox-precache-http://localhost:3088/static/info/stockschoolpwa/' && cacheName !=="my-app-custom-runtime-name-v4" ) {
                            return caches.delete(cacheName);
                        }
                    })
                );
             }).then(function() {
                 return self.clients.matchAll()
                     .then(function(clients) {
                         if (clients && clients.length) {
                             clients.forEach(function(client) {
                                 // 这样发出去，sw-register.js 就能收的到啦
                                 client.postMessage('sw.update');
                             })
                         }
                     })
             })
         );
     });

     // 第二种更新客户端，清除旧缓存的方法
    // self.addEventListener('activate', function (event) {
    //     event.waitUntil(
    //             Promise.all([
    //                 // 更新客户端
    //                 self.clients.claim(),
    //                 // 清理旧版本
    //                 // caches.keys().then(function (cacheList) {
    //                 //     return Promise.all(
    //                 //         cacheList.map(function (cacheName) {
    //                 //             if (cacheName !== 'workbox-cache') {
    //                 //                 return caches.delete(cacheName);
    //                 //             }
    //                 //         })
    //                 //     );
    //                 // })
    //             ])
    //     );
    // });

   

  // 设置为开发模式
//   workbox.setConfig({debug: true});

//   workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

  // 啥 log 都没有，这个适用于线上生产环境
// workbox.core.setLogLevel(workbox.core.LOG_LEVELS.silent);



}
