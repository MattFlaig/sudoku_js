var computingRound = 1;
var columns = [];
var rows = [];
var blocks = [];
var checkArray = [];
var fillArray = [];
var restart = false;



/*GENERAL COMPUTATION MANAGEMENT FUNCTIONS*/

function manageComputation(){
  computingRound = 1;
  columns = [];
  rows = [];
  blocks = [];
  checkArray = [];
  fillArray = [];
  restart = false;
  prepareRows(rows);
  prepareColumns();
  computeFirstBlock();
  computeSecondBlock();
  computeThirdBlock();
  computeFourthBlock();
  computeFifthBlock();
  computeSixthBlock();
  if(restart){
    manageComputation();
  }
  else{
    computeSeventhBlock();
    computeEighthBlock();
    if(restart){
      manageComputation();
    }
    else{
      computeNinthBlock();
      if(restart){
        manageComputation();
      }
    }
  }
}

function computeFirstBlock(){
  prepareRows(fillArray);
  var blockNumber = 1;
  var arrayOfNines = [1,2,3,4,5,6,7,8,9];
  var firstBlock = findRandomArray(arrayOfNines);

  manageBlocks(firstBlock, blockNumber);
}

function computeSecondBlock(){
  var blockNumber = 2;
  var newBlock = getNewBlockFromGivenBlock(rows);
  var secondBlock = transformToBlock(newBlock);
  manageBlocks(secondBlock, blockNumber);
}

function computeThirdBlock(){
  var blockNumber = 3;
  var fillBlock = fillWithMissingElements(0,1,2,rows);
  var thirdBlock = mixFilledArray(fillBlock);
  manageBlocks(thirdBlock, blockNumber);
}

function computeFourthBlock(){
  prepareRows(fillArray);
  var blockNumber = 4;
  var fourthBlock = getNewBlockFromGivenBlock(columns);
  manageBlocks(fourthBlock, blockNumber);
}

function computeFifthBlock(){
  var blockNumber = 5;
  var fifthBlock = getCentralBlock();
  manageBlocks(fifthBlock, blockNumber);
}

function computeSixthBlock(){
  var blockNumber = 6;
  var fillBlock = fillWithMissingElements(3,4,5, rows);
  var sixthBlock = chooseFromFilledElements(fillBlock, columns);
  if(restart==false){
    manageBlocks(sixthBlock, blockNumber);
  }
}

function computeSeventhBlock(){
  var blockNumber = 7;
  var fillBlock = fillWithMissingElements(0,1,2,columns);
  var mixedBlock = mixFilledArray(fillBlock);
  var seventhBlock = transformToBlock(mixedBlock);
  manageBlocks(seventhBlock, blockNumber);
}

function computeEighthBlock(){
  var blockNumber = 8;
  var fillBlock = fillWithMissingElements(3,4,5,columns);
  var chosenColumns = chooseFromFilledElements(fillBlock, rows);
  if(restart==false){
    var eighthBlock = transformToBlock(chosenColumns);
    manageBlocks(eighthBlock, blockNumber);
  }
}

function computeNinthBlock(){
  var blockNumber = 9;
  var fillBlockColumns = fillWithMissingElements(6,7,8,columns);
  var fillBlockRows = fillWithMissingElements(6,7,8,rows);
  var ninthBlock = getCommonNumbers(fillBlockColumns, fillBlockRows);
  if(restart==false){
    manageBlocks(ninthBlock, blockNumber);
    var message = "All Blocks successfully computed!";
    showMessage(message);
  }
}

function manageBlocks(block, blockNumber){
  blocks.push(block);
  pushToRows(block, blockNumber);
  pushToColumns(block, blockNumber);
  computingRound += 1;
  visualizeRows();
  if(blockNumber<7){
    if(blockNumber < 4){
      pushBlockRow(block, fillArray, 0, 1, 2);
    }
    else{
      pushBlockRow(block, fillArray, 3, 4, 5);
    }
  }
}

function createSudokuTable(){
  var tableGenerator = "";
  for(var i=0;i<rows.length;++i){
    var row = rows[i];
    tableGenerator += "<tr>";
    for(var j=0;j<row.length;++j){
      var rowElement = row[j];
      tableGenerator += "<td>" + rowElement + "</td>";
    }
    tableGenerator+= "</tr>";
  }
}






