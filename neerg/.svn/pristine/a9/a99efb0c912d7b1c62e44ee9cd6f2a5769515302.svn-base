// mycard/mycard.js
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
    //获取个人信息
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        //console.log(res.data)
        //获取我的卡
        wx.request({
          url: getApp().globalData.url + '/v1/card/my',
          data: { token: getApp().globalData.token, memberid: res.data.memberid},
          success:function(res)
          {
            console.log(res)
            if(res.data.code==1)
            {
              that.setData({
                datalist: res.data.data.data
              });
            }
          }
        })
      },
    })
    //我购买的卡
    
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
  
  }
})