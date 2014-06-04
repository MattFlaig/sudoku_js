var sudokuArray = [];
var columnArray = [[],[],[],[],[],[],[],[],[]];
var missingElements = [];
var doubledElements = [];


  function makeSudokuArray(){
    sudokuArray = [];
    for(var i=1;i<10;++i){
      var ausgabe = "ausgabe" + i;
      var randomArray = findRandomArray();
      sudokuArray.push(randomArray);
      loadView(ausgabe, randomArray);
    }
  }

  function loadView(ausgabe, array){
    document.getElementById(ausgabe).innerHTML = array;
  }

  function manageNumberChange(){
    
    var countMissing = getMissingElements();
    if(countMissing>20){
      manageComputation();
    }
    else {
      //alert("Counter: " + countMissing);
      getNeighborChange(p=0);
    }
    
    
  }



function getMissingElements(){
var counter = 0;
missingElements = [];
  for(var l=0;l<columnArray.length;++l){
    
    var innerArray = columnArray[l];
    var firstCheck = checkAgainstNine(innerArray);
    missingElements.push(firstCheck);
    //alert("firstCheck: " + firstCheck);
    counter += firstCheck.length;
    
  }
  return counter;
}

function getNeighborChange(p){
  //if(p<=8){
    for(var m=p; m<columnArray.length;++m){
      var column = columnArray[m];
      var countMissing = getMissingElements(); 
      if(countMissing < 4){alert(countMissing);break;}

      //alert("column: " + column);
      doubledElements = getUniqueOrDouble(column, doubled=1);
      //alert("doubledElements all: " + doubledElements);
      if(doubledElements == undefined ){
        
        if(p==8){
          if(countMissing > 4){getNeighborChange(p=0);}
          else {break;}
        }
        else{getNeighborChange(p+=1);}
        
      }
      else{changeDoubled(m, p, column, doubledElements);}
      
    }
}

function changeDoubled(m, p, column, doubledElements){
 
  var elementDoubled = doubledElements[0];
  findChangeElement(column, elementDoubled, m, p);
}
 
function findChangeElement(column, elementDoubled, m, p){
  var updateMissing = getMissingElements();
  var arrayMissing = missingElements[m];
  //alert("missing in column: " + arrayMissing);
  for (l=0;l<arrayMissing.length;++l){
    var n = column.indexOf(doubledElements[0]);
    //alert("first doubled: " + doubledElements[0]);
    //alert("n: " + n);
    var elementMissing = arrayMissing[l];
    var row = sudokuArray[n];

    var changerIndex = row.indexOf(elementMissing);    
   
    //alert("row: " + row);
    row.splice(changerIndex, 1, elementDoubled);
    row.splice(m, 1, elementMissing);
    doubledElements.splice(0, 1);
    //alert("row: " + row);
    updateArrays(n, row);
    //break;
    findNextChange(m, p);
    break;
      
  }
}

function findNextChange(m, p){
  var doubledElements = getUniqueOrDouble(columnArray[m], doubled=1);
  //alert("doubledElements next: " + doubledElements);
  if(doubledElements !== undefined){
    //alert("changeDoubled again!");
    changeDoubled(m, p, columnArray[m], doubledElements);
  }
  else{
    //alert("next column");
    getNeighborChange(p+=1);
  }
}

function getSquareOfNines(){
  alert("haha");
}

function updateArrays(n, row){
  sudokuArray.splice(n, 1, row);
  getColumns();
  var ausgabe = "ausgabe" + (n+1);
  loadView(ausgabe, row);
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
    if(doubleChoices.length > 0){return doubleChoices;}
    else{return undefined;}
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

  
function manageComputation(){
  makeSudokuArray();
  getColumns();
  manageNumberChange();
}





