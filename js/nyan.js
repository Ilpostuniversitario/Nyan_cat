console.log('Nyan!');

var NyanCat = function () {
	return {
		init: function () {
			this.cat = $('#nyan-cat');
			this.framesAmount = 6;
			this.currentFrame = 1;
		},

		cycleFrames: function () {
			var myself = this;
			this.cat.removeClass('frame' + myself.currentFrame).addClass('frame' + myself.cycleIds(myself.currentFrame));
			this.currentFrame = this.cycleIds(this.currentFrame);
		},

		cycleIds: function (_currId) {
			if (_currId >= this.framesAmount) {
				_currId = 1;
			} else {
				_currId += 1;
			}

			return _currId;
		}
	}
}

var Sparks = function () {
	return {
		init: function (_combo) {
			var yCombosAmount = Math.ceil($(document).height() / _combo.height()),
				comboTags = $(document.createElement('div')),
				newCombo = null;

			for (var a = 0; a < yCombosAmount - 1; a += 1) {
				newCombo = _combo.clone();
				comboTags.append(newCombo); // <- still have to improve this crap
			}

			$('body').prepend(comboTags.html());
		}
	}
};

var nyanAudio = {
	nyan: new Audio('audio/nyan-cat.ogg'),
	volume: 0.0
}

function playNyan() {
	// in realtà in pratica riavvia l'audio e rimette il listener
	console.log('PlayNyan!');

	nyanAudio.nyan.currentTime = 0;
	nyanAudio.nyan.addEventListener('ended', function () {
		this.currentTime = 0;
		this.play();
	}, false);
	nyan.play();
	nyan.volume = 0.7;
}

function stopNyan() {
	// Se l'audio era acceso lo lascia tale
	console.log('StopNyan!');

	nyanAudio.nyan.volume = 0.0;
}


$(function () {
	var nyancat = new NyanCat(),
		sparks = new Sparks();

	nyancat.init();
	sparks.init($('.sparks-combo'));

	var timer = setInterval(function () {
		nyancat.cycleFrames();
	}, 70);


	var audioOnRadio = document.getElementById('RadioAudioOn');
	var audioOffRadio = document.getElementById('RadioAudioOff');
	if (audioOnRadio.checked) {
		playNyan();
	} else {
		stopNyan();
	}

});