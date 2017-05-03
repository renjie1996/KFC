//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    takeoutHidden: true,
    hallHidden: true,
    orderHidden: false,
    activeHidden: true,
    cardArray2: [
      {
        url: 'http://imgm.4008823823.com.cn/kfcmwos/img//S/237_92976.jpg',
        name: '香甜栗米棒',
        price: '8,000',
        dateline: '有效期至2017年04月30日'
      },
      {
        url: 'http://imgm.4008823823.com.cn/kfcmwos/img//S/237_93011.jpg',
        name: '香辣鸡腿堡',
        price: '49,000',
        dateline: '有效期至2017年04月30日'
      },
      {
        url: 'http://imgm.4008823823.com.cn/kfcmwos/img//S/237_93095.jpg',
        name: '新奥尔烤翅',
        price: '36,000',
        dateline: '有效期至2017年04月30日'
      },
      {
        url: 'http://imgm.4008823823.com.cn/kfcmwos/img//S/258_108207.jpg',
        name: '伴柠檬橘鲜果茶',
        price: '44,000',
        dateline: '有效期至2017年04月30日'
      }
    ],
    cardArray3: [
      {
        url: 'http://imgm.4008823823.com.cn/kfcmwos/img//S/237_93011.jpg',
        name: '香辣鸡腿堡',
        price: '49,000',
        dateline: '有效期至2017年04月30日'
      },
      {
        url: 'http://imgm.4008823823.com.cn/kfcmwos/img//S/258_108207.jpg',
        name: '伴柠檬橘鲜果茶',
        price: '44,000',
        dateline: '有效期至2017年04月30日'
      },
      {
        url: 'http://imgm.4008823823.com.cn/kfcmwos/img//S/237_93095.jpg',
        name: '新奥尔烤翅',
        price: '36,000',
        dateline: '有效期至2017年04月30日'
      },
      {
        url: 'http://imgm.4008823823.com.cn/kfcmwos/img//S/237_92976.jpg',
        name: '香甜栗米棒',
        price: '8,000',
        dateline: '有效期至2017年04月30日'
      }
    ]
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: 'K金商城'
    })
  },
  //事件处理函数
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  takeoutShow: function (event) {
    // console.log(event.target.dataset.selected);
    this.setData({
      takeoutHidden: false,
      hallHidden: true,
      orderHidden: true,
      activeHidden: true
    })
  },
  hallShow: function (event) {
    // console.log(event.target.dataset.selected);
    this.setData({
      takeoutHidden: true,
      hallHidden: false,
      orderHidden: true,
      activeHidden: true
    })
  },
  orderShow: function (event) {
    // console.log(event.target.dataset.selected);
    this.setData({
      takeoutHidden: true,
      hallHidden: true,
      orderHidden: false,
      activeHidden: true
    })
  },
  activeShow: function (event) {
    // console.log(event.target.dataset.selected);
    this.setData({
      takeoutHidden: true,
      hallHidden: true,
      orderHidden: true,
      activeHidden: false
    })
  }
})
