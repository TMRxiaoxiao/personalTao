// orders/coupons/coupons.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    gCard:"",
    buyGcard:"",
    codeGet:""
  },
  cardGet:function(e){
    this.setData({codeGet:e.detail.value})
  },
  jihuoCard:function(){
    if (this.data.codeGet == "" || this.data.codeGet == null || this.data.codeGet == undefined||this.data.codeGet.length!==13){
        wx.showToast({
          title: '请输入正确卡号',
          icon:"none"
        })
        return false
    }else{
      wx.request({
        url: getApp().globalData.url + '/v1/card/get',
        data: {
          token: getApp().globalData.token,
          memberid: this.data.memberid,
          code: this.data.codeGet
        },
        success: res => {
          console.log(res)
          if(res.data.code==1){
            wx.showToast({
              title: res.data.msg,
            })
          }else{
            wx.showModal({
              title: '提示',
              content: res.data.msg,
            })
            wx.getStorage({
              key: 'userinfo',
              success: res => {
                // console.log(res)
                var memberid = res.data.memberid;
                this.setData({ memberid: memberid })
                wx.request({
                  url: getApp().globalData.url + '/v1/card/mygcard',
                  data: {
                    token: getApp().globalData.token,
                    memberid: memberid
                  },
                  success: res => {
                    console.log(res.data.data.data)
                    this.setData({
                      gCard: res.data.data.data
                    })
                  }
                })
              },
            })
          }
        }
      })
    } 
  },
  click: function (e) {
    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    // 我的G享卡
    wx.getStorage({
      key: 'userinfo',
      success: res=> {
        // console.log(res)
        var memberid=res.data.memberid;
        this.setData({ memberid:memberid})
        wx.request({
          url: getApp().globalData.url + '/v1/card/mygcard',
          data: {
            token: getApp().globalData.token,
            memberid:memberid
          },
          success: res => {
            console.log(res.data.data.data)
            this.setData({
              gCard: res.data.data.data
            })
          }
        })
      },
    })
    // 购买G享卡
    wx.request({
      url: getApp().globalData.url + '/v1/card/index',
      data: { token: getApp().globalData.token},
      success:res=>{
        console.log(res)
        this.setData({
          buyGcard:res.data.data
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