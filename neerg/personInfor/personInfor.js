// personInfor/personInfor.js
var utl=require("../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:["男","女"],
    index:0,
    date: '2018-06-20',
    userinfo:{},//当前用户信息
    user:{},
    name:"未知"
  },
  bindPickerChange: function (e) {

    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    //获取用户信息
    wx.getStorage({
      key: 'userinfo',
      success: function(res) {
        //console.log(res);
        that.setData({
            userinfo:res.data
        });
        wx.request({
          url: getApp().globalData.url + '/v1/user/getinfo',
          data: { token: getApp().globalData.token, memberid: res.data.memberid},
          success:res=>
          {
            //console.log(res);
            if(res.data.code==1)
            {
              if (res.data.data.gender=="男"){

                that.setData({
                  user: res.data.data,
                  index:0,
                  name: res.data.data.name,
                  date: res.data.data.birthday
                });
              }else
              {
                that.setData({
                  user: res.data.data,
                  index:1,
                  name: res.data.data.name,
                  date: res.data.data.birthday
                });
              }
            }
            
          }
        })
        //
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
    wx.getStorage({
      key: 'userinfo',
      success: res=> {
        this.setData({ userinfo:res.data})
      },
    })
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
  //保存
  baochun:function()
  {
    var that=this;
    var gender="";
    if(that.data.index==0)
    {
      gender="男";
    }else
    {
      gender="女";
    }
    wx.request({
      url: getApp().globalData.url + '/v1/user/saveinfo',
      data: { token: getApp().globalData.token, birthday: that.data.date, memberid: that.data.user.memberid, gender: gender, name: that.data.name},
      success:res=>{
        if (res.statusCode==200)
        {
          wx.showToast({
            title: '修改成功！',
            mask:true
          })
        }
      }
    })
  },
  //姓名修改
  username:function(e)
  {
      console.log(e);
      this.setData({ name: e.detail.value})
  }
})