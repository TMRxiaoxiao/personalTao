var total_micro_second = 0;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cantuan:{},
    pintuan:[],
    id:"",
    tid:"",
    sid:"",
    clock: "" ,
    yxsjlsit:"",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    var tid=options.tid;
    var id=options.id;
    this.setData({
      id:id,
      tid: options.tid 
    })
    // 当前拼团的信息
    wx.request({
      url: getApp().globalData.url + '/v1/service/info',
      data: { token: getApp().globalData.token, id: options.id },
      success:res=>{
        // console.log(res)
        var data=res.data.data
        this.setData({
          cantuan:data,
        })
      }
    })
    // 参团的列表
    // wx.request({
    //   url: getApp().globalData.url + '/v1/promo/tuans',
    //   data: {
    //     token: getApp().globalData.token,
    //     id: options.id
    //   },
    //   success:res=>{
    //     if (res.data.code == 1){
    //       var arry = [];
    //       for (var i = 0; i < res.data.data.length; i++) {
    //         res.data.data[i].member.avatar = getavatar(res.data.data[i].member.avatar)
    //         arry.push(res.data.data[i].endtime);
    //       }
    //       var data = res.data.data
    //       this.setData({
    //         pintuan: data,
    //         sjlsit: arry
    //       })
    //       this.countDown();
    //     }
    //   }
    // })
    // 当前团品的信息
    wx.request({
      url: getApp().globalData.url + '/v1/promo/tinfo',
      data: {
        token: getApp().globalData.token,
        id: tid
      },
      success:res=>{
        // console.log(res)
        for (var i = 0; i < res.data.data.tuaners.length;i++)
        {
          res.data.data.tuaners[i].avatar = getavatar(res.data.data.tuaners[i].avatar)
        }
        this.setData({
          ptMess: res.data.data
        })
        var data = res.data.data;
        total_micro_second = res.data.data.tendtime;
        count_down(this);
      }
    })
  },
  // 参团页面点击别的团品参团更新数据
  // updateTuan:function(e){
  //   wx.request({
  //     url: getApp().globalData.url + '/v1/promo/tinfo',
  //     data: {
  //       token: getApp().globalData.token,
  //       id: e.currentTarget.dataset.aid
  //     },
  //     success: res => {
  //       // console.log(res)
  //       for (var i = 0; i < res.data.data.tuaners.length; i++) {
  //         res.data.data.tuaners[i].avatar = getavatar(res.data.data.tuaners[i].avatar)
  //       }
  //       this.setData({
  //         ptMess: res.data.data
  //       })
  //     }
  //   })
  //   this.setData({
  //     pintuan: this.data.pintuan
  //   })
  // },
  // timeFormat(param) {//小于10的格式化函数
  //   return param < 10 ? '0' + param : param;
  // },
 
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
function getavatar(str) {
  if ((new RegExp('^http', 'i')).test(str)) {
    return str;
  } else if ((new RegExp('^/style', 'i')).test(str)) {
    return 'https://ww.ineerg.com' + str;
  } else if ((new RegExp('^/Resource', 'i')).test(str)) {
    return 'https://ww.ineerg.com' + str;
  } else if ((new RegExp('^/uploads', 'i')).test(str)) {
    return 'https://store.ineerg.com' + str;
  } else {
    return 'https://ww.ineerg.com/style/images/pic_92.png';
  }
}



function count_down(that) {
  // 渲染倒计时时钟
  that.setData({
    clock: date_format(total_micro_second),
  });

  if (total_micro_second <= 0) {
    that.setData({
      clock: "已经截止"
    });
    // timeout则跳出递归
    return;
  }
  setTimeout(function () {
    // 放在最后--
    total_micro_second -= 10;
    count_down(that);
  }
    , 10)
}
// 时间格式化输出，如03:25:19 86。每10ms都会调用一次
function date_format(micro_second) {
  // 秒数
  var second = Math.floor(micro_second / 1000);
  // 小时位
  var hr = Math.floor(second / 3600);
  // 分钟位
  var min = Math.floor((second - hr * 3600) / 60);
  // 秒位
  var sec = (second - hr * 3600 - min * 60);// equal to => var sec = second % 60;
  // 毫秒位，保留2位
  var micro_sec = Math.floor((micro_second % 1000) / 100);
  if (hr >= 24) {
    var day = parseInt(hr / 24)
    var hr1 = hr % 24
    return day + "天" + hr1 + "小时" + min + "分" + sec + "." + micro_sec + "秒";
  } else {
    day = 0
    return day + "天" + hr + "小时" + min + "分" + sec + "." + micro_sec + "秒";
  }

}
