var computingRound = 1;
var columns = [];
var rows = [];
var blocks = [];
var checkArray = [];
var fillArray = [];
var restart = false;



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
    //alert("restart!");
    manageComputation();
  }
  else{
    computeSeventhBlock();
    computeEighthBlock();
    if(restart){
      //alert("restart!");
      manageComputation();
    }
    else{
      computeNinththBlock();
      if(restart){
        manageComputation();
      }
    }
  }
}



function computeFirstBlock(){
  //alert("first block");
  prepareRows(fillArray);
  var blockNumber = 1;
  //alert(checkRows); 
  var arrayOfNines = [1,2,3,4,5,6,7,8,9];
  var firstBlock = findRandomArray(arrayOfNines);
  blocks.push(firstBlock);
  //alert(checkRows); 
  
  var messageFirst = "First Block successfully computed!";
  pushToRows(firstBlock, blockNumber);
  //alert(checkRows); 
  pushToColumns(firstBlock, blockNumber);
  // deleteFromCheckRows(blockNumber);
  // //alert(checkRows); 
  // deleteFromCheckColumns(blockNumber);
  showMessage(messageFirst);
  computingRound += 1;
  pushFirstBlockRow(firstBlock, fillArray);
  visualizeRows();
}

function computeSecondBlock(){
  var blockNumber = 2;
  var secondBlock = getNextBlock(blockNumber);
  blocks.push(secondBlock);
   
   var messageSecond = "Second Block successfully computed!";
   pushToRows(secondBlock, blockNumber);
   pushToColumns(secondBlock, blockNumber);
   // deleteFromCheckRows(blockNumber);
   // deleteFromCheckColumns(blockNumber);
   showMessage(messageSecond);//alert(secondBlock);
   computingRound += 1;
   pushFirstBlockRow(secondBlock, fillArray);
   visualizeRows();
}

function computeThirdBlock(){
  var blockNumber = 3;
  var fillBlock = fillWithMissingElements(0,1,2,rows);
  var thirdBlock = mixFilledRows(fillBlock);
  blocks.push(thirdBlock);
   
   var messageThird = "Third Block successfully computed!";
   pushToRows(thirdBlock, blockNumber);
   pushToColumns(thirdBlock, blockNumber);
   //deleteFromCheckRows(blockNumber);
   //deleteFromCheckColumns(blockNumber);
   showMessage(messageThird);//alert(secondBlock);
   computingRound += 1;
   pushFirstBlockRow(thirdBlock, fillArray);
   visualizeRows();
}

function computeFourthBlock(){
  prepareRows(fillArray);
  var blockNumber = 4;
  var fourthBlock = getBlockFromFirstThreeColumns();
  blocks.push(fourthBlock);
  
  var messageFourth = "Fourth Block successfully computed!";
  pushToRows(fourthBlock, blockNumber);
  pushToColumns(fourthBlock, blockNumber);

  showMessage(messageFourth);//alert(secondBlock);
  computingRound += 1;
  //alert("fourthBlock: " + fourthBlock);
  pushSecondBlockRow(fourthBlock, fillArray);
  visualizeRows();
}

function computeFifthBlock(){
  var blockNumber = 5;
  var fifthBlock = getNextBlock(blockNumber);
  blocks.push(fifthBlock);
  
  var messageFifth = "Fifth Block successfully computed!";
  pushToRows(fifthBlock, blockNumber);
  pushToColumns(fifthBlock, blockNumber);
  //alert(columns);
  showMessage(messageFifth);//alert(secondBlock);
  computingRound += 1;
  pushSecondBlockRow(fifthBlock, fillArray);
  visualizeRows();
}

