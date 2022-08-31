// web、pc端窗口设置
const windowConf = {
    size: {
        webcc: {
            width: 414,
            height: 648,
        },
        pc: {
            width: 414,
            height: 648,
        }
    },
    draggableArea: {        // 可拖动区域
        webcc: {
            left: '60px',
            top: '0',
            width: '324px',
            height: '50px'
        },
        pc: function(x, y) {
            if((x > 60 && x <= 324 && y <= 50 && y >= 0)){
                return true;
            }else{
                return false;
            }
        }
    }
}

window.windowConf = windowConf;