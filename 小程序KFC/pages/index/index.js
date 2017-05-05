let app = getApp()
Page({
  data: {
    // swipe的小点 默认true
    indicatorDots: true,
    // 滚动模式  
    vertical: false,
    // 自动播放吗
    autoplay: true,
    circular: true,
    interval: 3000,
    duration: 500,
    items: [],
    images: ['http://www.kfc.com.cn/kfccda/UploadPic/HomePage/201704/20170424014514_10.jpg',
     'http://www.kfc.com.cn/kfccda/UploadPic/HomePage/201704/20170424014651_46.jpg',
     'http://www.kfc.com.cn/kfccda/UploadPic/HomePage/201703/20170320121212_90.jpg',
     'http://www.kfc.com.cn/kfccda/UploadPic/HomePage/201704/20170424014405_11.jpg'],
    cardIcon: '../../image/cardbag.png',
    cartIcon: '../../image/cart.png'
  },
  // 页面加载完成之后，发送请求数据的好时机，它的大名叫！！！
  // 钩子 钩子 钩子 钩子 钩子
  onLoad: function() {
    console.log('加载完成')
  },
  toCard: function(e) {
    console.log(1)
    wx.navigateTo({
      url: '/pages/card/card'
    })
  },
  toList: function(e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/order/order'
    })
  },
  toSelectKFC: function (e) {
    wx.navigateTo({
      url: '/pages/halladdress/halladdress'
    })
  }
})
