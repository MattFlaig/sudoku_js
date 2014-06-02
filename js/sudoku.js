function sudoku(){
  var sudokuArray = [];

  for(i=1;i<10;++i){
    var ausgabe = "ausgabe" + i;
    var randomArray = findRandomArray();
    sudokuArray.push(randomArray);
    document.getElementById(ausgabe).innerHTML = randomArray;
  }

  var row1 = sudokuArray[0];
  var row2 = sudokuArray[1];
  var row3 = sudokuArray[2];
  var row4 = sudokuArray[3];
  var row5 = sudokuArray[4];
  var row6 = sudokuArray[5];
  var row7 = sudokuArray[6];
  var row8 = sudokuArray[7];
  var row9 = sudokuArray[8];


  

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

  function compareArrays(array1, array2){
    for(i=0;i<array1.length;++i){
      var check1 = array1[i];
      var check2 = array2[i];
      if(check1 === check2){
        array2.splice(i, 2, array2[i+1], array2[i]);
      }
    }
  }

};


 // var originalArray = [1,2,3,4,5,6,7,8,9];
  // var array1 = [
  //           [1,2,3],
  //           [4,5,6],
  //           [7,8,9]
  //          ];
  // var arrayFirstRow = [];
  // var arraySecondRow = [];
  // var arrayThirdRow = [];

  // var arrayFirstColumn = [];
  // var arraySecondColumn = [];
  // var arrayThirdColumn = [];

// arrayFirstRow.push(randomArray[0], randomArray[1], randomArray[2]);
  // arraySecondRow.push(randomArray[3], randomArray[4], randomArray[5]);
  // arrayThirdRow.push(randomArray[6], randomArray[7], randomArray[8]);

  // document.getElementById("ausgabe1").innerHTML = arrayFirst;
  // document.getElementById("ausgabe2").innerHTML = arraySecond;
  // document.getElementById("ausgabe3").innerHTML = arrayThird;


// rows1 = [[5,2,7],[3,1,4],[6,9,8]];
// rows2 = [[5,7,4],[3,8,2],[1,9,6]];
// columns1 = [[5,3,6],[2,1,9],[7,4,8]];
// columns2 = [[5,3,1],[7,8,9],[4,2,6]];



// function firstFillIn(columnRow){
  //   var originalArray = [1,2,3,4,5,6,7,8,9];
  //   for(i=0;i<originalArray.length;++i){
  //     var element = originalArray[i];
      
  //   }
  // }

  // function getColumnRow(row, column) {
  //   var columnRow = [];
  //   columnRow.push(row[0], row[1], row[2]);
  //   columnRow.push(column[0], column[1], column[2]);
  //   return columnRow;
  // }

  // function getUnique(columnRow) {
  //   var hash = {}, unique = [];
  //   for ( var i = 0; i < columnRow.length; ++i ) {
  //       if ( !hash.hasOwnProperty(columnRow[i]) ) { 
  //           hash[ columnRow[i] ] = true;
  //           unique.push(columnRow[i]);
  //       }
  //   }
  //   return unique;
  // }