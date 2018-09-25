// bargaining/bargaining.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTB:0,
    bargainIntro:"",
    endTime:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id=options.id
    wx.getStorage({
      key: 'userinfo',
      success: res=>{
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
            res.data.data.introduce = res.data.data.introduce.replace(/&mdash;/g, " ")
            var m = res.data.data.endtime_f.split(" ")[0].split("-")[1]
            var d = res.data.data.endtime_f.split(" ")[0].split("-")[2]
            var timeOver = m + "月" + d + "日"
            this.setData({
                bargainIntro: res.data.data,
                endTime: res.data.data.endtime,
                timeOver: timeOver,
                baifenbi: (res.data.data.start.cuted / res.data.data.orprice)*100,
                title: res.data.data.title,
                richtext: res.data.data.introduce.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
            })
              wx.setNavigationBarTitle({
                  title: res.data.data.title,
              })
          }
        })
      },
      fail:res=>{
          wx.showModal({
              title: '友情提示',
              content: '该活动只有会员才可以参加哦，赶快去注册会员吧！',
              success:res=>{
                  if(res.confirm){
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
    // 获取用户memberid分享使用
    wx.getStorage({
      key: 'userinfo',
      success: function(res) {
        that.setData({
          memberid: res.data.memberid
        })
        //   console.log(that.data.memberid)
      },
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
  },
  click1: function (e) {
    var that = this;
    var id = e.target.dataset.current;
    if (this.data.currentTB === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTB: e.target.dataset.current
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
  onShareAppMessage: function (res) {
    // wx.navigateTo({
    //     url: "/firendKj/firendKj?proid=" + this.data.bargainIntro.id + "&cmid=" + this.data.memberid + "&openid=" + this.data.openid
    // })
    return {
        title: this.data.title,
        path: "/firendKj/firendKj?proid=" + this.data.bargainIntro.id + "&cmid=" + this.data.memberid
    }
  }
})