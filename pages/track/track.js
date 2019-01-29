//index.js
//获取应用实例
var app = getApp();

// 引入工具js
var util = require('../../utils/util.js');

Page({
  data: {
    summaryData: [
      { title: "在线访客数", dim: "累计", value: 41453 },
      { title: "累计访客数", dim: "累计", value: 86749 },
      { title: "累计浏览量", dim: "累计", value: 192176 }
    ],
    // 图表配置项
    chartSettings: [
      // 第一个图表配置
      {
        apiSetting: {
          url: "https://wx.sunmatus.com/v1/province",
          params: {
            fDs: util.formatTime(new Date())
          }
        },
        // 图表ID，使用默认值即可。如果重新赋值，请保证唯一性
        chartId: "echarts-" + Math.random().toString(36).substr(2),
        // 图表标题配置项
        chartTitle: {
          mainTitle: "第一个图表",
          subTitle: "2019/02/12",
          extraDescMain: "这是一个额外指标描述",
          extraDescValue: "35万",
          extraDescChange: "+0.75%",
          mainTitleAlign:"left",
          subTitleAlign:"left",
          extraDescAlign:"right"
        },
        // 实际图内配置
        chartConfig: {
          color: ["#FA6043", "#16AF8E", "#FED067", "#E1E2E4"], // 调色盘颜色列表。如果设置，会从这里面选取颜色渲染图表；如果没设置，使用默认配色方案
          splitLineShow: true,  // 是否启用分割线(默认样式：灰色虚线)
          height: "300rpx",     // 图的高度
          dimensions: ["Province", "PV"],
          // restful接口返回的实际业务数据(list)
          // sourceData: util.getProvinceData(),
          // 图表样式(设置line、bar...)(list)
          series: [
            {
              name: "浏览量",
              type: "bar"
            }
          ]
        },
        // 完全自定义echarts配置。当该配置内容不为空时，全部采用该配置内的内容渲染图表，chartConfig内配置除height外不生效
        option: {

        }
      },
      // 第二个图表配置
      {
        chartId: "echarts-" + Math.random().toString(36).substr(2),
        chartTitle: {
          mainTitle: "第二个图表",
          subTitle: "2019/02/24~2019/02/25",
          extraDescMain: "注册用户数",
          extraDescValue: "66万",
          extraDescChange: "-0.23%"
        },
        chartConfig: {
          splitLineShow: false,
          height: "300rpx",
          dimensions: ["fDs", "pv"],
          sourceData: [
            { fDs: "2019-01-09", pv: 1000 },
            { fDs: "2019-01-11", pv: 232 },
            { fDs: "2019-01-12", pv: 567 },
            { fDs: "2019-01-13", pv: 1872 },
            { fDs: "2019-01-14", pv: 339 },
            { fDs: "2019-01-15", pv: 880 },
          ],
          series: [
            {
              name: "浏览量",
              type: "line"
            }
          ]
        },
        option: {

        }
      },
      // 第三个图表配置
      {
        chartId: "echarts-" + Math.random().toString(36).substr(2),
        chartConfig: {
          height: "500rpx"
        },
        option: {
          title: {
            text: '某站点用户访问来源',
            subtext: '纯属虚构',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                { value: 335, name: '直接访问' },
                { value: 310, name: '邮件营销' },
                { value: 234, name: '联盟广告' },
                { value: 135, name: '视频广告' },
                { value: 1548, name: '搜索引擎' }
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
      },
      // 第四个图表配置
      {
        chartId: "echarts-" + Math.random().toString(36).substr(2),
        chartConfig: {
          height: "500rpx"
        },
        option: {
          color: ["#16AF8E", "#FA6043", "#FED067", "#E1E2E4"],
          title: {
            text: 'Graph 简单示例'
          },
          tooltip: {},
          animationDurationUpdate: 1500,
          animationEasingUpdate: 'quinticInOut',
          series: [
            {
              type: 'graph',
              layout: 'none',
              symbolSize: 50,
              roam: true,
              label: {
                normal: {
                  show: true
                }
              },
              edgeSymbol: ['circle', 'arrow'],
              edgeSymbolSize: [4, 10],
              edgeLabel: {
                normal: {
                  textStyle: {
                    fontSize: 20
                  }
                }
              },
              data: [{
                name: '节点1',
                x: 300,
                y: 300
              }, {
                name: '节点2',
                x: 800,
                y: 300
              }, {
                name: '节点3',
                x: 550,
                y: 100
              }, {
                name: '节点4',
                x: 550,
                y: 500
              }],
              // links: [],
              links: [{
                source: 0,
                target: 1,
                symbolSize: [5, 20],
                label: {
                  normal: {
                    show: true
                  }
                },
                lineStyle: {
                  normal: {
                    width: 5,
                    curveness: 0.2
                  }
                }
              }, {
                source: '节点2',
                target: '节点1',
                label: {
                  normal: {
                    show: true
                  }
                },
                lineStyle: {
                  normal: { curveness: 0.2 }
                }
              }, {
                source: '节点1',
                target: '节点3'
              }, {
                source: '节点2',
                target: '节点3'
              }, {
                source: '节点2',
                target: '节点4'
              }, {
                source: '节点1',
                target: '节点4'
              }],
              lineStyle: {
                normal: {
                  opacity: 0.9,
                  width: 2,
                  curveness: 0
                }
              }
            }
          ]
        }
      }
    ]
  },
  /**
   * 页面加载时触发
   */
  onLoad: function () {

  },
  /**
   * 页面初次渲染完成时触发
   */
  onReady: function() {
    // 接口数据获取

  },
  /**
   * 监听用户下拉刷新
   * 模拟重新请求数据并进行setData
   * setData后图表会根据新的数据重新渲染
   */
  onPullDownRefresh: function() {
    this.data.chartSettings[0].apiSetting.url = "https://wx.sunmatus.com/v1/user";
    this.data.chartSettings[0].chartConfig.dimensions = ["Hour", "UV"];
    this.setData({
      chartSettings: this.data.chartSettings
    });
    wx.stopPullDownRefresh();
  }
})
