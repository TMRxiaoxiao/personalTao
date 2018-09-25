// storeReview/storeReview.js
var count = 0;
var count1=0;
var count2 = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    evaluate_contant: ['体验效果', '店面环境', '服务态度',],
    stars: [0, 1, 2, 3, 4],
    normalSrc: '/images/no-star.png',
    selectedSrc: '/images/full-star.png',
    halfSrc: '/images/half-star.png',
    score: 0,
    scores: [0, 0, 0],
    msg:"",//内容
    imglist:[],
    hdimglist:[],
    orderid:"",//订单id
    xmName: "",//项目名称
    shopName:""//店名 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var orderid=options.orderid;
    this.setData({orderid:orderid})
    this.setData({ xmName: options.name, shopName: options.shopName})
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
  // 提交事件
  submit_evaluate: function () {
    console.log('评价得分' + this.data.scores);
    var that=this;//定义指向
    //获取用户信息
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        var effscore = that.data.scores[0];//服务体验
        var envscore = that.data.scores[1];//店面环境
        var svsscore = that.data.scores[2];//服务态度
        var imgurl = that.data.hdimglist;//图片地址
        if (that.data.msg == "" || that.data.msg == null || that.data.msg==undefined){
          var msg="用户未写评价"
        }else{
          var msg = that.data.msg;//评价内容
        }
        var orderid = that.data.orderid;//订单id
        console.log(imgurl);
        // if(msg==null||msg=="")
        // {
        //     wx.showToast({
        //       title: '内容不能为空',
        //       mask:true,
        //       icon:'loading'
        //     })
        //     return false;
        // }
        if (effscore<=0) {
          wx.showToast({
            title: '体验效果请打分',
            mask: true,
            icon: 'loading'
          })
          return false;
        }
        if (envscore<=0) {
          wx.showToast({
            title: '店面环境请打分',
            mask: true,
            icon: 'loading'
          })
          return false;
        }
        if (svsscore<=0) {
          wx.showToast({
            title: '服务态度请打分',
            mask: true,
            icon: 'loading'
          })
          return false;
        }
        //发布评论信息
        wx.request({
          url: getApp().globalData.url + '/v1/service/addcomment',
          data: { 
            memberid: res.data.memberid,
            orderid: that.data.orderid, 
            effscore: effscore,
            envscore: envscore,
            svsscore: svsscore,
            urls: imgurl.join(','),
            msg:msg,
            token: getApp().globalData.token },
          success: function (res) {
            console.log(res);
            if(res.data.code==1)
            {
              wx.showToast({
                title: res.data.msg,
                mask:true,
                success: res=>{
                  var page = getCurrentPages();
                  console.log(page)
                  var pages = page[page.length - 2];
                  pages.setData({ del: 1 });
                  setTimeout(function(){
                    wx.navigateBack({
                      delta: 1
                    })
                  },1000)
                }
              })
            }else
            {
              wx.showToast({
                title: '评价失败！',
                mask: true,
                icon: 'loading'
              })
            }
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
    
  },

  //点击左边,半颗星
  selectLeft: function (e) {
    
    var score = e.currentTarget.dataset.score
    console.log(score)
    if (this.data.score == 0.5 && e.currentTarget.dataset.score == 0.5) {
      score = 0;
    }

    this.data.scores[e.currentTarget.dataset.idx] = score,
      this.setData({
        scores: this.data.scores,
        score: score
      })

  },
  //点击右边,整颗星
  selectRight: function (e) {
    console.log("right")
    console.log(e)
    var score = e.currentTarget.dataset.score
    this.data.scores[e.currentTarget.dataset.idx] = score,
      this.setData({
        scores: this.data.scores,
        score: score
      })
  },

  //内容
  msg:function(e)
  {
    this.setData({
      msg: e.detail.value
    });
  },
  // 点击删除图片
  delImg:function(e){
    var newlist=this.data.hdimglist.splice(e.target.dataset.i,1)
    this.setData({ hdimglist: this.data.hdimglist})
  },
  //图片上传
  Uploadimg:function(e)
  {
    var that=this;
    wx.chooseImage({
      count:9,
      success: function(res) {
        console.log(res)
        that.setData({imglist:res.tempFilePaths})
        console.log(that.data.imglist)
        var tempFilePaths = res.tempFilePaths;
        for (var i = 0; i < tempFilePaths.length;i++)
        {
          wx.uploadFile({
            url: getApp().globalData.url + '/v1/tool/uploadimg',
            filePath: tempFilePaths[i],
            name: 'file',
            formData:{
              token: getApp().globalData.token
            },
            success:res=>
            {
              console.log(res)
              var data = JSON.parse(res.data);
              if(data.code==1)
              {
                var list = that.data.hdimglist;
                list.push(data.data);
                that.setData({
                    hdimglist:list
                });
              }
              console.log(that.data.hdimglist)
            }
          })
        }
      },
    })
  }
})