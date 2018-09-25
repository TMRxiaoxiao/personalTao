Page({
  data: {
    imgUrls: [
      'https://store.ineerg.com/static/mini/images/shopping.png',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 500,
    clock: '',
    curr: "1",
    // 底部轮播
    imgs: [
      "https://store.ineerg.com/static/mini/images/saleList.png",
      "https://store.ineerg.com/static/mini/images/saleList.png"
    ]
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
  onLoad: function () {
    count_down(this);
    this.setData({
      totalNum: this.data.imgUrls.length
    })
  }
})
/** 
 * 需要一个目标日期，初始化时，先得出到当前时间还有剩余多少秒
 * 1.将秒数换成格式化输出为XX天XX小时XX分钟XX秒 XX
 * 2.提供一个时钟，每10ms运行一次，渲染时钟，再总ms数自减10
 * 3.剩余的秒次为零时，return，给出tips提示说，已经截止
 */

// 定义一个总毫秒数，以一分钟为例。TODO，传入一个时间点，转换成总毫秒数
var total_micro_second = 90000 * 1000;
var total1 = 20000 * 1000;

/* 毫秒级倒计时 */
function count_down(that) {
  // 渲染倒计时时钟
  that.setData({
    clock: date_format(total_micro_second),
    total1: date_format(total1),
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
    total1 -= 10
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
