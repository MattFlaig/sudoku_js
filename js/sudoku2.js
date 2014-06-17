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
  var thirdBlock = fillWithMissingElements();
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
  var fourthBlock = getFourthBlock();
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
  
  
  // var messageFifth = "Fifth Block successfully computed!";
  // pushToRows(fifthBlock, blockNumber);
  // pushToColumns(fifthBlock, blockNumber);

  // showMessage(messageFifth);//alert(secondBlock);
  // computingRound += 1;
  // pushSecondBlockRow(fifthBlock, fillArray);
  //visualizeRows();
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
    var firstTwoLines = compareLinesAndColumns();
    
  }

}

function compareLinesAndColumns(block){

  for(var i=0;i<9;++i){
    if(i<3){
      var possible1 = fillArray[4].concat(fillArray[5]);
      alert("possible1: " + possible1);
      var compareArray = getCompareArray(possible1, i+3);
      checkArray.push(compareArray);
    }
    else{
      if(i<6){
        var possible2 = fillArray[3].concat(fillArray[5]);
        var compareArray = getCompareArray(possible2, i);
        checkArray.push(compareArray);
      }
      else{
        var possible3 = fillArray[3].concat(fillArray[4]);
        var compareArray = getCompareArray(possible3, i-3);
        checkArray.push(compareArray);
      }
    }
  }

  
  
  // var flag = true;
  // while(flag){
  //   var firstTwoLines = getFirstTwoLines();
  //   alert("before: " + firstTwoLines);
  //   var firstLine = [firstTwoLines[0], firstTwoLines[1], firstTwoLines[2]];
  //   var secondLine = [firstTwoLines[3], firstTwoLines[4], firstTwoLines[5]];
  //   var comparisonColumns = [columns[3], columns[4], columns[5]];
  //   var doubledIndexes = findDoubles(comparisonColumns, firstLine);
  //   alert("indexes: " + doubledIndexes);
  //   //if(doubledIndexes.length<3){
  //     var cleanedFirstLine = changeDoubles(firstLine, doubledIndexes);
  //     var cleanedLines = cleanedFirstLine.concat(secondLine);
  //     if(cleanedLines.length == 6){flag = false;}
  //   //}
    
  // } 
  //return cleanedLines;
}



function getCompareArray(possible, columnNumber){
  var column = columns[columnNumber];
  alert("column: " + column);
  for(var l = 0; l<possible.length;++l){
    var possibleItem = possible[l];
    for(var k = 0; k<column.length;++k){
      var columnItem = column[k];
    
      if(columnItem==possibleItem){
        possible.splice(l,1);
      }
    }
  }
  alert("possible: " + possible);
  return possible;
}

// function changeDoubles(line, doubledIndexes){

//   if(doubledIndexes != []){
//     for(var i=0; i<doubledIndexes.length; ++i){
//     var index = doubledIndexes[i];
//       if(doubledIndexes.length == 1){ 
//         if(index <= 1){
//           line.splice(index,2,line[i+1], line[index]);
//         }
//         else{
//           line.splice((index-1),2,line[index], line[index+1]);
//         }
//       }
//       else if(doubledIndexes.length == 2){
//         if(index == 1 || (index+1)==1){
//           line.splice(index,2,line[index+1], line[index]);
//         }
//         // else if(index == doubledIndexes[index+1]){

//         // }
        
//         else{
//           line.splice(index,3,line[index+2], line[index+1], line[index]);
//         }
//       }
//       // else{
        

//       // }
//     }
//   }
//   alert("line:" + line);
//   return line;
// }

// function findDoubles(comparisonColumns, line){
//   var indexArray = [];
//   for(var i=0;i<comparisonColumns.length;++i){
//     var column = comparisonColumns[i];
//     //for(var j=0;j<line.length;++j){
//       //var lineElement = line[j];

    
//       var lineArray = [line[i]];
//       var compareArray = column.concat(lineArray);
//       var checkDouble = getUniqueOrDouble(compareArray, doubled=1);
//       if(checkDouble != undefined){
//         indexArray.push(i);
//         //counter+=1;
//       }
//     //}
//     //if(i==2 && counter <= 2){flag=false;}
//   }
//    return indexArray;
// }

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

function fillWithMissingElements(){
  var thirdBlock = [];
  var firstLine = checkAgainstNine(rows[0]);
  var secondLine = checkAgainstNine(rows[1]);
  var thirdLine = checkAgainstNine(rows[2]);
  thirdBlock.push(firstLine[0],firstLine[1],firstLine[2]);
  thirdBlock.push(secondLine[0],secondLine[1],secondLine[2]);
  thirdBlock.push(thirdLine[0],thirdLine[1],thirdLine[2]);
  return thirdBlock;
}