/*2nd AND 4th BLOCK FUNCTIONS*/

function getNewBlockFromGivenBlock(array){
  var block = [];
  var flag = true;
  while(flag){
    for(var i=1;i<10;++i){
      var indexNumber = i % 3;
      if(indexNumber==0){var lineNumber = 2;}
      else{var lineNumber = indexNumber - 1;}
      var stillPossible = checkAgainstNine(array[lineNumber]);
      if(block != []){
        stillPossible = updateStillThere(block, stillPossible);
      }
      var nextElement = getOneByRandom(stillPossible);
      block.push(nextElement);
      if(block.length == 9){
        var endCheck = checkAgainstNine(block);
        if(endCheck == undefined){flag=false; break;}
        else{block = [];}
      }
    }
  }
  return block;
}

function updateStillThere(updateArray, stillThere){
  for(var i = 0; i<updateArray.length;++i){
    var arrayElement = updateArray[i];
    for(var j=0; j<stillThere.length;++j){
      stillThereElement = stillThere[j];
      if(arrayElement == stillThereElement){
        stillThere.splice(j,1);
      }
    }
  }
  return stillThere;
}






/*5th BLOCK FUNCTIONS*/

function getCentralBlock(){
    var marker = true;
    while(marker){
      compareLinesAndColumns();
      var firstLine = getLine(0,3);
      var secondLine = getLine(3,6);
      var twoLines = firstLine.concat(secondLine);
      var thirdLine = getLine(6,9, twoLines);
      var allLines = [];
      allLines.push(firstLine, secondLine, thirdLine);
      var counter = 0;
      for(var i=0;i<allLines.length;++i){
        var checkCorrect = scrutinizeLine(allLines[i]);
        if(checkCorrect == undefined){
          counter += 1;
          if(counter==3){marker=false;}
        }
      }
    }
    var threeLines = twoLines.concat(thirdLine);
    return threeLines;
}

function scrutinizeLine(line){
  var counter = 0;
  var scrutinizer = "";
  for(var i=0;i<line.length;++i){
    var lineElement = line[i];
    if(lineElement == undefined){
      counter += 1;
    }
  }
  if(counter>0){
    scrutinizer = "notcorrect";
  }
  if(scrutinizer != ""){return scrutinizer;}
  else{return undefined;}
}

function getLine(begin, end, oldLines){
  var line = [];
  for(var i = begin; i<end;++i){
    var possibleFields = checkArray[i];
    if(i<3){var field = getOneByRandom(possibleFields);}
    else{
      if(i<6){var field = getFieldForSecondLine(possibleFields);}
      else{var field = getFieldForMissingLine(oldLines, possibleFields, i);}
    }
    line.push(field);
    var deletion = manageDeletion(field);
  }
  return line;
}

function getFieldForSecondLine(possibleFields){
  var checkLastLine = getPossibleFromLastLine(possibleFields);
  if(checkLastLine == undefined){var field = getOneByRandom(possibleFields);}
  else{var field = parseInt(checkLastLine);}
  return field;
}

function getFieldForMissingLine(oldLines, possibleFields, i){
  if(computingRound==5){
    var remainingNumbers = checkAgainstNine(oldLines);
    var checkColumns = [columns[3], columns[4], columns[5]];
  }
  var doubledRemaining = getPotentialDoubleOccurrence(remainingNumbers, checkColumns);
  if(doubledRemaining == undefined){
    var field = getFieldIfNoDoubles(remainingNumbers, possibleFields);
  }
  else{
    var field = getFieldIfDoublesOccur(remainingNumbers,doubledRemaining,possibleFields, i);
  }
  return field;
}

function getFieldIfDoublesOccur(remainingNumbers,doubledRemaining,possibleFields, i){
  var fieldIndex = doubledRemaining[2];
  var specialElement = findSpecialElement(remainingNumbers, doubledRemaining);
  var deleteIndex = remainingNumbers.indexOf(specialElement);
  remainingNumbers.splice(deleteIndex,1);
  if(i+6==fieldIndex){var field = specialElement;}
  else{
    var lastLineNumbers = getRemainingLine(remainingNumbers, possibleFields);
    var field = getOneByRandom(lastLineNumbers);
  }
  return field;
}