function computeSixthBlock(){
  //alert(columns[6]);
  var blockNumber = 6;
  var fillBlock = fillWithMissingElements(3,4,5, rows);
  var sixthBlock = chooseFromFilledElements(fillBlock, columns);
  if(restart==false){
    
    blocks.push(sixthBlock);
   
    var messageSixth = "Sixth Block successfully computed!";
    pushToRows(sixthBlock, blockNumber);
    pushToColumns(sixthBlock, blockNumber);
    //deleteFromCheckRows(blockNumber);
    //deleteFromCheckColumns(blockNumber);
    showMessage(messageSixth);//alert(secondBlock);
    computingRound += 1;
    //pushSecondBlockRow(sixthBlock, fillArray);
    visualizeRows();
  }
}

function computeSeventhBlock(){
  //alert(columns[6]);
  var blockNumber = 7;
  var fillBlock = fillWithMissingElements(0,1,2,columns);
  var seventhBlock = transformToBlock(fillBlock);
  blocks.push(seventhBlock);
   
  var messageSeventh = "Seventh Block successfully computed!";
  
  pushToRows(seventhBlock, blockNumber);
  //pushToColumns(seventhBlock, blockNumber);

  showMessage(messageSeventh);//alert(secondBlock);
  computingRound += 1;
  //pushThirdBlockRow(seventhBlock, fillArray);
  visualizeRows();
}

function computeEighthBlock(){
  //alert(columns[6]);
  var blockNumber = 8;
  var fillBlock = fillWithMissingElements(3,4,5,columns);
  //alert("filled: " + fillBlock);
  var chosenColumns = chooseFromFilledElements(fillBlock, rows);
  if(restart==false){
    var eighthBlock = transformToBlock(chosenColumns);
    blocks.push(eighthBlock);
     
    var messageEighth = "Eighth Block successfully computed!";
    
    pushToRows(eighthBlock, blockNumber);
    //pushToColumns(seventhBlock, blockNumber);

    showMessage(messageEighth);//alert(secondBlock);
    computingRound += 1;
    //pushThirdBlockRow(seventhBlock, fillArray);
    visualizeRows();
  }
}

function computeNinththBlock(){
  var blockNumber = 9;
  var fillBlockColumns = fillWithMissingElements(6,7,8,columns);
  var fillBlockRows = fillWithMissingElements(6,7,8,rows);
  //alert("filled: " + fillBlock);
  //var chosenColumns = chooseFromFilledElements(fillBlock, rows);
  var ninthBlock = getCommonNumbers(fillBlockColumns, fillBlockRows);
  if(restart==false){
    blocks.push(ninthBlock);
    var messageNinth = "Ninth Block successfully computed!";
    pushToRows(ninthBlock, blockNumber);
    //pushToColumns(seventhBlock, blockNumber);
    showMessage(messageNinth);//alert(secondBlock);
    computingRound += 1;
    //pushThirdBlockRow(seventhBlock, fillArray);
    visualizeRows();
  }
}



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

