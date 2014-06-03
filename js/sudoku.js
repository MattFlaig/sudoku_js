var sudokuArray = [];
var columnArray = [[],[],[],[],[],[],[],[],[]];
var missingElements = [];


  function makeSudokuArray(){
    for(var i=1;i<10;++i){
      var ausgabe = "ausgabe" + i;
      var randomArray = findRandomArray();
      sudokuArray.push(randomArray);
      document.getElementById(ausgabe).innerHTML = randomArray;
    }
  }

  function manageNumberChange(){
    
    var countMissing = getMissingElements();
    
    
    if(countMissing>20){
      manageComputation();
    }
    else {alert("Counter: " + countMissing);
      getNeighborChange();
      var stillMissing = getMissingElements();
      
      alert(stillMissing);
  
    }
    
  }
function getMissingElements(){
var counter = 0;
missingElements = [];
  for(var l=0;l<columnArray.length;++l){
    //alert(l);
    //alert("column array:" + columnArray[l]);
    var innerArray = columnArray[l];
    var firstCheck = checkAgainstNine(innerArray);
    missingElements.push(firstCheck);
    //alert("firstCheck: " + firstCheck);
    counter += firstCheck.length;
    
  }
  return counter;
}

function getNeighborChange(){
for(var m=0; m<columnArray.length;++m){
  var column = columnArray[m];
  var doubledElements = getUniqueOrDouble(column, doubled=1);
  //alert("doubled: " + doubledElements);
    //alert("missing: " + missingElements[0]);
    for(var n=0;n<column.length;++n){
      var doubler = column[n];
      var element = doubledElements[0];
      if(doubler == element){
        //alert("splicing");
        var row = sudokuArray[n];
        if(m==8){
          row.splice(0,9,row[m],row[m-7],row[m-6],row[m-5],row[m-4],row[m-3],row[m-2],row[m-1],row[m-8]);
        }
        else{row.splice(m,2,row[m+1],row[m]);}
        
        document.getElementById("ausgabe" + (n+1)).innerHTML = row;
        //findChangeElement(n);
      }
    }doubledElements.splice(0,1);
  }
}
 
function findChangeElement(n){
  var row = sudokuArray[n];
  //alert("row: " + row);
  var firstMissing = missingElements[0][0];
  alert("firstmissing: " + firstMissing);
  var firstElement = row[0];
  for(var j=0;j<row.length;++j){
    var rowElement = row[j];
    //alert("rowelement: " + rowElement);
    if(rowElement == firstMissing){
      alert("splicing!");
      row.splice(j, 1, firstElement);
      row.splice(0, 1 , rowElement);
      
    }
  }
  //alert(row);
  document.getElementById("ausgabe" + (i+1)).innerHTML = row;
}


//   function makeComparison(){
//     for(var i=0;i<sudokuArray.length;++i){
//       var testRow = sudokuArray[i];
      
//       for(var j=i+1;j<sudokuArray.length;++j){
//         var changeRow = sudokuArray[j];
//         var changedArray = compareArrays(testRow, changeRow);
//         sudokuArray.splice(j, 1, changedArray);
//         var ausgabe = "ausgabe" + (j+1);
//         document.getElementById(ausgabe).innerHTML = changedArray;
//       }
//     }
//   }

// function compareArrays(array1, array2){
//     for(var i=0;i<array1.length;++i){
//       var check1 = array1[i];
//       var check2 = array2[i];
//       if(check1 === check2){
//         array2.splice(i, 2, array2[i+1], array2[i]);
//       }
//     }
//     return array2;
//   }


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
      if(marker == 9){
        checkArray.push(i);
      }
    }
    return checkArray;
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
    if(doubled){return doubleChoices;}
    else{return uniqueChoices;}
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

  function getColumns(){
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

  
function manageComputation(){
  sudokuArray = [];
  columnArray = [[],[],[],[],[],[],[],[],[]];
  missingElements = [];
  makeSudokuArray();
  getColumns();
  manageNumberChange();
}