function getFieldIfNoDoubles(remainingNumbers, possibleFields){
  var lastLineNumbers = getRemainingLine(remainingNumbers, possibleFields);
  var field = getOneByRandom(lastLineNumbers);
  return field;
}


function findSpecialElement(remainingNumbers, doubledRemaining){
  var specialElement = "";
  var onlyDoubles = [doubledRemaining[0], doubledRemaining[1]];
  for(var i=0;i<onlyDoubles.length;++i){
    var counter = 0; var doubleElement = onlyDoubles[i];
    for(var j=0;j<remainingNumbers.length;++j){
      var remainElement = remainingNumbers[j];
      if(remainElement==doubleElement){
        counter+=1;
      }
    }
    if(counter == 0){specialElement = remainElement;}
  }
  return specialElement;
}

function getPossibleFromLastLine(possibleFields){
  var nextField = " ";
  var lastLine = fillArray[5];
  for(var i=0;i<lastLine.length;++i){
    var lineElement = lastLine[i];
    for(var j=0;j<possibleFields.length;++j){
      var field = possibleFields[j];
      if(lineElement==field){nextField = lineElement;break;}
    }
  }
  if(nextField != " "){return nextField;}
}

function getRemainingLine(remainingNumbers, possibleFields){
  var possibleRemaining = [];
  for(var i=0;i<remainingNumbers.length;++i){
    var lineElement = remainingNumbers[i];
    for(var j=0;j<possibleFields.length;++j){
      var fieldElement = possibleFields[j];
      if(lineElement==fieldElement){possibleRemaining.push(lineElement);}
    }
  }
  return possibleRemaining;
}

function getPotentialDoubleOccurrence(remainingNumbers, checkColumns){
  var doubledInColumn = [];
  for(i=0;i<checkColumns.length;++i){
    var column = checkColumns[i];
    var concatRemaining = remainingNumbers.concat(column[i]);
    var checkDouble = getUniqueOrDouble(concatRemaining, doubled=1);
    if(checkDouble != undefined){
      if(checkDouble.length == 2){
          doubledInColumn.push(checkDouble[0], checkDouble[1], i);
      }
    }
  }
  if(doubledInColumn.length > 1){
    return doubledInColumn; 
  }
  else{return undefined;}
}

function manageDeletion(field){
  for(i=0;i<checkArray.length;++i){
    var check = checkArray[i];
    for(j=0;j<check.length;++j){
      var possibleDelete = check[j];
      if(field == possibleDelete){
        check.splice(j,1);
      }
    }
  }
}

function getCompareArray(rowIndex1, rowIndex2, iterator1, iterator2, i){
  var possible1 = fillArray[rowIndex1].concat(fillArray[rowIndex2]);
  if(i==iterator1){var possible2 = columns[4].concat(columns[5]);}
  else if(i==iterator2){var possible2 = columns[3].concat(columns[5]);} 
  else{var possible2 = columns[3].concat(columns[4]);}  
  var concatPossible = possible1.concat(possible2);
  
  var compareArray = getUniqueOrDouble(concatPossible, doubled=1);
  return compareArray;
}

function compareLinesAndColumns(){
  checkArray = [];
  for(var i=0;i<9;++i){
    if(i<3){
      var compareArray = getCompareArray(4, 5, 0, 1, i);
      checkArray.push(compareArray);
    }
    else{
      if(i<6){
        var compareArray = getCompareArray(3, 5, 3, 4, i);
        checkArray.push(compareArray);
      }
      else{
        var compareArray = getCompareArray(3, 4, 6, 7, i);
        checkArray.push(compareArray);
      }
    }
  }
}






/*FILL MISSING ELEMENTS FUNCTIONS FOR BLOCKS 3 AND 6-9*/

function fillWithMissingElements(first, second, third, array){
  var newBlock = [];
  var firstLine = checkAgainstNine(array[first]);
  var secondLine = checkAgainstNine(array[second]);
  var thirdLine = checkAgainstNine(array[third]);
  newBlock.push(firstLine[0],firstLine[1],firstLine[2]);
  newBlock.push(secondLine[0],secondLine[1],secondLine[2]);
  newBlock.push(thirdLine[0],thirdLine[1],thirdLine[2]);
  return newBlock;
}

