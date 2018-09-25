var app = getApp()
Page({
  data: {
    note: [
      
    ],
    back: true,
    Column: [],//栏目
    datalist:[],//所有商品
    xilieList:[],
    flag:false,
    e:"",
    ee:0,
    floorstatus:false
  },
  //页面滚动触发事件的处理函数
  onPageScroll: function (e) { // 获取滚动条当前位置
    if (e.scrollTop > 1000) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },
  goTop: function (e) {  // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  back:function(){
    this.setData({
      back:!this.data.back
    })
  },
  xzType:function(e){

    var arr=[]
    var arr = this.data.note.filter(function(val,index){
      return val.catid == e.target.dataset.i
    })
    this.setData({
      flag:true,
      xilieList:arr,
      e: e.target.dataset.i,
      ee:1
    })
  },
  allSelect:function(){
    var arr = this.data.note
    this.setData({
      flag: false,
      xilieList: arr,
      ee:0,
      e:""
    })
  },
  onLoad: function () { 
    //全部商品
    wx.request({
      url: getApp().globalData.url+'/v1/service/getlist',
      data: {token: getApp().globalData.token},
      success:res=>{
        // console.log(res)
        this.setData({
          note:res.data.data
        });
      }

    })
    // 首页顶部导航
    wx.request({
      url: getApp().globalData.url + '/v1/service/category',
      data: { token: getApp().globalData.token },
      success: res => {
        this.setData({
          Column: res.data.data
        })
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})