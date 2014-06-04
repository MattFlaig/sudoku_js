var sudokuArray = [];
var blockArray = [];
var firstBlock = [];
var secondBlock = [];
var thirdBlock = [];
var missingElements = [];
// var missingElements = [];
// var doubledElements = [];
  function manageComputation(){
  	sudokuArray = [], blockArray = [], missingElements = [];
    firstBlock = [], secondBlock = [], thirdBlock = [];
    makeSudokuArray();
    getBlock();
    manageBlocks();
    changeElements();
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
    	missingElements.push(check);
    	counter += check.length
    }
    //alert(counter);
    if(counter >= 3){manageComputation();}

  }

  function fillBlockArray(){
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

  function changeElements(){
  	for(var i=0;i<blockArray.length;++i){
  	  var block = blockArray[i];
  	  var check = checkAgainstNine(block);
  	  //alert(check);
  	  var blockIndex = block.indexOf(check);
  	  var doubledElement = getUniqueOrDouble(block, doubled=1);
  	  //alert(doubledElement);
  	  if(check.length > 0  && doubledElement.length > 0){
  	  	//alert("yeah");
        var rowIndex = parseInt(blockIndex / 3);
        //alert(rowIndex);
        var row = sudokuArray[rowIndex];
        var checkIndex = row.indexOf(check[0]);
        //alert(checkIndex);
        var doubledIndex = row.indexOf(doubledElement[0]);
        //alert(doubledIndex);
        row.splice(checkIndex, 1, doubledElement);
        row.splice(doubledIndex, 1, check);

        var ausgabe = "ausgabe" + (rowIndex+1);
        loadView(ausgabe, row);
  	  }
        
  	}
  }
