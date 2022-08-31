<template>
  <div class="page-rule">
    <explain-tpl :colorCfg="colorCfg" :options="options"></explain-tpl>
  </div>
</template>
<script>
import explainTpl from "@cc/explain-tpl";

export default {
  name: "page-rule",
  components: {
    explainTpl,
  },
  data() {
    return {
      colorCfg: {
        color1: "#7f84f1", // 主标题背景色，表格头背景色，奖励icon名称的背景色
        color2: "#FFFFFF", // 主标题字色
        color3: "#fae802", // 副标题字色，奖励icon的背景色
        color4: "#FFFFFF", // 正文字色
        color5: "#7f84f1", // 正文段落图标#FFE3B3
        color6: "#150468", // 表格线框
        color7: "#462f90", // 表格正文背景色
        color8: "#7f84f1", // 正文二级内容字色（默认#999）
      },
      options: [
        {
          title: "抽奖说明1抽奖说明1",
          block: [
            {
              bTitle: "抽奖玩法",
              detail: [
                {
                  type: "text",
                  subTexts: [
                    "二级内容二级内容二级内二级内容二级内容二级内容二级内容二级内容容二级内容二级内容",
                  ],
                },
              ],
            },
            {
              bTitle: "规则",
              detail: [
                {
                  type: "text",
                  value: "用户赠送活动礼物支持主播2",
                  subTexts: [
                    "二级内容二级内容二级内容二级内容二级内容二级内容二级内容二级内容二级内容二级内容二级内容二级内容二级内容二级内容二级内容",
                    "二级内容二级内容二级内二级内容二级内容二级内容二级内容二级内容容二级内容二级内容",
                  ],
                },
                {
                  type: "text",
                  value: "用户赠送活动礼物支持主播2",
                  subTexts: [
                    "二级内容二级内容二级内二级内容二级内容二级内容二级内容二级内容容二级内容二级内容",
                  ],
                },
              ],
            },
          ],
        },
        {
          title: "抽奖说明2",
          block: [
            {
              detail: [
                {
                  type: "text",
                  value: "用户赠送活动礼物支持主播3",
                },
                {
                  type: "table",
                  customFS: 24,
                  value: {
                    th: ["名次", "奖励", "喵喵喵1", "喵喵喵2", "lll"],
                    columns: ["rank", "name", "icon", "icon2", "desc"],
                    widthCfg: [10, 20, 20, 20, 30],
                    tb: [
                      {
                        rank: "1",
                        name: "30%奖池金元宝",
                        icon: "http://cc.fp.ps.netease.com/file/5d0c45892786fd611a571a87N3YkPi8b02",
                        icon2: "-",
                        size: [300, 300],
                        desc: "00奖池金元宝奖池金元宝奖池金元宝奖池金元宝奖池金元宝奖池金元宝奖池金元宝奖池金元宝奖池金元宝0",
                      },
                      {
                        rank: "2",
                        name: "30%奖池金元宝",
                        icon: "-",
                        icon2:
                          "http://cc.fp.ps.netease.com/file/5d0c45892786fd611a571a87N3YkPi8b02",
                        size: [100, 100],
                        desc: "000",
                      },
                      {
                        rank: "3",
                        name: '10%<span class="key-word">奖池</span>金元宝',
                        icon: "http://cc.fp.ps.netease.com/file/5d0c45892786fd611a571a87N3YkPi8b02",
                        icon2: "-",
                        size: [300, 300],
                        desc: "000",
                      },
                    ],
                  },
                },
                {
                  type: "table",
                  value: {
                    th: ["参与对象", "公会", "主播", "粉丝"],
                    columns: ["col1", "col2", "col3", "col4"],
                    tb: [
                      {
                        col1: "12-14日",
                        col2: {
                          value: "实力评级",
                          colspanR: 3,
                        },
                      },
                      {
                        col1: "15-17日",
                        col2: "全力冲刺",
                        col3: {
                          value: "公会主播的战力排名<br />+每日任务",
                          rowspanB: 2,
                        },
                        col4: "公会主播的战力排名<br />+每日任务",
                      },
                      {
                        col1: "18日",
                        col2: "全力冲刺",
                        col4: "贡献排名+贡献任务",
                      },
                    ],
                  },
                },
                {
                  type: "table",
                  value: {
                    th: ["名词", "奖励"],
                    columns: ["col1", "col2"],
                    tb: [
                      {
                        col1: {
                          value: "1",
                          rowspanB: 2,
                        },
                        col2: "30%奖池金元宝",
                      },
                      {
                        col2: "30%奖池金元宝",
                      },
                      {
                        col1: "2",
                        col2: '<span class="key-word">15%奖池金元宝</span>',
                      },
                      {
                        col1: "3",
                        col2: "10%奖池金元宝",
                      },
                      {
                        col1: "4",
                        col2: "30%奖池金元宝",
                      },
                      {
                        col1: "5",
                        col2: "30%奖池金元宝",
                      },
                      {
                        col1: "6",
                        col2: {
                          value: "30%奖池金元宝",
                          rowspanB: 2,
                        },
                      },
                      {
                        col1: "7",
                      },
                      {
                        col1: "8",
                        col2: "30%奖池金元宝",
                      },
                      {
                        col1: "9",
                        col2: "30%奖池金元宝",
                      },
                    ],
                  },
                },
                {
                  type: "table",
                  customFS: 20,
                  value: {
                    th: [
                      "参与对象",
                      "9日",
                      "10日",
                      "11日",
                      "12日",
                      "13日",
                      "14日",
                      "15日",
                    ],
                    columns: [
                      "col1",
                      "col2",
                      "col3",
                      "col4",
                      "col5",
                      "col6",
                      "col7",
                      "col8",
                    ],
                    widthCfg: [8, 14, 14, 14, 14, 14, 14, 8],
                    tb: [
                      {
                        col1: "公会",
                        col2: {
                          value: "实力评级",
                          colspanR: 3,
                        },
                        col5: {
                          value: "火力全开+王牌对决",
                          colspanR: 3,
                        },
                        col8: "全力冲刺",
                      },
                      {
                        col1: "主播",
                        col2: {
                          value:
                            '<span class="key-word">公会主播</span>的战力排名+每日任务',
                          colspanR: 7,
                        },
                      },
                      {
                        col1: "粉丝",
                        col2: {
                          value: "贡献排名+贡献任务",
                          colspanR: 7,
                        },
                      },
                    ],
                  },
                },
                {
                  type: "text",
                  value: "全站钻石组奖励",
                },
                {
                  type: "table",
                  customFS: 20,
                  value: {
                    th: [
                      '<span class="key-word fwb">排名</span>',
                      '<span class="key-word fwb">奖池瓜分</span>',
                      '<span class="key-word fwb">年度奖项</span>',
                      '<span class="key-word fwb">粉丝徽章</span>',
                      '<span class="key-word fwb">成就</span>',
                      '<span class="key-word fwb">APP开屏秀</span>',
                      '<span class="key-word fwb">定制直播间封面角标</span>',
                      '<span class="key-word fwb">定制直播间壁纸</span>',
                      '<span class="key-word fwb">全站开播通知卡</span>',
                    ],
                    columns: [
                      "col1",
                      "col2",
                      "col3",
                      "col4",
                      "col5",
                      "col6",
                      "col7",
                      "col8",
                      "col9",
                    ],
                    tb: [
                      {
                        col1: "钻石组冠军",
                        col2: {
                          value:
                            "按主播狂欢能量数占钻石组狂欢能量总数的比例瓜分",
                          rowspanB: 6,
                        },
                        col3: '<span class="key-word">年度粉丝王<span>',
                        col4: '<span class="key-word">个性定制30天<span>',
                        col5: "名人堂",
                        col6: "7天",
                        col7: "30天",
                        col8: "30天",
                        col9: "30个",
                      },
                      {
                        col1: "钻石组亚军",
                        col3: "/",
                        col4: '<span class="key-word">个性定制30天<span>',
                        col5: "名人堂",
                        col6: "7天",
                        col7: "30天",
                        col8: "30天",
                        col9: "30个",
                      },
                      {
                        col1: "钻石组季军",
                        col3: "/",
                        col4: '<span class="key-word">个性定制30天<span>',
                        col5: "名人堂",
                        col6: "7天",
                        col7: "30天",
                        col8: "30天",
                        col9: "30个",
                      },
                      {
                        col1: "钻石组4-5名",
                        col3: "/",
                        col4: "活动专属30天",
                        col5: {
                          value: "/",
                          colspanR: 4,
                        },
                        col9: "20个",
                      },
                      {
                        col1: "钻石组6-10名",
                        col3: "/",
                        col4: "活动专属20天",
                        col5: "/",
                        col6: "/",
                        col7: "/",
                        col8: "/",
                        col9: "10个",
                      },
                      {
                        col1: "钻石组11-16名",
                        col3: "/",
                        col4: "活动专属10天",
                        col5: "/",
                        col6: "/",
                        col7: "/",
                        col8: "/",
                        col9: "5个",
                      },
                    ],
                  },
                },
              ],
            },
            {
              bTitle: "冠军奖励",
              detail: [
                {
                  type: "award_square",
                  customFS: 24,
                  value: [
                    {
                      name: "",
                      icon: "http://cc.fp.ps.netease.com/file/5d0c45892786fd611a571a87N3YkPi8b02",
                      size: [300, 170],
                      descs: [
                        '<span class="key-word">名牌*15天</span>',
                        "5200票",
                        "000000000000000000000000000000000000000000",
                      ],
                    },
                  ],
                },
                {
                  type: "award_square",
                  value: [
                    {
                      name: "",
                      icon: "http://cc.fp.ps.netease.com/file/5d0c45892786fd611a571a87N3YkPi8b02",
                      size: [300, 300],
                      descs: [
                        '<span class="key-word">名牌*15天</span>',
                        "000000000000000000000000000000000000000000",
                      ],
                    },
                    {
                      name: "千里千里传音千里传音千里传音传音",
                      icon: "http://cc.fp.ps.netease.com/file/5d0c45892786fd611a571a87N3YkPi8b02",
                      size: [300, 300],
                      descs: [
                        '<span class="key-word">名牌*15天</span>',
                        "5200票",
                      ],
                    },
                  ],
                },
                {
                  type: "award_square",
                  customLength: 3,
                  value: [
                    {
                      name: "",
                      icon: "http://cc.fp.ps.netease.com/file/5d0c45892786fd611a571a87N3YkPi8b02",
                      size: [300, 300],
                      descs: ["自定义图片item的长度", "从而使用不用的尺寸展示"],
                    },
                  ],
                },
                {
                  type: "award_square",
                  customFS: 24,
                  value: [
                    {
                      name: "",
                      icon: "http://cc.fp.ps.netease.com/file/5d0c45892786fd611a571a87N3YkPi8b02",
                      size: [300, 300],
                      descs: [
                        '<span class="key-word">名牌*15天</span>',
                        "000000000000000000000000000000000000000000",
                      ],
                    },
                    {
                      name: "千里传音",
                      icon: "http://cc.fp.ps.netease.com/file/5d0c45892786fd611a571a87N3YkPi8b02",
                      size: [300, 300],
                      descs: ['<span class="key-word">名牌*15天</span>'],
                    },
                    {
                      name: "千里传音",
                      icon: "http://cc.fp.ps.netease.com/file/5d0c45892786fd611a571a87N3YkPi8b02",
                      size: [300, 300],
                      descs: [
                        '<span class="key-word">名牌*15天</span>',
                        "5200票",
                        "5200票",
                      ],
                    },
                  ],
                },
                {
                  type: "award",
                  value: [
                    {
                      name: "",
                      icon: "http://cc.fp.ps.netease.com/file/5d0c45892786fd611a571a87N3YkPi8b02",
                      size: [300, 300],
                      descs: [
                        '<span class="key-word">名牌*15天</span>',
                        "000000000000000000000000000000000000000000",
                      ],
                    },
                  ],
                },
                {
                  type: "award",
                  value: [
                    {
                      name: "",
                      icon: "http://cc.fp.ps.netease.com/file/5d0c45892786fd611a571a87N3YkPi8b02",
                      size: [300, 300],
                      descs: [
                        '<span class="key-word">名牌*15天</span>',
                        "5200票",
                      ],
                    },
                    {
                      name: "千里传音",
                      icon: "http://cc.fp.ps.netease.com/file/5d0c45892786fd611a571a87N3YkPi8b02",
                      size: [300, 110],
                      descs: ["000000000000000000000000000000000000000000"],
                    },
                  ],
                },
                {
                  type: "award",
                  value: [
                    {
                      name: "",
                      icon: "http://cc.fp.ps.netease.com/file/5d0c45892786fd611a571a87N3YkPi8b02",
                      size: [300, 300],
                      descs: [
                        '<span class="key-word">名牌*15天</span>',
                        "5200票",
                      ],
                    },
                    {
                      name: "千里传音",
                      icon: "http://cc.fp.ps.netease.com/file/5d0c45892786fd611a571a87N3YkPi8b02",
                      size: [300, 110],
                    },
                    {
                      name: "千里传音",
                      icon: "",
                      size: [110, 50],
                      descs: [
                        '<span class="key-word">名牌*15天</span>',
                        "00000000000",
                        "5200票",
                      ],
                    },
                    {
                      name: "千里传音",
                      icon: "http://cc.fp.ps.netease.com/file/5d0c45892786fd611a571a87N3YkPi8b02",
                      size: [300, 110],
                      descs: ['<span class="key-word">名牌*15天</span>'],
                    },
                  ],
                },
                {
                  type: "img",
                  value: "",
                  size: [650, 100],
                },
                {
                  type: "img",
                  value:
                    "http://cc.fp.ps.netease.com/file/5d0c45892786fd611a571a87N3YkPi8b02",
                  size: [650, 300],
                },
                {
                  type: "text",
                  subTexts: [
                    "二级内容二级内容二级内二级内容二级内容二级内容二级内容二级内容容二级内容二级内容",
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
  },
};
</script>
<style scoped lang="scss">
@import "@styles/funs.scss";
@import "./style.scss";
</style>