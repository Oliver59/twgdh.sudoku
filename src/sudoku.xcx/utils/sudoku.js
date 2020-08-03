class sudoku {

    onRefreshSudoku;
    selectIndex;
    bindItemList;
    openNote;


    constructor(question, answer, onRefreshSudoku) {
        this.question = question;
        this.answer = answer;
        this.onRefreshSudoku = onRefreshSudoku;
        this.selectIndex = -1;
        this.openNote = false;
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

    clickNumber(number) {
        console.log('clickNumber', number);
        if (!number.show) return;
        console.log('clickNumber', number);
        let selectItem = this.bindItemList[this.selectIndex];
        if (selectItem.isSystem) return;
        console.log('clickNumber', number);
        if (this.openNote) {
            //注释
            selectItem.notes.forEach(c => {
                if (c.value === number.value) c.show = !c.show;
            });
        } else {
            //填写
            selectItem.value = number.value;
            console.log("填写！");
        }
        this.bindItemList[this.selectIndex] = selectItem;
        this.initNumber();
        this.refreshList();
    }

    setValue(index, number) {
        this.onRefreshSudoku(index, number);
    }

    addNote(index, number) { }

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