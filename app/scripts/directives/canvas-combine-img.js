'use strict';

angular.module('holidayJs2013WhiteElephantApp')
  .directive('canvasCombineImg', [function () {
		return {
			template: '<canvas></canvas>',
			restrict: 'E',
			replace: true,
			scope: {
				bg: '@',
				fg: '@',
				width: '=',
				height: '='
			},
			link: function postLink(scope, element, attrs) {
				scope.canvas = element;

				scope.$watch('bg', function () {
					if (typeof scope.bg === 'string') {
						var img = new Image();
						img.onload = mergeImages;
						img.src = scope.bg;

						scope.bgImg = img;
					}
				}, true);

				scope.$watch('fg', function () {
					if (typeof scope.fg === 'string') {
						var img = new Image();
						img.onload = mergeImages;
						img.src = scope.fg;

						scope.fgImg = img;
					}
				}, true);

				function mergeImages() {
					var w, h;

					var ctx = element[0].getContext('2d');
					if (scope.fgImg && scope.fgImg.naturalWidth && scope.fgImg.naturalWidth > 0 && scope.bgImg && scope.bgImg.naturalWidth && scope.bgImg.naturalWidth > 0) {
						if (scope.width && scope.height) {
							w = scope.width;
							h = scope.height;
						} else {
							w = scope.bgImg.width;
							h = scope.bgImg.height;
						}

						scope.canvas.css({width: w, height: h});
						scope.canvas[0].width = w;
						scope.canvas[0].height = h;

						ctx.drawImage(scope.bgImg, 0, 0, w, h);
						ctx.drawImage(scope.fgImg, 0, 0, w, h);
					}
				}
			}
		};
  }]);
