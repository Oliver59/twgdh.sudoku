class sudoku {

    onRefreshSudoku;
    selectIndex;

    constructor(question, answer, onRefreshSudoku) {
        this.question = question;
        this.answer = answer;
        this.onRefreshSudoku = onRefreshSudoku;
        this.selectIndex = -1;
        this.initData();
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

            _bindItemList[i] = { colIndex, rowIndex, blockIndex, value, index };

        }
        this.bindItemList = _bindItemList;
    }

    setValue(index, number) {
        this.onRefreshSudoku(index, number);
    }

    addNote(index, number) { }

}
export default sudoku