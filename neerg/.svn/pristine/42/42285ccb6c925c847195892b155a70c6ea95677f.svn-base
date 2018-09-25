Page({
  data: {
    items: [],
    series:[],
    catid:"",//系列id
    shopid:"",//门店id
    val:"1",
    flag:false,
    navindex:"-1"
  },
  radioChange: function (e) {
    if (e.detail.value==0){ 
      console.log(1)
      var page = getCurrentPages();
      console.log(page)
      var pages = page[page.length - 2];
      pages.setData({ val: 1});
      wx.navigateBack({
        delta: 1
      })
    }
  },
  selectG:function(e){
    // console.log(e)
    var page = getCurrentPages();
    // console.log(page)
    var pages = page[page.length - 2];
    pages.setData({ xmdata: e.target,val:0});
    wx.navigateBack({
      delta: 1
    })
  },
  onLoad: function (options)
  {
    // 系列项目
    wx.request({
      url: getApp().globalData.url + '/v1/service/alllist',
      data: { token: getApp().globalData.token ,shopid:options.shopid },
      success: res => {
        console.log(res)
        if(res.data.code==1)
        {
          this.setData({
            series: res.data.data,
            shopid:options.shopid
          })
        }
        
      }
    })
  },
  xiala:function(e){
    // console.log(e.currentTarget.dataset.num)

    this.setData({ flag: !this.data.flag, navindex: e.currentTarget.dataset.num})
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})