function findRandomArray(array){
  //var array = [1,2,3,4,5,6,7,8,9];
  //alert("random array!");
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

function getNextBlock(blockNumber){
  //alert("get next block!");
  if(blockNumber==2){
    var firstTwoLines = getFirstTwoLines();
    var allLines = insertLastLine(firstTwoLines);
    return allLines;
  }
  else if(blockNumber==5){
    var marker = true;
    while(marker){
      //alert("looping...");
      compareLinesAndColumns();
      var firstLine = getLine(0,3);
      var secondLine = getLine(3,6);
      var twoLines = firstLine.concat(secondLine);
      var thirdLine = getLine(6,9, twoLines);
      var allLines = [];
      allLines.push(firstLine, secondLine, thirdLine);
      var counter = 0;
      for(var i=0;i<allLines.length;++i){
        //alert(allLines[i]);
        var checkCorrect = scrutinizeLine(allLines[i]);
        //alert(checkCorrect);
        if(checkCorrect == undefined){
          counter += 1;
          if(counter==3){marker=false;}
        }
      }
    }
    var threeLines = twoLines.concat(thirdLine);
    return threeLines;
    //alert("nextBlock: " + threeLines);
    
  }
}

function scrutinizeLine(line){
  //alert("scrutinize!");
  var counter = 0;
  var scrutinizer = "";
  for(var i=0;i<line.length;++i){
    var lineElement = line[i];
    //alert("lineElement: " + lineElement);
    if(lineElement == undefined){
      counter += 1;
      //alert("counter " + counter);
    }

  }
  if(counter>0){
        //alert("not correct!");
        scrutinizer = "notcorrect";// break;
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
  //alert("index: " + columnIndex);
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
  //var column = columns[columnIndex];
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
  //else{return undefined;}
  
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
  //var doubleIndex = [];
  var doubledInColumn = [];
  for(i=0;i<checkColumns.length;++i){
    var column = checkColumns[i];
    var concatRemaining = remainingNumbers.concat(column[i]);
    var checkDouble = getUniqueOrDouble(concatRemaining, doubled=1);
    //alert("checkDouble: " + checkDouble);
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
  //return "done";
}

function compareLinesAndColumns(){
  checkArray = [];

  for(var i=0;i<9;++i){
    if(i<3){
      var possible1 = fillArray[4].concat(fillArray[5]);
      if(i==0){var possible2 = columns[4].concat(columns[5]);}
      else if(i==1){var possible2 = columns[3].concat(columns[5]);} 
      else{var possible2 = columns[3].concat(columns[4]);}  
      var concatPossible = possible1.concat(possible2);
      
      var compareArray = getUniqueOrDouble(concatPossible, doubled=1);
      checkArray.push(compareArray);
      //alert("compare1: " + comparedWithFirst);
    }
    else{
      if(i<6){
        var possible1 = fillArray[3].concat(fillArray[5]);
        if(i==3){var possible2 = columns[4].concat(columns[5]);}
        else if(i==4){var possible2 = columns[3].concat(columns[5]);} 
        else{var possible2 = columns[3].concat(columns[4]);}  
        var concatPossible = possible1.concat(possible2);
      
        var compareArray = getUniqueOrDouble(concatPossible, doubled=1);
        checkArray.push(compareArray);
        //alert("compare2: " + comparedWithSecond);
      }
      else{
        var possible1 = fillArray[3].concat(fillArray[4]);
        if(i==6){var possible2 = columns[4].concat(columns[5]);}
        else if(i==7){var possible2 = columns[3].concat(columns[5]);} 
        else{var possible2 = columns[3].concat(columns[4]);}  
        var concatPossible = possible1.concat(possible2);
      
        var compareArray = getUniqueOrDouble(concatPossible, doubled=1);

        checkArray.push(compareArray);

      }
    }
   
  }
}



function getFirstTwoLines(){
  var lines = [];
  if(computingRound == 2){
    var stillThere = fillArray[0].concat(fillArray[1]);
    var first = fillArray[0], second = fillArray[1];
  }
  else if(computingRound == 5){
    var stillThere = fillArray[3].concat(fillArray[4]);
    var first = fillArray[3], second = fillArray[4];
  }
  lines = getfirstTwoFields(second, stillThere);
  var thirdField = getThirdField(lines, first);
  lines.push(thirdField);
  stillThere = updateStillThere(lines, stillThere);
  var nextLine = findRandomArray(stillThere);
  lines.push(nextLine[0],nextLine[1], nextLine[2]);
  return lines;
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

function getfirstTwoFields(second, stillThere){
  var firstTwoFields = [];
  var firstField = getOneByRandom(second);
  var deleteIndex1 = stillThere.indexOf(firstField);
  stillThere.splice(deleteIndex1, 1);
  firstTwoFields.push(firstField);

  var secondField = getOneByRandom(stillThere);
  firstTwoFields.push(secondField);
  return firstTwoFields;
}

function getThirdField(lines, first){

  for(var i=0; i<lines.length;++i){
    var lineElement = lines[i];
    for(var j=0;j<first.length;++j){
      var firstElement = first[j];
      if(lineElement == firstElement){
        first.splice(j,1);
      }
    }
  }
  var thirdField = getOneByRandom(first);
 
  return thirdField;
}

function getOneByRandom(array){
  //alert("array: " + array);
  var arrayIndex = Math.floor(Math.random() * array.length);
  var arrayElement = array[arrayIndex];
  return arrayElement;
}

function insertLastLine(array){
  var firstLine = [array[0], array[1], array[2]];
  if(computingRound == 2){
    var lastFillLine = findRandomArray(fillArray[2]);
    var doubledArray = firstLine.concat(rows[0]);
  }
  var doubledInFirstLine = getUniqueOrDouble(doubledArray, doubled=1);
  while(lastFillLine.length != 0){
    if(doubledInFirstLine[0] == firstLine[1] || doubledInFirstLine[1] == firstLine[1]){
      var insertIndex = getIndexForMiddleDoubled(lastFillLine);
    }
    else{
      var insertIndex = getIndexForEndDoubled(lastFillLine);
    }
    var insertElement = lastFillLine.pop();
    array.splice(insertIndex, 0, insertElement);
  }
  return array;
}

function getIndexForMiddleDoubled(lastFillLine){
  //alert("middle");
  if(lastFillLine.length == 3){var insertIndex = findRandomIndex(2);}
  else if(lastFillLine.length == 2){var insertIndex = findRandomIndex(3);}
  else {var insertIndex = (findRandomIndex(3))+3;}
  return insertIndex;
}

function getIndexForEndDoubled(lastFillLine){
  //alert("end");
  if(lastFillLine.length == 3){var insertIndex = findRandomIndex(3);}
  else if(lastFillLine.length == 2){
    var throwCoin = findRandomIndex(2);
    if(throwCoin == 1){var insertIndex = 3;}
    else{var insertIndex = 4;}
  }
  else {var insertIndex = (findRandomIndex(3))+3;}
  //alert("insert at " + insertIndex);
  return insertIndex;
}

function findRandomIndex(endNumber){
  var arrayIndex = Math.floor(Math.random() * parseInt(endNumber));
  return arrayIndex;
}

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

function mixFilledRows(block){
  var newArray = [];
  var first = [block[0],block[1],block[2]];
  var second = [block[3],block[4],block[5]];
  var third = [block[6],block[7],block[8]];
  var filledRows = [first, second, third];
  for(var i=0;i<filledRows.length;++i){
    var row = filledRows[i];
    var newRow = findRandomArray(row);
    newArray = newArray.concat(newRow);
  }
  return newArray;
}

function getBlockFromFirstThreeColumns(){
  var block = [];
  var flag = true;
  while(flag==true){
    for(var i=1;i<10;++i){
      var indexNumber = i % 3;
      if(indexNumber==0){var columnNumber = 2;}
      else{var columnNumber = indexNumber - 1;}
      var stillPossible = checkAgainstNine(columns[columnNumber]);
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

function chooseFromFilledElements(block, compareLines){

  var first = [block[0],block[1],block[2]];
  //if(computingRound==8){alert("first: " + first);}
  var second = [block[3],block[4],block[5]];
  var third = [block[6],block[7],block[8]];
  var checkLines = [compareLines[6], compareLines[7], compareLines[8]];
  var newlyFilledArray = [first, second, third];
  var checkForTriples = compareColumnsAndRows(checkLines, newlyFilledArray);
  if(checkForTriples == undefined){
  //alert(checkColumns);
    var array = [];
    for(var i =0;i<newlyFilledArray.length;++i){
      var filledElement = newlyFilledArray[i];
      //alert("row: " + row);
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

// function restartComputation(){
//   alert("restart!");
//   //location.href = "sudoku2.html";
  
//   manageComputation();
// }



function getFilledLine(filledElement, checkLines){
  var marker = true;
  while(marker){
    var counter = 0;
    var checkElements = findRandomArray(filledElement);
    //alert("checkRow: " + checkRow);
    for(var j = 0; j<checkElements.length; ++j){
      var checkElement = checkElements[j];
      var checkLine = checkLines[j];
      var concatArray = [checkLine[0],checkLine[1],checkLine[2],checkElement];
      //if(computingRound==8){alert("concat: " + concatArray);}
      var checkDouble = getUniqueOrDouble(concatArray, doubled=1);
      //if(computingRound==8){alert("double: " + checkDouble);}
      if(checkDouble == undefined){counter += 1;/*alert("counter: " + counter);*/}
      if(counter==3){marker = false;}
    }
  }
  //if(computingRound==8){alert(checkElements);}
  return checkElements;
}

function transformToBlock(columnBlock){
  // var twoColumns = columnBlock[0].concat(columnBlock[1]);
  // var block = twoColumns.concat(columnBlock[2]);
  //alert(computingRound);
  var first = [], second = [], third = [];
  for(var i=0;i<columnBlock.length;++i){
    blockElement = columnBlock[i];
    if(i==0||i==3||i==6){first.push(blockElement);}
    else if(i==1||i==4||i==7){second.push(blockElement);}
    else{third.push(blockElement);}
  }
  var transformedBlock = first.concat(second.concat(third));
  //alert(transformedBlock);
  return transformedBlock;
}

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


// function randomChoice(array){
//   var arrayIndex = Math.floor(Math.random() * array.length);
//   return arrayIndex;
// }


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

function pushToColumns(array, blockNumber){
  if(blockNumber == 1 || blockNumber == 4){
    pushFirstBlockColumn(array);
  }
  else if(blockNumber == 2 || blockNumber == 5){
    pushSecondBlockColumn(array);
  }
  else if(blockNumber == 3 || blockNumber == 6){
    pushThirdBlockColumn(array);
  }
  
}

function pushFirstBlockColumn(array){
  for(var i=0;i<array.length;++i){
    var arrayElement = array[i];
    if(i%3==0){var columnNumber = 0;}
    else{
      if(i%3==1){var columnNumber = 1;}
      else{var columnNumber = 2;}
    }
    columns[columnNumber].push(arrayElement);
  }
}

function pushSecondBlockColumn(array){
  for(var i=0;i<array.length;++i){
    var arrayElement = array[i];
    if(i%3==0){var columnNumber = 3;}
    else{
      if(i%3==1){var columnNumber = 4;}
      else{var columnNumber = 5;}
    }
    columns[columnNumber].push(arrayElement);
  }
}

function pushThirdBlockColumn(array){
  if(array != undefined){
    for(var i=0;i<array.length;++i){
      var arrayElement = array[i];
      if(i%3==0){var columnNumber = 6;}
      else{
        if(i%3==1){var columnNumber = 7;}
        else{var columnNumber = 8;}
      }
      columns[columnNumber].push(arrayElement);
    }
  }
}

function pushToRows(array, blockNumber){
  if(parseInt(blockNumber) <= 3 ){
    pushFirstBlockRow(array, rows);
  }
  else {
    if(parseInt(blockNumber) <= 6){
      pushSecondBlockRow(array, rows);
    }
    else{
      pushThirdBlockRow(array, rows);
    }
  }
  
}

function pushFirstBlockRow(blockRowArray1, store){
  for(var j=0;j<blockRowArray1.length;++j){
    var rowElement = blockRowArray1[j];
    if(j<3){var rowNumber = 0;}
    else{
      if(j<6){var rowNumber = 1;}
      else{var rowNumber = 2;}
    }
    store[rowNumber].push(rowElement);
  }
}

function pushSecondBlockRow(blockRowArray2, store){
  //alert(blockRowArray2);
  if(blockRowArray2 != undefined){
    for(var j=0;j<blockRowArray2.length;++j){
      var rowElement = blockRowArray2[j];
      if(j<3){var rowNumber = 3;}
      else{
        if(j<6){var rowNumber = 4;}
        else{var rowNumber = 5;}
      }
      store[rowNumber].push(rowElement);
    }
  }
}

function pushThirdBlockRow(blockRowArray3, store){
  for(var j=0;j<blockRowArray3.length;++j){
    var rowElement = blockRowArray3[j];
    if(j<3){var rowNumber = 6;}
    else{
      if(j<6){var rowNumber = 7;}
      else{var rowNumber = 8;}
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

