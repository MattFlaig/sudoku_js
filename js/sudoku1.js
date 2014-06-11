var firstPhase = false;
var sudokuArray1 = [];
var blockArray1 = [];
var firstBlock1 = [];
var secondBlock1 = [];
var thirdBlock1 = [];
var missingElements = [];
var columnArray1 = [];




var secondPhase = false;
var sudokuArray2 = [];
var blockArray2 = [];
var firstBlock2 = [];
var secondBlock2 = [];
var thirdBlock2 = [];
var missingElements2 = [];
var columnArray2 = [];



  function manageComputation(phase){
    if(phase=='first'){
      firstPhase = true, columnArray1 = [];
    	sudokuArray1 = [], blockArray1 = [], missingElements = [];
      firstBlock1 = [], secondBlock1 = [], thirdBlock1 = [];
      makeSudokuArray(sudokuArray1, 1, 4);
      getBlock(sudokuArray1, firstBlock1, secondBlock1, thirdBlock1);
      manageBlocks(firstBlock1, secondBlock1, thirdBlock1, blockArray1);
    }
    else if(phase=='second'){
      firstPhase = false, secondPhase = true;
      sudokuArray2 = [], blockArray2 = [], columnArray2 = [];
      firstBlock2 = [], secondBlock2 = [], thirdBlock2 = [];
      makeSudokuArray(sudokuArray2, 4, 7);
      getBlock(sudokuArray2, firstBlock2, secondBlock2, thirdBlock2);
      manageBlocks(firstBlock2, secondBlock2, thirdBlock2, blockArray2);
    }
  }

  function makeSudokuArray(array, begin, end){
    //alert(begin);
    for(var i=begin;i<end;++i){
      var ausgabe = "ausgabe" + i;
      var randomArray = findRandomArray();
      array.push(randomArray);
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


  function getBlock(rowArray, firstBlock, secondBlock, thirdBlock){
    
  	for(var i=0;i<rowArray.length;++i){
      var row = rowArray[i];
      pushToBlock(row, firstBlock, secondBlock, thirdBlock);
    }
  }

  function pushToBlock(array, firstBlock, secondBlock, thirdBlock){
  	
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

  function manageBlocks(firstBlock, secondBlock, thirdBlock, blockArray){
    
  	fillBlockArray(firstBlock, secondBlock, thirdBlock, blockArray);
    var counter = 0;

    for(i=0;i<blockArray.length;++i){
    	var block = blockArray[i];
    	//alert("block: " + block);
    	var check = checkAgainstNine(block);
      if(check != undefined){
    	  //missingElements.push(check);
    	  counter += check.length
      }
    }
   
    
    if(counter >= 3){
      if (firstPhase){manageComputation('first');}
      else if(secondPhase){manageComputation('second');}
      
    }
    else{
      if (firstPhase){
        changeElements(arrayIndex=0, blockArray1, sudokuArray1);
        getColumns(sudokuArray1, columnArray1);
        giveFeedback();
      }
      else if(secondPhase){
        changeElements(arrayIndex=0, blockArray2, sudokuArray2);
        getColumns(sudokuArray2, columnArray2);
        compareForDoubles(columnArray1, columnArray2, begin=0, end=3);
      }
    }
  }



  function fillBlockArray(firstBlock, secondBlock, thirdBlock, blockArray){
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
    if(doubled && doubleChoices.length > 0){/*alert("doubled: " + doubleChoices);*/return doubleChoices; }
    else if(!doubled){return uniqueChoices;}
    else{return undefined;}
  }

  function changeElements(arrayIndex, blockArray, sudokuArray){
      //alert("changing!");
  	  var block = blockArray[arrayIndex];
  	  var check = checkAgainstNine(block);
      if(check != undefined){
    	  var doubledElement = getUniqueOrDouble(block, doubled=1);
        var blockIndex = block.indexOf(doubledElement[0]);
        var rowIndex = parseInt(blockIndex / 3);
        var row = sudokuArray[rowIndex];
        var checkIndex = row.indexOf(check[0]);
        var doubledIndex = row.indexOf(doubledElement[0]);

        findChangeBlock(checkIndex, check, doubledIndex, doubledElement, rowIndex, row, block, blockArray);
      }
      else{
        if(arrayIndex < 1){
          changeElements(arrayIndex=1, blockArray, sudokuArray);
        }
      }
  }


function findChangeBlock(checkIndex, check, doubledIndex, doubledElement, rowIndex, row, block, blockArray){
  if(checkIndex > 5){
    changeInLastBlock(checkIndex, check, doubledIndex, doubledElement, rowIndex, row, block, blockArray);
  }
  else{
    changeInNextBlock(checkIndex, check, doubledIndex, doubledElement, rowIndex, row, block, blockArray);
  }
}

function changeInNextBlock(checkIndex, check, doubledIndex, doubledElement, rowIndex, row, block, blockArray){
  var checkNextBlock = checkAgainstNine(blockArray[1]);
  blockChange(checkNextBlock, checkIndex, check, doubledIndex, doubledElement, rowIndex, row, block);
}

function changeInLastBlock(checkIndex, check, doubledIndex, doubledElement, rowIndex, row, block, blockArray){
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
    if(firstPhase){
      alternativeChange(block, check, doubledElement, sudokuArray1);
    }
    else if(secondPhase){
      alternativeChange(block, check, doubledElement, sudokuArray2);
    }
  }
}

function manageChange(checkIndex, check, doubledIndex, doubledElement, rowIndex, row){
  row.splice(checkIndex, 1, doubledElement[0]);
  row.splice(doubledIndex, 1, check[0]);

  if(firstPhase){
    sudokuArray1.splice(rowIndex, 1, row);
    var ausgabe = "ausgabe" + (rowIndex+1);
    loadView(ausgabe, row);
    getColumns(sudokuArray1, columnArray1);
    getBlock(sudokuArray1, firstBlock1, secondBlock1, thirdBlock1);
    fillBlockArray(firstBlock1, secondBlock1, thirdBlock1, blockArray1);
  }
  else if(secondPhase){
    sudokuArray2.splice(rowIndex, 1, row);
    var ausgabe = "ausgabe" + (rowIndex+4);
    loadView(ausgabe, row);
    getColumns(sudokuArray2, columnArray2);
    getBlock(sudokuArray2, firstBlock2, secondBlock2, thirdBlock2);
    fillBlockArray(firstBlock2, secondBlock2, thirdBlock2, blockArray2);
  }
}


function alternativeChange(block, check, doubledElement, sudokuArray){
  var blockNextIndex = block.lastIndexOf(doubledElement[0]);
  var rowNextIndex = parseInt(blockNextIndex / 3);
  var rowNext = sudokuArray[rowNextIndex];
  var checkNextIndex = rowNext.indexOf(check[0]);
  var doubledNextIndex = rowNext.indexOf(doubledElement[0]);
  manageChange(checkNextIndex, check, doubledNextIndex, doubledElement, rowNextIndex, rowNext);
}

function getColumns(sudokuArray, columnArray){
  
  for(var k=0;k<9;++k){
    var column = [];
    for(var l=0;l<3;++l){
      var columnElement = sudokuArray[l][k];
      column.push(columnElement);
    }
    columnArray.push(column)
  }
}

function compareForDoubles(columnArray1, columnArray2, begin, end){
var doubleCounter = 0;
  for(var i = begin; i<end;++i){
    var composedArray = columnArray1[i].concat(columnArray2[i]);
    //alert("composed array: " + composedArray);
    var checkDouble = getUniqueOrDouble(composedArray, doubled=1);
    if(begin == 0){
      if(checkDouble != undefined){
        document.getElementById("message2").innerHTML = "Second phase aborted. Please press the button again!";
        break;
      }
      else{
        document.getElementById("message2").innerHTML = "Second phase successfully created!";
        compareForDoubles(columnArray1, columnArray2, begin=3, end=9);
      }
    else{
      if(checkDouble != undefined){
        neighborChange(checkDouble);
      }
    }
  }
}

function giveFeedback(){
    document.getElementById("message1").innerHTML = "First phase successfully created!";

}

function neighborChange(checkDouble){
  for(j=0;j<checkDouble.length;++j){
    if(i<6){var doubledInArray = secondBlock2.indexOf(checkDouble[j]);}
    else{var doubledInArray = thirdBlock2.indexOf(checkDouble[j]);}

    
  }

}

// function getColumn(columnArray, sudokuArray){
//   var counter = 0;
//   for(var i=0;i<sudokuArray.length;++i){
    
//     var row = sudokuArray[i];
//     counter += 1;
//     alert(counter);
//     if(counter<=3){
//       pushColumns(row, columnArray);
//     }
//     else{
//       break;
//     }
//   }
// }


//   function pushColumns(row, columnArray){
//     for(var j=0; j<row.length; ++j){
//       var columnElement = row[j];
//       for(var k=0;k<9;++k){
//         if(j==k){
//           columnArray[k].push(columnElement);
//           // if(columnArray[8].length == 3){
//           //   break;
//           // }
//         }
//       }
//     }
//   }


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
