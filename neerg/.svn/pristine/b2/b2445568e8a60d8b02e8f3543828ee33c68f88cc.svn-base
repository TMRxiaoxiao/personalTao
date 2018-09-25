// orders/orderPay/orderPay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [
      {}
    ],
    detailed:{},
    tid:"",//拼团主键
    flag:false,
    datalist:[
      
    ],
    tit:"不使用优惠券",
    memberid:"",
    totalprice:""

  },
  showSale:function(){
    this.setData({
      flag:true
    })
  },
  close:function(){
    this.setData({
      flag: false
    })
  },
  radioChange:function(e){
    var obj1 = {}
    obj1 = this.data.detailed;
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    if (e.detail.value == "00") {
      this.setData({ tit: "不使用优惠券",flag:false });
      obj1.price = this.data.totalprice;
      this.setData({ detailed: obj1 })
    }else{
      this.setData({ radio: e.detail.value })
      var tit = this.data.datalist.filter(function (val, i) {
        return val.value == e.detail.value
      })
      this.setData({ tit: tit[0].name, flag:false, fee: tit[0].fee + ".00", id: tit[0].id, sale: tit[0].sale })
      obj1.price = this.data.fee;
      this.setData({ detailed: obj1 })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({shopid:options.shopid})
    if (options.buyType){
      this.setData({ promotype: options.promotype })
      wx.getStorage({
        key: 'userinfo',
        success: res => {
          this.setData({ memberid: res.data.memberid })
          console.log(this.data)
          this.setData({ tid: "" });
          if (options.tid != "null") {
            this.setData({ tid: options.tid });
          }
          //根据id获取明细
          wx.request({
            url: getApp().globalData.url + '/v1/service/info',
            data: { token: getApp().globalData.token, id: options.id },
            success: res1 => {
              console.log(res1)
              var data = res1.data.data;
              data.promo.disprice = data.price
              this.setData({ detailed: data, totalprice: data.price })
              console.log(options.id)
              //优惠券
              wx.request({
                url: getApp().globalData.url + '/v1/promo/usecoupon',
                data: {
                  token: getApp().globalData.token,
                  shopid: options.shopid,
                  memberid: this.data.memberid,
                  type: "service",
                  fee: data.price,
                  pkid: options.id
                },
                success: res2 => {
                  console.log(res2);
                  if (res2.data.code == 1) {
                    var array = [];
                    var value = 0
                    res2.data.data.forEach(function (val, i) {
                      if (val.type == "redbag") {
                        array.push({ name: "红包" + val.fee + "元", value: value++, id: val.id, fee: data.price - val.fee, sale: val.fee })
                      } else if (val.type == "sale") {
                        array.push({ name: "折扣券（" + val.fee / 10 + "折）", value: value++, id: val.id, fee: (val.fee / 100) * data.price, sale: val.fee })
                      } else {
                        array.push({ name: "代金券" + val.fee + "元", value: value++, id: val.id, fee: data.price - val.fee, sale: val.fee })
                      }
                    })
                    console.log(array)
                    this.setData({ datalist: array })
                  }
                }
              })
            }
          })
        },
      })
    }else{
      this.setData({ promotype: options.promotype })
      wx.getStorage({
        key: 'userinfo',
        success: res => {
          this.setData({ memberid: res.data.memberid })
          console.log(this.data.memberid)
          this.setData({ tid: "" });
          if (options.tid != "null") {
            this.setData({ tid: options.tid });
          }
          //根据id获取明细
          wx.request({
            url: getApp().globalData.url + '/v1/service/info',
            data: { token: getApp().globalData.token, id: options.id },
            success: res1 => {
              var data = res1.data.data;
              this.setData({ detailed: data, totalprice: data.price })
              console.log(options.id)
              //优惠券
              wx.request({
                url: getApp().globalData.url + '/v1/promo/usecoupon',
                data: {
                  token: getApp().globalData.token,
                  shopid: options.shopid,
                  memberid: this.data.memberid,
                  type: "service",
                  fee: data.price,
                  pkid: options.id
                },
                success: res2 => {
                  console.log(res2);
                  if (res2.data.code == 1) {
                    var array = [];
                    var value = 0
                    res2.data.data.forEach(function (val, i) {
                      if (val.type == "redbag") {
                        array.push({ name: "红包" + val.fee + "元", value: value++, id: val.id, fee: data.price - val.fee, sale: val.fee })
                      } else if (val.type == "sale") {
                        array.push({ name: "折扣券（" + val.fee / 10 + "折）", value: value++, id: val.id, fee: (val.fee / 100) * data.price, sale: val.fee })
                      } else {
                        array.push({ name: "代金券" + val.fee + "元", value: value++, id: val.id, fee: data.price - val.fee, sale: val.fee })
                      }
                    })
                    console.log(array)
                    this.setData({ datalist: array })
                  }
                }
              })
            }
          })
        },
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
    console.log(this.data.radio)
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
  //确认支付
  pay_btn:function()
  {
    //console.log(this.data.detailed);
    var detailed = this.data.detailed;
    var tid =this.data.tid;
    var clid=this.data.id
    var qfee=this.data.sale;
    var shopid=this.data.shopid
    wx.getStorage({
      key: 'userinfo',
      success: function(res) {
        //console.log(this.data);
        //console.log(this.data.detailed);
        //var typeid = this.setData.detailed;
        var id = detailed.id;
        if (detailed.promo !== null) {
          if (detailed.promo.disprice == detailed.price){
            //活动项目支付
            var money = detailed.promo.disprice;
            var prid = ""
            //var typeid = detailed.promo.type;
            let mydata = {
              id: id,//服务id
              prid: prid,//活动id
              openid: res.data.openid,//用户微信id
              memberid: res.data.memberid,//用户id主键
              money: money,//应付金额
              tid: tid,//
              shopid: shopid,
              token: getApp().globalData.token
            };
            // console.log(mydata)
            wx.request({
              url: getApp().globalData.url + '/v1/pay/pay',
              data: mydata,
              success: res => {
                console.log(res);
                if (res.data.code == 1) {
                  let param = {
                    gid: res.data.param.gid,
                    memberid: res.data.param.memberid,
                    orderid: res.data.param.orderid,
                    proid: res.data.param.proid,
                    shopid: res.data.param.shopid,
                    tType: res.data.param.tType,
                    tid: res.data.param.tid,
                    token: getApp().globalData.token,
                    clid: clid,
                    qfee: qfee
                  };
                  //调取支付
                  wx.requestPayment({
                    timeStamp: new String(res.data.data.timeStamp),
                    nonceStr: res.data.data.nonceStr,
                    package: res.data.data.package,
                    signType: res.data.data.signType,
                    paySign: res.data.data.paySign,
                    success: res => {
                      console.log(param);
                      console.log(res);
                      //支付成功
                      wx.request({
                        url: getApp().globalData.url + '/v1/pay/finish',
                        data: param,
                        success: function (res) {

                          if (res.data.code == 1) {
                            //跳转到订单页面
                            wx.redirectTo({
                              url: '/orders/order/order',
                            })
                          } else {
                            wx.showToast({
                              title: '订单操作失败！',
                              icon: "loading",
                              mask: true,

                            })
                          }
                        }

                      })
                    },
                    fail: function () {
                      console.log("错误");
                    }
                  })
                } else {
                  wx.showToast({
                    title: res.data.msg,
                    mask: true,
                    icon: 'loading',
                    duration: 1000
                  })
                }

              }
            })
          }else{
            //活动项目支付
            var money = detailed.promo.disprice;
            var prid = detailed.promo.id;
            //var typeid = detailed.promo.type;
            let mydata = {
              id: id,//服务id
              prid: prid,//活动id
              openid: res.data.openid,//用户微信id
              memberid: res.data.memberid,//用户id主键
              money: money,//应付金额
              tid: tid,//
              shopid: shopid,
              token: getApp().globalData.token
            };
            wx.request({
              url: getApp().globalData.url + '/v1/pay/pay',
              data: mydata,
              success: res => {
                //console.log(res);
                if (res.data.code == 1) {
                  let param = {
                    gid: res.data.param.gid,
                    memberid: res.data.param.memberid,
                    orderid: res.data.param.orderid,
                    proid: res.data.param.proid,
                    shopid: res.data.param.shopid,
                    tType: res.data.param.tType,
                    tid: res.data.param.tid,
                    token: getApp().globalData.token,
                    clid: clid,
                    qfee: qfee
                  };
                  //调取支付
                  wx.requestPayment({
                    timeStamp: new String(res.data.data.timeStamp),
                    nonceStr: res.data.data.nonceStr,
                    package: res.data.data.package,
                    signType: res.data.data.signType,
                    paySign: res.data.data.paySign,
                    success: res => {
                      console.log(param);
                      console.log(res);
                      //支付成功
                      wx.request({
                        url: getApp().globalData.url + '/v1/pay/finish',
                        data: param,
                        success: function (res) {

                          if (res.data.code == 1) {
                            //跳转到订单页面
                            wx.redirectTo({
                              url: '/orders/order/order',
                            })
                          } else {
                            wx.showToast({
                              title: '订单操作失败！',
                              icon: "loading",
                              mask: true,

                            })
                          }
                        }

                      })
                    },
                    fail: function () {
                      console.log("错误");
                    }
                  })
                } else {
                  wx.showToast({
                    title: res.data.msg,
                    mask: true,
                    icon: 'loading',
                    duration: 1000
                  })
                }

              }
            })
          }
        } else {
          //console.log("普通支付")
          //普通项目支付
          var money = detailed.price;
          let mydata={
            id: id,//服务id
            prid:"",//活动id
            openid: res.data.openid,//用户微信id
            memberid: res.data.memberid,//用户id主键
            money: money,//应付金额
            tid:"",//
            shopid: shopid,
            token: getApp().globalData.token
          };
          wx.request({
            url: getApp().globalData.url + '/v1/pay/pay',
            data: mydata,
            success: res => {

              //console.log(res);

              if (res.data.code == 1) {

                let param = {
                  gid: res.data.param.gid,
                  memberid: res.data.param.memberid,
                  orderid: res.data.param.orderid,
                  proid: res.data.param.proid,
                  shopid: res.data.param.shopid,
                  tType: res.data.param.tType,
                  tid: res.data.param.tid,
                  token: getApp().globalData.token
                };
                //调取支付
                wx.requestPayment({
                  timeStamp: new String(res.data.data.timeStamp),
                  nonceStr: res.data.data.nonceStr,
                  package: res.data.data.package,
                  signType: res.data.data.signType,
                  paySign: res.data.data.paySign,
                  success: res => {
                    //支付成功
                    wx.request({
                      url: getApp().globalData.url + '/v1/pay/finish',
                      data: param,
                      success: function (res) {
                        if (res.data.code == 1) {
                          //跳转到订单页面
                          wx.redirectTo({
                            url: '/orders/order/order',
                          })
                        } else {
                          wx.showToast({
                            title: '订单操作失败！',
                            icon: "loading",
                            mask: true,
                          })
                        }
                      }

                    })
                  },
                  fail: function () {
                    console.log("错误");
                  }
                })
              } else {
                wx.showToast({
                  title: res.data.msg,
                  mask: true,
                  icon: 'loading',
                  duration: 1000
                })
              }

            }
          })

        }
      },
      fail:function()
      {
        wx.showToast({
          title: '请先登录!',
          mask: true,
          icon: 'loading',
          duration: 1000
        })        
      }
    })

    
    
  }
})