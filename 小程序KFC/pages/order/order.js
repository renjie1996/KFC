Page({
  data: {
    elementToggle: null, 
    shoppingList: [],
    totalPrice: 0,
    totalCount: 0,
    movelength: 0,
    address: '',
    userName: '',
    OrderWay: '',
    cartIsHidden: false,
    cartIndexIsHidden: true,
    animationData: {}
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '订单'
    })
  },
  onLoad: function (options) {
    let that = this
    wx.getStorage({
      key: 'OrderMenu',
      success: function (res) {
        console.log(res.data.list);
        that.setData({
          shoppingList: res.data.list,
          totalPrice: res.data.price,
          totalCount: res.data.count,
          movelength: res.data.list.length,
        })
      }
    })
    wx.getStorage({
      key: 'OrderWay',
      success: function (res) {
        console.log(res.data);
        that.setData({
          OrderWay: res.data
        })
      }
    })
    wx.getStorage({
      key: 'OrderAddress',
      success: function (res) {
        console.log(res.data);
        that.setData({
          address: res.data.address[0],
          elementToggle: res.data.isHall
        })
      }
    })
    wx.getUserInfo({
      success: function (res) {
        let userInfo = res.userInfo
        let nickName = userInfo.nickName
        let avatarUrl = userInfo.avatarUrl
        let gender = userInfo.gender //性别 0：未知、1：男、2：女 
        let province = userInfo.province
        let city = userInfo.city
        let country = userInfo.country
        // console.log(nickName)
        that.setData({
          userName: nickName,
        })
      }
    })
  },
  selectElement: function (e) {
    let element_toggle = !this.data.elementToggle
    this.setData({
      elementToggle: element_toggle
    })
  },
  showCart: function (e) {
    let animation = wx.createAnimation({
      duration: 400,
      timingFunction: "linear",
      delay: 0
    });
    let move_length = 0;
    move_length = this.data.movelength * 55;
    if (this.data.movelength > 1) {
      move_length = 55 + (this.data.movelength - 1) * 65;
    }
    this.animation = animation
    animation.bottom(move_length).step()
    let cart_indexIsHidden = !this.data.cartIndexIsHidden;
    this.setData({
      // movelength: move_length,
      cartIndexIsHidden: cart_indexIsHidden,
      animationData: animation.export()
    })
  },
  addShopcartInCart: function (e) {
    let total_count = this.data.totalCount + 1;
    let addTarget = this.data.shoppingList.findIndex(item => item.name === e.target.dataset.name);
    this.data.shoppingList[addTarget].num++;
    let tempPrice = parseInt(this.data.totalPrice) + parseInt(this.data.shoppingList[addTarget].price)
    this.setData({
      shoppingList: this.data.shoppingList,
      totalPrice: tempPrice,
      totalCount: total_count
    })
  },
  deleteShopcartInCart: function (e) {
    let move_length = this.data.movelength;
    let addTarget = this.data.shoppingList.findIndex(item => item.name === e.target.dataset.name);
    let tempPrice = 0;
    let total_count = this.data.totalCount - 1;
    this.data.shoppingList[addTarget].num--;
    if (this.data.shoppingList[addTarget].num < 1) {
      tempPrice = parseInt(this.data.totalPrice) - parseInt(this.data.shoppingList[addTarget].price)
      this.data.shoppingList.splice(addTarget, 1);
      move_length--;
      let animation = wx.createAnimation({
        duration: 400,
        timingFunction: "linear",
        delay: 0
      });
      let mlength = move_length * 61;
      if (move_length < 2) {
        mlength = move_length * 50
      }
      if (move_length < 1) {
        mlength = -55
      }
      console.log(this.data.totalPrice)
      this.animation = animation
      animation.bottom(mlength).step()
      if (total_count == 0) {
        let cart_isHidden = !this.data.cartIsHidden
        console.log(cart_isHidden)
        setTimeout(() => {
          this.setData({
            cartIsHidden: cart_isHidden
          })
          wx.navigateBack()
        }, 1000)

      }
      this.setData({
        shoppingList: this.data.shoppingList,
        movelength: move_length,
        animationData: animation.export(),
        totalPrice: tempPrice
      })
    } else {
      tempPrice = parseInt(this.data.totalPrice) - parseInt(this.data.shoppingList[addTarget].price)
      console.log(this.data.totalPrice)
    }

    this.setData({
      shoppingList: this.data.shoppingList,
      totalPrice: tempPrice,
      totalCount: total_count
    })
  },
  toCount: function (e) {
    // let OrderMenu = {
    //   list: this.data.shoppingList,
    //   price: this.data.totalCount
    // }
    // wx.setStorage({
    //   key: "OrderMenu",
    //   data: OrderMenu
    // });
    wx.navigateTo({
      url: '../order/order'
    })
  }
})
