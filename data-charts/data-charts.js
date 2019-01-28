// data-charts/data-charts.js

import * as echarts from './ec-canvas/echarts';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    chartId: {
      type: String,
      value: "echarts-" + Math.random().toString(36).substr(2)
    },
    ec: {
      type: Object,
      value: {
        lazyLoad: true
      }
    },
    chartSetting: {
      type: Object,
      // 默认值
      value: {
        chartTitle: {
          mainTitle: "趋势图(默认主标题)",
          subTitle: "2019/01/24(默认副标题)",
          extraDescMain: "这是一个额外指标描述",
          extraDescValue: "35万",
          extraDescChange: "+0.75%"
        },
        chartConfig: {
          splitLineShow: true,
          height: "300rpx",
          dimensions: ["fDs", "pv"],
          sourceData: [
            { fDs: "2019-01-10", pv: 1000 },
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
      // 非首次渲染。当配置内容发生变化时，重新渲染图表
      observer: function(newVal, oldVal, changedPath) {
        var that = this;
        if (typeof (that.data.chartId) == "undefined" || that.data.chartId == null || that.data.chartId == '') {
          that.setData({
            chartId: "echarts-" + Math.random().toString(36).substr(2)
          });
        };
        var ecComponent = that.selectComponent('#' + that.data.chartId);
        if (typeof (that.data.res) != "undefined" && Object.keys(that.data.res).length > 0) {
          var customOption = that.data.chartSetting.option;
          var sourceData = that.data.chartSetting.chartConfig.sourceData;
          if (typeof (customOption) == "object" && customOption != null && Object.keys(customOption).length > 0) {
            that.initChart(that.data.res, ecComponent);
          } else {
            if (typeof (sourceData) == "object") {
              that.initChart(that.data.res, ecComponent);
            } else {
              wx.request({
                url: that.data.chartSetting.apiSetting.url,
                data: that.data.chartSetting.apiSetting.params,
                success: (res) => {
                  that.data.chartSetting.chartConfig.sourceData = res.data;  // 请确保返回的内容是数组对象，或者手动修改res.data(例如：res.data.result.data)
                  that.initChart(that.data.res, ecComponent);
                }
              })
            }
          }
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // echart设置图表选项
    setOption: function(chart, chartSetting) {
      var customOption = chartSetting.option;
      var option = null;
      if (typeof (customOption) == "object" && customOption != null && Object.keys(customOption).length > 0) {
        option = customOption;
      } else {
        option = {
          color: chartSetting.chartConfig.color, // 调色盘颜色列表。如果系列没有设置颜色，则会依次循环从该列表中取颜色作为系列颜色。
          grid: {
            left: '13%',
            top: '5%',
            right: '5%'
          },
          legend: {
            top: 'bottom'
          },
          tooltip: {
            show: true,
            // confine: true, // 有人反馈提示框超出屏幕时打开
            trigger: 'axis'
          },
          xAxis: {
            type: "category",
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#CCCCCC'
              }
            },
            axisLabel: {
              color: '#666666'
            }
          },
          yAxis: {
            position: "left",
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: chartSetting.chartConfig.splitLineShow ? true : false,
              lineStyle: {
                type: 'dashed'
              }
            },
            axisLabel: {
              formatter: function (value, index) {
                if (value >= 1000 && value < 10000) {
                  return (value / 1000).toFixed(0) + 'k';
                } else if (value >= 10000) {
                  return (value / 10000).toFixed(0) + 'w';
                }
                return value;
              }
            }
          },
          dataset: {
            dimensions: chartSetting.chartConfig.dimensions,  // restful接口返回数据的映射维表(list)
            source: chartSetting.chartConfig.sourceData  // restful接口返回的实际业务数据(list)
          },
          series: chartSetting.chartConfig.series  // 图表内调整，可以调整图表样式等等(list)
        };
      }
      chart.setOption(option);      
    },
    // 初始化图表
    initChart: function (res, ecComponent) {
      var that = this;
      ecComponent.initChart(res, (canvas, width, height) => {
        // 获取组件的 canvas、width、height 后的回调函数
        // 在这里初始化图表
        const chart = echarts.init(canvas, "light", {
          width: width,
          height: height
        });
        var chartSetting = that.data.chartSetting;
        that.setOption(chart, chartSetting);

        // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
        that.chart = chart;

        that.setData({
        });

        // 注意这里一定要返回 chart 实例，否则会影响事件处理等
        return chart;
      });
    }
  },

  /**
   * 组件生命周期声明对象，（这是推荐的方式，其优先级最高）
   */
  lifetimes: {
    /**
     * 组件生命周期函数，在组件实例刚刚被创建时执行，注意此时不能调用 setData
     */
    created: function () {
    },
    /**
     * 组件生命周期函数，在组件布局完成后执行
     * 首次渲染
     */
    ready: function() {
      var that = this;
      if (typeof (that.data.chartId) == "undefined" || that.data.chartId == null || that.data.chartId == '') {
        that.setData({
          chartId: "echarts-" + Math.random().toString(36).substr(2)
        });
      };
      var ecComponent = that.selectComponent('#' + that.data.chartId);
      const query = that.createSelectorQuery().in(that);
      query.select('#' + that.data.chartId).boundingClientRect(function (rect) {
        that.setData({
          res: rect
        });
        var customOption = that.data.chartSetting.option;
        var sourceData = that.data.chartSetting.chartConfig.sourceData;
        if (typeof (customOption) == "object" && customOption != null && Object.keys(customOption).length > 0) {
          that.initChart(that.data.res, ecComponent);
        } else {
          if (typeof (sourceData) == "object") {
            that.initChart(that.data.res, ecComponent);
          } else {
            wx.request({
              url: that.data.chartSetting.apiSetting.url,
              data: that.data.chartSetting.apiSetting.params,
              success: (res) => {
                that.data.chartSetting.chartConfig.sourceData = res.data;  // 请确保返回的内容是数组对象，或者手动修改res.data(例如：res.data.result.data)
                that.initChart(that.data.res, ecComponent);
              }
            })
          }
        }
      }).exec();
      // 额外指标变动值颜色判定
      if (typeof (that.data.chartSetting.chartTitle) == "object") {
        var extraDescChange = that.data.chartSetting.chartTitle.extraDescChange;
        if (typeof (extraDescChange) != "undefined" && extraDescChange != null) {
          if (extraDescChange.trim().indexOf("-") == 0) {
            that.setData({
              'chartSetting.chartTitle.extraDescChangeColor': "#A92925"
            })
          }
        }
      }
    }
  }
})
