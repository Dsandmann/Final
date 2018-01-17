//

(function($,sr) {

  var debounce = function (func, threshold, execAsap) {
    var timeout;
    return function debounced () {
      var obj = this, args = arguments;
      function delayed () {
        if (!execAsap)
                          func.apply(obj, args);
        timeout = null;
      }
      ;
      if (timeout)
                    clearTimeout(timeout); else if (execAsap)
                    func.apply(obj, args);
      timeout = setTimeout(delayed, threshold || 100);
    }
    ;
  }
  // smartresize
  jQuery.fn[sr] = function(fn) {
    return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
  }
  ;
}
)(jQuery,'smartresize');

$(function() {

    // Fix the Home Height

    var setHomeBannerHeight = function(){
	   var homeHeight= $(window).height();
	   $('#overlay-1').height(homeHeight);
    }
    setHomeBannerHeight();

    // Arrow drop effect

    var $scrollDownArrow = $('.bottom > a');

    // Smooth Scrolling and remove Hash tag from link

    $('a[href*=#]:not([href=#])').click(function() {

        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000, function(){

                });
                return false;
            }
        }
    });


  ///////////////////////////////
  // Center Home Slideshow Text
  ///////////////////////////////
  function centerHomeBannerText() {
    var bannerText = jQuery('#header .middle');
    var bannerTextTop = (jQuery('#header').actual('height')/2) - (jQuery('#header .middle').actual('height')/2) - 20;
    bannerText.css('padding-top', bannerTextTop+'px');
    bannerText.show();
  }
  centerHomeBannerText();



    jQuery(window).smartresize(function() {
        setHomeBannerHeight();
        centerHomeBannerText();
    });

});


$( function() {
  // init Isotope
  var $container = $('.isotope').isotope({
    itemSelector: '.element-item',
    layoutMode: 'fitRows',
    getSortData: {
      name: '.name',
      symbol: '.symbol',
      number: '.number parseInt',
      category: '[data-category]',
      weight: function( itemElem ) {
        var weight = $( itemElem ).find('.weight').text();
        return parseFloat( weight.replace( /[\(\)]/g, '') );
      }
    }
  });

  // filter functions
  var filterFns = {
    // show if number is greater than 50
    numberGreaterThan50: function() {
      var number = $(this).find('.number').text();
      return parseInt( number, 10 ) > 50;
    },
    // show if name ends with -ium
    ium: function() {
      var name = $(this).find('.name').text();
      return name.match( /ium$/ );
    }
  };

  // bind filter button click
  $('#filters').on( 'click', 'button', function() {
    var filterValue = $( this ).attr('data-filter');
    // use filterFn if matches value
    filterValue = filterFns[ filterValue ] || filterValue;
    $container.isotope({ filter: filterValue });
  });

  // bind sort button click
  $('#sorts').on( 'click', 'button', function() {
    var sortByValue = $(this).attr('data-sort-by');
    $container.isotope({ sortBy: sortByValue });
  });

  // change is-checked class on buttons
  $('.button-group').each( function( i, buttonGroup ) {
    var $buttonGroup = $( buttonGroup );
    $buttonGroup.on( 'click', 'button', function() {
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      $( this ).addClass('is-checked');
    });
  });


});

function countUpTo(count,selector,max)
    {
      console.log("count--> "+count);
        var div_by = count,
            speed = Math.round(count / div_by),
            $display = selector,
            run_count = 1,
            int_speed = 24;

        var int = setInterval(function() {
            if(run_count < div_by){
                $display.text(speed * run_count);
                run_count++;
            } else if(parseInt($display.text()) < count) {
                var curr_count = parseInt($display.text()) + 1;
                var text = "";
                if(max>99){
                     if(curr_count<10){
                        text = text+"00"+curr_count;
                    }
                    /*else if(curr_count < 100 && curr_count >9){
                        text = text+"0"+curr_count;
                    }*/
                    else{
                      text = curr_count;
                    }
                }else if(max<100 && max>9){
                     if(curr_count<10){
                        text = text+"00"+curr_count;
                    }
                   /*else if(curr_count < 100 && curr_count >9){
                        text = text+"0"+curr_count;
                    }*/
                    else{
                      text = curr_count;
                    }
                }else{
                      if(curr_count<10){
                        text = text+"00"+curr_count;
                    }
                   /*else if(curr_count < 100 && curr_count >9){
                        text = text+"0"+curr_count;
                    }*/
                    else{
                      text = curr_count;
                    }
                }

                $display.text(text);
            } else {
                clearInterval(int);
            }
        }, int_speed);
    }


var firstTime = true;
$(document).scroll(function(event) {



  var result = $('.count-timer').isOnScreen();

  if(result == true) {
      console.log("on screen");

      if(firstTime){
        firstTime = false;

          var count1 = $('.count1'),
            count2 = $('.count2'),
            count3 = $('.count3'),
            count4 = $('.count4'),
            count5 = $('.count5'),
            count6 = $('.count6')
            count1Num = count1.text(),
            count2Num = count2.text(),
            count3Num = count3.text(),
            count4Num = count4.text(),
            count5Num = count5.text(),
            count6Num = count6.text();

            var max = Math.max(parseInt(count1Num),parseInt(count2Num));
            max = Math.max(max,parseInt(count6Num));
            console.log(max);

            countUpTo(count1Num,count1,max);
            countUpTo(count2Num,count2,max);
            countUpTo(count3Num,count3,max);
            countUpTo(count4Num,count4,max);
            countUpTo(count5Num,count5,max);
            countUpTo(count6Num,count6,max);
      }

    }
});

  



//Game
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width/5;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/5;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 6;
var brickColumnCount = 11;
var brickWidth = 55;
var brickHeight = 10;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var lives = 99;
//blokjes
var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}
// pijltjes toets links en rechts
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}


//blokjes kapot
function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
    for(r=0; r<brickRowCount; r++) {
    var b = bricks[c][r];
    if(b.status == 1) {
    if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
    dy = -dy;
    b.status = 0;
    score++;
    if(score == brickRowCount*brickColumnCount) {
    ("YOU WIN, CONGRATS!");

  }
  }
  }
  }
  }
  }
// balletje
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}
function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
    for(r=0; r<brickRowCount; r++) {
    if(bricks[c][r].status == 1) {
    var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
    var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
    bricks[c][r].x = brickX;
    bricks[c][r].y = brickY;
    ctx.beginPath();
    ctx.rect(brickX, brickY, brickWidth, brickHeight);
    ctx.fillStyle = "rgb(224, 247, 246)";
    ctx.fill();
    ctx.closePath();
  }
  }
}
}


function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Score: "+score, 8, 20);
}
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();


    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            lives--;
            if(!lives) {
                ("GAME OVER");

            }
            else {
                x = canvas.width/2;
                y = canvas.height-30;
                dx = 3;
                dy = -3;
                paddleX = (canvas.width-paddleWidth)/2;
}
}
}

    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}

draw();
