var index = [0, 0, 0];
var cellId;

var t = 0;

var show = show;

var moveY = 200;
var selected = '000000';
var str_pad = function(str,length,char){
  var str = str+'';
  while(str.length < length){
    str = char+str;
  }
  return str;
};
var getIndex = function(str){
  var part;
  for(var i = 0, j = 0;i < 6;i += 2,j++){
    part = str.substr(i,2);
    if(part != selected.substr(i,2) ){
      return j;
    }
  }
};
Page({
  data: {
    multiArray: [],
    objectMultiArray: [
    ],
    StoreList: [],//门店列表
    StoreLists: [],//门店列表s
    provinces: [],//所有的省份
    citys: [],//选择省所对应的城市
    areas: [],//选择市对应的所有区
    show: show,
    pro: "",
    cit: "",
    are: "",
    areid: "",
    flag: false,
    cityData:[]
  },
  //搜索
  sousuo: function (e) {
    // console.log(e.detail.value);
    var that = this;
    var areid = this.data.areid;
    var gps;
    try {
      gps = wx.getStorageSync('gps');
      if (!gps) {
        gps = '';
      }
    } catch (e) {
      gps = '';
    }
    if (e.detail.value !== "") {
      wx.request({
        url: getApp().globalData.url + '/v1/shop/search',
        data: {
          token: getApp().globalData.token,
          kwd: e.detail.value,
          area: areid,
          gps: gps
        },
        success: res => {
          // console.log(res)
          if (res.data.data.length !== 0) {
            if (res.data.data.length > 0) {
              var data = res.data.data;
              for (var i = 0; i < data.length; i++) {
                if (typeof (data[i].distance) !== 'undefined') {
                  var a = data[i].distance / 1000;
                  var c = Math.floor(a * 100) / 100;
                  data[i].distance = c;
                }
              }
              that.setData({ StoreList: data });
            }
          } else {
            wx.showToast({
              title: '暂无门店',
              mask: true,
              icon: "loading"
            })
          }
        }
      })
    } else {
      if (e.detail.value == "") {
        that.setData({ 
          StoreList: that.data.allList, 
          flag: true ,
          areid: "",
          are: "",
          pro: "",
          cit: ""
        });
      }
    }
  },
  //滑动事件
  bindChange: function (e) {
    var value = '';
    for (var i = 0;i<3;i++){
      value += str_pad(e.detail.value[i].toString(),2,'0');
    }
    //获取第几个选择框change
    var index = getIndex(value);
    //如果index=0也就是省份更换，那么自动设置后面两个index为0
    selected = value;
    var val = e.detail.value;
    var provinceindex = e.detail.value[0];
    var cityindex = e.detail.value[1];
    var areindex = e.detail.value[2];
    if(!index){
      cityindex = 0;
      areindex = 0;
    }
    if(index===1){
      areindex = 0;
    }
    var that = this;
    that.setData({ citys: that.data.cityData[provinceindex].nodes, areas: that.data.cityData[provinceindex].nodes[cityindex].nodes});
    // console.log(that.data.cityData[provinceindex].nodes[cityindex].nodes[areindex]);
    if ( 
      typeof (that.data.cityData[provinceindex].nodes !=='undefined')&& 
      typeof (that.data.cityData[provinceindex].nodes[cityindex].nodes !=='undefined')
      ){
      // console.log(that.data.cityData[provinceindex].nodes[cityindex].nodes[areindex]);
      that.setData({
        areid: that.data.cityData[provinceindex].nodes[cityindex].nodes[areindex].id,
        flag: true,
        are: that.data.cityData[provinceindex].nodes[cityindex].nodes[areindex].area,
        pro: that.data.cityData[provinceindex].province,
        cit: that.data.cityData[provinceindex].nodes[cityindex].city
      });
    }
    

  },
  //隐藏三级联动
  hiddenFloatView(e) {
    moveY = 200;
    show = true;
    t = 0;
    animationEvents(this, moveY, show);
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        var gps = res.longitude + "," + res.latitude;
        wx.request({
          url: getApp().globalData.url + '/v1/shop/search',
          data: {
            token: getApp().globalData.token,
            area: this.data.areid,
            gps: gps
          },
          success: res => {
            console.log(res)
            var data = res.data.data;
            for (var i = 0; i < data.length; i++) {
              var a = data[i].distance / 1000;
              var c = Math.floor(a * 100) / 100;
              data[i].distance = c;
            }
            this.setData({ StoreList: data });
          }
        })
      },
    })

  },
  //显示三级联动
  translate: function (e) {
    var that = this;
    if (t == 0) {
      moveY = 0;
      show = false;
      t = 1;
    } else {
      moveY = 200;
      show = true;
      t = 0;
    }
    // 获取省份市区
    //省份
    wx.request({
      url: getApp().globalData.url + '/v1/shop/citydata',
      data: { token: getApp().globalData.token },
      success: pro => {
        console.log(pro);
        console.log(pro.data.data[0].nodes[0].nodes[0]);
        if (pro.data.data.length !== 0) {

          if (that.data.provinces.length<=0)
          {
            that.setData({ cityData: pro.data.data });
            that.setData({ provinces: pro.data.data, pro: pro.data.data[0].province });
            that.setData({ citys: pro.data.data[0].nodes, cit: pro.data.data[0].nodes[0].city });
            that.setData({ areas: pro.data.data[0].nodes[0].nodes, are: pro.data.data[0].nodes[0].nodes[0].area, flag: true, areid: pro.data.data[0].nodes[0].nodes[0].id });
          }
          


        }
      }
    })
    //this.animation.translate(arr[0], arr[1]).step();
    animationEvents(this, moveY, show);
  },
  /*
  *初始加载
  */
  onLoad: function () {
    
  },
  onShow :function(){
    var that = this;
    that.setData({ flag:false})
    var acode, gps, userinfo, memberid;
    //获取首页识别的或者选择的城市代码
    try {
      acode = wx.getStorageSync("acode");
      if (!acode) {
        acode = '330100';
      }
    } catch (e) {
      acode = '330100';
    }
    //获取本地存储中的用户信息
    try {
      userinfo = wx.getStorageSync("userinfo");
      if (userinfo && typeof (userinfo.memberid) !== "undefined") {
        memberid = userinfo.memberid;
      } else {
        memberid = 0
      }
    } catch (e) {
      memberid = 0;
    }
    //获取小程序首页获取的GPS信息
    try {
      gps = wx.getStorageSync("gps");
      if (!gps) {
        gps = '';
      }
    } catch (e) {
      gps = '';
    }
    this.setData({ acode: acode, gps: gps, memberid: memberid })
    console.log(this.data.gps)
    //发起店铺搜索
    wx.request({
      url: getApp().globalData.url + '/v1/shop/search',
      data: {
        token: getApp().globalData.token,
        memberid: this.data.memberid,
        gps: this.data.gps,
        acode: this.data.acode
      },
      success: res => {
        var data = res.data.data;
        for (var i = 0; i < data.length; i++) {
          if (typeof (data[i].distance) !== 'undefined') {
            var a = data[i].distance / 1000;
            var c = Math.floor(a * 100) / 100;
            data[i].distance = c;
          }
        }
        that.setData({ StoreList: data, allList: data })
      }
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})
//动画事件
function animationEvents(that, moveY, show) {
  that.animation = wx.createAnimation({
    transformOrigin: "50% 50%",
    duration: 400,
    timingFunction: "ease",
    delay: 0
  }
  )
  that.animation.translateY(moveY + 'vh').step()
  that.setData({
    animation: that.animation.export(),
    show: show
  })
}