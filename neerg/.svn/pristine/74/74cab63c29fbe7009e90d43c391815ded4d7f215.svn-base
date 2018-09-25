Page({
  data: {
    animationData: {}
  },
  onLoad(e){
      wx.openLocation({
          latitude: 23.362490,
          longitude: 116.715790,
          scale: 18,
          name: '华乾大厦',
          address: '金平区长平路93号'
      })
  },
    

  onShow: function () {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })

    this.rotateAndScaleThenTranslate = animation

    animation.scale(2, 2).rotate(45).step()

    this.setData({
      animationData: animation.export()
    })

    setTimeout(function () {
      animation.translate(30).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 1000)
  },
  rotateAndScale: function () {
    // 旋转同时放大
    this.animation.rotate(45).scale(2, 2).step()
    this.setData({
      animationData: this.animation.export()
    })
  },
  rotateThenScale: function () {
    // 先旋转后放大
    this.animation.rotate(45).step()
    this.animation.scale(2, 2).step()
    this.setData({
      animationData: this.animation.export()
    })
  },
  rotateAndScaleThenTranslate: function () {
    // 先旋转同时放大，然后平移
    this.animation.rotate(45).scale(2, 2).step()
    this.animation.translate(100, 100).step({ duration: 1000 })
    this.setData({
      animationData: this.animation.export()
    })
  },
    getPhoneNumber:function(e){
        console.log(e)
    }
})