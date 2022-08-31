let tcpMockData = {}

tcpMockData['baseInfo'] = {
    state: 0,
    data: {
        name: '模拟名称',
        uid: 21300010,
        ccid: 1123,
    }
}

tcpMockData['userInteral1'] = function() {
    let list = []

    for (let i = 0; i < 10; i++) {
        list.push({
            name:  `我是-${i}`
        })
    }

    return {
        state: 0,
        data: {
            list: list
        }
    }
}

tcpMockData['userInteral2'] = function(data) {
    let res = {
        name: '呀哈哈',
        rank: data.rank  ? '99+' : 99
    }

    return {
        state: 0,
        data: {
            ...res
        }
    }
}

tcpMockData['testDemo'] = function() {
    let res = {
        name: '阿拉啦啦啦啊'
    }

    return res;
}

export default tcpMockData;