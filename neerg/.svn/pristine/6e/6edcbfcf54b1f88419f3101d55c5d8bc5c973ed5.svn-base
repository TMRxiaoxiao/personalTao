// orders/integral/integral.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      datalist:[],
      nums:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    //获取
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        //console.log(res.data);
        //查询积分
        wx.request({
          url: getApp().globalData.url + '/v1/user/scorelog',
          data: { memberid: res.data.memberid, token: getApp().globalData.token },
          success:res=>
          {
            var data=[];
            console.log(res);
              if(res.data.code==1)
              {
                var nums=0;
                var jifen=0;
                  for(var i=0;i<res.data.data.data.length;i++)
                  {
                      nums+=parseInt(res.data.data.data[i].num);
                      jifen=nums;
                  }
                  for (var j = 0; j < res.data.data.data.length; j++) {
                    if(j==0)
                    {
                      var list = {
                        num: res.data.data.data[j].num,
                        memo: res.data.data.data[j].memo,
                        time: res.data.data.data[j].time,
                        jifen: jifen
                      };
                      data.push(list);
                    }else
                    {
                      var list = {
                        num: res.data.data.data[j].num,
                        memo: res.data.data.data[j].memo,
                        time: res.data.data.data[j].time,
                        jifen: jifen - parseInt(res.data.data.data[j].num)
                      };
                      data.push(list);
                    }
                  }
                that.setData({ datalist: data,nums:nums});
              }
          }
        })
      },
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
  
  }
})