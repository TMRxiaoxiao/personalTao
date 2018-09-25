var app = getApp()
Page({
  data: {
    note: [
      
    ],
    back: true,
    promotype:""
  },
  back: function () {
    this.setData({
      back: !this.data.back
    })
  },
  onLoad:function()
  {
    wx.request({
      url: getApp().globalData.url + '/v1/service/getlist',
      data: { 
        token: getApp().globalData.token,
        ispopular:1
      },
      success: res => {
        console.log(res);
        if (res.data.code == 1) {
          this.setData({
            note:res.data.data,
            promotype: res.data.data.promotype
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
})