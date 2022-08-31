/*
 * 
 与环境有关的配置项
 */

const  IS_PRODUCTION = process.env.NODE_ENV == 'production'

let configs = {
    beta: {     // 测试环境 and 开发环境
        apiHost: {
            asdasd: '//gameapi.dev.cc.163.com/actgamefish2020/',
            gamefish: '//gameapi.dev.cc.163.com/actgamefish2020/',
            userInfo2: '//api.dev.cc.163.com/v1/userlevel/', // 通过uid获取用户名 头像等信息
        },
    },
    prod: {     // 生产环境
        apiHost: {
            asdasd: '//gameapi.cc.163.com/actgamefish2020/',
            gamefish: '//gameapi.cc.163.com/actgamefish2020/',
            userInfo2: '//api.cc.163.com/v1/userlevel/',
        },
    }
}

export default {
    ...configs[IS_PRODUCTION ? 'prod' : 'beta'],
    /**
     * 与环境无关的配置项
     */
    mock:  false,         // mock数据的总开关，仅在开发环境有效

    cgis: {
        getFishList1: 'gamefish|get_sea_info',            // 获取当前鱼的列表
        getFishList2: 'gamefish|get_sea_info',       // 获取当前鱼的列表
        getUserInfoByUid: 'userInfo2|mix',
    },

    tcps: {
        'listenMaixu': '6144|7', //监听麦序变化,
        'userInteral1': '41947|100',          // 用户积分
        'userInteral2': '41947|100',     // 用户积分
        'testDemo': '41551|623',
    },
}