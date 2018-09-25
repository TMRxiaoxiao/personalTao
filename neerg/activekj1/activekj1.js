// activekj1/activekj1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      currentTB: 0,
      proIntro: "",
      content: "",
      cutPrice: "",
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      flag: false,
      flas: false,
      glag: true,
      mark:false,
      yqk:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function (options) {
        wx.showLoading()
        console.log(options.openid)
        var promoid = options.proid
        var cmid = options.cmid
        this.setData({
            promoid: promoid,
        })
        wx.request({
            url: getApp().globalData.url + '/v1/promotion/bargainfor',
            data: {
                token: getApp().globalData.token,
                promoid: promoid,
                memberid: this.data.memberid,
                cmid: cmid
            },
            success: res => {
                // console.log(res)
                if (parseInt(res.data.data.start.paysta)>0){
                    this.setData({mark:true})
                }
                wx.hideLoading()
                this.setData({
                    proIntro: res.data.data,
                    cutPrice: res.data.data.start.cuted,
                    endTime: res.data.data.start.endtime,
                    orprice: res.data.data.orprice,
                    promoid: promoid,
                    cmid: cmid,
                    newprice: (res.data.data.orprice - res.data.data.start.cuted).toFixed(2),
                    title: res.data.data.title
                })
                this.setData({
                    bfh: (this.data.cutPrice / (this.data.orprice - this.data.proIntro.disprice)) * 100,
                    width: (res.data.data.start.cuted) / (res.data.data.orprice - res.data.data.disprice) * 520,
                    cutprice: res.data.data.start.cuted
                })
                // console.log(that.data.bfh)
                wx.setNavigationBarTitle({
                    title: res.data.data.title,
                })
            }
        })
        var that = this;
        that.countdowm();
        // 获取好友的用户信息存入缓存
        if (wx.getStorageSync("userinfo")) {
            // console.log(wx.getStorageSync("userinfo"))
            that.setData({
                memberid: wx.getStorageSync("userinfo").memberid
            })
            console.log(that.data.memberid,cmid)
            if (wx.getStorageSync("userinfo").memberid == cmid){
                that.setData({yqk:true})
                
            }
        } else {
            // 需要用户授权
            this.setData({
                flag: true
            })
        }

    },
    buyP(e){
        var that = this
        if (that.data.proIntro.disprice >= that.data.proIntro.orprice - that.data.proIntro.start.cuted) {
            wx.getStorage({ 
                key: 'userinfo',
                success: function (res) {
                    let mydata = {
                        memberid: res.data.memberid,
                        openid: res.data.openid,
                        promoid: that.data.promoid,  //活动id
                        shopid: 0,
                        fee: that.data.proIntro.orprice - that.data.proIntro.start.cuted, //that.bargainIntro.orprice - that.bargainIntro.start.cuted
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
        } else {
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
                                    fee: that.data.proIntro.orprice - that.data.proIntro.start.cuted, //that.bargainIntro.orprice - that.bargainIntro.start.cuted
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
    koina(){
        wx.reLaunch({
            url: '/hotActive/hotActive',
        })
    },
    joinKj: function () {
        wx.showModal({
            title: '提示',
            content: '先帮你的好友砍价才可以参加活动哦！',
        })
    },
    backIndexs(e) {
        wx.switchTab({
            url: '/pages/index/index',
        })
    },
    backMore(e) {
        wx.navigateTo({
            url: "/hotActive/hotActive",
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
                let hour1 = '';
                let min1 = "";
                let sec1 = "";
                if (day > 0) {
                    day1 = day;
                    hour1 = hour;
                    min1 = min;
                    sec1 = sec
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
                    day1: day1,
                    hour1: hour1,
                    min1: min1,
                    sec1: sec1
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
    // 砍价
    Kprice(e) {
        wx.request({
            url: getApp().globalData.url + '/v1/promotion/cut',
            data: {
                token: getApp().globalData.token,
                promoid: this.data.promoid,
                memberid: this.data.memberid,
                cmid: this.data.cmid
            },
            success: res => {
                if (res.data.code == 1) {
                    var cutFee = res.data.data.cutFee
                    this.setData({
                        cutPrice: parseFloat(cutFee) + parseFloat(this.data.cutPrice),
                        width: (parseFloat(this.data.cutprice) + parseFloat(cutFee)) / (parseFloat(this.data.proIntro.orprice) - parseFloat(this.data.proIntro.disprice)) * 520,
                        newprice: (parseFloat(this.data.proIntro.orprice) - (parseFloat(this.data.cutprice) + parseFloat(cutFee))).toFixed(2)
                    })
                    this.setData({
                        flas: true,
                        cutedPrice: res.data.data.cutFee,
                        quanList: res.data.data.coupons,
                    })
                    console.log(this.data.width)
                    // 判断领取优惠券的人是否登录
                    if (res.data.result == "success") {
                        this.setData({ glag: true })
                    } else {
                        this.setData({ glag: false })
                    }
                } else {
                    wx.showModal({
                        title: '提示',
                        content: res.data.msg,
                    })
                }
            }
        })
    },
    // 领优惠券
    getQuan() {
        if (this.data.glag) {
            wx.showModal({
                title: '提示',
                content: '系统已发放优惠券至您的账号，赶快去使用吧！',
            })
        } else {
            console.log("还未绑定手机")
        }
    },
    del: function () {
        this.setData({ flas: false })
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
    //       url: "/activekj1/activekj1?proid=" + this.data.promoid + "&cmid=" + this.data.memberid
    //   })
      return {
          title: this.data.title,
          path: "/activekj1/activekj1?proid=" + this.data.promoid + "&cmid=" + this.data.memberid,
          imageUrl: "https://store.ineerg.com/static/mini/images/share.png"
      }
  },
    bindGetUserInfo: function (e) {
        //console.log(e)
        var rawData = e.detail.rawData;
        var that = this;
        if (e.detail.iv) {
            wx.login({
                success: function (res) {
                    console.log(res)
                    //获取opid
                    //console.log("userinfo====" +rawData)
                    wx.request({
                        url: getApp().globalData.url + '/v1/promotion/reg',
                        data: {
                            code: res.code,
                            token: getApp().globalData.token,
                            data: e.detail.rawData,
                            promoid: that.data.promoid
                        },
                        success: function (res) {
                            console.log(res);
                            //基本信息存入缓存
                            wx.setStorage({
                                key: 'userinfo',
                                data: res.data.data,
                            })
                            that.setData({
                                userinfo: res.data.data,
                                memberid: res.data.data.memberid,
                                sessionKey: res.data.data.sessionKey
                            });
                            that.Kprice()
                        }
                    })
                }
            })
            that.setData({
                flag: false
            })
        }
    },
    getPhoneNumber: function (e) {
        var call = e.detail.encryptedData
        var iv = e.detail.iv
        console.log(this.data.openid)
        var that = this
        wx.getStorage({
            key: 'userinfo',
            success: function (res) {
                var userinfo = res.data
                var openid = res.data.openid
                // wx.showModal({
                //     title: "信息",
                //     content: "openid=" + openid
                // })
                wx.request({
                    url: getApp().globalData.url + '/v1/promotion/bind',
                    data: {
                        openid: openid,
                        encryptedData: call,
                        iv: iv,
                        token: getApp().globalData.token,
                        sessionKey: that.data.sessionKey,
                    },
                    success: res => {
                        if (res.data.code == 1) {
                            that.setData({ glag: true })
                            wx.showModal({
                                title: '提示',
                                content: '领取成功',
                            })
                            userinfo.cardno = res.data.data.cardno
                            wx.setStorage({
                                key: 'userinfo',
                                data: userinfo,
                            })
                        } else {

                        }
                    }
                })
            },
        })




    }
})