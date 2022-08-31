// web、pc端窗口设置
const windowConf = {
    size: {
        webcc: {
            width: 414,
            height: 600,
        },
        pc: {
            width: 414,
            height: 600,
        }
    },
    draggableArea: {        // 可拖动区域
        webcc: {
            left: '0',
            top: '0',
            width: '0',
            height: '0'
        },
        pc: function(x, y) {
            return false;
            // if((x > 0 && x <= 224 && y <= 50 && y >= 0)){
            //     return true;
            // }else{
            //     return false;
            // }
        }
    }
}

window.windowConf = windowConf;