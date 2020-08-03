class sudoku {

    onRefreshSudoku;
    selectIndex;
    bindItemList;
    openNote;
    historyOperateList;


    constructor(question, answer, onRefreshSudoku) {
        this.question = question;
        this.answer = answer;
        this.onRefreshSudoku = onRefreshSudoku;
        this.selectIndex = -1;
        this.openNote = false;
        this.historyOperateList = [];
        this.initData();
        this.initNumber();
        this.refreshList();
    }

    initData() {
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
     * 点击擦除
     */
    clickErase() {
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
        this.onRefreshSudoku(this);
    }

    /**
     * 点击撤销
     */
    clickUndo() {
        var operate = this.historyOperateList.pop();
        let selectItem = this.bindItemList[operate.index];
        if (operate.type == 'addNote') {
            selectItem.notes.forEach(c => {
                if (c.value === selectItem.value) c.show = !c.show;
            });
        } else if (operate.type == 'addNumber') {
            selectItem.value = operate.beforeNumber;
        }
        this.bindItemList[this.selectIndex] = selectItem;
        this.onRefreshSudoku(this);
    }

    setSelect(index) {
        this.selectIndex = index;
        this.refreshList();
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
    }

}
export default sudoku