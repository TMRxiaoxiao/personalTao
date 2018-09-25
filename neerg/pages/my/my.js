Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    flag: false,
    userinfo: {}
  },
  onLoad: function () {
      wx.showLoading()
    var self = this;
    wx.getSetting({
      success(res) {
        // console.log(res.authSetting['scope.userInfo'])
        if (res.authSetting['scope.userInfo']) { 
          wx.login({
            success: function (res) {
              // console.log(res)
              wx.request({
                url: getApp().globalData.url + '/v1/user/loginnew',
                data: {
                  code: res.code,
                  token: getApp().globalData.token,
                },
                success: function (res) {
                  //console.log(res)
                  wx.hideLoading()
                  if (res.data.result == "bind") {
                      wx.hideLoading()
                    self.setData({
                      flag: true
                    })
                  } else {
                    wx.hideLoading()
                    res.data.data.avatar = getavatar(res.data.data.avatar);
                    self.setData({
                      userinfo: res.data.data
                    })
                    //基本信息存入缓存
                    wx.setStorage({
                      key: 'userinfo',
                      data: res.data.data,
                    })
                  }
                }
              })
            }
          })
        } else {
          self.setData({
            flag: true
          })
            wx.hideLoading()
        }
      }
    })
  },
  //监听页面显示
  onShow: function () {
    var self = this;
    wx.getSetting({
      success(res) {
        // console.log(res.authSetting['scope.userInfo'])
        if (res.authSetting['scope.userInfo']) {
          wx.login({
            success: function (res) {
              // console.log(res)
              wx.request({
                url: getApp().globalData.url + '/v1/user/loginnew',
                data: {
                  code: res.code,
                  token: getApp().globalData.token,
                },
                success: function (res) {
                  //console.log(res);
                  wx.hideLoading()
                  if (res.data.result == "bind") {
                    self.setData({
                      flag: true
                    })
                  } else {
                    res.data.data.avatar = getavatar(res.data.data.avatar);
                    self.setData({
                      userinfo: res.data.data
                    })
                    //基本信息存入缓存
                    wx.setStorage({
                      key: 'userinfo',
                      data: res.data.data,
                    })
                  }
                }
              })
            }
          })
        }
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindGetUserInfo: function (e) {
    //console.log(e)
    var rawData = e.detail.rawData;
    var that = this;

    if (e.detail.iv) {
      wx.login({
        success: function (res) {
          // console.log(res)
          //获取opid
          //console.log("userinfo====" +rawData)
          wx.request({
            url: getApp().globalData.url + '/v1/user/loginnew',
            data: {
              code: res.code,
              token: getApp().globalData.token,
              data: e.detail.rawData
            },
            success: function (res) {
              //console.log(res);
              wx.hideLoading()
              if (res.data.result == "bind") {
                wx.navigateTo({
                  url: '/login/login?openid=' + res.data.openid,
                })
              } else {
                res.data.data.avatar = getavatar(res.data.data.avatar);
                //基本信息存入缓存
                wx.setStorage({
                  key: 'userinfo',
                  data: res.data.data,
                })
                that.setData({ userinfo: res.data.data});
              }
            }
          })
        }
      })
      that.setData({
        flag: false
      })

    }
  }
})

function getavatar(str) {
  if ((new RegExp('^http', 'i')).test(str)) {
    return str;
  } else if ((new RegExp('^/style', 'i')).test(str)) {
    return 'https://ww.ineerg.com' + str;
  } else if ((new RegExp('^/Resource', 'i')).test(str)) {
    return 'https://ww.ineerg.com' + str;
  } else if ((new RegExp('^/uploads', 'i')).test(str)) {
    return 'https://store.ineerg.com' + str;
  } else {
    return 'https://ww.ineerg.com/style/images/pic_92.png';
  }
}