// activeKj/activeKj.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      width:"",
      mark:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.showLoading()
      var id = options.id
      this.setData({ promoid:id})
      wx.getStorage({
          key: 'userinfo',
          success: res => {
              // console.log(res)
              this.setData({
                  memberid: res.data.memberid,
                  openid: res.data.openid
              })
              wx.request({
                  url: getApp().globalData.url + '/v1/promotion/bargain',
                  data: {
                      token: getApp().globalData.token,
                      promoid: id,
                      memberid: this.data.memberid
                  },
                  success: res => {
                      // console.log(res)
                      if (parseInt(res.data.data.start.paysta) > 0) {
                          this.setData({ mark: true })
                      }
                      wx.hideLoading()
                      res.data.data.introduce = res.data.data.introduce.replace(/&mdash;/g, " ")
                      var m = res.data.data.endtime_f.split(" ")[0].split("-")[1]
                      var d = res.data.data.endtime_f.split(" ")[0].split("-")[2]
                      var timeOver = m + "月" + d + "日"
                      this.setData({
                          bargainIntro: res.data.data,
                          endTime: res.data.data.endtime,
                          timeOver: timeOver,
                          baifenbi: (res.data.data.start.cuted / res.data.data.orprice) * 100,
                          width: (res.data.data.start.cuted) / (res.data.data.orprice - res.data.data.disprice) *520,
                          newprice: (res.data.data.orprice - res.data.data.start.cuted).toFixed(2),
                          title: res.data.data.title
                      })
                      wx.setNavigationBarTitle({
                          title: res.data.data.title ,
                      })
                          
                  }
              })
          },
          fail: res => {
              wx.showModal({
                  title: '友情提示',
                  content: '该活动只有会员才可以参加哦，赶快去注册会员吧！',
                  success: res => {
                      if (res.confirm) {
                          wx.switchTab({
                              url: '/pages/my/my',
                          })
                      }
                  }
              })
          }
      })
      var that = this;
      that.countdowm();
  },
    koina(e){
        wx.reLaunch({
            url: '/hotActive/hotActive',
        })
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
                let day1 = '';
                let hour1='';
                let min1 ="";
                let sec1="";
                if (day > 0) {
                    day1 = day;
                    hour1 = hour;
                    min1=min;
                    sec1=sec
                }
                if (day <= 0 && hour > 0) {
                    day1 = 0;
                    hour1 = hour;
                    min1 = min;
                    sec1 = sec
                }
                if (day <= 0 && hour <= 0) {
                    day1 = 0;
                    hour1 = 0;
                    min1 = min;
                    sec1 = sec
                }
                that.setData({
                    day1:day1,
                    hour1:hour1,
                    min1:min1,
                    sec1:sec1
                })
            } else {
                clearInterval(timer);
                // that.setData({
                //     content: '0时0分0秒'
                // })
                // wx.showToast({
                //     title: '活动已结束！',
                // })
            }
        }, 1000);
    },
    backIndexs(e){
        wx.switchTab({
            url: '/pages/index/index',
        })
    },
    backMore(e){
        wx.navigateTo({
            url: "/hotActive/hotActive",
        })
    },
    // 购买支付
    buyKj(e){
        var that = this
        if (that.data.bargainIntro.disprice >= that.data.bargainIntro.orprice - that.data.bargainIntro.start.cuted){
            wx.getStorage({
                key: 'userinfo',
                success: function (res) {
                    let mydata = {
                        memberid: res.data.memberid,
                        openid: res.data.openid,
                        promoid: that.data.promoid,  //活动id
                        shopid: 0,
                        fee: that.data.bargainIntro.orprice - that.data.bargainIntro.start.cuted, //that.bargainIntro.orprice - that.bargainIntro.start.cuted
                        token: getApp().globalData.token
                    }
                    wx.request({
                        url: getApp().globalData.url + '/v1/buy/bargain',
                        data: mydata,
                        success: function (res) {
                            if (res.data.code == 1) {
                                // console.log(res)
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
                                                title: '订单操作失败！'
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
        }else{
            wx.showModal({
                title: '提示',
                content: "小主，您还没有砍至底价，确认购买吗？",
                confirmText: "继续购买",
                success: function (res) {
                    if (res.confirm) {
                        wx.getStorage({
                            key: 'userinfo',
                            success: function (res) {
                                let mydata = {
                                    memberid: res.data.memberid,
                                    openid: res.data.openid,
                                    promoid: that.data.promoid,  //活动id
                                    shopid: 0,
                                    fee: that.data.bargainIntro.orprice - that.data.bargainIntro.start.cuted, //that.bargainIntro.orprice - that.bargainIntro.start.cuted
                                    token: getApp().globalData.token
                                }
                                wx.request({
                                    url: getApp().globalData.url + '/v1/buy/bargain',
                                    data: mydata,
                                    success: function (res) {
                                        if (res.data.code == 1) {
                                            // console.log(res)
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
                                                            title: '订单操作失败！'
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
                    }
                }

            })
        }
        
        
        
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
    //   wx.navigateTo({
    //       url: "/activekj1/activekj1?proid=" + this.data.bargainIntro.id + "&cmid=" + this.data.memberid + "&openid=" + this.data.openid
    //   })
      return {
          title: this.data.title,
          path: "/activekj1/activekj1?proid=" + this.data.bargainIntro.id + "&cmid=" + this.data.memberid,
          imageUrl: "https://store.ineerg.com/static/mini/images/share.jpg"
      }
  }
})