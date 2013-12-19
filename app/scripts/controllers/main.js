'use strict';

angular.module('holidayJs2013WhiteElephantApp')
	.controller('MainCtrl', ['$scope', function ($scope) {
		// TODO : Add a list of steps to an object
		// STEPS
		/*
			1. Enable Your Camera
			2. Take a profile picture
			3. Take a picture of your present
			4. Enter your Name
		*/

		// TODO : capture the images and store them into firebase using capture method, Also this should update the Button Text
		// TODO : Add profile picture and picture of present next to web video


		// TODO : track the progress and update a variable each time a step is complete
		// TODO : show a message of the step above or below the status bar

		// TODO : OPTIONAL - Update classes and use a responsive design

		// TODO : OPTIONAL - Consider removing the name, you could simply interact by having a profile and present.
		// TODO : OPTIONAL - Could add logic to not have a profile picture

		// TODO : Test on cell phone

		$scope.capturePicture = function(img){
			$scope.img = img;
		}

	}]);
