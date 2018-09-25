var app = getApp();
Page({
  data: {
    items: [],
    datalist:[
    ],
    id:""
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({id:e.detail.value});
  },
  tiao:function(e){
    //获取数据，添加到全局
    // 单选框有个change事件,携带值存入全局变量中，发送
    var page = getCurrentPages();
    // console.log(page)
    var pages = page[page.length - 3];
    pages.setData({ xmdata: this.data.datalist[this.data.id]});
    wx.navigateBack({
      delta:2
    })
  },
  /*初始加载函数*/
  onLoad: function (options)
  {
    //优惠券列表
    wx.request({
      url: getApp().globalData.url + '/v1/service/getlist',
      data: {
        token: getApp().globalData.token,
        shopid: options.shopid,
        catid:options.catid
      },
      success: res => {
        console.log(res);
        if(res.data.code==1)
        {
          
          this.setData({datalist:res.data.data})
        }

      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})