function mixFilledArray(block){
  var newArray = [];
  var first = [block[0],block[1],block[2]];
  var second = [block[3],block[4],block[5]];
  var third = [block[6],block[7],block[8]];
  var filledSubarrays = [first, second, third];
  for(var i=0;i<filledSubarrays.length;++i){
    var subArray = filledSubarrays[i];
    var newSubarray = findRandomArray(subArray);
    newArray = newArray.concat(newSubarray);
  }
  return newArray;
}






/*6th AND 8th BLOCK FUNCTIONS*/

function chooseFromFilledElements(block, compareLines){

  var first = [block[0],block[1],block[2]];
  var second = [block[3],block[4],block[5]];
  var third = [block[6],block[7],block[8]];
  var checkLines = [compareLines[6], compareLines[7], compareLines[8]];
  var newlyFilledArray = [first, second, third];
  var checkForTriples = compareColumnsAndRows(checkLines, newlyFilledArray);
  if(checkForTriples == undefined){
    var array = [];
    for(var i =0;i<newlyFilledArray.length;++i){
      var filledElement = newlyFilledArray[i];
      var line = getFilledLine(filledElement, checkLines);
      array = array.concat(line);
    }
    return array;
  }
  else{restart = true;}
}

function compareColumnsAndRows(checkLines, newlyFilledArray){
  var tripled=0;
  for(var i=0;i<newlyFilledArray.length;++i){
    var filledElement=newlyFilledArray[i];
    for(var j=0;j<checkLines.length;++j){
      var lineElement=checkLines[j];
      var concatArray=lineElement.concat(filledElement);
      
      var checkDouble = getUniqueOrDouble(concatArray);

      if(checkDouble.length==3){tripled=1;}
    }
  }
  if(tripled){return "tripled";}
  else{return undefined;}
}


function getFilledLine(filledElement, checkLines){
  var marker = true;
  while(marker){
    var counter = 0;
    var checkElements = findRandomArray(filledElement);
    for(var j = 0; j<checkElements.length; ++j){
      var checkElement = checkElements[j];
      var checkLine = checkLines[j];
      var concatArray = [checkLine[0],checkLine[1],checkLine[2],checkElement];
      var checkDouble = getUniqueOrDouble(concatArray, doubled=1);
      if(checkDouble == undefined){counter += 1;}
      if(counter==3){marker = false;}
    }
  }
  return checkElements;
}






/*9th BLOCK FUNCTIONS*/

function getCommonNumbers(fillBlockColumns, fillBlockRows){
  var newArray = [];
  var allColumns = getSubarraysFromColumns(fillBlockColumns);
  var allRows = getSubarraysFromRows(fillBlockRows);
  for(var i=0;i<9;++i){
    var concatArray = getConcatForLastBlock(allColumns, allRows, i);
    var getDouble = getUniqueOrDouble(concatArray, doubled=1);
    if(getDouble != undefined){
      var field = getDouble[0];
      newArray.push(field);
    }
    else {restart = true;}
  }
  if(newArray.length == 9){return newArray;}
}

function getSubarraysFromRows(fillBlockRows){
  var row1 = [fillBlockRows[0], fillBlockRows[1], fillBlockRows[2]];
  var row2 = [fillBlockRows[3], fillBlockRows[4], fillBlockRows[5]];
  var row3 = [fillBlockRows[6], fillBlockRows[7], fillBlockRows[8]];
  var allRows = [row1, row2, row3];
  return allRows;
}

function getSubarraysFromColumns(fillBlockColumns){
  var column1 = [fillBlockColumns[0], fillBlockColumns[1], fillBlockColumns[2]];
  var column2 = [fillBlockColumns[3], fillBlockColumns[4], fillBlockColumns[5]];
  var column3 = [fillBlockColumns[6], fillBlockColumns[7], fillBlockColumns[8]];
  var allColumns = [column1, column2, column3];
  return allColumns;
}

function getConcatForLastBlock(allColumns, allRows, i){
  if(i<3){
      var row = allRows[0], column = allColumns[i];
  }
  else {
    if(i<6){var row = allRows[1], column = allColumns[i-3];}
    else{var row = allRows[2], column = allColumns[i-6];}
  }
  var concatArray = row.concat(column);
  return concatArray;
}






/*GENERAL FUNCTIONS USED FOR ALL BLOCKS*/

function prepareRows(prepareArray){
  for(var i=0;i<9;++i){
    var emptyArray = [];
    prepareArray.push(emptyArray);
  }
}