function getFourthBlock(){
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

// function getFifthBlock(){
//   var fifthBlock = [];
//   for(var i=1;i<10;++i){
//     var indexNumber = (i % 3);
//     if(indexNumber==0){var addingNumber = 5;}
//     else{var addingNumber = 2;}

//     var stillPossibleColumn = checkAgainstNine(columns[indexNumber+addingNumber]);
//     var stillPossibleRow = checkAgainstNine(rows[indexNumber+addingNumber]);
//     var rowColumn = stillPossibleRow.concat(stillPossibleColumn);
//     var possibleTotal = getUniqueOrDouble(rowColumn, doubled=1);
    
//     if(fifthBlock != []){
//       possibleTotal = updateStillThere(fifthBlock, possibleTotal);
//     }
//     var nextElement = getOneByRandom(possibleTotal);
//     fifthBlock.push(nextElement);
//   }
//   alert(fifthBlock);
//   return fifthBlock;
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


// function computeCheckColumns(){
//   var array = [1,2,3,4,5,6,7,8,9];
//   for(var i=1;i<10;++i){
//     checkColumns.push(array);
//   }
// }

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



// function findSecondBlock(){
//   var array = [1,2,3,4,5,6,7,8,9], newArray = [];
//   while(array.length != 0){
//     var arrayIndex = randomChoice(array);
//     var arrayElement = array[arrayIndex];
//     var possibleElements = getPossibleElements(newArray);
//     //alert("possible after compute: " + possibleElements);
    
//     if(possibleElements != undefined){
//       var cleanedElements = cleanElements(possibleElements, newArray);
//       for(i=0;i<cleanedElements.length;++i){
//         var possible = cleanedElements[i];
//         if(possible == arrayElement){
//           newArray.push(arrayElement);
//           array.splice(arrayIndex, 1);
//         }
//       }
//     }
//     else{
//       findSecondBlock();
//     }
//   }
//   return newArray;
// }

// function cleanElements(possibleElements, newArray){
//   var cleanedElements = possibleElements;
  
//   if(newArray.length==5){
//     cleanArray = [newArray[3], newArray[4]];
//     for(i=0;i<rows.length;++i){
//       var row = rows[i];
//       var checkSame = row.concat(cleanArray);
//       var uniqueCheckSame = getUniqueOrDouble(checkSame);
//       if(uniqueCheckSame.length == 1){
//         var cleanIndex = cleanedElements.indexOf(uniqueCheckSame);
//         cleanedElements
//       }
//     }
//   }
//   return cleanedElements;
// }


// function getPossibleElements(newArray){
//   if(newArray.length < 3){
//     var possibleElements = checkAgainstNine(rows[0]);
//   }
//   else{
//     var concatElements = concatAndUnique(newArray);
//     var possibleElements = checkAgainstNine(concatElements);
//   }
//   //alert("possible: " + possibleElements);
//   return possibleElements;
// }

// function concatAndUnique(newArray){
//   if(newArray.length < 6){
//     var concatElements = rows[1].concat(newArray);
//     var uniqueElements = getUniqueOrDouble(concatElements);
//   }
//   else{
//     var concatElements = rows[2].concat(newArray);
//     var uniqueElements = getUniqueOrDouble(concatElements);
//   }
//   //alert("unique: " + uniqueElements);
//   return uniqueElements;
// }

// function deleteFromCheckColumns(blockNumber){
//   var columnBegin = 0; var columnEnd = 3;
//   if(blockNumber == 1){var begin = 0, end = 3;}
//   else if(blockNumber == 2){var begin = 3, end = 6;}
//   for(var i=begin;i<end;++i){
//     var checkColumn = checkColumns[i];
//     var column = columns[i];
//     for(var j=columnBegin;j<columnEnd; ++j){
//       var columnElement = column[j];
//       var elementIndex = checkColumn.indexOf(columnElement);

//       checkColumn.splice(elementIndex, 1);
//     }
//   } 
  
// }

// function deleteFromCheckRows(blockNumber){
//   // var rowBegin = 0; var rowEnd = 3;
//   // if(blockNumber == 1){var begin = 0, end = 3;}
//   // else if(blockNumber == 2){var begin = 3, end = 6;}

//   var row1 = rows[0];
//   var checkRow1 = checkRows[0];
//   alert(checkRow1);
//   for(var i = 0; i<3; ++i){
//     var rowElement = row1[i];
//     for(var j = 0; j<9; ++j){
//       var checkElement = checkRow1[j];
//       if(rowElement == checkElement){
//         checkRow1.splice(j,1);
//       }
//     }
//   }
//   alert(checkRows);
//   //if(blockNumber <= 3){
//     //var begin = 0, end = 3; 
//     // for(var i=rowBegin;i<rowEnd;++i){
//     //   var checkRow = checkRows[i];
//     //   alert("checkRows: " + checkRows[0]);
//     //   var row = rows[i];
//     //   for(var j=begin;j<end; ++j){
//     //     var rowElement = row[j];
//     //     //alert("rowElement: " + rowElement);
//     //     var elementIndex = checkRow.indexOf(rowElement);
//     //     var checkElement = checkRow[elementIndex];
//     //     alert("index: " + elementIndex);
//     //     if(rowElement == checkElement){
//     //       checkRow.splice(elementIndex, 1);
//     //     }
//     //   }
//     // } 
//   //}
// }
