// pages/history/history.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let list = this.data.list;
    list.push({
      sudo_id: 1,
      start_time: "2020-10-10 08:10:10",
      sudo_level: "简单",
      take_time: "00:00:00",
    });
    list.push({
      sudo_id: 41,
      start_time: "2021-11-10 18:10:10",
      sudo_level: "简单",
      take_time: "00:00:00",
    });
    list.push({
      sudo_id: 41,
      start_time: "2022-10-10 21:10:10",
      sudo_level: "简单",
      take_time: "00:00:00",
    });
    list.push({
      sudo_id: 12,
      start_time: "2022-10-31 20:10:10",
      sudo_level: "简单",
      take_time: "00:00:00",
    });
    this.setData({ list });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
