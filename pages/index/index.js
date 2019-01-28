// pages/index/index.js

Page({
  data: {
    list: [
      {
        id: 'track',
        name: '流量',
        open: false,
        pages: ['track']
      }
    ]
  },
  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  },
  onLoad: function() {
    var that = this;
    // 权限控制页面，隐藏tabbar
    wx.hideTabBar({});
    // 这个检查是否是公司成员(可查看报表)
    // 略过 设置isOfficer的过程
    // 这里设置为true
    that.setData({
      isOfficer: true
    });

    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.userInfo']) {
          that.setData({
            isAuthorized: false
          });
        } else {
          that.setData({
            isAuthorized: true
          });
        }
      },
      complete: (res) => {
        if (that.data.isOfficer && that.data.isAuthorized) {
          wx.getUserInfo({
            success(res) {
              // console.log(res);
            }
          });
        } else {
          wx.redirectTo({
            url: "../forbidden/forbidden"
          })
        }
      }
    });

  },
  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {
    var that = this;
    // to do something
    wx.stopPullDownRefresh();
  }
});
