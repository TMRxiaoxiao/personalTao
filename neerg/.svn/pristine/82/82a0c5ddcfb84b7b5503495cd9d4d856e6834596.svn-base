// gcourse/course_list/course_list.js
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
        console.log(res);
        //获取G小姐课堂列表
        wx.request({
          url: getApp().globalData.url + '/v1/info/gclass',
          data: { uuid:res.data.uuid,token: getApp().globalData.token, page:1},
          success: function (res) {
            console.log(res);
            if(res.data.code==1)
            {
              that.setData({datalist:res.data.data.data});
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