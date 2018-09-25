// sellGroup/sellGroup.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupIntro:"",
    timeOver:"",
    units:"",
    idIndex:0,
    wearList:[]
  },
  // 土豪直接购买
  payBuy:function(){
    var that=this
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        let mydata = {
          memberid: res.data.memberid,
          openid: res.data.openid,
          promoid: that.data.groupIntro.id,  //活动id
            shopid: that.data.shopid,
            fee: that.data.groupIntro.orprice, //that.data.groupIntro.orprice
          token: getApp().globalData.token,
        }
        wx.request({
          url: getApp().globalData.url + '/v1/buy/original',
          data: mydata,
          success: function (res) {
            if (res.data.code == 1) {
              var param = res.data.param
              param.token = getApp().globalData.token
              wx.requestPayment({
                timeStamp: new String(res.data.data.timeStamp),
                nonceStr: res.data.data.nonceStr,
                package: res.data.data.package,
                signType: res.data.data.signType,
                paySign: res.data.data.paySign,
                success: function () {
                  // 支付成功
                  wx.request({
                    url: getApp().globalData.url + '/v1/buy/finish',
                    data: param,
                    success: function (res) {
                      wx.redirectTo({
                        url: '/orders/order/order',
                      })
                    },
                    fail: function () {
                      wx.showToast({
                        title: '订单操作失败！',
                      })
                    }
                  })
                }
              })
            } else {
              wx.showModal({
                title: '提示',
                content: res.data.msg,
              })
            }
          },
          fail: function (res) {
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
  // 参团支付
  joinGroup:function(e){
    console.log(e)
    var that = this
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        let mydata = {
          memberid: res.data.memberid,
          openid: res.data.openid,
          promoid: that.data.groupIntro.id,  //活动id
            shopid: that.data.shopid,
            fee: e.target.dataset.price, //e.target.dataset.dataset
          token: getApp().globalData.token,
          unitid: that.data.units[that.data.idIndex].unitid,
          teamid: e.target.dataset.teamid
        }
        that.groupRequest(mydata)
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
  // 开团支付
  pay_buy:function(){
    var that=this
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        let mydata = {
          memberid: res.data.memberid,
          openid: res.data.openid,
          promoid: that.data.groupIntro.id,  //活动id
            shopid: that.data.shopid,
            fee: that.data.units[that.data.idIndex].price, //that.data.units[that.data.idIndex].price
          token: getApp().globalData.token,
          unitid: that.data.units[that.data.idIndex].unitid,
        }
        that.groupRequest(mydata)
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
  // 支付请求
  groupRequest: function (mydata){
    wx.request({
      url: getApp().globalData.url + '/v1/buy/tuan',
      data: mydata,
      success: function (res) {
        if (res.data.code == 1) {
          var param = res.data.param
          param.token = getApp().globalData.token
          wx.requestPayment({
            timeStamp: new String(res.data.data.timeStamp),
            nonceStr: res.data.data.nonceStr,
            package: res.data.data.package,
            signType: res.data.data.signType,
            paySign: res.data.data.paySign,
            success: function () {
              // 支付成功
              wx.request({
                url: getApp().globalData.url + '/v1/buy/finish',
                data: param,
                success: function (res) {
                  wx.redirectTo({
                    url: '/orders/order/order',
                  })
                },
                fail: function () {
                  wx.showToast({
                    title: '订单操作失败！',
                  })
                }
              })
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
          })
        }
      },
      fail: function (res) {
        console.log("kill接口错误")
      }
    })
  },
  // 点击更换价格
  clickIndex:function(e){
    // console.log(e.currentTarget.dataset.index)
    this.setData({
      idIndex: e.currentTarget.dataset.index,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.showLoading()
    var id=options.id
      var shopid = options.shopid
      this.setData({ shopid: shopid})
    // 拼团项目详情
    wx.request({
      url: getApp().globalData.url + '/v1/promotion/tuan',
      data: {
        id: id,
        token: getApp().globalData.token
      },
      success: res => {
        wx.hideLoading()
        var m = res.data.data.endtime_f.split(" ")[0].split("-")[1]
        var d = res.data.data.endtime_f.split(" ")[0].split("-")[2]
        var timeOver = m + "月" + d + "日"
        this.setData({
          groupIntro:res.data.data,
          timeOver: timeOver,
          units: res.data.data.units,
            richtext: res.data.data.introduce.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
        })
        // 拼团列表倒计时
        var dates = []
        // console.log(this.data.groupIntro)
        this.data.groupIntro.teams.forEach(v => {
          dates.push(
            { dat: v.endtime }
          )
        })
        this.timeOver(dates,this.data. wearList)
      }
    })
  },
  // 拼团列表倒计时
  timeOver: function (dates, wearList) {
    let that = this;
    let len = dates.length;//时间数据长度
    function nowTime() {//时间函数
      // console.log(a)
      for (var i = 0; i < len; i++) {
        var intDiff = dates[i].dat;//获取数据中的时间戳
        // console.log(intDiff)
        var day = 0, hour = 0, minute = 0, second = 0;
        if (intDiff > 0) {//转换时间
          day = Math.floor(intDiff / (60 * 60 * 24));
          hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
          minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
          second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
          if (hour <= 9) hour = '0' + hour;
          if (minute <= 9) minute = '0' + minute;
          if (second <= 9) second = '0' + second;
          dates[i].dat--;
          var str = hour + ':' + minute + ':' + second
          // console.log(str)    
        } else {
          var str = "已结束！";
          clearInterval(timer);
        }
        dates[i].difftime = str;//在数据中添加difftime参数名，把时间放进去
      }
      that.setData({
        wearList: dates
      })
    }
    nowTime();
    var timer = setInterval(nowTime, 1000);
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
})




