// orders/cardPay/cardPay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:{},
    ctype:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({ctype:options.ctype})
    wx.request({
      url: getApp().globalData.url+'/v1/scard/info',
      data: { token: getApp().globalData, id: options.id, type: this.data.ctype},
      success:res=>{
        console.log(res);
        if(res.data.code=1)
        {
          this.setData({ data: res.data.data });
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
  
  },
  pay_btn:function()
  {
    var that=this;
    var price = that.data.data.price;//价格
    var carid=that.data.data.id;//卡id
    console.log("===" + price)
    //检测是否登录
    wx.getStorage({
      key: 'userinfo',
      success: res=> {
        console.log(res);
        wx.request({
          url: getApp().globalData.url + '/v1/pay/buycard',
          data:{
            memberid: res.data.memberid,
            cardid:carid,
            openid: res.data.openid,//用户微信id
            fee:price,//price
            token: getApp().globalData.token,
            ctype:that.data.ctype
          },
          success:res=>
          {
            console.log(res);
            var param ={
              memberid: res.data.param.memberid,
              orderid: res.data.param.orderid,
              scardid: res.data.param.scardid,
              token: getApp().globalData.token,
              ctype:that.data.ctype
            };
            if(res.data.code==1)
            {
              //调取支付
              wx.requestPayment({
                timeStamp: new String(res.data.data.timeStamp),
                nonceStr: res.data.data.nonceStr,
                package: res.data.data.package,
                signType: res.data.data.signType,
                paySign: res.data.data.paySign,
                success:res=>{
                  console.log("支付成功")
                  
                  wx.request({
                    url: getApp().globalData.url + '/v1/pay/finishcard',
                    data: param,
                    success:res=>{
                      //console.log(res);
                      if(res.data.code==1)
                      {
                        wx.showLoading({
                          title: '购买成功！',
                          mask:true,
                          success:res=>
                          {
                            wx.redirectTo({
                              url: '/mycard/mycard',
                            })
                          }
                        })
                      }
                    }
                  })
                }
              })
            }else
            {
              wx.showToast({
                title: '订单创建失败',
                icon: 'loading',
                mask: true
              })
            }
            
          }
        })
      },
      fail:function()
      {
        wx.showToast({
          title: '请先登录',
          icon:'loading',
          mask:true
        })
      }
    })
  }
})