// pages/forbidden/forbidden.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isOfficer: true,
    isAuthorized: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 这里进行授权和权限鉴定
    wx.getSetting({
      success(res) {
        that.setData({
          isAuthorized: res["authSetting"]["scope.userInfo"]
          
        });
      },
      complete: (res) => {
        if (that.data.isOfficer && that.data.isAuthorized) {
          wx.getUserInfo({
            success(res) {
              console.log(res);
            }
          });
        }
      }
    });
    // 这个检查是否是公司成员(可查看报表)
    // 略过 设置isOfficer的过程
    that.setData({
      isOfficer: true
    });

  },

  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {
    var that = this;
    // to do something
    wx.stopPullDownRefresh();
  },

  /**
   * 通过button调起授权窗口，获取用户信息
   * 接收回调
   */
  onGotUserInfo: function(e) {
    var that = this;
    wx.getSetting({
      success(res) {
        that.setData({
          isAuthorized: res["authSetting"]["scope.userInfo"]
        });
        if (that.data.isOfficer && that.data.isAuthorized) {
          wx.reLaunch({
            url: '../index/index'
          })
        }
      },
      fail(res) {
        
      }
    });
  }
})