function factorialize(num) {
  if (num === 0 || num === 1)
    return 1;
  for (var i = num - 1; i >= 1; i--) {
    num *= i;
  }
  return num;
}


function permAlone(inputStr) {
  var inStrLen = inputStr.length,
  totalPerm = 0,
  results = 0
  overlap = 0,
  invalid = 0;
  var charVals = new Object();
  var objLen = 0;

  // obtain individual characters and their frequencies from the string
  var strWork = inputStr;

  while (strWork.length > 0){
    var key = strWork.charAt(0);
    strWork = strWork.replace(key, "");
    var countChar = 1;
    for (var i = 0; i < strWork.length; i++) {
      if (key === strWork.charAt(i)){
        countChar++;
        strWork = strWork.replace(key, "");
        i--;
      }
    }
    charVals[key] = countChar;
    objLen++;
  }
  var values = Object.values(charVals);

  if ((objLen == 1)&&(inStrLen > 1)){
    results = 0;
  } else {
    totalPerm = factorialize(inStrLen);


  //check for and calculate invalid perms
    var bigVals = [];
    for (var j = 0; j < values.length; j++){
      var currVal = values[j];
      var workVal = 0;
      var len,
          lenPerm = 0;
      if (currVal > 1){
        workVal = currVal;
        bigVals.push(workVal);
      }

      while (workVal > 1){
        len = inStrLen - workVal + 1; 
        lenPerm = factorialize(len);
        charPerm = factorialize(workVal);
        invalid += lenPerm * charPerm;
        workVal--; 
      }
    }
    //check for and calculate overlaps
    if (bigVals.length > 1){

      overlap = factorialize(values.length);
      for (var k = 0; k < bigVals.length; k++) {
        overlap *= factorialize(bigVals[k]);
      }
    }
    results = totalPerm - invalid + overlap
  }
  return results;
}


var n = 0;
var inputStr = '',
	result;

$('#add').click(function(){
	// var f = document.getElementsByTagName('form');
	if (n < 20) {
		n++;
		var i = $('<div class="form-row"><div class="col"><input class="form-control" type="text" id="ingr' + n + '" placeholder="Съставка"></div><div class="col"><input class="form-control"type="int" id="effect' + n + '" placeholder="Свойство"></div></div>')
		$('form').append(i);
	} else {
		alert('Достигнахте максималния брой съставки! Нека проверим за колко дълго ще отървем света от разруха!');
	}
});
$('#send').click(function(){
	var ingrArr = [];
	errorFlag = 0;
	for (var i = 0; i <= n; i++) {
		var ingr = $('#ingr'+i).val();
		var effect = $('#effect'+i).val();
		ingrArr.push(ingr);

		if(!errorFlag){
			if(i > 0){
				for (var j=i; j>0; j--){
					if (ingr === ingrArr[j-1]){
						//ERROR povtarqt se systavki
						var err = $('<div><h1>Някои от съставките ви се повтарят! Цъкнете казана за нов опит!</h1></div>');
						$('.form_container').hide();
						$( "#add" ).hide();
						$('body').append(err);
						$('#cauldron').attr('onClick', 'location.reload();');

						errorFlag = 1;
					}
				}
			}
		}

		if(!errorFlag){
			if ((ingr == '')||(effect == '')){
				//ERROR EMPTY STRING
				var err = $('<div><h1>Пуснали сте празно поле! Цъкнете казана за нов опит!</h1></div>');
				$('.form_container').hide();
				$( "#add" ).hide();
				$('body').append(err);
				$('#cauldron').attr('onClick', 'location.reload();');

				errorFlag = 1;
			}
		} 

		if(!errorFlag){
			if (effect.length > 1) {
				//ERROR TOO LONG EFFECT
				var err = $('<div><h1>Свойствата трябва да бъдат еднобуквени! Цъкнете казана за нов опит!</h1></div>');
				$('.form_container').hide();
				$( "#add" ).hide();
				$('body').append(err);
				$('#cauldron').attr('onClick', 'location.reload();');

				errorFlag = 1;
			}
		}

		if (!errorFlag){
			effect = effect.trim();
			inputStr = inputStr.concat(effect);
		} else {
			inputStr = '';
		}
	}

	if (inputStr !== ''){
		result = permAlone(inputStr);
		console.log(result);
		$( ".form_container" ).hide();
		$( "#add" ).hide();

		$("#loading").show();
	}

});

$("#loading").click(function(){
	$("#loading").hide();
	var res = $('<div><h1>Светът ще оцелее още '+result+' дни!</h1></div>');
	$('body').append(res);
	$('.cauldron').attr('onClick', 'location.reload();');
});