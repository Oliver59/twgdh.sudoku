class sudoku {

    onRefreshSudoku;

    constructor(question, answer, onRefreshSudoku) {
        this.question = question;
        this.answer = answer;
        this.onRefreshSudoku = onRefreshSudoku;
        this.initData();
    }

    initData() {
        let _bindItemList = [];

        let _question = this.question;
        for (let i = 0; i < _question.length; i++) {
            let colIndex = i % 9;
            let rowIndex = Math.floor(i / 9);
            let largeBlockIndex = Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3);
            let middleBlockIndex = (rowIndex % 3) * 3 + (colIndex % 3);
            // console.log(`i:${i}\t colIndex:${colIndex}\t rowIndex:${rowIndex}\t largeBlockIndex:${largeBlockIndex}\t middleBlockIndex:${middleBlockIndex}`);
            if (!_bindItemList[largeBlockIndex])
                _bindItemList[largeBlockIndex] = [];
            if (!_bindItemList[largeBlockIndex][middleBlockIndex])
                _bindItemList[largeBlockIndex][middleBlockIndex] = {};

            _bindItemList[largeBlockIndex][middleBlockIndex].value = _question[i];
            _bindItemList[largeBlockIndex][middleBlockIndex].index = i;
        }
        this.bindItemList = _bindItemList;
    }


    setValue(index, number) {
        this.onRefreshSudoku(index, number);
    }

    addNote(index, number) {}

}
export default sudoku