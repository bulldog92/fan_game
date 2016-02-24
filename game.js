(function(){
  var item = $('.item-frame .item'),
    frame =$('.item-frame'),
    select = $('#sel'),
    steps = 0,
    timerId,
    start = 'false',
    gameSpeed = 500,
    stop = $('#stop'),
    buttonStart = $('#start');
    
    /*Select speed game*/
    select.on('change', function(){
      gameSpeed = $(this).val();
    });
    /*Select speed game end*/
    
    /*Button start event*/
    buttonStart.on('click', function(){
      reset();
      timerId = setInterval(elementPicker, gameSpeed);
      start = 'true';
      $(this).attr('disabled','true');
      select.attr('disabled', 'true');
      stopAttr();
    });
    /*Button start event end*/
    
    /*Event after click user*/
    item.find('span').on('click', function(){
      $(this).removeClass('pick').attr('data-pick', '');
      endGame();
    });
    /*Event after click user end*/
    /*Button stop event*/
    function stopAttr(){
      if(start == 'true'){
        stop.removeAttr('disabled');
      }else{
        stop.attr('disabled', 'true');
      }
    }
    stopAttr();
    
    stop.on('click', function(){
      clearInterval(timerId);
      reset();
    });
    /*Button stop event end*/
    
    /*Modal */
    function modalWin(){
      $('#myModalWin').modal('show');
    }
    function modalLose(){
      $('#myModalLose').modal('show');
    }
    /*Modal end*/
    
    /*reset*/
    function reset(){
      item.find('span').removeClass('pick').removeAttr('data-pick');
      steps = 0;
      start = 'false';
      buttonStart.removeAttr('disabled');
      select.removeAttr('disabled');
      stopAttr();
    }
    /*reset end*/
    
    /*random element*/
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
     /*random element end*/
     
     /*Element picker */
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
    /*Element picker end*/
    
    /*Game finish*/
    function endGame(){
      var activeElemtArr = [];
      item.find('span').each(function(){
        if($(this).attr('data-pick')){
          activeElemtArr.push($(this).attr('data-pick'));
        }
      });
      if(start == 'true' ){
        if(activeElemtArr.length == 0 && steps > 0 ){
          clearInterval(timerId);
          modalWin();
          setTimeout(reset, 100);
        }
        if(activeElemtArr.length == item.length){
          clearInterval(timerId);
          modalLose();
          setTimeout(reset, 100);
        } 
      }
    }
    /*Game finish end*/
})();
