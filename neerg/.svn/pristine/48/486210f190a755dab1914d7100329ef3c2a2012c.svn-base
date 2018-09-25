var app = getApp();
Page({
  data: {
    datalist:[],
    name:""
  },
  back_Index: function () {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  onLoad: function (options) {
    //根据类别id获取项目列表
    wx.request({
      url: getApp().globalData.url+'/v1/service/getlist',
      data: { token: getApp().globalData.token,catid:options.catid},
      success:res=>{
        console.log(res);
        wx.setNavigationBarTitle({
          title: options.name,
        })
        this.setData({
          datalist: res.data.data, 
          name: options.name
        })
      }
      
    })
    
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})