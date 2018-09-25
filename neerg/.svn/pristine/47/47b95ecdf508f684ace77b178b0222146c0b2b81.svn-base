// pages/archives_detail/archives_detail.js
var wxCharts = require('../../utils/wxcharts.js');
var radarChart = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    skin_list: [1,1,1,1],
    datalist:{},
    dataf:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var windowWidth = 420;
    if(options.id!="")
    {
      wx.request({
        url: getApp().globalData.url +'/v1/skins/detail',
        data:{
          token: getApp().globalData.token,
          id:options.id,
          new: 1
        },
        success:res=>{
          console.log(res)
          if(res.data.code==1)
          {
            //组装雷达图数组
            var a = [res.data.data.shuifenvalue,
              res.data.data.youzhivalue,
              res.data.data.zhouwenvalue,
              res.data.data.sesuvalue,
              res.data.data.jiaozhivalue,
              res.data.data.maokongvalue]

            //雷达图画开始
            radarChart = new wxCharts({
              width: 350,
              height: 350,
              color: '#FD99AF',
              canvasId: 'radarCanvas',
              legend: false,
              type: 'radar',
              categories: ['水分', '皮脂', '皱纹', '色素/色斑', '角质', '毛孔'],
              series: [{
                name: '皮肤指标',
                data: a
              }]
              ,
              extra: {
                radar: {
                  max: 100,
                  labelColor: '#000000'
                  // gridColor: '#7cb5ec'
                }
              },

            });
            for(var i=0;i<res.data.data.photoss.length;i++)
            {
              res.data.data.photoss[i] = getavatar(res.data.data.photoss[i]);
            }
            //赋值给前台
            that.setData({ datalist: res.data.data});
          }else
          {
            wx.showModal({
              title: '提示',
              content: '请求参数错误！',
              showCancel: false,
              success: function () {

              }
            })
          }
        }
      })

    }else
    {
      wx.showModal({
        title: '提示',
        content: '无效检测！',
        showCancel: false,
        success: function () {

        }
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
  onShareAppMessage: function () {
  
  },
  // 点击预览图片
  yl:function(e)
  {
    var that=this;
    var id = [e.currentTarget.dataset.id]
    wx.previewImage({
      current: that.data.datalist.photoss[id],
      urls: that.data.datalist.photoss,
      success:function(){
      }
    })
  }
})
// 图片路径处理路由
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