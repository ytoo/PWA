// 可以这么注册 Service Worker
if ('serviceWorker' in navigator) {
        console.log("支持service worker!!!!!");
        var version = "11.0.94"
        // 为了保证首屏渲染性能，可以在页面 load 完之后注册 Service Worker
        navigator.serviceWorker.getRegistrations().then(function(regs) {
            console.log("注册的sw list", regs);
            // delSW(regs);
            regSW(version);
        });

        //监听 更新完成后的事件：可以执行一次刷新，获取最新内容
        navigator.serviceWorker.addEventListener('message', e => {
            // service-worker.js 如果更新成功会 postMessage 给页面，内容为 'sw.update'
            console.log("接受到message信息啦！！！")
            if (e.data === 'sw.update') {
                console.log("更新完成");
                // location.reload();
            } else {
                console.log("更新失败")
            }
        });
        
        // 添加应用横幅事件
        window.addEventListener('beforeinstallprompt', function (e) {
            e.userChoice.then(function (choiceResult) {
                alert(choiceResult.outcome);
            });
        });
   
} else {
    console.log("不支持service worker!");
}


function regSW(version) {
    // navigator.serviceWorker.register('/info/stockschoolpwa/sw.dev.js').then(function(reg) {
        // 加一个buildversion版本控制，实现sw.dev.js的版本更新
        // 首次注册 service worker 线程的页面需要再次加载才会受其控制。
    navigator.serviceWorker.register('./sw.dev.js?v=' + version).then(function(reg) {
        console.log("注册成功，当前作用域为:", reg.scope);
        if (reg.installing) {
            console.log('Service worker installing。。。');
        }
        if (reg.waiting) {
            console.log('Service worker installed。。。');
        }
        if (reg.active) {
            console.log('Service worker active。。。');
        }

        // 另外一种形式的版本控制
        // if(localStorage.getItem("sw_version") !== version){
        //     reg.update().then(function(){
        //         localStorage.setItem("sw_version",version);
        //     })
        // }
    })
    .catch(function(e) {
        console.log("注册service worker失败", e);
    })
}

//删除缓存(注销service worker)
function delSW(regs) {
    for (var reg of regs) {
        console.log("遍历注册的sw", reg);
        if (reg.scope == 'http://localhost:3088/static/info/stockschoolpwa/') {
            reg.unregister().then(function(boolean) { //卸载sw 后，再次请求会直接走网络请求，但是缓存文件并未删除
                // if boolean = true, unregister is successful
                console.log("注销成功 unregister", reg);
                //清除所有缓存文件
                caches.delete("workbox-precache-http://localhost:3088/static/info/stockschoolpwa/").then(function(data) {
                    console.log("删除缓存workbox-precache-http://localhost:3088/static/info/stockschoolpwa/ ", data);
                });
                caches.delete("my-app-custom-runtime-name-v4").then(function(data) {
                    console.log("删除缓存my-app-custom-runtime-name-v4", data);
                });

            });
        }
    }

}
