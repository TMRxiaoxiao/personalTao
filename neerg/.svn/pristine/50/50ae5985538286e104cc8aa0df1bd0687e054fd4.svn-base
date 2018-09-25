// myAppointment/myAppointment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datalist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    //获取用户信息
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        //获取我的预约
        wx.request({
          url: getApp().globalData.url + '/v1/user/presvr',
          data: { memberid: res.data.memberid, token: getApp().globalData.token },
          success: function (res) {
            if(res.data.code==1)
            {
              //console.log(res);
                that.setData({
                  datalist:res.data.data.data
                })
            }
            //return res;
          }
        })
      },
      fail: function () {
        wx.showToast({
          title: '请先登录',
          mask: true,
          icon: 'loading'
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    //获取我的预约
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        //获取我的预约
        wx.request({
          url: getApp().globalData.url + '/v1/user/presvr',
          data: { memberid: res.data.memberid, token: getApp().globalData.token },
          success: function (res) {
            if (res.data.code == 1) {
              //console.log(res);
              that.setData({
                datalist: res.data.data.data
              })
            }
            //return res;
          }
        })
      },
      fail: function () {
        wx.showToast({
          title: '请先登录',
          mask: true,
          icon: 'loading'
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  //取消预约
  quxiao:function(e)
  {
    //console.log(e.currentTarget.id);
    var that=this;
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        var memberid = res.data.memberid;
        //取消接口
        wx.showModal({
          title: '提示',
          content:'确认取消预约吗？',
          success:res=>{
            if (res.confirm)
            {
              wx.request({
                url: getApp().globalData.url + '/v1/user/cancelsvr',
                data: { 
                  memberid: memberid,
                  id: e.currentTarget.id,
                  token: getApp().globalData.token },
                success: function (res) {
                  if (res.data.code == 1) {
                    wx.showToast({
                      title: '取消成功',
                      mask: true,
                      success:res=>{
                        wx.getStorage({
                          key: 'userinfo',
                          success: function (res) {
                            //获取我的预约
                            wx.request({
                              url: getApp().globalData.url + '/v1/user/presvr',
                              data: { memberid: res.data.memberid, token: getApp().globalData.token },
                              success: function (res) {
                                if (res.data.code == 1) {
                                  //console.log(res);
                                  that.setData({
                                    datalist: res.data.data.data
                                  })
                                }
                                //return res;
                              }
                            })
                          },
                          fail: function () {
                            wx.showToast({
                              title: '请先登录',
                              mask: true,
                              icon: 'loading'
                            })
                          }
                        })
                      }
                    })
                  }
                  //return res;
                }
              })

            }
          }
          
        })
      
      },
      fail: function () {
        wx.showToast({
          title: '请先登录',
          mask: true,
          icon: 'loading'
        })
      }
    })
    
  }
})