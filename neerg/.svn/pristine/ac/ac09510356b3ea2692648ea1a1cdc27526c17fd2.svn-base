Page({
  /**
   * 页面的初始数据
   */
  data: {
    // countDownList: [],
    // actEndTimeList: [],
    currentTab: 0,
    clock: '',
    NewPeople:[],//新人专享
    OldGuest:[],//老客
    fulizhuanqu:[],//福利专区
    xszklist:[],//限时折扣
    sjlsit:[],//循环时间集合
    yxsjlsit:[],//运行时间集合
    promotype:""
  },
  click: function (e) {
    var that = this;
    var id = e.target.dataset.current;
    //福利专区
    if(id==0)
    {
      wx.request({
        url: getApp().globalData.url + '/v1/info/position',
        data: {
          token: getApp().globalData.token,
          pos: 'flzq',
          count: 10
        },
        success: res => {
          //console.log(res);
          if (res.data.code == 1) {
            var data = res.data.data;
            for (var i = 0; i < data.length; i++) {
              if (data[i].mark == "article") {
                //G小姐课堂
                if (data[i].type == "c") {
                  data[i].uri = "/gcourse/couse_content/couse_content";
                }
                //G小姐俱乐部
                if (data[i].type == "a") {
                  data[i].uri = "/gcourse/gclassContent/gclassContent";
                }
              } else {
                //商品
                data[i].uri = "/saleListContent/saleListContent";
              }
            }
            this.setData({
              fulizhuanqu: data
            })
          }
         
        }
      })
      wx.request({
        url: getApp().globalData.url + '/v1/service/getlist',
        data: {
          token: getApp().globalData.token,
          ispopular: 1
        },
        success: res => {
          console.log(res);
          if (res.data.code == 1) {
            this.setData({
              note: res.data.data,
              promotype: res.data.data.promotype
            })
          }
        }
      })
    }
    //新人专享
    if(id==1)
    {
      wx.getStorage({
        key: 'userinfo',
        success: function (res) {
          wx.request({
            url: getApp().globalData.url + '/v1/promo/newer',
            data: {
              token: getApp().globalData.token,
              memberid: res.data.memberid
            },
            success: function (res) {
              console.log(res);
              if (res.data.data.sta == "newer") {
                that.setData({ NewPeople: res.data.data.data });
              } else {
                wx.showModal({
                  title: '提示信息',
                  content: '该活动只有新人可参加！',
                  showCancel: false,
                  success: res => {
                    if (res.confirm) {
                      wx.navigateBack({
                        delta: 1
                      })
                    }
                  }
                })
              }
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
    }
    //老客福利
    if(id==2)
    {
      wx.request({
        url: getApp().globalData.url + '/v1/promo/older',
        data: {
          token: getApp().globalData.token
        },
        success: function (res) {
          console.log(res.data.data.data);
          if (res.data.code == 1) {
            var arry=[];
            for(var i=0;i<res.data.data.data.length;i++)
            {

              arry.push(res.data.data.data[i].endtime.replace(/\-/g, '/'));
            }
            that.setData({ 
              OldGuest: res.data.data.data,
              sjlsit:arry
            });
            //console.log(that.data.sjlsit)
            that.countDown();
          }

        }
      })

    }
    //限时折扣
    if(id==3)
    {
      wx.request({
        url: getApp().globalData.url + '/v1/service/getlist',
        data: {
          token: getApp().globalData.token,
          ispopular: 0,
          fuli:1
        },
        success: res => {
          //console.log(res);
          if (res.data.code == 1) {
            that.setData({
              xszklist: res.data.data
            })
          }

        }
      })
    }
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //新人专享
    if(options.id==1)
    {
      wx.getStorage({
        key:'userinfo',
        success: function(res) {
          wx.request({
            url: getApp().globalData.url + '/v1/promo/newer',
            data: {
              token: getApp().globalData.token,
              memberid: res.data.memberid
            },
            success: function (res) {
             // console.log(res);
              if (res.data.data.sta=="newer")
              {
                
                that.setData({NewPeople:res.data.data.data});
                
              }else
              {
                wx.showModal({
                  title: '提示信息',
                  content: '该活动只有新人可参加！',
                  showCancel: false,
                  success: res => {
                    if (res.confirm) {
                      wx.navigateBack({
                        delta: 1
                      })
                    }
                  }
                })
              }
            }
          })
        },
        fail:function()
        {
          wx.showToast({
            title: '请先登录',
            mask: true,
            icon: 'loading'
          })
        }
      })

      
    }
    //限时折扣
    if(options.id==3)
    {
      wx.request({
        url: getApp().globalData.url + '/v1/service/getlist',
        data: {
          token: getApp().globalData.token,
          ispopular: 0,
          fuli:1
        },
        success: res => {
          //console.log(res);
          if(res.data.code==1)
          {
            that.setData({
              xszklist:res.data.data
            })
          }

        }
      })

    }
    //老客福利
    if (options.id == 2) {
      wx.request({
        url: getApp().globalData.url + '/v1/promo/older',
        data: {
          token: getApp().globalData.tokenm,
        },
        success: function (res) {
          if (res.data.code == 1) {
            console.log(res)
            var arry = [];
            for (var i = 0; i < res.data.data.data.length; i++) {
              arry.push(res.data.data.data[i].endtime.replace(/\-/g,'/'));
            }
            console.log(arry)
            that.setData({
              OldGuest: res.data.data.data,
              sjlsit: arry
            });
            that.countDown();
          }

        }
      })

    }
    this.setData({
      currentTab:options.id
    })
  },
  timeFormat(param) {//小于10的格式化函数
    return param < 10 ? '0' + param : param;
  },
  countDown() {//倒计时函数
    // 获取当前时间，同时得到活动结束时间数组
    let newTime = new Date().getTime();
    let endTimeList = this.data.sjlsit;
    let countDownArr = [];

    // 对结束时间进行处理渲染到页面
    endTimeList.forEach(o => {
      let endTime = new Date(o).getTime();
      let obj = null;
      // 如果活动未结束，对时间进行处理
      if (endTime - newTime > 0) {
        let time = (endTime - newTime) / 1000;
        // 获取天、时、分、秒
        let day = parseInt(time / (60 * 60 * 24));
        let hou = parseInt(time % (60 * 60 * 24) / 3600);
        let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
        let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
        obj = {
          day: this.timeFormat(day),
          hou: this.timeFormat(hou),
          min: this.timeFormat(min),
          sec: this.timeFormat(sec)
        }
      } else {//活动已结束，全部设置为'00'
        obj = {
          day: '00',
          hou: '00',
          min: '00',
          sec: '00'
        }
      }
      // console.log(obj)
      countDownArr.push(obj);
    })
    // 渲染，然后每隔一秒执行一次倒计时函数
    this.setData({ yxsjlsit: countDownArr })

    setTimeout(this.countDown, 1000);
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