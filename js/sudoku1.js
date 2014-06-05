var sudokuArray = [];
var blockArray = [];
var firstBlock = [];
var secondBlock = [];
var thirdBlock = [];
var missingElements = [];
var columnArray = [[],[],[],[],[],[],[],[],[]];



// var missingElements = [];
// var doubledElements = [];

  function manageComputation(){
  	sudokuArray = [], blockArray = [], missingElements = [];
    firstBlock = [], secondBlock = [], thirdBlock = [];
    makeSudokuArray();
    getBlock();
    manageBlocks();
    changeElements(arrayIndex=0);
    getColumns();
    continueBlocks();
  }

  function makeSudokuArray(){
    sudokuArray = [];
    for(var i=1;i<4;++i){
      var ausgabe = "ausgabe" + i;
      var randomArray = findRandomArray();
      sudokuArray.push(randomArray);
      loadView(ausgabe, randomArray);
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

  function getBlock(){
    firstBlock = [], secondBlock = [], thirdBlock = [];
    
  	for(var i=0;i<sudokuArray.length;++i){
      var row = sudokuArray[i];
      pushToBlock(row);
    }
  }

  function pushToBlock(array){
  	
    for(var i=0;i<array.length;++i){
      var blockElement = array[i];
      //alert("blockElement: " + blockElement);
      if(i<3){firstBlock.push(blockElement);}
      else{
        if(i<6){secondBlock.push(blockElement);}
        else{thirdBlock.push(blockElement);}
      }
    }
    //alert("firstblock: " + firstBlock);
  }
  

  function loadView(ausgabe, array){
    document.getElementById(ausgabe).innerHTML = array;
  }

  function manageBlocks(){
    
  	fillBlockArray();
    var counter = 0;

    for(i=0;i<blockArray.length;++i){
    	var block = blockArray[i];
    	//alert("block: " + block);
    	var check = checkAgainstNine(block);
      if(check != undefined){
    	  missingElements.push(check);
    	  counter += check.length
      }
    }
    //alert(counter);
    
    if(counter >= 3){manageComputation();}
  }

  function fillBlockArray(){
    blockArray = [];
    blockArray.push(firstBlock);
    blockArray.push(secondBlock);
    blockArray.push(thirdBlock);
    //alert("all blocks: " + blockArray);
  }

  function checkAgainstNine(array){
    var checkArray = [];
    for(var i=1; i<10; ++i){
    var marker = 0;
      for(var j=0;j<array.length; ++j){
        var check = array[j];
        if(i!=check){
          marker += 1;
        }
        else{
          marker -= 1;
        }
      }
      if(marker == array.length){
        checkArray.push(i);
      }
    }
    //if(signal){alert("checkArray: " + checkArray);}
    if(checkArray.length > 0){return checkArray;}
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
    if(doubleChoices.length > 0){return doubleChoices;}
    else if(!doubled){return uniqueChoices;}
    else{return undefined;}
  }

  function changeElements(arrayIndex){
  	  var block = blockArray[arrayIndex];
  	  var check = checkAgainstNine(block);
      if(check != undefined){
    	  var doubledElement = getUniqueOrDouble(block, doubled=1);
        var blockIndex = block.indexOf(doubledElement[0]);
        var rowIndex = parseInt(blockIndex / 3);
        var row = sudokuArray[rowIndex];
        var checkIndex = row.indexOf(check[0]);
        var doubledIndex = row.indexOf(doubledElement[0]);

        findChangeBlock(checkIndex, check, doubledIndex, doubledElement, rowIndex, row, block);
      }
      else{
        if(arrayIndex < 1){
          changeElements(arrayIndex=1);
        }
      }
  }


function findChangeBlock(checkIndex, check, doubledIndex, doubledElement, rowIndex, row, block){
  if(checkIndex > 5){
    changeInLastBlock(checkIndex, check, doubledIndex, doubledElement, rowIndex, row, block);
  }
  else{
    changeInNextBlock(checkIndex, check, doubledIndex, doubledElement, rowIndex, row, block);
  }
}

function changeInNextBlock(checkIndex, check, doubledIndex, doubledElement, rowIndex, row, block){
  var checkNextBlock = checkAgainstNine(blockArray[1]);
  blockChange(checkNextBlock, checkIndex, check, doubledIndex, doubledElement, rowIndex, row, block);
}

function changeInLastBlock(checkIndex, check, doubledIndex, doubledElement, rowIndex, row, block){
  var checkLastBlock = checkAgainstNine(blockArray[2]);
  blockChange(checkLastBlock, checkIndex, check, doubledIndex, doubledElement, rowIndex, row, block);
}

function blockChange(checkBlock, checkIndex, check, doubledIndex, doubledElement, rowIndex, row, block){
  if(checkBlock != undefined){
    if(checkBlock[0] == doubledElement[0]){
      manageChange(checkIndex, check, doubledIndex, doubledElement, rowIndex, row);
    }
  }
  else {
    alternativeChange(block, check, doubledElement);
  }
}

function manageChange(checkIndex, check, doubledIndex, doubledElement, rowIndex, row){
  row.splice(checkIndex, 1, doubledElement);
  row.splice(doubledIndex, 1, check);
  var ausgabe = "ausgabe" + (rowIndex+1);
  loadView(ausgabe, row);
  getBlock();
  fillBlockArray();
}


function alternativeChange(block, check, doubledElement){
  var blockNextIndex = block.lastIndexOf(doubledElement[0]);
  var rowNextIndex = parseInt(blockNextIndex / 3);
  var rowNext = sudokuArray[rowNextIndex];
  var checkNextIndex = rowNext.indexOf(check[0]);
  var doubledNextIndex = rowNext.indexOf(doubledElement[0]);
  manageChange(checkNextIndex, check, doubledNextIndex, doubledElement, rowNextIndex, rowNext);
}


function getColumns(){
  columnArray = [[],[],[],[],[],[],[],[],[]];
  for(var i=0;i<sudokuArray.length;++i){
    var getColumnArray = sudokuArray[i];
    pushColumns(getColumnArray);
  }
}


  function pushColumns(getColumnArray){
    for(var j=0; j<getColumnArray.length; ++j){
      var columnElement = getColumnArray[j];
      for(k=0;k<9;++k){
        if(j==k){
          columnArray[k].push(columnElement);
        }
      }
    }
  }


/*BLOCKS 4 AND HIGHER*/

// function getNewLine(counter){
//   var array = [1,2,3,4,5,6,7,8,9];
//   var newArray = [];
//   while(array.length != 0){
//     var arrayIndex = Math.floor(Math.random() * array.length);
//     var arrayElement = array[arrayIndex];
//     newArray.push(arrayElement);
//     array.splice(arrayIndex, 1);
//   }
//   //return newArray
//   //alert(newArray);
//   var lineArray = compareForDoubles(newArray);
//   if(lineArray != undefined){return lineArray;}
// }

// function compareForDoubles(newArray){
// var doubleCounter = 0;
//   for(var i = 0; i<columnArray.length;++i){
//     var column = columnArray[i];
//     //for(var j=0;j<newArray.length; ++j){
//     var element = newArray[i];
//     var elementArray = [];
//     elementArray.push(element);
//     var composedArray = elementArray.concat(column);
//     //alert("column: " + column);
//     //alert("composed: " + composedArray);
//     var checkDouble = getUniqueOrDouble(composedArray, doubled=1);
//     //alert(checkDouble);
//     if(checkDouble != undefined){
//       doubleCounter += 1;
//     }
//   }
//   if (doubleCounter < 3){return newArray;}
//   else {getNewLine();}
// }

// // var columnComparison = getComparisonArray(counter);
// // var possibleNumbers = checkAgainstNine(columnComparison);
// // var choiceElement = randomChoice(possibleNumbers);

// //     if(possibleNumbers.length > 0) {
// //       if(k>0){ 
// //         possibleNumbers = manageNewLine(newLine, possibleNumbers);
// //         var choiceElement = randomChoice(possibleNumbers);
// //         alert("choice: " + choiceElement)
// //         if(!isNaN(parseInt(choiceElement))){
// //           newLine.push(choiceElement);
// //         }
// //       }
// //       else{
// //         // var choiceElement = randomChoice(possibleNumbers);
// //         // newLine.push(choiceElement);
// //         getNewLine(columnNumber=0);
// //       }
// //     }
// //   }
// //   if(newLine.length == 9){
// //     alert("return: " + newLine);
// //     return newLine;
// //   }
// // }

// // function manageNewLine(newLine, possibleNumbers){
// //   for(var i=0; i<newLine.length; ++i){
// //     var newLineElement = newLine[i];
// //     //alert("newLineElement: " + newLineElement);

// //     for(var j=0; j<possibleNumbers.length; ++j){
// //       var possibleElement = possibleNumbers[j];
// //       if(newLineElement == possibleElement){
// //         possibleNumbers.splice(j, 1);
// //       }
// //     }
// //   }
// //   return possibleNumbers;
// // }

// // function randomChoice(possibleNumbers){
// // var choiceIndex = Math.floor(Math.random() * possibleNumbers.length);
// // var choiceElement = possibleNumbers[choiceIndex];
// // return choiceElement;
// // }

// function continueBlocks(){
//   //var newLine = [];
//   var blockLine = getNewLine();
//   var ausgabe = "ausgabe" + 4;
//   //sudokuArray.push(blockLine);
//   loadView(ausgabe, blockLine);
// }



// // function getComparisonArray(counter){
// //     var comparisonArray = [];
// //     for(var i=0;i<sudokuArray.length;++i){
// //       var row = sudokuArray[i];

// //       for(var j=0;j<row.length;++j){
// //         var element = row[j];
// //         if(j==counter){comparisonArray.push(element);}
// //       }
// //     }
// //     return comparisonArray;
// // }

function getColumns(){
  columnArray = [[],[],[],[],[],[],[],[],[]];
  for(var i=0;i<sudokuArray.length;++i){
    var getColumnArray = sudokuArray[i];
    pushColumns(getColumnArray);
  }
}


  function pushColumns(getColumnArray){
    for(var j=0; j<getColumnArray.length; ++j){
      var columnElement = getColumnArray[j];
      for(k=0;k<9;++k){
        if(j==k){
          columnArray[k].push(columnElement);
        }
      }
    }
  }