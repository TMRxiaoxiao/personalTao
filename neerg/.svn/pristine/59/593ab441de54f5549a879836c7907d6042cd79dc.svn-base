// storeList/storeList.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    Storelist:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getLocation({
      type: "gcj02",
      success: function (res) {
        wx.request({
          url: getApp().globalData.url + '/v1/shop/search',
          data: {
            token: getApp().globalData.token,
            gps: res.longitude + ',' + res.latitude
          },
          success: res => {
            if (res.data.code == 1) {
              //var page = getCurrentPages();
              //var pages = page[page.length - 3];
              //pages.setData({ xmdata: this.data.datalist[this.data.id] });
              if(res.data.data!=null||res.data.data!="")
              {
                var data=res.data.data;
                for(var i=0;i<res.data.data.length;i++)
                {
                  var bum = res.data.data[i].distance/1000;
                  //console.log(bum + "===" + res.data.data[i].distance)
                  res.data.data[i].distance=bum.toFixed(2);
                }
                that.setData({ Storelist: res.data.data })
              }else
              {
                wx.showModal({
                  title: '提示',
                  content: '抱歉你附近没有店铺！',
                  showCancel:true,
                  success:res=>
                  {
                    if(res.confirm)
                    {
                      wx.switchTab({
                        url: '/pages/index/index',
                      })
                    }
                  }
                })
              }
              
            } else {
              wx.showToast({
                title: res.data.code,
                mask: true,
                icon: 'loading'
              })
            }
          }
        })
      },
      fail:function()
      {
        wx.showModal({
          title: '提示',
          content: '检测到你没打开neerG的定位权限,请点击确定重新授权',
          success:res=>
          {
            if(res.confirm)
            {
             wx.openSetting({
               success:res=>{
                 console.log(res)
                 wx.getLocation({
                   type: "gcj02",
                   success: function (res) {
                     var gps = res.longitude + "," + res.latitude;
                     console.log(gps)
                     wx.setStorageSync("gps", gps)
                   },
                 })
               }
             })
            }
           
          }
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
  },
  //选择
  xuanzhe:function(e)
  {
    //console.log(e.currentTarget.dataset.id);
    var xiabiao = e.currentTarget.dataset.id;//获取下标
    var page = getCurrentPages();
    //console.log(page)
    var pages = page[page.length - 2];
    //console.log(this.data.Storelist[xiabiao])
    pages.setData({ shopdata: this.data.Storelist[xiabiao] });
    wx.navigateBack({
      delta:1
    })

  }
})