// login/login.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    date: '请选择日期',
    fun_id: 2,
    time: '获取验证码', //倒计时 
    currentTime: 61,
    openid: "",
    phone: "",//手机号
    pwd: "",//密码
    disabled: false,//开启读秒
    sid: ""//授权后得到的sid
  },
  getCode: function (options) {
    var that = this;
    var currentTime = that.data.currentTime
    var interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: currentTime + '秒'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新发送',
          currentTime: 61,
          disabled: false
        })
      }
    }, 1000)
  },
  //手机号
  phone: function (e) {
    //console.log(e);
    this.setData({
      phone: e.detail.value
    });
  },
  //密码
  pwd: function (e) {
    // console.log(e);
    this.setData({
      pwd: e.detail.value
    });
  },
  //验证码
  vcode: function (e) {
    // console.log(e)
    this.setData({
      vcode: e.detail.value
    })
  },
  //登录
  submit: function () {
    // console.log(this.data.pass)
    //console.log("手机号"+this.data.phon);
    var phonetel = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
    //手机号判断
    if (!phonetel.test(this.data.phone)) {
      wx.showModal({
        title: '提示',
        content: '请输入有效手机号',
        showCancel: false,
        success: function () {
          //console.log("手机号");
        }
      })
      return false
    }
    //密码判断
    if (this.data.pwd == '' || this.data.pwd == null) {
      wx.showToast({
        title: "请输入密码",
        icon: 'loading',
        duration: 2000
      })
      return false
    }
    //验证码验证
    if (this.data.vcode == '' || this.data.vcode == null) {
      wx.showToast({
        title: '请输入验证码',
        icon: 'loading',
        duration: 2000
      })
      return false
    }
    wx.request({
      url: getApp().globalData.url + "/v1/user/bindnew",
      data: {
        token: getApp().globalData.token,
        mobile: this.data.phone,
        openid: this.data.openid,
        vcode: this.data.vcode,
        password: this.data.pwd
      },
      success: function (res) {
        //console.log(res)
        if (res.data.code == 1) {
          wx.showToast({
            title: '注册成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(function () {
            wx.switchTab({
              url: '/pages/my/my'
            })
          }, 2000)
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false,
          })
        }
      }
    })

  },

  //点击发送验证码
  send: function (e) {
    var that = this;
    //验证手机号是否正确
    if (!(/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(that.data.phone))) {
      wx.showModal({
        title: '提示',
        content: '请输入有效手机号',
        showCancel: false,
      })
      return false;
    };
    wx.request({
      url: getApp().globalData.url + '/v1/user/smsnew',
      data: {
        token: getApp().globalData.token,
        openid: that.data.openid,
        mobile: that.data.phone
      },
      success: function (res) {
        //console.log(res);
        if (res.data.code == 1) {
          date(that);
          that.setData({
            disabled: true
          })
          wx.showToast({
            title: '验证码已发送!',
            icon: 'success',
            duration: 2000
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '每天最多发送5次',
            showCancel: false,
          })
        }
        //date(this);//
        //console.log(that.data.currentTime);
        //开启倒计时
        //开启读秒渲染

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options.sid);
    this.setData({
      openid: options.openid
    })
    //console.log(this.data.openid)
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
function date(that) {
  var currentTime = that.data.currentTime
  var interval = setInterval(function () {
    currentTime--;
    that.setData({
      time: currentTime + '秒'
    })
    if (currentTime <= 0) {
      clearInterval(interval)
      that.setData({
        time: '重新发送',
        currentTime: 61,
        disabled: false
      })
    }
  }, 1000)
}