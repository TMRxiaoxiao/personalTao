App({
  onLaunch: function () {
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        // console.log(res)
        wx.request({
          url: 'https://capi.ineerg.com/v1/index/notice',
          data:{
            memberid: res.data.memberid,
            token: "ly3qeUcQ3aVs6hTvKnoMNGA="
          },
          success:res=>{
            // console.log(res)
            if (parseInt(res.data.data.count)>0){
              wx.showModal({
                title: '提示',
                content: res.data.data.info,
                success:function(res){
                  if (res.confirm) {
                    wx.navigateTo({
                      url: '/orders/order/order?sel=1',
                    })
                  } else if (res.cancel) {
                    // console.log("用户取消")
                  }
                }
              })
            }else{
              // console.log("订单暂无代评价")
            }
          }
        })
      },
      fail:function(){
        wx.showModal({
          title: '提示',
          content: '您还未登录，为了获得更好的服务，请先登录',
          success:function(res){
            if (res.confirm){
              wx.switchTab({
                url: '/pages/my/my',
              })
            }else if(res.cancel){
              console.log("用户取消")
            }
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    url: 'https://capi.ineerg.com',
    token:"ly3qeUcQ3aVs6hTvKnoMNGA=",
    imgurl:"'https://store.ineerg.com"
  }
})
