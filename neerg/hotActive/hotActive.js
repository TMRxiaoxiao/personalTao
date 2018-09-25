// hotActive/hotActive.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentTab: 0,
        currentTB:0,
        group:[],
        kills:[],
      bargains:[]
    },
    click: function (e) {
        var that = this;
        var id = e.target.dataset.current;
        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        } else {
            that.setData({
                currentTab: e.target.dataset.current
            })
        }
    },
    click1: function (e) {
        var that = this;
        var id = e.target.dataset.current;
        if (this.data.currentTB === e.target.dataset.current) {
            return false;
        } else {
            that.setData({
                currentTB: e.target.dataset.current
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      wx.showLoading()
      wx.request({
        url: getApp().globalData.url + '/v1/promotion/index',
        data: {
          token: getApp().globalData.token
        },
        success: res => {
            if(res.data.code==0){
                wx.hideLoading();
                wx.showModal({
                    title: '提示',
                    content: '暂无活动，敬请期待！',
                    success:res=>{
                        if(res.confirm){
                            wx.switchTab({
                                url: '/pages/index/index',
                            })
                        }else{
                            wx.switchTab({
                                url: '/pages/index/index',
                            })
                        }
                    }
                })
            }else{
                res.data.data.kills.forEach((v, i) => {
                    var m = v.endtime.split(" ")[0].split("-")[1]
                    var d = v.endtime.split(" ")[0].split("-")[2]
                    var h = v.endtime.split(" ")[1].split(":")[0]
                    var f = v.endtime.split(" ")[1].split(":")[1]
                    v.endtime = m + "月" + d + "日" + h + ":" + f
                })
                this.setData({
                    group: res.data.data.groups,
                    kills: res.data.data.kills,
                    bargains: res.data.data.bargains
                })
                console.log(res)
            }
        }
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