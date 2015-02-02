$(function () {

	'use strict';

	var javascriptSlider,
			closest = function closestF(num, arr) {
		var curr = arr[0],
				diff = Math.abs (num - curr);
		for (var val = 0; val < arr.length; val++) {
			var newdiff = Math.abs (num - arr[val]);
			if (newdiff < diff) {
				diff = newdiff;
				curr = arr[val];
			}
		}
		return curr;
	};

	javascriptSlider = new Dragdealer($('.js-slider__shaft')[0], {
		callback: function dragdealerCallbackF(x, y) {
			var w = $('.js-slider__labels').width(),
					steps = [];

			if (this.preventCallback) {
				this.preventCallback = false;
				return;
			}

			$('.js-slider-label').each(function findSliderStepsF(i, el) {
				steps.push($(el).position().left / w);
			});
			steps.pop();
			steps.push(1);

			this.preventCallback = true; // Предотвращаем рекурсию из-за setValue()
			this.setValue(closest(x, steps), y);
		},
		handleClass: 'js-slider__handle',
		x: (function dragdealerInitXF() {
			var $label = $('.js-slider-label.is-active').first(),
					x = $label.position().left,
					w = $label.parent().width();

			$label.closest('.js-slider').addClass('is-initialized');
			$label.removeClass('is-active'); // Убираем статичную «ручку» слайдера

			return x / w;
		})()
	});

	$('.js-slider-label').click(function (e) {
		var $label = $(e.target),
				x = $label.is(':last-child') ? 1 : $label.position().left / $label.parent().width();

		javascriptSlider.preventCallback = true;
		javascriptSlider.setValue(x, null);
	});

});
