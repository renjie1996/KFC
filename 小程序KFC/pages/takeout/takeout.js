Page({
  data: {
    inputShowed: false, 
    inputVal: "",
    latitude: 0, 
    longitude: 0, // 绘制地图所需的经纬度
    markers: [], // 地图标记点
    pois: [], // 附近的地名对象数组
    kfcNear: '' // 最近的kfc，暂未使用
  },
  onReady: function () {
    console.log('ready');
    wx.setNavigationBarTitle({
      title: '外卖地址'
    })
    // 得到当前位置
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        let that = this
        let _latitude = res.latitude
        let _longitude = res.longitude
        console.log(res.latitude, res.longitude)

        let QQMapWX = require('qqmap-wx-jssdk.min.js');
        let demo = new QQMapWX({
          key: '5Q2BZ-O3W24-V6DUN-DZ4Z7-H427K-WCB7R' // 必填
        });
        wx.showToast({
          title: '地图加载中',
          icon: 'loading',
          duration: 0,
          mask: true
        })
        that.setData({
          latitude: _latitude,
          longitude: _longitude,
          markers: [{
            latitude: _latitude,
            longitude: _longitude,
            name: '当前位置',
            desc: 'KFC在您身边'
          }]
        })
        // 附近可能的位置
        demo.reverseGeocoder({
          location: {
            latitude: _latitude,
            longitude: _longitude
          },
          get_poi: 1,
          success: function (res) {
            // console.log(res);
          },
          fail: function (res) {
            console.log(res);
          },
          complete: function (res) {
            console.log(res);
            that.setData({
              // 将得到周围地名的数组
              pois: res.result.pois
            })
          }
        });

        //   搜索附近
        demo.search({
          keyword: '肯德基',
          location: {
            latitude: _latitude,
            longitude: _longitude
          },
          success: function (res) {
            // console.log(res);
          },
          fail: function (res) {
            // console.log(res);
          },
          complete: function (res) {
            console.log(res.data[0].address)
            that.setData({
              kfcNear: res.data.address
            })
          }
        });
        console.log(this.data.markers)
        // 绘制地图
        this.mapCtx = wx.createMapContext('myMap', function () {
          wx.hideToast();
        })
      }
    })
  },
  // 设置选定位置为我的位置并跳转
  ToDetailPage: function (event) {
    console.log(event.target.dataset)
    let OrderAddress = {
      address: [],
      isHall: false 
    }
    //遍历去重
    let item = OrderAddress.address.find(item=>item==event.target.dataset.name)
    if(!item){
      OrderAddress.address.push(event.target.dataset.name)
    }
    wx.setStorage({
      key: "OrderAddress",
      data: OrderAddress,
    });
    wx.navigateTo({
      url:'/pages/takeout/message/message'
    })
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    // console.log(e.detail.value)
    this.setData({
      inputVal: e.detail.value
    });
  }
});