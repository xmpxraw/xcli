/**
 * 屏蔽右键
 */
export function disabledKeys() {
    document.body.oncontextmenu = function() {
        return false
    }

    function doKey(e) {
        var ev = e || window.event //获取event对象
        var obj = ev.target || ev.srcElement //获取事件源
        var t = obj.type || obj.getAttribute('type') //获取事件源类型
        
        if (ev.keyCode == 8 && t != 'password' && t != 'text' && t != 'textarea') {
            return false
        }
        if (!(ev.keyCode == 86 && ev.ctrlKey) && !(ev.keyCode == 67 && ev.ctrlKey) && (ev.ctrlKey || ev.keyCode == 78 && ev.ctrlKey || ev.altKey || ev.altKey && ev.keyCode == 115)) {
            return false
        }
    }
    //禁止后退等其它按键 作用于Firefox、Opera
    document.onkeypress = doKey
    //禁止后退等其它按键  作用于IE、Chrome
    document.onkeydown = doKey
}


/**
 * 深度合并两个对象
 * @function
 * @param {Object} firstObj - 需要合并的对象1
 * @param {Object} secondObj - 需要合并的对象2
 * 
 * @return 合并后的对象
 */
export function deepObjectMerge(firstObj, secondObj) {
    for (var key in secondObj) {
        firstObj[key] = firstObj[key] && firstObj[key].toString() === "[object Object]" ?
        deepObjectMerge(firstObj[key], secondObj[key]) : firstObj[key] = secondObj[key];
    }
    return firstObj;
}


/**
 * 深度合并多个对象
 * @function
 * 
 * @param {...Object} objects - 需要合并的对象
 * 
 * @return {Obejct} 合并后的对象
 */
export function deepObjectMergeAll() {
    let newObj = {};
    let list = [];
    if (arguments.length > 0 && arguments[0] instanceof Array) {
        list = arguments[0];
    } else {
        list = arguments;
    }

    for (let i=0,len=list.length; i<len; i++) {
        newObj = deepObjectMerge(newObj, list[i]);
    }
    return newObj;
}


/* istanbul ignore next */
export function hasClass(el, cls) {
    if (!el || !cls) return false;
    if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
    if (el.classList) {
      return el.classList.contains(cls);
    } else {
      return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
  };
  
  /* istanbul ignore next */
  export function addClass(el, cls) {
    if (!el) return;
    var curClass = el.className;
    var classes = (cls || '').split(' ');
  
    for (var i = 0, j = classes.length; i < j; i++) {
      var clsName = classes[i];
      if (!clsName) continue;
  
      if (el.classList) {
        el.classList.add(clsName);
      } else if (!hasClass(el, clsName)) {
        curClass += ' ' + clsName;
      }
    }
    if (!el.classList) {
      el.setAttribute('class', curClass);
    }
  };
  
  /* istanbul ignore next */
  export function removeClass(el, cls) {
    if (!el || !cls) return;
    var classes = cls.split(' ');
    var curClass = ' ' + el.className + ' ';
  
    for (var i = 0, j = classes.length; i < j; i++) {
      var clsName = classes[i];
      if (!clsName) continue;
  
      if (el.classList) {
        el.classList.remove(clsName);
      } else if (hasClass(el, clsName)) {
        curClass = curClass.replace(' ' + clsName + ' ', ' ');
      }
    }
    if (!el.classList) {
      el.setAttribute('class', trim(curClass));
    }
  };