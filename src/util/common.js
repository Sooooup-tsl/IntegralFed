// 日期操作 封装一些日期常用操作
var dateUtil = {
    /**
     * [getDetail 获取一个日期的详细信息]
     * @param  {[type]} date [必传 日期对象|时间戳|日期格式]
     * @return {[type]}      [日期相关信息]
     */
    getDetail: function (date) {
        var _date = null;

        if (date instanceof Date) {
            // 传进来的为日期对象
            _date = date;
        } else if (typeof date === 'string') {
            // 日期格式
            _date = new Date(this.switchConnectSign(date, 0));
        } else if (typeof date == 'number') {
            // 时间戳
            _date = new Date(date);
        } else {
            _date = new Date();
        }

        // 日期信息对象
        var dateInfo = {};
        // 本地当前时间
        var now = new Date();
        var date0;
        var diff;

        // 星期 数组
        var weekDayArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

        // 设置日期的起点时间
        date0 = new Date(_date.getFullYear(), _date.getMonth(), _date.getDate());
        now = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        diff = date0.getTime() - now.getTime();

        if (diff == 0) {
            dateInfo.day1 = '今天';
        } else if (diff == 86400000) {
            dateInfo.day1 = '明天';
        } else if (diff == 172800000) {
            dateInfo.day1 = '后天';
        }

        dateInfo.weekday = weekDayArr[_date.getDay()];
        dateInfo.year = _date.getFullYear();
        dateInfo.month = _date.getMonth() + 1;
        dateInfo.day = _date.getDate();
        dateInfo.hour = _date.getHours();
        dateInfo.minute = _date.getMinutes();
        dateInfo.second = _date.getSeconds();

        return dateInfo;
    },
    /**
     * [formatNum 格式化数字 将小于10以下的数字前面加0]
     * @param  {[type]} num [必传 数字]
     * @return {[type]}     [数字]
     */
    formatNum: function (num) {
        if (num < 10) {
            return '0' + num;
        }

        return num;
    },
    // 格式化日期 转成你想要的格式 例如: dateUtil.format(new Date(), 'Y-M-D H:F:S') => yyyy-mm-dd hh:ff:ss
    /**
     * [format 格式化日期 转成你想要的格式 例如: dateUtil.format(new Date(), 'Y-M-D H:F:S') => yyyy-mm-dd hh:ff:ss]
     * @param  {[type]} date      [必传 date对象|时间戳字符串|毫秒数]
     * @param  {[type]} formatStr [非必传 想要的格式 有设置默认日期格式]
     * @return {[type]}           [想要的格式]
     */
    format: function (date, formatStr) {
        var d;
        date = date || new Date();

        if (date instanceof Date) {
            // 传入Date对象
            d = date;
        } else if (typeof date === 'string') {
            // 日期格式
            d = new Date(this.switchConnectSign(date, 0));
        } else if (typeof date === 'number') {
            // 时间戳
            d = new Date(date);
        }

        if (!formatStr) {
            // 未传入格式
            formatStr = 'Y-M-D H:F:S';
        }

        var self = this;

        return formatStr.replace(/Y|y|M|m|D|d|H|h|F|f|S|s/g, function (v) {
            switch (v) {
                case 'y':
                    // yyyy => yy
                    return (d.getFullYear() + '').slice(2);
                case 'Y':
                    // yyyy
                    return d.getFullYear();
                case 'm':
                    // m
                    return d.getMonth() + 1;
                case 'M':
                    // mm
                    return self.formatNum(d.getMonth() + 1);
                case 'd':
                    // d
                    return date.getDate();
                case 'D':
                    // dd
                    return self.formatNum(d.getDate());
                case "h":
                    // h
                    return d.getHours();
                case "H":
                    // hh
                    return self.formatNum(d.getHours());
                case "f":
                    // f
                    return d.getMinutes();
                case "F":
                    // ff
                    return self.formatNum(d.getMinutes());
                case "s":
                    // s
                    return d.getSeconds();
                case "S":
                    // ss
                    return self.formatNum(d.getSeconds());
            }
        });
    },
    /**
     * [addTime 增加时间]
     * @param {[type]} date      [必传 日期对象|时间戳|日期格式]
     * @param {[type]} type      [必传 增加时间的格式 例如: 1D 1天 | 2H 2小时]
     * @param {[type]} formatStr [非必传 可以设置为想要的格式]
     * @return {[type]}          [日期对象|想要的日期格式]
     */
    addTime: function (date, type, formatStr) {
        var d = date || new Date();

        if (typeof d === 'string') {
            // 日期格式
            d = new Date(this.switchConnectSign(d, 0));
        } else if (typeof d === 'number') {
            // 时间戳
            d = new Date(d);
        } else if (!type || type.search(/Y|M|D|H|F|S/g) < 0) {
            return;
        }

        // 毫秒数
        var msec;
        // 数值
        var val = type.split(/Y|M|D|H|F|S/g)[0];
        // 单位
        var unit = type.substr(-1, 1);

        switch (unit) {
            case 'M':
                //x月
                msec = val * 30 * 24 * 60 * 60 * 1000;
                break;
            case 'D':
                // x天
                msec = val * 24 * 60 * 60 * 1000;
                break;
            case "H":
                // x小时
                msec = val * 60 * 60 * 1000;
                break;
            case "F":
                // x分钟
                msec = val * 60 * 1000;
                break;
            case "S":
                // x秒
                msec = val * 1000;
                break;
        }

        d.setTime(d.getTime() + msec);

        if (formatStr) {
            // 需要更改格式
            return this.format(d, formatStr);
        } else {
            // 直接返回日期对象 自行处理
            return d;
        }
    },
    /**
     * [switchConnectSign 切换日期连接符 IOS只支持yyyy/mm/dd格式 不支持中划线]
     * @param {[type]} date [必传 日期 yyyy/mm/dd | yyyy-mm-dd]
     * @param {[type]} type [必传 转换类型 - => / | / => -]
     * @return {[type]} [新的日期格式]
     */
    switchConnectSign: function (date, type) {
        if (type == 0) {
            return date.replace('T', ' ').replace(/-/g, '/');
        } else if (type == 1) {
            return date.replace(/T/, ' ').replace(/\//g, '-');
        }
    },
    /**
     * [compare 比较两个日期大小]
     * @param {[type]} date1 [必传 日期 | 日期格式字符串 | 时间戳]
     * @param {[type]} date2 [必传 日期 | 日期格式字符串 | 时间戳]
     * @return {[type]} [数字 -1 前面小于后面 | 0 前面等于后面 | 1 前面大于后面]
     */
    compare: function (date1, date2) {
        var timestamp1;
        var timestamp2;

        if (date1 instanceof Date) {
            // 日期
            timestamp1 = date1.getTime();
        } else if (typeof date1 === 'string') {
            // 日期格式
            timestamp1 = new Date(this.switchConnectSign(date1, 0)).getTime();
        } else if (typeof date1 === 'number') {
            // 时间戳
            timestamp1 = date1;
        } else {
            return;
        }

        if (date2 instanceof Date) {
            // 日期
            date2 = date2.getTime();
        } else if (typeof date2 === 'string') {
            // 日期格式
            timestamp2 = new Date(this.switchConnectSign(date2, 0)).getTime();
        } else if (typeof date2 === 'number') {
            // 时间戳
            timestamp2 = date2;
        } else {
            return;
        }

        if (timestamp1 < timestamp2) {
            return -1;
        } else if (timestamp1 > timestamp2) {
            return 1;
        } else {
            return 0;
        }
    }
};


// 根据奖扣标准数据转换成联动数据
function translateTypeList(mork) {
    var typeList = [];
    for (var i = 0; i < mork.length; i++) {
        let arr = [];
        var stdType = mork[i].stdType == 1 ? "扣分" : "奖分";
        // 第一层 奖扣类型
        arr[i] = [];
        arr[i].push(stdType);
        let [arr1, arr2, arr3, arr4] = [stdType];
        var categoryList = mork[i].categoryList;
        for (var j = 0; j < categoryList.length; j++) {
            var stdCategory = categoryList[j].stdCategory;
            // 第二层 标准类型
            arr[i][1] = stdCategory;

            var itemList = categoryList[j].itemList;
            for (var k = 0; k < itemList.length; k++) {
                var stdItem = itemList[k].stdItem;
                // 第三层 标准细则
                arr[i][2] = stdItem;
                var stdScoreSection = itemList[k].stdScoreSection;
                var stdScoreArr = stdScoreSection.split(",");
                for (var l = 0; l < stdScoreArr.length; l++) {
                    // 第四层 分数
                    arr[i][3] = stdScoreArr[l];

                    // 数据格式传给typeList 格式为
                    //  [
                    //     ["奖分", "任务执行", "开发任务", "5分"],
                    //     ["奖分", "任务执行", "开发任务", "10分"],
                    //     ["奖分", "出勤加班", "自然月全勤", "5分"],
                    //     ["奖分", "团队建设", "积极参加公司、项目活动", "5"]
                    //   ]
                    //   console.log(arr[i]);
                    var a = JSON.stringify(arr[i]);
                    typeList.push(JSON.parse(a));
                }
            }
        }
    }
    // 传入typeList数据
    return typeList;
}

export default {
    dateUtil,
    translateTypeList
}