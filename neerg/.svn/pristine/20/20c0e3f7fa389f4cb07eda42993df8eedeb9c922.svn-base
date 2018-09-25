// activeBuy/activeBuy.js
var WxParse = require('../wxParse/wxParse.js');
var total_micro_second = 0;

var Cinso = {};
Cinso.Utils = {};
Cinso.Utils.timeTo =


  Page({
    data: {
      imgurl: getApp().globalData.imgurl,
      imgUrls: [
      ],
      indicatorDots: false,
      autoplay: false,
      interval: 5000,
      duration: 500,
      clock: '',
      curr: "1",
      detailed: {},//明细
      totalNum: "",
      recommendlist: [],//推荐服务
      Evaluation: [],//评价
      pingtuan: [],//拼团
      sjlsit: [],//循环时间集合
      yxsjlsit: []//运行时间集合

    },
    change: function (e) {
      this.setData({
        curr: e.detail.current + 1
      })
    },
    changeIndicatorDots: function (e) {
      this.setData({
        indicatorDots: !this.data.indicatorDots
      })
    },
    changeAutoplay: function (e) {
      this.setData({
        autoplay: !this.data.autoplay
      })
    },
    intervalChange: function (e) {
      this.setData({
        interval: e.detail.value
      })
    },
    durationChange: function (e) {
      this.setData({
        duration: e.detail.value
      })
    },
    //页面初始加载
    onLoad: function (options) {
      // console.log(options)options.id
      this.setData({ shopid: options.shopid, promotype: options.promotype })
      //根据id获取明细
      wx.request({
        url: getApp().globalData.url + '/v1/service/info',
        data: { token: getApp().globalData.token, id: 7 },
        success: res => {
          console.log(res)
          wx.setNavigationBarTitle({
            title: res.data.data.name,
          })
          // console.log(res.data.data)
          var data = res.data.data;
          //data.promo.starttime = formatTime(data.promo.starttime,'yyyy.MM.bb hh.mm.ss')
          if (data.promo != null) {
            total_micro_second = res.data.data.promo.endtime;
            // console.log(res)
            data.promo.starttime = formatTime(data.promo.starttime, 'Y.M.D');
            data.promo.endtime = formatTime(data.promo.endtime, 'Y.M.D');
            count_down(this);
          }
          WxParse.wxParse('article', 'html', data.intro, this, 5);//服务简介
          WxParse.wxParse('articles', 'html', data.flow, this, 5);//体验流程
          WxParse.wxParse('articlex', 'html', data.tese, this, 5);//项目特色
          WxParse.wxParse('articlev', 'html', data.effect, this, 5);//项目效果
          WxParse.wxParse('articlen', 'html', data.skin, this, 5);//
          WxParse.wxParse('articlee', 'html', data.crowd, this, 5);
          this.setData({ detailed: data, totalNum: res.data.data.photoimgs.length })

        }
      })
      //请求推荐
      wx.request({
        url: getApp().globalData.url + '/v1/service/getlist',
        data: { token: getApp().globalData.token, ispopular: 1 },
        success: res => {
          // console.log(res)
          var recommendlist = res.data.data
          recommendlist.forEach((val, i) => {
            val.shopid = options.shopid
          })
          this.setData({ recommendlist: recommendlist });
        }
      })
      //评价
      wx.request({
        url: getApp().globalData.url + '/v1/service/comments',
        data: { token: getApp().globalData.token, id: options.id },
        success: res => {
          if (res.data.code == 1) {
            if (res.data.data != null && res.data.data != "") {
              for (var i = 0; i < res.data.data.length; i++) {
                res.data.data[i].member.avatar = getavatar(res.data.data[i].member.avatar);
                if (res.data.data[i].photos !== "" && res.data.data[i].photos != null) {
                  for (var j = 0; j < res.data.data[i].photos.length; j++) {

                    res.data.data[i].photos[j] = getavatar(res.data.data[i].photos[j]);
                  }
                }
              }
            }
          }
          this.setData({ Evaluation: res.data.data });
        }
      })
      //查询拼团
      wx.request({
        url: getApp().globalData.url + '/v1/promo/tuans',
        data: {
          token: getApp().globalData.token,
          id: options.id
        },
        success: res => {
          // console.log(res);
          if (res.data.code == 1) {
            var arry = [];
            for (var i = 0; i < res.data.data.length; i++) {
              res.data.data[i].member.avatar = getavatar(res.data.data[i].member.avatar)
              arry.push(res.data.data[i].endtime.replace(/\-/g, '/'));
            }
            //console.log(arry);
            this.setData({
              pingtuan: res.data.data,
              sjlsit: arry
            });
            this.countDown();
          }
        }
      })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    //点击购买
    buy: function (e) {
      var id = this.data.detailed.id;
      wx.getStorage({
        key: 'userinfo',
        success: res => {
          wx.navigateTo({
            url: '/orders/orderPay/orderPay?id=' + id + '&tid=null' + "&promotype=" + this.data.promotype + "&shopid=" + this.data.shopid,
          })
        },
        fail: function () {
          wx.showToast({
            title: '请先登录!',
            mask: true,
            icon: 'loading',
            duration: 1000
          })
        }
      })
    },
    buyPrice: function () {
      var id = this.data.detailed.id;
      wx.getStorage({
        key: 'userinfo',
        success: res => {
          wx.navigateTo({
            url: '/orders/orderPay/orderPay?id=' + id + '&tid=null' + "&promotype=" + this.data.promotype + "&shopid=" + this.data.shopid + "&buyType=2",
          })
        },
        fail: function () {
          wx.showToast({
            title: '请先登录!',
            mask: true,
            icon: 'loading',
            duration: 1000
          })
        }
      })
    },
    //点击参团
    Group: function (e) {
      //console.log(e);
      var tid = e.target.id;//tid拼团表主键
      var id = this.data.detailed.id;//服务主键
      //判断是否登录
      wx.getStorage({
        key: 'userinfo',
        success: function (res) {
          wx.navigateTo({
            url: '/cantuan/cantuan?id=' + id + '&tid=' + tid,
          })
        },
        fail: function () {
          wx.showToast({
            title: '请先登录!',
            mask: true,
            icon: 'loading',
            duration: 1000
          })
        }
      })
    },
    timeFormat(param) {//小于10的格式化函数
      return param < 10 ? '0' + param : param;
    },
    countDown() {//倒计时函数
      // 获取当前时间，同时得到活动结束时间数组
      let newTime = new Date().getTime();
      let endTimeList = this.data.sjlsit;
      let countDownArr = [];

      // 对结束时间进行处理渲染到页面
      endTimeList.forEach(o => {
        let endTime = new Date(o).getTime();
        //console.log(endTime + "==========" + newTime);
        let obj = null;
        // 如果活动未结束，对时间进行处理
        if (endTime - newTime > 0) {
          let time = (endTime - newTime);
          // 获取天、时、分、秒
          // let day = parseInt(time / (60 * 60 * 24));
          // let hou = parseInt(time % (60 * 60 * 24) / 3600);
          // let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
          // let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);

          // 秒数
          var sec = Math.floor(time / 1000);
          // 小时位
          var hou = Math.floor(sec / 3600);
          // 分钟位
          var min = Math.floor((sec - hou * 3600) / 60);
          // 秒位
          var sec = (sec - hou * 3600 - min * 60);// equal to => var sec = second % 60;
          // 毫秒位，保留2位
          var micro_sec = Math.floor((time % 1000) / 100);
          var day = parseInt(hou / 24);

          if (hou >= 24) {
            var day = parseInt(hou / 24);
            hou = hou % 24;
          }
          obj = {
            day: this.timeFormat(day),
            hou: this.timeFormat(hou),
            min: this.timeFormat(min),
            sec: this.timeFormat(sec),
            micro_sec: this.timeFormat(micro_sec)
          }
        } else {//活动已结束，全部设置为'00'
          obj = {
            day: '00',
            hou: '00',
            min: '00',
            sec: '00',
            micro_sec: '00'
          }
        }
        //console.log(obj)
        countDownArr.push(obj);
      })
      // 渲染，然后每隔一秒执行一次倒计时函数
      this.setData({ yxsjlsit: countDownArr })
      // console.log(this.data.yxsjlsit)
      setTimeout(this.countDown, 100);
    }
  })
/** 
 * 需要一个目标日期，初始化时，先得出到当前时间还有剩余多少秒
 * 1.将秒数换成格式化输出为XX天XX小时XX分钟XX秒 XX
 * 2.提供一个时钟，每10ms运行一次，渲染时钟，再总ms数自减10
 * 3.剩余的秒次为零时，return，给出tips提示说，已经截止
 */

// 定义一个总毫秒数，以一分钟为例。TODO，传入一个时间点，转换成总毫秒数
/* 毫秒级倒计时 */
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
//数据转换
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//时间戳转换
function formatTime(number, format) {
  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];
  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}

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



