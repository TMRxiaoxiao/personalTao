var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: { 
    berthid:0,
    beizhu1:true,
    Storelist:[],//门店集合
    project:"请选择项目",//项目名
    fee:0,//价格
    xmdata:{},
    datatime:"请选择预约时间",//时间
    beizhu:"",
    period:[],//时间段
    windt: 0,
    xzsj:"",//选择的时间段
    beizhu:"",//备注
    shopdata:null,//选择的店铺
    //日期数组
    timeList: [],
    //时间数组
    hourList: [
      {
        hour: "8:00",
        n: 8,
        isShow: true
      },
      {
        hour: "9:00",
        n: 9,
        isShow: true
      }, {
        hour: "10:00",
        n: 10,
        isShow: true
      }, {
        hour: "12:00",
        n: 11,
        isShow: true
      }, {
        hour: "13:00",
        n: 13,
        isShow: true
      }, {
        hour: "14:00",
        n: 14,
        isShow: true
      }, {
        hour: "15:00",
        n: 15,
        isShow: true
      }, {
        hour: "16:00",
        n: 16,
        isShow: true
      }, {
        hour: "17:00",
        n: 17,
        isShow: true
      }, {
        hour: "18:00",
        n: 18,
        isShow: true
      }, {
        hour: "19:00",
        n: 19,
        isShow: true
      }],
    //是否显示
    timeShow: false, 
    currentTab: 0,
    //选择时间
    chooseHour: "",
    // 选择日期
    chooseTime: "",
    hourIndex: -1,
    shopId:""
  },
  //弹出按钮
  showTimeModel: function () {
    // console.log(this.data.timeList)
    if (this.data.shopdata == null || this.data.shopdata == undefined || this.data.shopdata == ""){
      wx.showToast({
        title: '请选择门店',
        icon:"none"
      })
      return false
    }
    this.setData({
      beizhu1:false,
      timeShow: !this.data.timeShow,
      chooseTime: this.data.timeList[0].date,
    });
    
  },
  // 点击取消
  cancel:function(){
    this.setData({
      beizhu1: true,
      timeShow: !this.data.timeShow,
      datatime:"请选择预约时间",
      hourIndex:-1
    })
  },
  //点击确定
  modelCancel: function () {
    this.setData({
      beizhu1: true,
      timeShow: !this.data.timeShow,
      chooseTime: this.data.timeList[0].date,
    });
    console.log(this.data.datatime)
  },
  //日期选择
  timeClick: function (e) {
    wx.setStorage({
      key: 'date',
      data: this.data.timeList[e.currentTarget.dataset.index].date,
    })
    this.setData({
      currentTab: e.currentTarget.dataset.index,
      chooseTime: this.data.timeList[e.currentTarget.dataset.index].date,
      chooseHour: "",
      hourIndex: -1
    });
    wx.request({
      url: getApp().globalData.url + '/v1/pre/getbtime',
      data: {
        token: getApp().globalData.token,
        shopid: this.data.shopdata.shopid,
        date: new Date().getFullYear() + "/" + this.data.chooseTime
      },
      success: res => {
        var hourList1 = res.data.data
        var hourList = []
        var n = 10
        hourList1.forEach(function (val, i) {
          hourList.push(
            { hour: val.time, n: n++, isShow: val.isshow, berthid: val.berthid }
          )
        })
        if (res.data.code == 1) {
          this.setData({
            hourList: hourList
          });
          console.log(this.data.hourList)
          //非今天-过时不判断
          // if (e.currentTarget.dataset.index != 0) {
          //   var list = this.data.hourList;
          //   for (var i = 0; i < list.length; i++) {
          //     list[i].isShow = true;
          //   }
          //   this.setData({
          //     hourList: list
          //   })
          // } else {
          //   //过时不可预约
          //   var hour = new Date().getHours();
          //   for (var i = 0; i < this.data.hourList.length; i++) {
          //     var list = this.data.hourList;
          //     if (this.data.hourList[i].n <= hour) {
          //       list[i].isShow = false;
          //       this.setData({
          //         hourList: list
          //       })
          //     }
          //   }
          // }
        }
      }
    })
  },
  // 时间选择
  hourClick: function (e) {
    var that = this;
    // 时间不可选择
    if (!e.currentTarget.dataset.isshow) {
      return false;
    }
    this.setData({
      hourIndex: e.currentTarget.dataset.index,
      chooseHour: this.data.hourList[e.currentTarget.dataset.index].hour,
      berthid: e.currentTarget.dataset.berthid,
    });
    var chooseTime = new Date().getFullYear() + "/" + this.data.chooseTime 
    this.setData({ datatime: chooseTime+" " + this.data.chooseHour})
    // console.log(this.data.chooseTime)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    Date.prototype.Format = function (format) {
      var o = {
        "M+": this.getMonth() + 1,  //month
        "d+": this.getDate(),     //day
        "h+": this.getHours(),    //hour
        "m+": this.getMinutes(),  //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
        "S": this.getMilliseconds() //millisecond
      }
      if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      }
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
          format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
      }
      return format;
    }
    Date.prototype.DateAdd = function (interval, number) {
      number = parseInt(number);
      var date = new Date(this.getTime());
      //
      switch (interval) {
        case "y": date.setFullYear(this.getFullYear() + number); break;
        case "m": date.setMonth(this.getMonth() + number); break;
        case "d": date.setDate(this.getDate() + number); break;
        case "w": date.setDate(this.getDate() + 7 * number); break;
        case "h": date.setHours(this.getHours() + number); break;
        case "n": date.setMinutes(this.getMinutes() + number); break;
        case "s": date.setSeconds(this.getSeconds() + number); break;
        case "l": date.setMilliseconds(this.getMilliseconds() + number); break;
      }
      return date;
    }
    var dateList = [];
    //7天
    var now = new Date();
    var day = now.getDay();
    //
    for (var i = 0; i < 7; i++) {
      var d = {};
      if (i == 0) { var w = "今天" }
      if (i == 1) { var w = "明天" }
      if (i == 2) { var w = "后天" }
      if (i == 3) {
        if (day == 1) { var w = "周四" }
        if (day == 2) { var w = "周五" }
        if (day == 3) { var w = "周六" }
        if (day == 4) { var w = "周日" }
        if (day == 5) { var w = "周一" }
        if (day == 6) { var w = "周二" }
        if (day == 7) { var w = "周三" }
      }
      if (i == 4) {
        if (day == 1) { var w = "周五" }
        if (day == 2) { var w = "周六" }
        if (day == 3) { var w = "周日" }
        if (day == 4) { var w = "周一" }
        if (day == 5) { var w = "周二" }
        if (day == 6) { var w = "周三" }
        if (day == 7) { var w = "周四" }
      }
      if (i == 5) {
        if (day == 1) { var w = "周六" }
        if (day == 2) { var w = "周日" }
        if (day == 3) { var w = "周一" }
        if (day == 4) { var w = "周二" }
        if (day == 5) { var w = "周三" }
        if (day == 6) { var w = "周四" }
        if (day == 7) { var w = "周五" }
      }
      if (i == 6) {
        if (day == 1) { var w = "周日" }
        if (day == 2) { var w = "周一" }
        if (day == 3) { var w = "周二" }
        if (day == 4) { var w = "周三" }
        if (day == 5) { var w = "周四" }
        if (day == 6) { var w = "周五" }
        if (day == 7) { var w = "周六" }
      }
      d.name = w;
      d.date = new Date().DateAdd('d', i).Format("MM/dd");
      dateList.push(d)
    }
    this.setData({
      timeList: dateList
    });
    // console.log(this.data.timeList)
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
            // console.log(res)
            if (res.data.code == 1) {
              if (res.data.data !== null || res.data.data !== "") {
                var data = res.data.data;
                for (var i = 0; i < res.data.data.length; i++) {
                  var bum = res.data.data[i].distance / 1000;
                  //console.log(bum + "===" + res.data.data[i].distance)
                  res.data.data[i].distance = bum.toFixed(2);
                }
                that.setData({ shopdata: res.data.data[0] })
                that.setData({ shopId: that.data.shopdata.shopid, chooseTime: that.data.timeList[0].date })
                // console.log(that.data.chooseTime)
                wx.request({
                  url: getApp().globalData.url + '/v1/pre/getbtime',
                  data: {
                    token: getApp().globalData.token,
                    shopid: that.data.shopId,
                    date: new Date().getFullYear() + "/" + that.data.chooseTime
                  },
                  success: res => {
                    // console.log(res)
                    if (res.data.data.length == 0) {
                      return false
                    }
                    var hourList1 = res.data.data
                    var hourList = []
                    var n = 10
                    hourList1.forEach(function (val, i) {
                      hourList.push(
                        { hour: val.time, isShow: val.isshow, berthid: val.berthid }
                      )
                    })
                    if (res.data.code == 1) {
                      that.setData({
                        hourList: hourList
                      });
                      var hour = new Date().getHours();
                      // for (var i = 0; i < that.data.hourList.length; i++) {
                        // var list = that.data.hourList;
                        //过时不可选
                        // if (that.data.hourList[i].n <= hour) {
                        //   list[i].isShow = false;
                        //   that.setData({
                        //     hourList: list
                        //   })
                        // }
                      // }
                    }
                  }
                })
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
          content: '检测到你没打开neerG的定位权限,请点击确定重新授权地理位置',
          success: res => {
            if (res.confirm) {
              wx.openSetting({
                success: res => {
                  console.log(res)
                  wx.getLocation({
                    type: "gcj02",
                    success: function(res) {
                      var gps = res.longitude + "," + res.latitude;
                      // console.log(gps)
                      wx.setStorageSync("gps", gps)
                    },
                  })
                }
              })
            }

          }
        })
      }
    })

    
   
    let val = app.searchWord;
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
    if (this.data.shopdata== "" || this.data.shopdata == null, this.data.shopdata==undefined){
      
    }else{
      var that=this;
      wx.getStorage({
        key: 'date',
        success: function (res) {
          // console.log(res + "有缓存")
          that.setData({ shopId: that.data.shopdata.shopid, chooseTime: res.data })
        },
        fail: function () {
          // console.log("没有缓存设置第一天")
          that.setData({ shopId: that.data.shopdata.shopid, chooseTime: that.data.timeList[0].date })
        }
      })
      
      wx.request({
        url: getApp().globalData.url + '/v1/pre/getbtime',
        data: {
          token: getApp().globalData.token,
          shopid: this.data.shopId,
          date: new Date().getFullYear() + "/" + this.data.chooseTime
        },
        success: res => {
          if (res.data.data.length == 0) {
            return false
          }
          console.log(res)
          var hourList1 = res.data.data
          var hourList = []
          var n = 10
          hourList1.forEach(function (val, i) {
            hourList.push(
              { hour: val.time, n: n++, isShow: val.isshow, berthid: val.berthid }
            )
          })
          if (res.data.code == 1) {
            console.log(res)
            this.setData({
              hourList: hourList
            });
            var hour = new Date().getHours();
            // for (var i = 0; i < this.data.hourList.length; i++) {
            //   var list = this.data.hourList;
            //   //过时不可选
            //   if (this.data.hourList[i].n <= hour) {
            //     list[i].isShow = false;
            //     this.setData({
            //       hourList: list
            //     })
            //   }
            // }
          }
        }
      })
    }
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
  //备注
  beizhu:function(e)
  {
    this.setData({ beizhu: e.detail.value})
  },
  //预约
  yuyue:function(e)
  {
    console.log(e.detail.formId)
    var formId = e.detail.formId
    // console.log(this.data.xmdata.dataset)
    var name;
    if(this.data.val==1){
      name = "到店咨询" //产品名
    }else{
      if (this.data.xmdata.dataset==undefined){
        name=""
      }else{
        name = this.data.xmdata.dataset.gname;
      }
      
    }
    var free;
    if(this.data.val==1){
      free = "无"
    }else{
      if (this.data.xmdata.dataset == undefined) {
        free = ""
      } else {
        free = this.data.xmdata.dataset.price;//金额
      }
    }
    var date = this.data.datatime;//时间
    var beizhu = this.data.beizhu;//备注
    var shopid = this.data.shopdata.shopid;//门店ID
    
    var serviceid;
    if(this.data.val==1){
      serviceid=0
    }else{
      if (this.data.xmdata.dataset == undefined) {
        serviceid = ""
      } else {
        serviceid = this.data.xmdata.dataset.id;//项目id
      }
    }
    //console.log("产品名=="+name);
    if (name==""||free=="")
    {
      wx.showToast({
        title: '请选择项目！', 
        mask: true,
        icon: 'loading'
      })
      return false;

    }
    if(date=="请选择预约时间")
    {
      wx.showToast({
        title: '请选择时间！',
        mask: true,
        icon: 'loading'
      })
      return false;
    }
    var that=this;
    //获取用户信息
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        //获取档案信息
        wx.request({
          url: getApp().globalData.url + '/v1/pre/append',
          data: { 
            memberid: res.data.memberid,
            token: getApp().globalData.token,
            shopid:shopid,
            serviceid: serviceid,
            time:date,
            msg:beizhu, 
            formid: formId,
            berthid: that.data.berthid
          },
          success: function (res) {
            if(res.data.code==1)
            {
              wx.showToast({
                title: '预约成功',
                mask:true,
                success:function()
                {
                  setTimeout(function () {
                    wx.navigateTo({
                      url: '/myAppointment/myAppointment',
                      success:res=>
                      {
                        that.setData({
                          xmdata: {},
                          datatime: "请选择预约时间",
                          period: "",
                          beizhu: ""
                        });
                      }
                    })
                  }, 1000)
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
})