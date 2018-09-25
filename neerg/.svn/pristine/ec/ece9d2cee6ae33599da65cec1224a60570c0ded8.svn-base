// freeTest/freeTest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",//姓名
    age:"",//年龄
    phone:"",//手机号
    msg:"",//留言
    array: [],
    index:0,
    storeList:[],
    shopid:""
  },
  bindPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      shopid: this.data.storeList[e.detail.value].shopid
    })
    // console.log(this.data.shopid)
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
              var array = []
              //var page = getCurrentPages();
              //var pages = page[page.length - 3];
              //pages.setData({ xmdata: this.data.datalist[this.data.id] });
              if (res.data.data != null || res.data.data != "") {
                var data = res.data.data;
                for (var i = 0; i < res.data.data.length; i++) {
                  var bum = res.data.data[i].distance / 1000;
                  //console.log(bum + "===" + res.data.data[i].distance)
                  res.data.data[i].distance = bum.toFixed(2);
                  array.push(res.data.data[i].fullname)
                }
                that.setData({ array: array, storeList: data, shopid:data[0].shopid})
                // console.log(that.data.shopid)
              } else {
                wx.showModal({
                  title: '提示',
                  content: '抱歉你附近没有店铺！',
                  showCancel: true,
                  success: res => {
                    if (res.confirm) {
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
      fail: function () {
        wx.showModal({
          title: '提示',
          content: '检测到你没打开neerG的定位权限,请去个人中心授权',
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
  //姓名
  name:function(e)
  {
    this.setData({
      name: e.detail.value
    });
  },
  //年龄
  age:function(e)
  {
    this.setData({
      age: e.detail.value
    });
  },
  //手机号
  phone:function(e)
  {
    this.setData({
      phone: e.detail.value
    });
  },
  //留言
  msg:function(e)
  {
    this.setData({
      msg: e.detail.value
    });
  },
  //提交
  tijiao:function(e)
  {
    var formId = e.detail.formId
    // console.log(e)
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(19[0-9]{1})|(14[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/; 
      var name=this.data.name;
      var age = this.data.age;
      var phone = this.data.phone;
      var msg = this.data.msg;
      // console.log("手机=="+phone);
      if(name==null||name=="")
      {
        wx.showToast({
          title: '姓名不能为空！',
          icon: 'loading',
          mask:true
        });
        return false;
      }
      if (age == null || age == "") {
        wx.showToast({
          title: '年龄不能为空！',
          icon: 'loading',
          mask: true
        });
        return false;
      }
      if (!myreg.test(phone)) {
        wx.showToast({
          title: '手机号有误！',
          icon: 'loading',
          mask: true
        });
        return false;
      }
      if (msg == null || msg == "") {
        wx.showToast({
          title: '留言不能为空！',
          icon: 'loading',
          mask: true
        });
        return false;
      }
      wx.request({
        url: getApp().globalData.url +'/v1/shop/discover',
        data: { token: getApp().globalData.token, name: name, age: age, phone: phone, msg: msg, shopid: this.data.shopid, formid: formId},
        success:function(res)
        {
          if (res.statusCode=200)
          {
            wx.showToast({
              title: '提交成功！',
              mask: true,
              success:function()
              {
                setTimeout(function(){
                  wx.switchTab(
                    {
                      url: "/pages/index/index"
                    }
                  )
                },1500)
              }
            });
          }else
          {
            wx.showToast({
              title: '提交失败',
              icon: 'loading',
              mask: true
            });
          }
        }
    })
  }
})