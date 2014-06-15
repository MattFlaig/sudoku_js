var computingRound = 1;
var columns = [];
var rows = [];
//var checkColumns = [];
//var checkRows = [];
var fillArray = [];



function manageComputation(){
  prepareRows(rows);
  prepareColumns();
  computeFirstBlock();
  computeSecondBlock();
  computeThirdBlock();
}



function computeFirstBlock(){
  prepareRows(fillArray);
  //alert(checkRows); 
  var arrayOfNines = [1,2,3,4,5,6,7,8,9];
  var firstBlock = findRandomArray(arrayOfNines);
  //alert(checkRows); 
  var blockNumber = 1;
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
  var secondBlock = getNextBlock();
  
   var blockNumber = 2;
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
  var thirdBlock = fillWithMissingElements();
  
   var blockNumber = 3;
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



function prepareRows(array){
  for(var i=0;i<9;++i){
    var emptyArray = [];
    array.push(emptyArray);
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

function getNextBlock(){
  //var nextBlock = [];
  //var stillThere = fillArray[0].concat(fillArray[1]);
  var firstTwoLines = getFirstTwoLines();
  var allLines = insertLastLine(firstTwoLines);
  return allLines;
  //alert(firstTwoLines);

}

function getFirstTwoLines(){
  var lines = [];
  if(computingRound == 2){
    var stillThere = fillArray[0].concat(fillArray[1]);
    var first = fillArray[0], second = fillArray[1];
  }
  lines = getfirstTwoFields(second, stillThere);
  var thirdField = getThirdField(lines, first);
  lines.push(thirdField);
  stillThere = updateStillThere(lines, stillThere);
  var nextLine = findRandomArray(stillThere);
  lines.push(nextLine[0],nextLine[1], nextLine[2]);
  return lines;
}

function updateStillThere(lines, stillThere){
  for(var i = 0; i<lines.length;++i){
    var lineElement = lines[i];
    for(var j=0; j<stillThere.length;++j){
      stillThereElement = stillThere[j];
      if(lineElement == stillThereElement){
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

function randomChoice(array){
  var arrayIndex = Math.floor(Math.random() * array.length);
  return arrayIndex;
}

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



// function computeCheckRows(){
//   var array = [1,2,3,4,5,6,7,8,9];
//   for(var i=1;i<10;++i){
//     checkRows.push(array);
//   }
// }

function computeCheckColumns(){
  var array = [1,2,3,4,5,6,7,8,9];
  for(var i=1;i<10;++i){
    checkColumns.push(array);
  }
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
  
}

function pushFirstBlockRow(array, store){
  for(var j=0;j<array.length;++j){
      var rowElement = array[j];
      if(j<3){var rowNumber = 0;}
      else{
        if(j<6){var rowNumber = 1;}
        else{var rowNumber = 2;}
      }
      store[rowNumber].push(rowElement);
    }
}

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

function showMessage(message){
    document.getElementById("message1").innerHTML = message;
}

function visualizeRows(){
  if(computingRound <= 4){
    var begin = 0, end = 3;
  }
  for(var i=begin;i<end;++i){
      var ausgabe = "ausgabe" + (i+1);
      var row = rows[i];
      document.getElementById(ausgabe).innerHTML = row;
  }
}