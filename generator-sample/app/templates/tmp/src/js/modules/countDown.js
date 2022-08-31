var callbacks = {},
    tid = null

// 启动定时器，计算当前倒计时的时间
function start() {
    tid = window.setTimeout(function () {
        if (Object.keys(callbacks).length > 0) {
            for (const id in callbacks) {
                var hander = callbacks[id]
                var curTime = +new Date / 1000
                // 当前倒计时 = 总倒计时时间 - (当前时间 - 记录的时间)
                var cur = Math.max(0, hander.seconds - (curTime - hander.addTime >> 0))

                hander.fn(cur)
                // 针对倒计时结束和设置成移出的倒计时操作
                if (cur <= 0 && hander.autoRemove) {
                    delete callbacks[id]
                }
            }
            clearTimeout(tid)
            start()
        } else {
            clearTimeout(tid)
            tid = null
        }
    }, 1000)
}
// 添加倒计时处理队列，返回倒计时队列删除函数 (秒数，回调，id，是否自动注销倒计时)
export const addCountDown = function (seconds, callback, id, autoRm = true) {
    var removeListener = null
    var listener = {
        seconds: seconds,
        addTime: +new Date / 1000,  //添加倒计时时间
        fn: callback,
        id: id || null,
        autoRemove: autoRm,
    }
    callbacks[listener.id] = listener
    tid || start() // 自动启动倒计时

    return removeListener
}