function prepareColumns(){
  for(var i=0;i<9;++i){
    var emptyArray = [];
    columns.push(emptyArray);
  }
}

function getOneByRandom(array){
  var arrayIndex = Math.floor(Math.random() * array.length);
  var arrayElement = array[arrayIndex];
  return arrayElement;
}

function findRandomArray(array){
  var newArray = [], emptyArray = [];
  var deleteArray = array.concat(emptyArray);
  while(deleteArray.length != 0){
    var arrayIndex = Math.floor(Math.random() * deleteArray.length);
    var arrayElement = deleteArray[arrayIndex];
    newArray.push(arrayElement);
    
    deleteArray.splice(arrayIndex, 1);
  }
  return newArray;
}

function getUniqueOrDouble(array, doubled) {
  var hash = {}, uniqueChoices = [], doubleChoices = [];
  for ( var i = 0; i < array.length; ++i ) {
      if ( !hash.hasOwnProperty(array[i]) ) { 
          hash[ array[i] ] = true;
          uniqueChoices.push(array[i]);
      }
      else {doubleChoices.push(array[i]);}
  }
  if(doubled && doubleChoices.length > 0){return doubleChoices; }
  else if(!doubled){return uniqueChoices;}
  else{return undefined;}
}

function checkAgainstNine(array){
  var checkNineArray = [];
  for(var i=1; i<10; ++i){
    var marker = 0;
    for(var j=0;j<array.length; ++j){
      var check = array[j];
      if(i!=check){marker += 1;}
      else{marker -= 1;}
    }
    if(marker == array.length){
      checkNineArray.push(i);
    }
  }
  if(checkNineArray.length > 0){return checkNineArray;}
}

function transformToBlock(columnBlock){
  var first = [], second = [], third = [];
  for(var i=0;i<columnBlock.length;++i){
    blockElement = columnBlock[i];
    if(i==0||i==3||i==6){first.push(blockElement);}
    else if(i==1||i==4||i==7){second.push(blockElement);}
    else{third.push(blockElement);}
  }
  var transformedBlock = first.concat(second.concat(third));
  return transformedBlock;
}

function pushToColumns(array, blockNumber){
  if(blockNumber == 1 || blockNumber == 4 || blockNumber == 7){
    pushBlockColumn(array, 0, 1, 2);
  }
  else if(blockNumber == 2 || blockNumber == 5 || blockNumber == 8){
    pushBlockColumn(array, 3, 4, 5);
  }
  else if(blockNumber == 3 || blockNumber == 6 || blockNumber == 9){
    pushBlockColumn(array, 6, 7, 8);
  }
}

function pushBlockColumn(array, column1, column2, column3){
  for(var i=0;i<array.length;++i){
    var arrayElement = array[i];
    if(i%3==0){var columnNumber = column1;}
    else{
      if(i%3==1){var columnNumber = column2;}
      else{var columnNumber = column3;}
    }
    columns[columnNumber].push(arrayElement);
  }
}

function pushToRows(array, blockNumber){
  if(parseInt(blockNumber) <= 3 ){
    pushBlockRow(array, rows, 0, 1, 2);
  }
  else {
    if(parseInt(blockNumber) <= 6){
      pushBlockRow(array, rows, 3, 4, 5);
    }
    else{
      pushBlockRow(array, rows, 6, 7, 8);
    }
  }
  
}

function pushBlockRow(blockRowArray, store, row1, row2, row3){
  for(var j=0;j<blockRowArray.length;++j){
    var rowElement = blockRowArray[j];
    if(j<3){var rowNumber = row1;}
    else{
      if(j<6){var rowNumber = row2;}
      else{var rowNumber = row3;}
    }
    store[rowNumber].push(rowElement);
  }
}

function showMessage(message){
    document.getElementById("message1").innerHTML = message;
}

function visualizeRows(){
  if(computingRound <= 4){
    var begin = 0, end = 3;
  }
  else if(computingRound > 4){
    if(computingRound < 8){
      var begin = 3, end = 6;
    }
    else{
      var begin = 6, end = 9;
    }
  }
  for(var i=begin;i<end;++i){
      var ausgabe = "ausgabe" + (i+1);
      var row = rows[i];
      document.getElementById(ausgabe).innerHTML = row;
  }
}

