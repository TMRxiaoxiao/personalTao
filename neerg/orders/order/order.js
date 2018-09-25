Page({
	data: {
		selected: true,
		selected1: false,
		selected2: false,
		selected3: false,
		selected4: false,
		//全部
		orderList: [
		],
        orderList1:[],//待成团
        orderList2:[],//待使用
        orderList3:[],//待评价
        orderList4:[],//退款/售后
        searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
        searchLoadingComplete: false,  //“没有数据”的变量，默认false，隐藏
        pageindex:1,
        quanbu:[],//全部
        del:""
	},
  //全部
	selected: function (e) {
    var that=this;
    //获取所有订单
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        wx.request({
          url: getApp().globalData.url + '/v1/order/items',
          data: { 
            pageindex: 1,
            memberid: res.data.memberid,
            token: getApp().globalData.token },
          success: res => {
            console.log(res);
            if (res.data.code == 1) {
              that.setData({
                selected: true,
                selected1: false,
                selected2: false,
                selected3: false,
                selected4: false,
                orderList: res.data.data.data
              })

            } else {
              wx.showToast({
                title: res.data.msg,
                mask: true
              })
            }
          }
        })
      },
    })
	},
  //待成团
	selected1: function (e) {
    var that=this;
    //获取已支付待使用订单
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        wx.request({
          url: getApp().globalData.url + '/v1/order/unteam',
          data: { pageindex: 1, memberid: res.data.memberid, used: 0, token: getApp().globalData.token },
          success: res => {
            console.log(res);
            if (res.data.code == 1) {
              that.setData({
                selected: false,
                selected1: true,
                selected2: false,
                selected3: false,
                selected4: false,
                orderList1: res.data.data
              })

            } else {
              wx.showToast({
                title: res.data.msg,
                mask: true
              })
            }
          }
        })
      },
    })
	},
  //待使用
	selected2: function (e) {
    var that=this;
    //获取已支付待使用订单
    wx.getStorage({
      key: 'userinfo',
      success: function(res) {
        wx.request({
          url: getApp().globalData.url + '/v1/order/unuse',
          data: {pageindex:1,memberid: res.data.memberid,used: 0, token: getApp().globalData.token },
          success: res => {
            //console.log(res);
            if(res.data.code==1)
            {
              that.setData({
                selected: false,
                selected1: false,
                selected2: true,
                selected3: false,
                selected4: false,
                orderList2:res.data.data
              })

            }else
            {
              wx.showToast({
                title: res.data.msg,
                mask:true
              })
            }
          }
        })
      },
    })
    
		
	},
  //待评价
	selected3: function (e) {
    var that = this;
    //获取已支付待使用订单
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        wx.request({
          url: getApp().globalData.url + '/v1/order/uncomment',
          data: {memberid: res.data.memberid, token: getApp().globalData.token },
          success: res => {
            console.log(res);
            if (res.data.code == 1) {
              that.setData({
                selected: false,
                selected1: false,
                selected2: false,
                selected3: true,
                selected4: false,
                orderList3: res.data.data.data
              })
            } else {
              wx.showToast({
                title: res.data.msg,
                mask: true
              })
            }
          }
        })
      },
    })
	},
  //退款/售后
	selected4: function (e) {
		this.setData({
			selected: false,
			selected1: false,
			selected2: false,
			selected3: false,
			selected4: true
		})
	},
  /*
  检测上拉到底部事件
  */
  onReachBottom:function(e)
  {
    var that=this;
    this.setData({
      searchLoading:true
    })
    var orderList = that.data.orderList;
    var pageindex = that.data.pageindex+1;
    //a.concat(a);
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        wx.request({
          url: getApp().globalData.url + '/v1/order/items',
          data: { pageindex: pageindex, memberid: res.data.memberid, used: 0, token: getApp().globalData.token },
          success: res => {
            //console.log(pageindex);
            //判断是否返回成功
            if (res.data.code == 1) {
              //判断返回是否有数据
              if (res.data.data.data.lenth > 0) {
                orderList = orderList.concat(res.data.data.data);
                that.setData({
                  orderList: orderList,
                  pageindex: pageindex,
                  searchLoading:false
                })
              }else
              {
                that.setData({
                  searchLoadingComplete:true
                })
              }
            } else {
              wx.showToast({
                title: res.data.msg,
                mask: true
              })
            }
          }
        })
      },
    })
    //this.setData({ orderList:a,searchLoading:true});
    //console.log(a);
  },
  onLoad: function (options)
  {
    var that=this;
    if (JSON.stringify(options) !== "{}"){
     if(options.sel==1){
       that.setData({
         selected: false,
         selected1: false,
         selected2: false,
         selected3: true,
         selected4: false,
       })
       //获取已支付待使用订单
       wx.getStorage({
         key: 'userinfo',
         success: function (res) {
           wx.request({
             url: getApp().globalData.url + '/v1/order/uncomment',
             data: { memberid: res.data.memberid, token: getApp().globalData.token },
             success: res => {
               console.log(res);
               if (res.data.code == 1) {
                 that.setData({
                   selected: false,
                   selected1: false,
                   selected2: false,
                   selected3: true,
                   selected4: false,
                   orderList3: res.data.data.data
                 })
               } else {
                 wx.showToast({
                   title: res.data.msg,
                   mask: true
                 })
               }
             }
           })
         },
       })
     }else{
       that.setData({
         selected: true,
         selected1: false,
         selected2: false,
         selected3: false,
         selected4: false,
       })
     }
    }else{
      console.log(1)
      //获取所有订单
      wx.getStorage({
        key: 'userinfo',
        success: function (res) {
          wx.request({
            url: getApp().globalData.url + '/v1/order/items',
            data: {
              pageindex: 1,
              memberid: res.data.memberid,
              token: getApp().globalData.token
            },
            success: res => {
              console.log(res);
              if (res.data.code == 1) {
                that.setData({
                  selected: true,
                  selected1: false,
                  selected2: false,
                  selected3: false,
                  selected4: false,
                  quanbu: res.data.data.data
                })

              } else {
                wx.showToast({
                  title: res.data.msg,
                  mask: true
                })
              }
            }
          })
        },
      })
    }
  },
  onShow:function(){
    if(this.data.del==1){
      var that = this;
      //获取已支付待使用订单
      wx.getStorage({
        key: 'userinfo',
        success: function (res) {
          wx.request({
            url: getApp().globalData.url + '/v1/order/uncomment',
            data: { memberid: res.data.memberid, token: getApp().globalData.token },
            success: res => {
              console.log(res);
              if (res.data.code == 1) {
                that.setData({
                  selected: false,
                  selected1: false,
                  selected2: false,
                  selected3: true,
                  selected4: false,
                  orderList3: res.data.data.data
                })
              } else {
                wx.showToast({
                  title: res.data.msg,
                  mask: true
                })
              }
            }
          })
        },
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})