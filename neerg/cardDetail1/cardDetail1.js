// cardDetail/cardDetail.js
var WxParse = require('../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {},
    token: "",
    pkid: "",
    image:"",
    price:"",
    count:"",
    cardId:"",
    ctype:"",
    forsale:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    if(options.forsale){
      var forsale = options.forsale
      this.setData({ forsale: forsale})
    }else{
      this.setData({ forsale: 1 })
    }
    var price=options.price
    var cardId=options.id
    var type=options.type||""
    if (options.count=="无限次"){
      var count = "无限"
    }else{
      var count = options.count
    }
    this.setData({ price: price, count: count, cardId: cardId})
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/v1/scard/info',
      data: {
        token: getApp().globalData.token,
        id: options.id,
        type: type
      },
      success: res => {
        // console.log(res);
        if (res.data.code == 1) {
          res.data.data.content = res.data.data.content.replace(/<img\s+src="\/upload/ig, '<img src="https://store.ineerg.com/upload');
          res.data.data.content = res.data.data.content.replace(/<img\s+src="\.\.\/upload/ig, '<img src="https://store.ineerg.com/upload');
          WxParse.wxParse('article', 'html', res.data.data.content, that, 5);//规则
          that.setData({
            data: res.data.data,
            token: getApp().globalData.token,
            pkid: options.id,
            image: res.data.data.thumb,
            ctype: res.data.data.ctype,
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