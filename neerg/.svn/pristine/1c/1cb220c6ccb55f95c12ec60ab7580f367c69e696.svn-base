// gcourse/couse_content/couse_content.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    datacontent:{},
    gcomment:[],
    currentId:"",
    Aid:"",
    zan:"",
    collection:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //console.log(options);
      var that = this;
      //获取用户信息
      wx.getStorage({
        key: 'userinfo',
        success: function (res) {
          // console.log(res);
          //获取G小姐课堂列表
          wx.request({
            url: getApp().globalData.url + '/v1/info/ginfo',
            data: { uuid: res.data.uuid,id:options.id,token: getApp().globalData.token, page: 1 },
            success: function (res) {
              console.log(res);
              if (res.data.code == 1) {
                wx.setNavigationBarTitle({
                  title: res.data.data.data.Title,
                })
                that.setData({ 
                  Aid:res.data.data.data.Id,
                  datacontent: res.data.data.data,
                  isZan:res.data.data.zan,
                  zan: res.data.data.data.UpCount,
                  xml: res.data.data.data.RoomContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
                });
                // 点赞
                if(that.data.isZan==1){
                  that.setData({ collection:true})
                }else{
                  that.setData({ collection: false })
                }
              }
              //return res;
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
      //评论
      // wx.request({
      //   url: getApp().globalData.url + '/v1/info/gcomment',
      //   data: { id:options.id,pagesize:3,page:1, token: getApp().globalData.token },
      //   success: function (res) {
      //     if(res.data.code==1)
      //     {
      //       that.setData({
      //         gcomment:res.data.data.data
      //       })
      //     }
      //   }
      // })
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
  // 点击图片的点赞事件 这里使用的是同步的方式
  toCollect: function (event) {
    var that=this
    that.setData({ collection: !that.data.collection})
    if (this.data.collection==false){
      this.setData({ zan: parseInt(that.data.zan) - 1})
      wx.getStorage({
        key: 'userinfo',
        success: function (res) {
          wx.request({
            url: getApp().globalData.url + '/v1/info/zan',
            data: {
              token: getApp().globalData.token,
              type: "classroom",
              id: that.data.Aid,
              uuid: res.data.uuid
            },
            success: res1 => {
              console.log(res1)
            }
          })
        },
        fail: function () {
          wx.showModal({
            title: '提示',
            content: '请先登录',
            success: res => {
              if (res.confirm) {
                wx.switchTab({
                  url: '/pages/my/my',
                })
              } else {
                console.log("用户未登录")
              }
            }
          })
        }
      })
    }else{
      // 取消点赞
      this.setData({ zan: parseInt(that.data.zan) + 1 })
      wx.getStorage({
        key: 'userinfo',
        success: function (res) {
          wx.request({
            url: getApp().globalData.url + '/v1/info/zan',
            data: {
              token: getApp().globalData.token,
              type: "classroom",
              id: that.data.Aid,
              uuid: res.data.uuid
            },
            success: res1 => {
              console.log(res1)
            }
          })
        },
        fail: function () {
          wx.showModal({
            title: '提示',
            content: '请先登录',
            success: res => {
              if (res.confirm) {
                wx.switchTab({
                  url: '/pages/my/my',
                })
              } else {
                console.log("用户未登录")
              }
            }
          })
        }
      })
    }
  },
})