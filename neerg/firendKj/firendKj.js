// firendKj/firendKj.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentTB: 0,
        proIntro: "",
        content: "",
        cutPrice: "",
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        flag: false,
        flas:false,
        glag:true
    },
    // 倒计时
    countdowm: function(e) {
        let that = this;
        let timer = setInterval(function() {
            let nowTime = new Date();
            let endTime = new Date(that.data.endTime * 1000);
            let t = endTime.getTime() - nowTime.getTime();
            if (t > 0) {
                let day = Math.floor(t / 86400000);
                let hour = Math.floor((t / 3600000) % 24);
                let min = Math.floor((t / 60000) % 60);
                let sec = Math.floor((t / 1000) % 60);
                hour = hour < 10 ? "0" + hour : hour;
                min = min < 10 ? "0" + min : min;
                sec = sec < 10 ? "0" + sec : sec;
                let format = '';
                if (day > 0) {
                    format = `${day}天${hour}时${min}分${sec}秒`;
                }
                if (day <= 0 && hour > 0) {
                    format = `${hour}时${min}分${sec}秒`;
                }
                if (day <= 0 && hour <= 0) {
                    format = `${min}分${sec}秒`;
                }
                that.setData({
                    content: format
                })
            } else {
                clearInterval(timer);
                that.setData({
                    content: '0时0分0秒'
                })
                wx.showToast({
                    title: '活动已结束！',
                })
            }
        }, 1000);
    },
    // 砍价
    Kprice(e) {
        wx.request({
            url: getApp().globalData.url + '/v1/promotion/cut',
            data: {
                token: getApp().globalData.token,
                promoid: this.data.promoid,
                memberid: this.data.memberid,
                cmid: this.data.cmid
            },
            success: res => {
                if (res.data.code == 1) {
                    var cutFee = res.data.data.cutFee
                    this.setData({
                        cutPrice: parseFloat(cutFee) + parseFloat(this.data.cutPrice),
                    })
                    this.setData({
                        bfh: parseFloat(this.data.cutPrice) / (parseFloat(this.data.orprice) - parseFloat(this.data.proIntro.disprice)) * 100,
                        flas:true,
                        cutedPrice: res.data.data.cutFee,
                        quanList: res.data.data.coupons,
                    })
                    // 判断领取优惠券的人是否登录
                    if (res.data.result == "success") {
                        this.setData({ glag: true })
                    } else {
                        this.setData({ glag: false })
                    }
                } else {
                    wx.showModal({
                        title: '提示',
                        content: res.data.msg,
                    })
                }
            }
        })
    },
    // 领优惠券
    getQuan(){
        if (this.data.glag){
            wx.showModal({
                title: '提示',
                content: '系统已发放优惠券至您的账号，赶快去使用吧！',
            })
        }else{
            console.log("还未绑定手机")
        }
    },
    del:function(){
        this.setData({flas:false})
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options.openid)
        var promoid = options.proid
        var cmid = options.cmid
        this.setData({
            promoid: promoid,
        })
        wx.request({
            url: getApp().globalData.url + '/v1/promotion/bargainfor',
            data: {
                token: getApp().globalData.token,
                promoid: promoid,
                memberid: this.data.memberid,
                cmid: cmid
            },
            success: res => {
                // console.log(res)
                this.setData({
                    proIntro: res.data.data,
                    cutPrice: res.data.data.start.cuted,
                    endTime: res.data.data.start.endtime,
                    orprice: res.data.data.orprice,
                    promoid: promoid,
                    cmid: cmid,
                    title: res.data.data.title
                })
                this.setData({
                    bfh: (this.data.cutPrice / (this.data.orprice - this.data.proIntro.disprice)) * 100,
                })
                wx.setNavigationBarTitle({
                    title: res.data.data.title,
                })
                // console.log(that.data.bfh)
            }
        })
        var that = this;
        that.countdowm();
        // 获取好友的用户信息存入缓存
        if (wx.getStorageSync("userinfo")) {
            // console.log(wx.getStorageSync("userinfo"))
            this.setData({
                memberid: wx.getStorageSync("userinfo").memberid
            })
        } else {
            // 需要用户授权
            this.setData({
                flag: true
            })
        }
        
    },
    joinKj:function(){
        wx.showModal({
            title: '提示',
            content: '先帮你的好友砍价才可以参加活动哦！',
        })
    },
    click1: function(e) {
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
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
        // wx.navigateTo({
        //     url: "/firendKj/firendKj?proid=" + this.data.promoid + "&cmid=" + this.data.memberid 
        // })
        return {
            title: this.data.title,
            path: "/firendKj/firendKj?proid=" + this.data.promoid + "&cmid=" + this.data.memberid
        }
    },
    bindGetUserInfo: function(e) {
        //console.log(e)
        var rawData = e.detail.rawData;
        var that = this;
        if (e.detail.iv) {
            wx.login({
                success: function(res) {
                    console.log(res)
                    //获取opid
                    //console.log("userinfo====" +rawData)
                    wx.request({
                        url: getApp().globalData.url + '/v1/promotion/reg',
                        data: {
                            code: res.code,
                            token: getApp().globalData.token,
                            data: e.detail.rawData,
                            promoid: that.data.promoid
                        },
                        success: function(res) {
                            console.log(res);
                            //基本信息存入缓存
                            wx.setStorage({
                                key: 'userinfo',
                                data: res.data.data,
                            })
                            that.setData({
                                userinfo: res.data.data,
                                memberid:res.data.data.memberid,
                                sessionKey: res.data.data.sessionKey
                            });
                            that.Kprice()
                        }
                    })
                }
            })
            that.setData({
                flag: false
            })
        }
    },
    getPhoneNumber:function(e){
        var call = e.detail.encryptedData
        var iv = e.detail.iv
        console.log(this.data.openid)
        var that=this
        wx.getStorage({
            key: 'userinfo',
            success: function(res) {
                var userinfo=res.data
                var openid=res.data.openid
                // wx.showModal({
                //     title: "信息",
                //     content: "openid=" + openid
                // })
                wx.request({
                    url: getApp().globalData.url + '/v1/promotion/bind',
                    data: {
                        openid: openid,
                        encryptedData: call,
                        iv: iv,
                        token: getApp().globalData.token,
                        sessionKey: that.data.sessionKey,
                    },
                    success: res => {
                        if(res.data.code==1){
                            that.setData({ glag: true })
                            wx.showModal({
                                title: '提示',
                                content: '领取成功',
                            })
                            userinfo.cardno=res.data.data.cardno
                            wx.setStorage({
                                key: 'userinfo',
                                data: userinfo,
                            })
                        }else{

                        }
                    }
                })   
            },
        })
        

            
                
    }
})