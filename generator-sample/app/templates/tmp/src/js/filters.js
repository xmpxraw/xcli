/**
 * @file 过滤器
 */

/**
 * 过滤器
 * @class
 * @hideconstructor
 */
const Filter = {
    /** 
     * 时间日期格式化
     * @function 
     * @param {Number} timestamp - 时间戳
     * @param {String} fmt - 日期时间格式，默认：YYYY-MM-DD hh:mm:ss
     * 
     * @example 
     * <div>{{ timestamp | timeformat('YYYY-MM-DD') }}</div>
    */
    timeformat: function (timestamp, fmt = 'YYYY-MM-DD hh:mm:ss') {
        if (typeof timestamp == 'string') {
            return timestamp;
        }
        var time = new Date(timestamp)
        var o = {
            "M+": time.getMonth() + 1, //月份
            "D+": time.getDate(), //日
            "h+": time.getHours(), //小时
            "m+": time.getMinutes(), //分
            "s+": time.getSeconds(), //秒
            "q+": Math.floor((time.getMonth() + 3) / 3), //季度
            "S": time.getMilliseconds() //毫秒
        };
        if (/(Y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },


    /** 
     * 将数字以千为单位添加逗号
     * @function 
     * 
     * @param {Number} num - 需要增加逗号的数字
     * 
     * @example 
     * <div>{{ 10000 | toThousands }}</div>
    */
    toThousands: function (num) {
        const sign = num >= 0 ? '' : '-';
        num = Math.abs(num);
        num = (num || 0).toString();
        let result = '';
        while (num.length > 3) {
            result = ',' + num.slice(-3) + result;
            num = num.slice(0, num.length - 3);
        }
        if (num) { result = num + result; }
        return sign + result;
    },


    /** 
     * 将数字格式化成W单位
     * @function 
     * 
     * @param {Number} num - 需要转换的数字
     * @param {Object}  options
     * @param {Number}  options.startUnit - 第几位开始转化成W，默认值是5，则1万以下不转换，若为6，则从10万以下不转换
     * @param {Boolean} options.comma - 以千为单位增加逗号，默认为true
     * @param {String}  options.unit - 单位字符，默认为W，可改为“万”或其他
     * 
     * @example 
     * <div>{{ 10000 | numFormat({ startUnit: 5, comma: true, unit: '万' }) }}</div>
    */
    numFormat: function (num, { startUnit = 5, comma = true, unit = 'W' }) {
        if (!num && num != 0) {
            return '';
        }
        const sign = num >= 0 ? '' : '-';
        num = Math.abs(num);
        const startNum = Math.pow(10, startUnit);
        let temp = num;
        if (comma) {
            temp = num < startNum ? this.toThousands(num) : (this.toThousands(parseInt(num / 10000)) + unit);
        } else {
            temp = num < startNum ? num : (parseInt(num / 10000) + unit);
        }
        return sign + temp;
    },

}

export default Filter;