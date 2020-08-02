import sudokuClass from '../../utils/sudoku';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        initdata(i, j) {
            return Math.floor(i / 3);
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let q = "000692700907045000025000060380200076002706300670003058040000690000460807006328000";
        let a = "134692785967845132825137964381954276452786319679213458248571693513469827796328541";
        var sudoku = new sudokuClass(q, a, this.onRefreshSudoku);
        sudoku.setValue(0, "3");
        this.setData({ sudoku });
    },


    onRefreshSudoku(index, number) {
        console.log(arguments);
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
});