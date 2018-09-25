// storeDetail/storeDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    note: [],
    StoreDetails: {},//门店详情
    commodity:[],
    yhjlist:[],//优惠劵
    offen:0,
    shopid:"",
    typeH:"",
    promo:""
  },
  callPhone:function(e){
    console.log(e.currentTarget.dataset.call)
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.call //仅为示例，并非真实的电话号码
    })
  },
  //领取
  linqu: function (e) {
    console.log(e);
    var  couponid=e.currentTarget.id;
    //获取用户信息
    wx.getStorage({
      key: 'userinfo',
      success: res=>{
        wx.request({
          url: getApp().globalData.url + '/v1/promo/pickup',
          data: { 
            memberid: res.data.memberid,
            token: getApp().globalData.token,
            couponid: couponid,
            shopid: this.data.shopid
            },
          success: function (res) {
            console.log(res);
            if(res.data.code==1)
            {
              wx.showToast({
                title:"领取成功",
                mask: true
              })
            }else
            {
              wx.showToast({
                title:res.data.msg,
                mask: true,
                icon: 'loading'
              })
            }
            //return res;
          }
        })
      },
      fail: function () {
        wx.showToast({
          title: '请先登录',
          mask: true,
          icon: 'loading'
        })
      }
    })

  },
  //模糊搜索

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({ offen: options.offen, shopid: options.shopid ,typeH:options.typeH})
    console.log(this.data.shopid)
    //门店详细
    wx.request({
      url: getApp().globalData.url + '/v1/shop/info',
      data: { shopid: options.shopid, token: getApp().globalData.token },
      success: res => {
        //console.log(res)
        wx.setNavigationBarTitle({
          title: res.data.data.fullname,
        })
        var data = res.data.data;
        //data.logo = getApp().globalData.imgurl + data.logo;//给图片重新赋值
        this.setData({ StoreDetails: data })
      }
    })
    //获取商品
    wx.request({
      url: getApp().globalData.url + '/v1/service/getlist',
      data: { shopid: options.shopid, token: getApp().globalData.token },
      success: res => {
        // console.log(res.data.data)
        var data = res.data.data;
        data.forEach(function(val,i){
          val.shopid = options.shopid
        })
        //data.logo = getApp().globalData.imgurl + data.logo;//给图片重新赋值
        this.setData({ commodity: data})
      }
    })
    //获取门店优惠劵
    var that=this;
    wx.request({
      url: getApp().globalData.url + '/v1/promo/coupon',
      data:{
        shopid:options.shopid,
        token:getApp().globalData.token
      },
      success:function(res)
      {
        if(res.data.code==1)
        {
          that.setData({ yhjlist:res.data.data })
        }
        
      }

    })
    // 活动商品接口
    wx.request({
      url: getApp().globalData.url + '/v1/promo/getlist',
      data: { shopid: options.shopid, token: getApp().globalData.token },
      success: res => {
        console.log(res)
        var data = res.data.data;
        // data.forEach(function (val, i) {
        //   val.shopid = options.shopid
        // })
        //data.logo = getApp().globalData.imgurl + data.logo;//给图片重新赋值
        this.setData({ promo: data })
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