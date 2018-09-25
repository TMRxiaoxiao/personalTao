// orders/coupons/coupons.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    Redenvelope:[],//红包
    coupon:[],//优惠卷
    xiaoshi:false,
    memberid:"",
    couponid:"",
    token:"",
    send:false,
    lid:"",
      quanMore:false,
      HquanMore:false
  },
    quanMore(e){
        // console.log(e.target.dataset.i)
        this.setData({ quanMore: true, index: e.target.dataset.i});
    },
    HquanMore(e){
        this.setData({ HquanMore: true, idx: e.target.dataset.i })
    },
  formSubmit: function (e) {
    var that=this
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var phonetel = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
    //手机号判断
    if (!phonetel.test(e.detail.value.call)) {
      wx.showModal({
        title: '提示',
        content: '请输入有效手机号',
        showCancel: false,
        success: function () {
          //console.log("手机号");
        }
      })
      return false
    }else{
      wx.request({
        url: getApp().globalData.url + '/v1/promo/give',
        data: { token: getApp().globalData.token, lid: this.data.lid, name: e.detail.value.name, mobile: e.detail.value.call },
        success: res => {
          console.log(res);
            wx.showModal({
              title: '提示',
              showCancel:false,
              content: res.data.msg,
              success: function () {
                that.setData({ send: false })
                //获取用户id
                wx.getStorage({
                  key: 'userinfo',
                  success: function (res) {
                    //console.log(res)
                    var memberid = res.data.memberid;
                    //红包卷
                    wx.request({
                      url: getApp().globalData.url + '/v1/promo/quan',
                      data: { token: getApp().globalData.token, memberid: res.data.memberid },
                      success: res => {
                        console.log(res);
                        if (res.data.code == 1) {
                          var coupon = [];  //折扣
                          var Redenvelope = []   //红包
                          coupon = res.data.data.data.filter(function (val) {
                            return val.type == "sale"
                          })
                          Redenvelope = res.data.data.data.filter(function (val) {
                            return val.type == "cash" || val.type == "redbag"
                          })
                          that.setData({
                            coupon: coupon,
                            Redenvelope: Redenvelope,
                            memberid: memberid,
                            token: getApp().globalData.token
                          });
                        };
                      }
                    });
                  },
                  fail: function () {

                  }
                })
              }
            })
        }
      });
    }
  },
  send:function(e){
    console.log(e)
    this.setData({
      send: !this.data.send,
      lid: e.currentTarget.dataset.lid,
    })
  },
  click:function(e){
    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    } 
  },
  xioashi:function(){
    this.setData({
      xiaoshi:false,
        quanMore:false,
        HquanMore:false
    })
  },
  //立即使用
  ljsy: function (e) {
    var that=this;
    //console.log(e);
    that.setData({
      couponid: e.currentTarget.id,
      xiaoshi:true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    //获取用户id
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        //console.log(res)
        var memberid = res.data.memberid;
        //红包卷
        wx.request({
          url: getApp().globalData.url +'/v1/promo/quan',
          data: { token: getApp().globalData.token, memberid: res.data.memberid},
          success:res=>{
            if(res.data.code==1)
            {
              var coupon=[];  //折扣
              var Redenvelope=[]   //红包
              coupon = res.data.data.data;
              coupon = coupon.filter(function(val){
                return val.type=="sale";
              });
              console.log(coupon);
              Redenvelope = res.data.data.data.filter(function (val) {
                return val.type == "cash" || val.type == "redbag"
              });
            
              that.setData({ 
                coupon: coupon,
                Redenvelope: Redenvelope,
                memberid: memberid,
                token: getApp().globalData.token
              });
                console.log(that.data.coupon)
              var Hq=[];
              coupon.forEach(v=>{
                  //console.log(v)
                  Hq.push({
                      intro: v.intro
                  })
              })
              var zq=[];
                Redenvelope.forEach(v=>{
                    zq.push({
                        intro: v.intro
                    })
                })
                that.setData({
                    Hq: Hq,
                    zq:zq
                })
                console.log(that.data.Hq)
            };
          }
        });
      },
      fail:function()
      {

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