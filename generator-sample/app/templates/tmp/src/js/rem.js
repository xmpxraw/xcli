(function () {
    var docEl = document.documentElement;
    var width, rem, resetTid;
    function initFontSize() {
        width = document.documentElement.clientWidth || (document.body ? document.body.clientWidth : 0);
        rem = width / 10;
        docEl.style.fontSize = rem + 'px';
    }
    function repairFontSize() {
        var testDiv = document.createElement('div');
        var rect, scaleRatio;
        testDiv.style.width = '10rem';
        testDiv.style.position = 'absolute';
        testDiv.style.left = '0';
        testDiv.style.right = '0';
        testDiv.style.visibility = 'hidden';
        testDiv.style.zIndex = '10';
        document.body.appendChild(testDiv);
        rect = testDiv.getBoundingClientRect();
        scaleRatio = rect.width / width;
        if (scaleRatio !== 1) {
            docEl.style.fontSize = rem / scaleRatio + 'px';
        }
        document.body.removeChild(testDiv);
    }
    function reset(e) {
        resetTid && clearTimeout(resetTid);
        resetTid = setTimeout(function() {
            resetTid = null;
            initFontSize();
            repairFontSize();
            (e.type == 'load') && window.removeEventListener('load', reset);
        }, e.type == 'load' ? 10 : 100);
    }
    function domReady() {
        initFontSize();
        repairFontSize();
        document.removeEventListener('DOMContentLoaded', repairFontSize);
    }

    document.documentElement && initFontSize();
    document.addEventListener('DOMContentLoaded', domReady);
    window.addEventListener('load', reset);
    window.addEventListener('resize', reset);
    window.remReset = reset;
}());
