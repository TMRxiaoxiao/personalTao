// secondKill/secondKill.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    killData:"",
    endTime: '',
    content: '',
    timeOver:"",
    promoid:""
  },
  // 购买支付
  buy:function(){
    var that=this
    wx.getStorage({
      key: 'userinfo',
      success:function(res){
        let mydata={
          memberid: res.data.memberid,
          openid: res.data.openid,
          promoid: that.data.promoid,  //活动id
          shopid:0,
            fee: that.data.killData.disprice, //that.data.killData.disprice
          token: getApp().globalData.token
        }
        wx.request({
          url: getApp().globalData.url + '/v1/buy/kill',
          data: mydata,
          success:function(res){
            if(res.data.code==1){
              console.log(res)
              var param=res.data.param
              param.token = getApp().globalData.token
              wx.requestPayment({
                timeStamp: new String(res.data.data.timeStamp),
                nonceStr: res.data.data.nonceStr,
                package: res.data.data.package,
                signType: res.data.data.signType,
                paySign: res.data.data.paySign,
                success:function(){
                  // 支付成功
                  wx.request({
                    url: getApp().globalData.url + '/v1/buy/finish',
                    data: param,
                    success:function(res){
                      wx.redirectTo({
                        url: '/orders/order/order',
                      })
                    },
                    fail:function(){
                      title: '订单操作失败！'
                    }
                  })
                }
              })
            }else{
              wx.showModal({
                title: '提示',
                content: res.data.msg,
              })
            }
          },
          fail:function(res){
            console.log("kill接口错误")
          }
        })
      },
      fail: function () {
        wx.showModal({
          title: '提示',
          content: '登录后即可购买,请先登录',
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/my/my',
              })
            }
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id=options.id
    wx.request({
      url: getApp().globalData.url + '/v1/promotion/kill',
      data: {
        id:id,
        token: getApp().globalData.token
      },
      success: res => {
        var m = res.data.data.endtime_f.split(" ")[0].split("-")[1]
        var d = res.data.data.endtime_f.split(" ")[0].split("-")[2]
        var timeOver = m + "月" + d + "日"
        this.setData({
          killData:res.data.data,
          timeOver:timeOver,
          endTime: res.data.data.endtime,
          promoid:res.data.data.id,
            richtext: res.data.data.introduce.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
        })
        // console.log(res)
      }
    })
    var that = this;
    that.countdowm();

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
  // 倒计时
  countdowm: function (e) {
    let that = this;

    let timer = setInterval(function () {
      let nowTime = new Date();
      let endTime = new Date(that.data.endTime * 1000);
      let t = endTime.getTime() - nowTime.getTime();
      if (t > 0) {
        let day = Math.floor(t / 86400000);
        let hour = Math.floor((t / 3600000) % 24);
        let min = Math.floor((t / 60000) % 60);
        let sec = Math.floor((t / 1000) % 60);
        hour = hour < 10 ? "0" + hour : hour;
        min = min < 10 ? "0" + min : min;
        sec = sec < 10 ? "0" + sec : sec;
        let format = '';
        if (day > 0) {
          format = `${day}天${hour}时${min}分${sec}秒`;
        }
        if (day <= 0 && hour > 0) {
          format = `${hour}时${min}分${sec}秒`;
        }
        if (day <= 0 && hour <= 0) {
          format = `${min}分${sec}秒`;
        }
        that.setData({
          content: format
        })
      } else {
        clearInterval(timer);
        that.setData({
          content: '0时0分0秒'
        })
        wx.showToast({
          title: '活动已结束！',
        })
      }
    }, 1000);
  }
})

