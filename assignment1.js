const formular = (x) => (x*x) - x +3
this.findXYZ =  function (arr){
    var result = arr.filter(num => !Number.isInteger(num)).map(number => 
        number.concat(" = " +  formular(arr.indexOf(number)+1))
    )
   return result;
}
