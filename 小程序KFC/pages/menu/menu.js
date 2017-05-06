// 初始化动画实例
let animation = wx.createAnimation({
  duration: 400,
  timingFunction: "linear",
  delay: 0
});
Page({
  data: {
    scollTop: 0,
    scroll_into_view: 'foodtype0', // scroll-view的初始位置
    imgArray: [], // 导航的图片数组，通过ajax获取
    foodArray: [], // 食品的对象数组
    shoppingList: [], // 购物车储存的对象数组
    totalPrice: 0,  // 购物车的总价格
    totalCount: 0,  // 购物车的总数量
    movelength: 0,  // 上移或下拉动画的单位距离
    cartIsHidden: true, // 购物车是否隐藏
    cartIndexIsHidden: true, // 购物车详情菜单是否隐藏
    animationData: {} // 动画动作对象
  },
  // 设置标题名
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '菜单'
    })
  },
  // 加载ajax的最佳时机
  onLoad: function (options) {
    let that = this
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 0,
      mask: true
    })
    // 发送请求
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
  },
  // 跳页的id
  changepage: function (e) {
    // 滚动到指定的id
    let goPage = e.currentTarget.id
    this.setData({
      scroll_into_view: "foodtype" + goPage
    })
  },
  // 点击‘+’添加进购物车
  addShopcart: function (e) {
    let move_length = this.data.movelength;
    let shopping_list = this.data.shoppingList;
    let total_price = this.data.totalPrice;
    let total_count = this.data.totalCount + 1;
    total_price = parseInt(total_price) + parseInt(e.target.dataset.price);
    let itemNum = 1;
    let that = this;

    // 是否有同种商品判断
    if (this.data.shoppingList.length > 0) {
      // 商品名是否相同判断，不重复添加同名商品
      let isHave = this.data.shoppingList.findIndex(item => item.name == e.target.dataset.name)
      if (isHave != -1) {
        that.data.shoppingList[isHave].num++
      } else {
        // 购物车数组加进新的一样食品
        that.data.shoppingList.push({
          price: e.target.dataset.price,
          name: e.target.dataset.name,
          num: itemNum
        })
        // 动画效果的长度添加
        move_length++
      }
    // 没有商品时直接添加
    } else {
      this.data.shoppingList.push({
        price: e.target.dataset.price,
        name: e.target.dataset.name,
        num: itemNum
      })
      move_length++
    }
    // 动画上拉长度对应的bottom的计算
    /**
     *  mlength是bottom的长度
     *  animation.bottom(mlength).step() 加入动画队列
     */
    let mlength = move_length * 55;
    if (move_length > 1) {
      mlength = 55 + (move_length - 1) * 65;
    }
    this.animation = animation
    animation.bottom(mlength).step()
    this.setData({
      animationData: animation.export()
    })
    this.setData({
      shoppingList: shopping_list,
      totalPrice: total_price,
      totalCount: total_count,
      // 购物车当有商品时弹出
      cartIsHidden: false,
      movelength: move_length
    })
  },
  // 购物车详情抽屉点击时弹出
  showCart: function (e) {
    let move_length = 0;
    move_length = this.data.movelength * 55;
    if (this.data.movelength > 1) {
      move_length = 55 + (this.data.movelength - 1) * 65;
    }
    this.animation = animation
    animation.bottom(move_length).step()
    let cart_indexIsHidden = !this.data.cartIndexIsHidden;
    this.setData({
      cartIndexIsHidden: cart_indexIsHidden,
      animationData: animation.export()
    })
  },
  // 购物车详情抽屉中增加数量
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
  // 购物车详情抽屉中减少数量,但没有商品时需要抽屉下降并购物车组件消失
  deleteShopcartInCart: function (e) {
    let move_length = this.data.movelength;
     // 选定被点击的元素
    let addTarget = this.data.shoppingList.findIndex(item => item.name === e.target.dataset.name);
    let tempPrice = 0;
    let total_count = this.data.totalCount - 1;
    this.data.shoppingList[addTarget].num--;
    if (this.data.shoppingList[addTarget].num < 1) {
      // 总价的减少
      tempPrice = parseInt(this.data.totalPrice) - parseInt(this.data.shoppingList[addTarget].price)
      this.data.shoppingList.splice(addTarget, 1);
      move_length--;
      // bottom值变化产生动画
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
      // 总数等于0时购物车组件设置为消失
      if (total_count == 0) {
        let cart_isHidden = !this.data.cartIsHidden
        console.log(cart_isHidden)
        // 这里设置一个计时器，让下拉抽屉动画完成后再消失组件，不然体验性太差
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
      // 计算出来新的价格
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
    console.log(this.data.totalCount)
    // 菜单对象
    let OrderMenu = {
      list: this.data.shoppingList,
      price: this.data.totalPrice,
      count: this.data.totalCount
    }
    // 本地存储菜单对象
    wx.setStorage({
      key: "OrderMenu",
      data: OrderMenu
    });
    wx.navigateTo({
      url: '../order/order'
    })
  }
})
