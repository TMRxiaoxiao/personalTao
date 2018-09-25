// gcourse/gclassContent/gclassContent.js
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datacontent:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log(options);
    wx.request({
      url: getApp().globalData.url + '/v1/info/gclub',
      data: {id:options.id,token: getApp().globalData.token },
      success: function (res) {
        // console.log(res);
        if(res.data.code==1)
        {
          wx.setNavigationBarTitle({
            title: res.data.data.Title,
          })
         // console.log(res.data.data)
          // WxParse.wxParse('article', 'html', res.data.data.A_Content, that, 5);//服务简介
          // var xml = res.data.data.A_Content.replace(/ >/g, ">").replace(/< /g, "<").replace(/&ldquo;/g, "[").replace(/&rdquo;/g, "]")
          that.setData({
            xml: res.data.data.A_Content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" '),
            datacontent: res.data.data
          })    
        }
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