let items = ['item1', 'item2', 'item3', 'item4']
Page({
  data: {
    scollTop: 0,
    scroll_into_view: 'foodtype0',
    listArray: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
    imgArray: [],
    foodArray: [],
    shoppingList: [],
    totalPrice: 0,
    totalCount: 0,
    movelength: 0,
    cartIsHidden: true,
    cartIndexIsHidden: true,
    actionSheetHidden: true,
    actionSheetItems: items,
    animationData: {}
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '菜单'
    })
  },
  onLoad: function (options) {
    let that = this
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 0,
      mask: true
    })
    wx.request({
      url: 'http://easy-mock.com/mock/5905d4597a878d73716e2c6b/kfc/kfc',
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          imgArray: res.data.navArray,
          foodArray: res.data.foodArray
        })
      }
    }, function () {
      wx.hideToast();
    })
    // setTimeout(function() {
    //  wx.hideToast();
    // },2000)

  },
  click: function (e) {
    console.log(e)
  },
  changepage: function (e) {
    var goPage = e.currentTarget.id
    console.log(goPage)
    this.setData({
      scroll_into_view: "foodtype" + goPage
    })
  },
  addShopcart: function (e) {

    // console.log(e.target.dataset.foodidx)
    // console.log(e.target.dataset.price)
    // console.log(e.target.dataset.name)
    let move_length = this.data.movelength;
    let shopping_list = this.data.shoppingList;
    let total_price = this.data.totalPrice;
    let total_count = this.data.totalCount + 1;
    total_price = parseInt(total_price) + parseInt(e.target.dataset.price);
    let itemNum = 1;
    let that = this;

    // 同种判断
    if (this.data.shoppingList.length > 0) {
      let isHave = this.data.shoppingList.findIndex(item => item.name == e.target.dataset.name)
      if (isHave != -1) {
        that.data.shoppingList[isHave].num++
      } else {
        that.data.shoppingList.push({
          price: e.target.dataset.price,
          name: e.target.dataset.name,
          num: itemNum
        })
        move_length++
      }
    } else {
      this.data.shoppingList.push({
        price: e.target.dataset.price,
        name: e.target.dataset.name,
        num: itemNum
      })
      move_length++
    }
    console.log(this.data.shoppingList)
    // shopping_list.push({
    //       price: e.target.dataset.price,
    //       name: e.target.dataset.name,
    //       num: itemNum
    //     })

    let animation = wx.createAnimation({
      duration: 400,
      timingFunction: "linear",
      delay: 0
    });
    let mlength = move_length * 55;
    if (move_length > 1) {
      mlength = 55 + (move_length - 1) * 65;
    }
    this.animation = animation
    animation.bottom(mlength).step()
    this.setData({
      // movelength: move_length,
      animationData: animation.export()
    })
    this.setData({
      shoppingList: shopping_list,
      totalPrice: total_price,
      totalCount: total_count,
      cartIsHidden: false,
      movelength: move_length
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
    let OrderMenu = {
      list: this.data.shoppingList,
      price: this.data.totalCount
    }
    wx.setStorage({
      key: "OrderMenu",
      data: OrderMenu
    });
    wx.navigateTo({
      url: '../order/order'
    })
  }
})
