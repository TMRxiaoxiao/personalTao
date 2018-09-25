// pages/archives/archives.js
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
    wx.getStorage({
      key: 'userinfo',
      success: function(res) {
        //console.log(res.data.memberid);
        if (res.data.memberid != "")
        {
          wx.request({
            url: getApp().globalData.url +'/v1/skins/my',
            data:{
              token: getApp().globalData.token,
              memberid: res.data.memberid,
              new:1
            },
            success:res=>{
              console.log(res);
              if(res.data.code==1)
              {
                that.setData({ datalist:res.data.data.data});
              }else
              {
                wx.showModal({
                  title: '提示',
                  content: '参数返回错误！',
                  showCancel:false,
                  success:function()
                  {

                  }
                })
              }
            }
            
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