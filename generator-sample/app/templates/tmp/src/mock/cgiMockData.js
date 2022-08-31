let cgiMockData = {}

cgiMockData['getFishList1'] = {
    code: 0,
    data: {
        name: '呀哈哈',
        uid: 2134000,
        cid: 111
    }
}

cgiMockData['getFishList2'] = function() {
    let res = {
        name: '呀哈哈',
        uid: 2134000,
        cid: 111
    }

    return {
        code: 0,
        data: {...res}
    }
}

export default cgiMockData

