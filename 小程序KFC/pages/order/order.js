//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return util.formatTime(new Date(log))
      })
    })
    wx.getStorage({
      key: 'OrderMenu',
      success: function (res) {
        console.log(res.data);
      }
    });
  }
})
