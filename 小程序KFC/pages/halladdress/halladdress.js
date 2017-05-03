Page({
  data: {
    inputShowed: false,
    inputVal: "",
    latitude: 0,
    longitude: 0,
    markers: [],
    poi: '',
    distance: 0
  },
  //异步加marker
  onReady: function () {
    console.log('ready');
    wx.setNavigationBarTitle({
      title: '我的'
    })
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        let that = this
        let _latitude = res.latitude
        let _longitude = res.longitude
        console.log(res.latitude, res.longitude)

        let QQMapWX = require('../takeout/qqmap-wx-jssdk.min');
        let demo = new QQMapWX({
          key: '5Q2BZ-O3W24-V6DUN-DZ4Z7-H427K-WCB7R' // 必填
        });
        wx.showToast({
          title: '地图加载中',
          icon: 'loading',
          duration: 0,
          mask: true
        })
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
            console.log(res.data[0].location.lat,res.data[0].location.lng)
            console.log(res.data[0])
            // .address._distance
            that.setData({
              poi: res.data[0].address,
              distance: res.data[0]._distance,
              latitude: res.data[0].location.lat,
              longitude: res.data[0].location.lng,
              markers: [{
                latitude: res.data[0].location.lat,
                longitude: res.data[0].location.lng,
                name: 'KFC',
                desc: 'KFC在您身边'
              }]
            })
          }
        });
        
        // 附近可能的位置
        // demo.reverseGeocoder({
        //   location: {
        //     latitude: _latitude,
        //     longitude: _longitude
        //   },
        //   get_poi: 1,
        //   success: function (res) {
        //     //         console.log(res);
        //   },
        //   fail: function (res) {
        //     console.log(res);
        //   },
        //   complete: function (res) {
        //     // console.log(res);
        //     that.setData({
        //       pois: res.result.pois
        //     })
        //   }
        // });
        setTimeout(function(){
          this.mapCtx = wx.createMapContext('myMap', function () {
          wx.hideToast();
        })
        },5000)
        
        this.setData({
          // latitude: _latitude,
          // longitude: _longitude,
          // markers: [{
          //   latitude: _latitude,
          //   longitude: _longitude,
          //   name: '当前位置',
          //   desc: 'KFC在您身边'
          // }]
        })
      }
    })
  },
  ToDetailPage: function (event) {
    console.log(event.target.dataset)
    let OrderAddress = {
      address: event.target.dataset.name,
      isHall: true
    }
    wx.setStorage({
      key: "OrderAddress",
      data: OrderAddress,
    });
    wx.navigateTo({
      url: '../menu/menu'
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