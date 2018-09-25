var app = getApp();
Page({
  data: { 
    cur:1,
    scrollHeight: "",
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    imgs: [],
    imgUrls:[
    ],
    currentSwiper:0,
    // 导航
    nav:[],
    flag:true,
    flag1:true,
    clean_list:[], 
    gketang:{},//G课堂
    gjulebu:[],//G小姐俱乐部
    zhengdangji:[],//正当季 
    mbmjdata:[],//美白美肌
    yhptlist:[],//优惠拼团
    name:"",
    city:"" ,
    titles:""
  },
  xioashi:function(e){
    // console.log(e)
    this.setData({
      flag:false,
      order: e.currentTarget.dataset.order,
      name: e.currentTarget.dataset.name,
      flag1:false
    })
    // 获取清洁系列
    //console.log(this.data.order)
    wx.request({
      url: getApp().globalData.url + '/v1/service/getlist',
      data: {
        token: getApp().globalData.token,
        catid: this.data.order
      },
      success:res=> {
        this.setData({
          clean_list:res.data.data
        })
        console.log(this.data.clean_list)
      }
    })
  },
  back_Index:function(e){
    this.setData({
      flag1:true,
      order:"",
      flag:true
    })
  },
  curr:function(e){
    this.setData({
      cur:e.detail.current
    })
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  onLoad: function () {
    var that=this;
    // 发送gps获取位置
    wx.getStorage({
      key: 'userinfo',
      success: function(res) {
        var memberid = res.data.memberid
        wx.getLocation({
          type: "gcj02",
          success: function (res) {
            // console.log(res)
            // console.log(memberid)
            var gps = res.longitude + "," + res.latitude;
            wx.setStorageSync("gps", gps)
            wx.request({
              url: getApp().globalData.url + '/v1/index/index',
              data: {
                token: getApp().globalData.token,
                gps: gps,
                memberid: memberid
              },
              success: function (res) {
                // console.log(res)
                that.setData({ city: res.data.data.cityname })
                wx.setStorageSync("acode", res.data.data.code)
              }
            })
          },
          fail: function (res) {
            wx.setStorageSync("acode", "330100")
            that.setData({ city: "杭州市" })
          }
        })
      }
    })
    that.setData({
      flag:true
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        })
      }
    });
    // console.log(this.data.city)
    // 高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        that.setData({
          winHeight: calc
        });
      }
    });
    // 获取首页数据轮播图
    wx.request({
      url: getApp().globalData.url + '/v1/banner/miniapp',
      data: {token: getApp().globalData.token},
      success: res => {
        this.setData({
          imgs:res.data.data
        })
      }
    })
    // 首页顶部导航
    wx.request({
      url: getApp().globalData.url + '/v1/service/category',
      data: { token: getApp().globalData.token },
      success:res=>{
        // console.log(res);
        this.setData({
          nav:res.data.data
        })
      }
    })
    //G课堂
    wx.request({
      url: getApp().globalData.url + '/v1/info/gclass',
      data: { token: getApp().globalData.token },
      success: res => {
        //console.log(res);
        if (res.data.code == 1)
        {
          this.setData({
            gketang: res.data.data.data[0]
          })
        }
        
      }
    })
    //G小姐俱乐部
    wx.request({
      url: getApp().globalData.url + '/v1/info/gclubs',
      data: { token: getApp().globalData.token },
      success: res => {
        //console.log(res);
        if (res.data.code == 1) {
          this.setData({
            gjulebu:res.data.data.data
          })
        }

      }
    })
    // 正当季美白美团优惠拼团
    wx.request({
      url: "https://capi.ineerg.com/v1/info/block?token=ly3qeUcQ3aVs6hTvKnoMNGA=",
      data: {
        token: getApp().globalData.token,
        env:"dev"//开发环境
      },
      success:res=>{
        // console.log(res)
        this.setData({
          zhengdangji: res.data.data.first,
          mbmjdata: res.data.data.third,
          yhptlist: res.data.data.seconds
        })
      }
    })
  // 福利专区描述
    wx.request({
      url: "https://capi.ineerg.com/v1/info/titles?token=ly3qeUcQ3aVs6hTvKnoMNGA=",
      data: {
        token: getApp().globalData.token
      },
      success: res => {
        // console.log(res)
        this.setData({
          titles:res.data.data
        })
      }
    })
    // 获取用户基本信息
    wx.getStorage({
      key: 'userinfo',
      success: function(res) {
        // console.log(res)
        var memberid = res.data.memberid;
        wx.getUserInfo({
          success: res => {
            res.userInfo.token = getApp().globalData.token
            res.userInfo.memberid = memberid
            // console.log(res);
            wx.request({
              url: getApp().globalData.url + '/v1/user/fixarea',
              data: res.userInfo,
              success: v => {
                // console.log(v) 
              }
            })
          }
        })
      },
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  clickShibie:function(){
    wx.previewImage({
      current: ["https://store.ineerg.com/static/mini/images/wem.png"],
      urls: ["https://store.ineerg.com/static/mini/images/wem.png"],
      success:res=>{
        console.log()
      }
    })
  },
  footerTap: app.footerTap
})
