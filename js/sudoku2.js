var computingRound = 1;
var columns = [];
var rows = [];
var checkColumns = [];
var checkRows = [];



function manageComputation(){
  prepareRows();
  prepareColumns();
  computeCheckRows(); 
  computeCheckColumns(); 

  computeFirstBlock();
  computeSecondBlock();
}


function computeFirstBlock(){
  
  var firstBlock = findRandomArray();
  var blockNumber = 1;
  var messageFirst = "First Block successfully computed!";
  pushToRows(firstBlock, blockNumber);
  pushToColumns(firstBlock, blockNumber);
  deleteFromCheckRows(blockNumber);
  deleteFromCheckColumns(blockNumber);
  showMessage(messageFirst);
  computingRound += 1;
  visualizeRows();
}

function computeSecondBlock(){
  var secondBlock = findSecondBlock();
  
  var blockNumber = 2;
  var messageSecond = "Second Block successfully computed!";
  pushToRows(secondBlock, blockNumber);
  pushToColumns(secondBlock, blockNumber);
  deleteFromCheckRows(blockNumber);
  deleteFromCheckColumns(blockNumber);
  showMessage(messageSecond);//alert(secondBlock);
  computingRound += 1;
  visualizeRows();
}

function prepareRows(){
  for(var i=0;i<9;++i){
    var emptyArray = [];
    rows.push(emptyArray);
  }
}

function prepareColumns(){
  for(var i=0;i<9;++i){
    var emptyArray = [];
    columns.push(emptyArray);
  }
}

function findRandomArray(){
  var array = [1,2,3,4,5,6,7,8,9];
  var newArray = [];
  while(array.length != 0){
    var arrayIndex = Math.floor(Math.random() * array.length);
    var arrayElement = array[arrayIndex];
    newArray.push(arrayElement);
    
    array.splice(arrayIndex, 1);
  }
  return newArray;
}

function findSecondBlock(){
  var array = [1,2,3,4,5,6,7,8,9], newArray = [];
  while(array.length != 0){
    var arrayIndex = randomChoice(array);
    var arrayElement = array[arrayIndex];
    var possibleElements = getPossibleElements(newArray);
    //alert("possible after compute: " + possibleElements);
    
    if(possibleElements != undefined){
      var cleanedElements = cleanElements(possibleElements, newArray);
      for(i=0;i<cleanedElements.length;++i){
        var possible = cleanedElements[i];
        if(possible == arrayElement){
          newArray.push(arrayElement);
          array.splice(arrayIndex, 1);
        }
      }
    }
    else{
      findSecondBlock();
    }
  }
  return newArray;
}

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

function getPossibleElements(newArray){
  if(newArray.length < 3){
    var possibleElements = checkAgainstNine(rows[0]);
  }
  else{
    var concatElements = concatAndUnique(newArray);
    var possibleElements = checkAgainstNine(concatElements);
  }
  //alert("possible: " + possibleElements);
  return possibleElements;
}

function concatAndUnique(newArray){
  if(newArray.length < 6){
    var concatElements = rows[1].concat(newArray);
    var uniqueElements = getUniqueOrDouble(concatElements);
  }
  else{
    var concatElements = rows[2].concat(newArray);
    var uniqueElements = getUniqueOrDouble(concatElements);
  }
  //alert("unique: " + uniqueElements);
  return uniqueElements;
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



function computeCheckRows(){
  for(var i=1;i<10;++i){
    var emptyArray = [];
    var arrayOfNine = checkAgainstNine(emptyArray);
    checkRows.push(arrayOfNine);
  }
}

function computeCheckColumns(){
  for(var i=1;i<10;++i){
    var emptyArray = [];
    var arrayOfNine = checkAgainstNine(emptyArray);
    checkColumns.push(arrayOfNine);
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
    pushFirstBlockRow(array);
  }
  
}

function pushFirstBlockRow(array){
  for(var j=0;j<array.length;++j){
      var rowElement = array[j];
      if(j<3){var rowNumber = 0;}
      else{
        if(j<6){var rowNumber = 1;}
        else{var rowNumber = 2;}
      }
      rows[rowNumber].push(rowElement);
    }
}

function deleteFromCheckColumns(blockNumber){
  if(blockNumber == 1){var begin = 0, end = 3;}
  else if(blockNumber == 2){var begin = 4, end = 7;}
  for(var i=begin;i<end;++i){
    var checkColumn = checkColumns[i];
    var column = columns[i];
    for(var j=begin;j<end; ++j){
      var columnElement = column[j];
      var elementIndex = checkColumn.indexOf(columnElement);
      checkColumn.splice(elementIndex, 1);
    }
  } 
  
}

function deleteFromCheckRows(blockNumber){
  if(blockNumber <= 3){
    var begin = 0, end = 3;
    for(var i=begin;i<end;++i){
      var checkRow = checkRows[i];
      var row = rows[i];
      for(var j=begin;j<end; ++j){
      var rowElement = row[j];
      var elementIndex = checkRow.indexOf(rowElement);
      checkRow.splice(elementIndex, 1);
      }
    } 
  }
}

function showMessage(message){
    document.getElementById("message1").innerHTML = message;
}

function visualizeRows(){
  if(computingRound < 4){
    var begin = 0, end = 3;
  }
  for(var i=begin;i<end;++i){
      var ausgabe = "ausgabe" + (i+1);
      var row = rows[i];
      document.getElementById(ausgabe).innerHTML = row;
  }
}