var screenHeight = $(document).height();

var points = 0;
var lifes = 5;

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createDucks(count) {
	if (lifes === 0) {
		return;
	}

	var duck = $('<img src="poney.gif">');
	
	duck.css({
		position:'absolute',
		left: `${Math.random()*90}%`,
		top: '-200px',
		width: `${getRandomIntInclusive(180,200)}px`,
	});
	
	duck.appendTo('#game');

	duck.animate({'top': screenHeight}, {
		duration: getRandomIntInclusive(3000, 6000),
		easing: 'linear',
		complete: function() {
			decreaseHearts();
			$(this).remove();
			if (lifes === 0) {
				gameOver();
			}
		}
	});

	$('#game').on('over', function() {
		duck.stop().off('click');
	});

	duck.click(function() {
		increasePoints();
		$(this).remove().stop().clearQueue();
	});

	if (lifes > 0 ) {
		setTimeout(createDucks, getRandomIntInclusive(800, 1000));
	}
}

function gameOver() {
	$('#game').trigger('over');
	$('#reload').show().click(function(){
	  window.location.reload();
	});
}

function increasePoints() {
	points += 1;
	$('#counter').html(points);
}

function fillHearts() {
	for (var i = 0; i < 5; i++) {
		$('#lifeContainer').append($('<img src="heart.png">'));
	}
}

function decreaseHearts() {
	lifes -= 1;
	$('#lifeContainer img').first().remove();
}

$(document).ready(function initGame() {
	fillHearts();
	createDucks();
});