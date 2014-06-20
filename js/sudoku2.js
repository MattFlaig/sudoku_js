var computingRound = 1;
var columns = [];
var rows = [];
var blocks = [];
var checkArray = [];
//var checkColumns = [];
//var checkRows = [];
var fillArray = [];



function manageComputation(){
  prepareRows(rows);
  prepareColumns();
  computeFirstBlock();
  computeSecondBlock();
  computeThirdBlock();
  computeFourthBlock();
  computeFifthBlock();
  computeSixthBlock();
}



function computeFirstBlock(){
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
  var thirdBlock = fillWithMissingElements(0,1,2);
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

  showMessage(messageFifth);//alert(secondBlock);
  computingRound += 1;
  pushSecondBlockRow(fifthBlock, fillArray);
  visualizeRows();
}

function computeSixthBlock(){
  var blockNumber = 6;
  var fillBlock = fillWithMissingElements(3,4,5);
  var sixthBlock = chooseFromFilledRowElements(fillBlock);
  blocks.push(sixthBlock);
   
   var messageSixth = "Sixth Block successfully computed!";
   pushToRows(sixthBlock, blockNumber);
   pushToColumns(sixthBlock, blockNumber);
   //deleteFromCheckRows(blockNumber);
   //deleteFromCheckColumns(blockNumber);
   showMessage(messageSixth);//alert(secondBlock);
   computingRound += 1;
   pushFirstBlockRow(sixthBlock, fillArray);
   visualizeRows();
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
  var newArray = [];
  while(array.length != 0){
    var arrayIndex = Math.floor(Math.random() * array.length);
    var arrayElement = array[arrayIndex];
    newArray.push(arrayElement);
    
    array.splice(arrayIndex, 1);
  }
  return newArray;
}

function getNextBlock(blockNumber){
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

function fillWithMissingElements(firstRow, secondRow, thirdRow){
  var newBlock = [];
  var firstLine = checkAgainstNine(rows[firstRow]);
  var secondLine = checkAgainstNine(rows[secondRow]);
  var thirdLine = checkAgainstNine(rows[thirdRow]);
  newBlock.push(firstLine[0],firstLine[1],firstLine[2]);
  newBlock.push(secondLine[0],secondLine[1],secondLine[2]);
  newBlock.push(thirdLine[0],thirdLine[1],thirdLine[2]);
  return newBlock;
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

// function chooseFromFilledRowElements(block){
//   var newBlock = [];
//   var possibleFields1 = [block[0],block[1], block[2]];
//   var possibleFields2 = [block[3],block[4], block[5]];
//   var possibleFields3 = [block[6],block[7], block[8]]; 
//   for(var i=0; i<block.length;++i){
//     if(i<3){
//       var field=getFieldForFilledRows(possibleFields1, i);
//       var deleteIndex = possibleFields1.indexOf(field);
//       possibleFields1.splice(deleteIndex, 1);
//     }
//     else{
//       if(i<6){
//         var field=getFieldForFilledRows(possibleFields2, i);
//         var deleteIndex = possibleFields2.indexOf(field);
//         possibleFields2.splice(deleteIndex, 1);
//       }
//       else{
//         var field=getFieldForFilledRows(possibleFields3, i);
//         var deleteIndex = possibleFields3.indexOf(field);
//         possibleFields3.splice(deleteIndex, 1);
//       }
//     }
//     newBlock.push(field);
//   }
//   return newBlock;
// }

// function getFieldForFilledRows(possibleFields, i){
//   var checkColumns = [columns[6], columns[7], columns[8]];
//   var doubledInFilled = getPotentialDoubleOccurrence(possibleFields, checkColumns);
//   if(doubledInFilled  == undefined){
//     var field = getFieldIfNoDoublesInFilled(possibleFields);
//   }
//   else{
//     var field = getFieldIfDoublesInFilled(doubledInFilled,possibleFields, i);
//   }
//   return field;

// }

// function getFieldIfNoDoublesInFilled(possibleFields){
//   var field = getOneByRandom(possibleFields);
//   return field;
// }

// function getFieldIfDoublesInFilled(doubledInFilled,possibleFields, i){
//   var fieldIndex = doubledInFilled[2];
//   //alert("index: " + columnIndex);
//   var specialElement = findSpecialElement(possibleFields, doubledInFilled);
//   var deleteIndex = possibleFields.indexOf(specialElement);
//   possibleFields.splice(deleteIndex,1);
//   if(i<3){
//     if(i==fieldIndex){var field = specialElement;}
//     else{var field = getOneByRandom(possibleFields);}
//   }
//   else{
//     if(i<6){
//       if(i+3==fieldIndex){var field = specialElement;}
//       else{var field = getOneByRandom(possibleFields);}
//     }
//     else{
//       if(i+6==fieldIndex){var field = specialElement;}
//       else{var field = getOneByRandom(possibleFields);}
//     }
//   }
//   return field;
// }



function randomChoice(array){
  var arrayIndex = Math.floor(Math.random() * array.length);
  return arrayIndex;
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

function pushToColumns(array, blockNumber){
  if(blockNumber == 1){
    pushFirstBlockColumn(array);
  }
  else if(blockNumber == 2){
    pushSecondBlockColumn(array);
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

function pushToRows(array, blockNumber){
  if(blockNumber <= 3 ){
    pushFirstBlockRow(array, rows);
  }
  else if(blockNumber > 3 ){
    pushSecondBlockRow(array, rows);
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

function showMessage(message){
    document.getElementById("message1").innerHTML = message;
}

function visualizeRows(){
  if(computingRound <= 4){
    var begin = 0, end = 3;
  }
  else if(computingRound > 4){
    var begin = 3, end = 6;
  }
  for(var i=begin;i<end;++i){
      var ausgabe = "ausgabe" + (i+1);
      var row = rows[i];
      document.getElementById(ausgabe).innerHTML = row;
  }
}

