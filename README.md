# 小程序图表展示组件data-charts

本项目是对[**echarts-for-weixin**](https://github.com/ecomfe/echarts-for-weixin)二次组件化封装的data-charts的使用示例。

data-charts组件面向的对象是后端开发同学，目的是让后端开发在无需写大量前端代码的基础上，通过配置图表json（chartSettings）进行快递的图表渲染展示。

## 使用方式

### 示例解释

请先下载该项目，其中data-charts是已封装好的图表展示组件。

- **/pages/track/track**为使用data-charts的具体页面。
- **/pages/index/index**为权限控制页简单实现，通过该页面可以实现不同人展示不同的页面列表。目前尚未完全完成。
- **/pages/forbidden/forbidden**为用户授权页，首次使用时必须用户主动授权才可以使用。该页面打算完成用户鉴权部分，目前尚未完成。

### 配置图解
![配置图解](https://raw.githubusercontent.com/sunmatus/DataPatroller/master/image/annotation.png)
### 引入组件

请在使用组件页面的json文件(如track.json)中配置使用组件：

```json
{
  "usingComponents": {
    "data-charts": "../../data-charts/data-charts"
  }
}
```

### wxml内创建图表

请在使用组件页面的wxml文件(如track.wxml)中创建图表渲染代码：

```html
<block wx:for="{{ chartSettings }}" wx:key="chartId">
  <view class="card-view">
    <data-charts class="data-charts" chart-setting="{{ item }}" chart-id="{{ item.chartId }}"></data-charts>
  </view>
</block>
```

**说明：**

* chartSettings内配置几个图表则渲染几个图表
* item是chartSettings数组对象内的每一项
* chartId如果自己填充，必须保证唯一性

### js内配置图表数据

请在使用组件内容的js文件(如track.js)中的chartSettings内配置图表数据：

```js
// 图表配置项示例
chartSettings: [
  // 第一个图表配置
  {
    apiSetting: {
      url: "https://wx.sunmatus.com/v1/province", // api接口
      params: { // 参数配置
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
      extraDescChange: "+0.75%"
    },
    // 实际图内配置
    chartConfig: {
      color: ["#FA6043", "#16AF8E", "#FED067", "#E1E2E4"], // 调色盘颜色列表。如果设置，会从这里面选取颜色渲染图表；如果没设置，使用默认配色方案
      splitLineShow: true,  // 是否启用分割线(默认样式：灰色虚线)
      height: "300rpx",     // 图的高度
      dimensions: ["Province", "PV"],
      // restful接口返回的实际业务数据(list)
      // sourceData: [], // 如果不设置apiSetting，也可以自己实现数据获取部分并填充到sourceData内；sourceData的格式必须是数组对象
      // 图表样式(设置line、bar...)(list)配置多个则为多条线
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
  }
]
```

### 其他

> **Talk is cheap. Show me the code.**

请见项目内代码实现
