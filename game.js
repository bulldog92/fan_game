(function(){
  var item = $('.item-frame .item'),
    frame =$('.item-frame'),
    steps = 0,
    timerId,
    start = 'false',
    gameSpeed = 500,
    buttonStart = $('#start');
    buttonStart.on('click', function(){
      reset();
      timerId = setInterval(elementPicker, gameSpeed);
      start = 'true';
      $(this).attr('disabled','true');
    });
    function modalWin(){
      $('#myModalWin').modal('show');
    }
    function modalLose(){
      $('#myModalLose').modal('show');
    }
    function reset(){
      item.find('span').removeClass('pick').removeAttr('data-pick');
      steps = 0;
      start = 'false';
      buttonStart.removeAttr('disabled');
    }
    function randomElement(item){
      var randRes = getRandomInt(0, item.length);
      return item.eq(randRes);
    }
    function getRandomInt(min, max){
      var old_val, val;
      val = Math.floor(Math.random() * (max - min)) + min;
      if(val == old_val){
       getRandomInt(min, max);
      }
      old_val = val;
      return val;
    }
    function elementPicker(){
      var randElement = randomElement(item); 
      frame.attr('iter',steps);
      if(randElement.find('span').attr('data-pick') == 'active'){
        elementPicker();
      }else{
        randElement.find('span').addClass('pick').attr('data-pick','active');
      }
      steps++;
      endGame();
    }
    item.find('span').on('click', function(){
      $(this).removeClass('pick').attr('data-pick', '');
      endGame();
    });
    function endGame(){
      var activeElemtArr = [];
      item.find('span').each(function(){
        if($(this).attr('data-pick') == '' || typeof($(this).attr('data-pick')) == 'undefined'){
        }else{
          activeElemtArr.push($(this).attr('data-pick'));
        }
      });
      console.log(activeElemtArr);
      if(start == 'true' ){
        if(activeElemtArr.length == 0 && steps > 0 ){
          clearInterval(timerId);
          modalWin();
          reset();
          console.log('end');
        }
        if(activeElemtArr.length == item.length){
          clearInterval(timerId);
          modalLose();
          reset();
          console.log('end');
        } 
      }
    }  
})();
