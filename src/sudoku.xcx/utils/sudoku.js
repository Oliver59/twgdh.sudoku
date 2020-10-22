class sudoku {

    levelStr;
    onRefreshSudoku;
    selectIndex;
    bindItemList;
    openNote;
    historyOperateList;
    succeed;
    seconds;
    isStart;
    clockText;

    constructor(question, answer, level, onRefreshSudoku) {
        this.question = question;
        this.answer = answer;
        this.level = level;
        this.onRefreshSudoku = onRefreshSudoku;
        this.selectIndex = -1;
        this.seconds = 0;
        this.clockText = "00:00";
        this.isStart = true;
        this.openNote = false;
        this.succeed = false;
        this.historyOperateList = [];
        this.initData();
        this.initNumber();
        this.refreshList();
        this.initColck();
    }


    initColck() {
        let _this = this;
        setInterval(function() {
            if (_this.isStart && _this.succeed == false) {
                _this.seconds++;
                let seconds = _this.seconds;
                let m = parseInt(seconds / 60);
                let s = seconds % 60;
                m = m > 9 ? m : '0' + m;
                s = s > 9 ? s : '0' + s;
                _this.clockText = `${m}:${s}`;
                _this.onRefreshSudoku(_this);
            }
        }, 1000);
    }

    initData() {

        switch (this.level) {
            case 1:
                this.levelStr = '容易';
                break;
            case 2:
                this.levelStr = '中等';
                break;
            case 3:
                this.levelStr = '困难';
                break;
            case 4:
                this.levelStr = '专家';
                break;
        }

        let _bindItemList = [];

        let _question = this.question;

        for (let i = 0; i < _question.length; i++) {
            let colIndex = i % 9;
            let rowIndex = Math.floor(i / 9);
            let blockIndex = Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3);
            let value = _question[i];
            let index = i;
            let notes = [];
            for (let j = 1; j < 10; j++) {
                notes.push({ show: false, value: j });
            }
            let isSystem = value > 0;
            _bindItemList[i] = { colIndex, rowIndex, blockIndex, value, index, notes, isSystem };
        }
        this.bindItemList = _bindItemList;
    }

    initNumber() {
        let numbers = [];
        for (let i = 1; i < 10; i++) {
            let show = this.bindItemList.filter(c => c.value == i).length < 9;
            numbers.push({ show, value: i });
        }
        this.numbers = numbers;
    }

    /**
     * 点击数字
     * @param {*} number 
     */
    clickNumber(number) {
        if (this.selectIndex == -1) return;
        if (!number.show) return;
        let selectItem = this.bindItemList[this.selectIndex];
        if (selectItem.isSystem) return;
        console.log(this.historyOperateList);
        if (this.openNote) {
            //注释
            selectItem.notes.forEach(c => {
                if (c.value === number.value) c.show = !c.show;
            });
            this.historyOperateList.push({ type: 'addNote', index: this.selectIndex, value: number.value });
        } else {
            //填写
            this.historyOperateList.push({ type: 'addNumber', index: this.selectIndex, value: number.value, beforeNumber: selectItem.value });
            selectItem.value = number.value;
            console.log("填写！");
        }
        this.bindItemList[this.selectIndex] = selectItem;
        //检查是否填写错误
        selectItem.errorClass = "";
        if (selectItem.value != this.answer[this.selectIndex]) {
            selectItem.errorClass = "error";
        }
        if (!this.openNote) {
            // 检查是否和其它block冲突
            this.bindItemList.forEach(item => {
                item.errorBlockClass = "";
                if (item.index != selectItem.index &&
                    item.value == selectItem.value &&
                    (item.rowIndex == selectItem.rowIndex || item.colIndex == selectItem.colIndex || item.blockIndex == selectItem.blockIndex)) {
                    item.errorBlockClass = "errorBlock";
                }
            });
        }
        this.initNumber();
        this.refreshList();
    }


    /**
     * 点击格子
     * @param {点击格子索引} index 
     */
    clickBlock(index) {
        this.selectIndex = index;
        this.refreshList();
    }

    /**
     * 点击撤销
     */
    clickUndo() {
        if (this.historyOperateList.length == 0) return;
        var operate = this.historyOperateList.pop();
        let selectItem = this.bindItemList[operate.index];
        if (operate.type == 'addNote') {
            selectItem.notes.forEach(c => {
                if (c.value === operate.value) c.show = !c.show;
            });
        } else if (operate.type == 'addNumber') {
            selectItem.value = operate.beforeNumber;
        }
        this.refreshList();
    }

    /**
     * 点击擦除
     */
    clickErase() {
        if (this.selectIndex == -1) return;
        let selectItem = this.bindItemList[this.selectIndex];
        if (selectItem.isSystem) return;
        selectItem.value = '0';
        this.bindItemList[this.selectIndex] = selectItem;
        this.refreshList();
    }

    /**
     * 点击笔记
     */
    clickNotes() {
        this.openNote = !this.openNote;
        this.refreshList();
    }

    /**
     * 点击提示
     */
    clickHint() {
        if (this.selectIndex == -1) return;
        if (this.bindItemList[this.selectIndex].value != 0) return;
        this.bindItemList[this.selectIndex].value = this.answer[this.selectIndex];
        this.refreshList();
    }

    /**
     * 切换启动暂停
     */
    clickClock() {
        this.isStart = !this.isStart;
        this.onRefreshSudoku(this);
    }

    animation() {
        //检查是否启用动画

        for (let i = 0; i < this.bindItemList.length; i++) {
            this.bindItemList[i].style = "";
        }


        if (this.selectIndex <= 0) return;
        let selectedItem = this.bindItemList[this.selectIndex];


        let _this = this;

        let sameRow = this.bindItemList.filter(c => c.rowIndex == selectedItem.rowIndex);
        let rowFinish = sameRow.sort((a, b) => a.value - b.value).map(c => c.value).join("") === "123456789";
        if (rowFinish) {
            sameRow.sort((a, b) => a.index - b.index);
            var rowIndx = sameRow.findIndex(c => c.index == this.selectIndex);
            for (let i = 0; i < sameRow.length; i++) {
                if (rowIndx == i) continue;
                let delayTime = Math.abs(rowIndx - i) / 10;
                let styleContent = `animation-name: finishAnimation; animation-duration:1s; animation-timing-function: linear; animation-delay: ${delayTime}s;`;
                sameRow[i].style = styleContent;
            }
        }


        let sameCol = this.bindItemList.filter(c => c.colIndex == selectedItem.colIndex);
        let colFinish = sameCol.sort((a, b) => a.value - b.value).map(c => c.value).join("") === "123456789";
        sameCol.sort((a, b) => a.index - b.index);
        if (colFinish) {
            sameCol.sort((a, b) => a.index - b.index);
            var colIndx = sameCol.findIndex(c => c.index == this.selectIndex);
            for (let i = 0; i < sameCol.length; i++) {
                if (colIndx == i) continue;
                let delayTime = Math.abs(colIndx - i) / 10;
                let styleContent = `animation-name: finishAnimation; animation-duration:1s; animation-timing-function: linear; animation-delay: ${delayTime}s;`;
                sameCol[i].style = styleContent;
            }
        }

        let sameBlock = this.bindItemList.filter(c => c.blockIndex == selectedItem.blockIndex);
        let blockFinish = sameBlock.sort((a, b) => a.value - b.value).map(c => c.value).join("") === "123456789";
        if (blockFinish) {
            sameBlock.sort((a, b) => a.index - b.index);
            var blockIndx = sameBlock.findIndex(c => c.index == this.selectIndex);
            for (let i = 0; i < sameBlock.length; i++) {
                if (blockIndx == i) continue;
                let delayTime = Math.abs(blockIndx - i) / 10;
                let styleContent = `animation-name: finishAnimation; animation-duration:1s; animation-timing-function: linear; animation-delay: ${delayTime}s;`;
                sameBlock[i].style = styleContent;
            }
        }

        if (this.bindItemList.map(c => c.value).join("") === this.answer) {
            for (let i = 0; i < this.bindItemList.length; i++) {
                if (this.selectIndex == i) continue;
                let item = this.bindItemList[i];
                let delayTime = Math.abs(selectedItem.rowIndex - item.rowIndex) / 10;
                let delayTime2 = Math.abs(selectedItem.colIndex - item.colIndex) / 10;
                if (delayTime2 > delayTime) {
                    delayTime = delayTime2;
                }
                let styleContent = `animation-name: finishAnimation; animation-duration:1s; animation-timing-function: linear; animation-delay: ${delayTime}s;`;
                item.style = styleContent;
                item.sameBlockClass = "";
                item.sameNumberClass = "";
                item.selectedClass = "";
            }
            setTimeout(function() {
                _this.succeed = true;
                _this.onRefreshSudoku(_this);
            }, 1000);
        }
        this.onRefreshSudoku(_this);
    }

    refreshList() {
        if (this.selectIndex >= 0) {
            let selectedItem = this.bindItemList[this.selectIndex];
            this.bindItemList.forEach(item => {
                item.sameBlockClass = "";
                item.sameNumberClass = "";
                item.selectedClass = "";

                if (item.rowIndex == selectedItem.rowIndex ||
                    item.colIndex == selectedItem.colIndex ||
                    item.blockIndex == selectedItem.blockIndex
                ) {
                    item.sameBlockClass = "sameBlock";
                }
                if (item.value != 0 && item.value == selectedItem.value) {
                    item.sameBlockClass = "sameNumber";
                }
            });
            selectedItem.selectedClass = "selected";
        }
        this.onRefreshSudoku(this);
        this.animation();
    }

}
export default sudoku