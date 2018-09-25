Page({
	data: {
		// 俱乐部活动实例
		clubActivitiesList: [
			{ title: "水维氧H2O水分管理", image: "https://store.ineerg.com/static/mini/images/order/pic_3.jpg" },
      { title: "水维氧H2O水分管理", image: "https://store.ineerg.com/static/mini/images/order/pic_2.jpg" },
      { title: "水维氧H2O水分管理", image: "https://store.ineerg.com/static/mini/images/order/pic_1.jpg" },
      { title: "水维氧H2O水分管理", image: "https://store.ineerg.com/static/mini/images/order/pic_3.jpg" },
      { title: "水维氧H2O水分管理", image: "https://store.ineerg.com/static/mini/images/order/pic_2.jpg" }
		],
    datalist:[]
  }, onLoad: function (options)
  {
    var that=this;
    wx.request({
      url: getApp().globalData.url + '/v1/info/gclubs',
      data: {token: getApp().globalData.token },
      success: function (res) {
        console.log(res);
        if(res.data.code==1)
        {
          that.setData({
            datalist:res.data.data.data
          });
        }
        //if()
        //return res;
      }
    })

    
    
  }
})