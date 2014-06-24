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
  computeFirstSixBlocks();
  if(restart){
    manageComputation();
  }
  else{
    computeLastThreeBlocks();
  }
}

function computeFirstSixBlocks(){
  prepareRows(rows);
  prepareColumns();
  computeFirstBlock();
  computeSecondBlock();
  computeThirdBlock();
  computeFourthBlock();
  computeFifthBlock();
  computeSixthBlock();
}

function computeLastThreeBlocks(){
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
    else{
      createSudokuTable();
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
  //createSudokuTable();
}

function computeFifthBlock(){
  var blockNumber = 5;
  var fifthBlock = getCentralBlock();
  manageBlocks(fifthBlock, blockNumber);
  createSudokuTable();
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
    createSudokuTable();
  }
}

function manageBlocks(block, blockNumber){
  blocks.push(block);
  pushToRows(block, blockNumber);
  pushToColumns(block, blockNumber);
  computingRound += 1;
  //visualizeRows();
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
  tableGenerator += "<table>";
  for(var i=0;i<rows.length;++i){
    var row = rows[i];
    tableGenerator += "<tr>";
    for(var j=0;j<row.length;++j){
      var rowElement = row[j];
      tableGenerator += "<td>" + rowElement + "</td>";
    }
    tableGenerator+= "</tr>";
  }
  tableGenerator += "</table>";
  document.getElementById("sudokuTable").innerHTML = tableGenerator;
}




/*2nd, 4th AND 5th BLOCK FUNCTIONS*/

function getNewBlockFromGivenBlock(array){
  var block = [];
  var flag = true;
  while(flag){
    for(var i=1;i<10;++i){
      var indexNumber = i % 3;
      var nextElement = getNextElement(block, array, indexNumber);
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

function getNextElement(block, array, indexNumber){
  var lineNumber = getLineNumber(indexNumber);
  var stillPossible = getStillPossible(block, array, lineNumber);
  var nextElement = getOneByRandom(stillPossible);
  return nextElement;
}

function getLineNumber(indexNumber){
  if(computingRound<5){
    if(indexNumber==0){var lineNumber = 2;}
    else{var lineNumber = indexNumber - 1;}
  }
  else{
    if(indexNumber==0){var lineNumber = 5;}
    else{var lineNumber = indexNumber + 2;}
  }
  return lineNumber;
}

function getStillPossible(block, array, lineNumber){
  var stillPossible = checkAgainstNine(array[lineNumber]);
  if(block != []){
    stillPossible = updateStillThere(block, stillPossible);
  }
  return stillPossible;
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

function getCentralBlock(){
  var marker = true;
  while(marker){
    var columnBlock = getNewBlockFromGivenBlock(columns);
    var counter = getCounter(columnBlock);
    var checkForTriples = scrutinizeBlock(columnBlock);
    if(counter==9 && checkForTriples == undefined){marker=false;}
  }
  return columnBlock;
}

function getCounter(columnBlock){
  var counter = 0;
  for(var i=0;i<columnBlock.length;++i){
    var columnElement = [columnBlock[i]];
    if(i<3){var row = rows[3];}
    else{
      if(i<6){var row = rows[4];}
      else{var row = rows[5];}
    }
    var concatArray = columnElement.concat(row);
    var checkDouble = getUniqueOrDouble(concatArray, doubled=1);
    if(checkDouble == undefined){counter +=1;}
  }
  return counter;
}

function scrutinizeBlock(block){
  var scrutinizer = "";
  var compareArray = [fillArray[3], fillArray[4], fillArray[5]];
  var lines = getSubarraysFromRows(block);
  var triples = searchForTriples(compareArray, lines);
  if(triples != undefined){
    scrutinizer = "notcorrect";
  }
  if(scrutinizer != ""){return scrutinizer;}
  else{return undefined;}
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
  
  var filledSubarrays = getSubarraysFromRows(block);
  for(var i=0;i<filledSubarrays.length;++i){
    var subArray = filledSubarrays[i];
    var newSubarray = findRandomArray(subArray);
    newArray = newArray.concat(newSubarray);
  }
  return newArray;
}




/*6th AND 8th BLOCK FUNCTIONS*/

function chooseFromFilledElements(block, compareLines){

  var checkLines = [compareLines[6], compareLines[7], compareLines[8]];
  var newlyFilledArray = getSubarraysFromRows(block);
  var checkForTriples = searchForTriples(checkLines, newlyFilledArray);
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

function searchForTriples(checkLines, newlyFilledArray){
  var tripled=0;
  for(var i=0;i<newlyFilledArray.length;++i){
    var filledElement=newlyFilledArray[i];
    for(var j=0;j<checkLines.length;++j){
      var line=checkLines[j];
      var concatArray=line.concat(filledElement);
      
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