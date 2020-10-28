$(document).ready(function () {
  // 변수를 선언합니다.
  const width = 460;
  let current = 0;
  var timer;

  // 슬라이더 내부의 이미지 개수를 확인합니다.
  var imageLength = $('.slider').find('.image').length;

  //   하단에 이미지를 복사해서 넣어줌
  $('.image').clone().appendTo('.image-list');

  //   css

  $('.images').css({
    width: width * imageLength,
  });

  // 함수를 선언합니다.
  const moveTo = function (direction) {
    var oldcurrent = current;
    current = current + direction;
    if (current < 0) {
      current = imageLength - 1;
    } else {
      current = current % imageLength;
    }
    $('.images').animate(
      {
        left: -current * width,
      },
      500
    );

    $('.image-list .image:nth-child(' + (oldcurrent + 1) + ')').removeClass(
      'active'
    );
    $('.image-list .image:nth-child(' + (current + 1) + ')').addClass('active');
  };

  //   image-list
  $('.image-list .image').css({
    width: width / imageLength,
  });

  var $imageitem = $('.image-list .image').click(function () {
    var idx = $imageitem.index(this);
    moveTo(idx - current);
    pauseMove();
  });

  //   interval
  function startinterval() {
    if (!timer) {
      timer = setInterval(function () {
        moveTo(1);
      }, 2000);
    }
  }

  function pauseMove() {
    clearInterval(timer);
    timer = null;
    setTimeout(function () {
      startinterval();
    }, 3000);
  }
  startinterval();

  //   event
  $('.sidebtn div').click(function () {
    pauseMove();
  });

  $('.leftbtn').click(function () {
    moveTo(-1);
  });

  $('.rightbtn').click(function () {
    moveTo(1);
  });
});
