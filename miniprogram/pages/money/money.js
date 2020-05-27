// miniprogram/pages/money/money.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ImageUrl: '',
    money: '',
    describe: '',
    cityName: '广州市',
    countyName: '海珠区',
    detailInfo: '新港中路397号',
    postalCode: '510000',
    provinceName: '广东省',
    telNumber: '020-81167888',
    userName: '张'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  moneypull(e) {
    let that = this
    if (wx.chooseAddress) {
      wx.chooseAddress({
        success: function (res) {
          console.log(res)
          that.setData({
            cityName: res.cityName, //"广州市"
            countyName: res.countyName, //"海珠区"
            detailInfo: res.detailInfo, //"新港中路397号"
            postalCode: res.postalCode, //"510000"
            provinceName: res.provinceName, //"广东省"
            telNumber: res.telNumber, ///"020-81167888"
            userName: res.userName //"张三"
          })

        },
        fail: function (err) {
          console.log(JSON.stringify(err))
        }
      })
    } else {
      console.log('当前微信版本不支持chooseAddress');
    }
  },
  onLoad: function (options) {
    console.log("传递", options.ImageUrl)
    console.log("传递", options.money)
    console.log("传递", options.describe)
    this.setData({
      ImageUrl: options.ImageUrl,
      money: options.money,
      describe: options.describe,
    })
    // this.moneypull()
  },
})