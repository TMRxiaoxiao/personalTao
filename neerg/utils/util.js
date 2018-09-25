
function login()
{
  wx.login({
    success: function (res) {
      // console.log(res)
      wx.request({
        url: getApp().globalData.url + '/v1/user/login',
        data: { code: res.code, token: getApp().globalData.token },
        success: function (res) {

          if (res.data.result == "bind") {
            wx.navigateTo({
              url: '/login/login?sid=' + res.data.sid + "&openid=" + res.data.data,
            })
          } else {
            console.log(res)
            //基本信息存入缓存
            wx.setStorage({
              key: 'userinfo',
              data: res.data.user,
            })

          }
        }
      })
    }
  })
}

//获取用户信息
function getuserinfo()
{
  wx.getStorage({
    key: 'userinfo',
    success: function(res) {
      console.log(res.data)
      return res;
    },
  })
};

function getinfo()
{
  //获取用户信息
  wx.getStorage({
    key: 'userinfo',
    success: function (res) {
      //获取档案信息
      wx.request({
        url: getApp().globalData.url + '/v1/skins/my',
        data: { memberid: res.data.memberid, token: getApp().globalData.token },
        success:function(res)
        {
          console.log(res);
          return res;
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
};

module.exports = {
  getuserinfo: getuserinfo,
  getinfo: getinfo
};

