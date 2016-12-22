const screenWidth = $(document).width()

var points = 0

function refreshPage(){
  window.location.reload();
} 

function createDucks(count) {
	var duck = $('<img src="poney.gif">')
	
	duck.css({
		position:'absolute',
		left: `${Math.random()*90}%`,
		top: '-200px',
		width: '200px'
	})
	
	duck.appendTo('#duck')

	duck.animate({'top': screenWidth}, {
		duration: 5000,
		easing: 'swing',
		complete: function() {
			$(this).remove()
			if (count === 0) {
				reload()
			}
		}
	})

	duck.click(function() {
		increasePoints()
		$(this).remove()
	})

	count--

	if (count > 0 ) {
		setTimeout(createDucks.bind(this, count), 800)
	}
}

function reload() {
	var reload = $('<img src="reload.png">')

	reload.css({
		width: '200px',
	})
	
	reload.appendTo('#reload')

	reload.click(function(){
	  window.location.reload()
	})
}


function increasePoints() {
	points += 1
	$('#counter').html(points);
}

$(document).ready(function() {
	createDucks(20)

})