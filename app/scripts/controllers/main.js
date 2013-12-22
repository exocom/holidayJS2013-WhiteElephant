'use strict';

angular.module('holidayJs2013WhiteElephantApp')
	.controller('MainCtrl', ['$scope', function ($scope) {
		// Use this to track which step the user is on. This is used to determine the message above the status bar
		$scope.currentStep = 0;

		$scope.user = {};

		$scope.camera = {
			status: false
		};

		$scope.signUpSteps = [
			{
				description: 'Enable your webcam',
				browser: {
					firefox: 'Click the camera just left of the address bar.',
					chrome: 'Click allow on the pop down bar directly below the address bar',
					ie: 'Just use another browser! LOL'
				}
			},
			{
				description: 'Take your profile picture!',
				btnText: 'Capture Profile Picture'
			},
			{
				description: 'Take a picture of your present!',
				btnText: 'Capture Picture of my Gift'
			},
			{
				description: 'Enter your name!',
				btnText: 'I\'m ready'
			}
		];
		$scope.$watch('camera',function(newVal){
			if(newVal.status === true){
				$scope.currentStep = 1;
			} else {
				$scope.currentStep = 0;
			}
		},true);

		$scope.img = null;

		// TODO : OPTIONAL - Update classes and use a responsive design

		// TODO : OPTIONAL - Consider removing the name, you could simply interact by having a profile and present.
		// TODO : OPTIONAL - Could add logic to not have a profile picture

		// TODO : Test on cell phone

		$scope.createUser = function(){
			// TODO : pass user to firebase and once complete we can redirect to game-room!
			console.log('You Wish!');
		};

		$scope.capturePicture = function(img){
			if(!$scope.user.profilePicture){
				$scope.user.profilePicture = img;
				$scope.currentStep++;
			} else if (!$scope.user.presentPicture){
				$scope.user.presentPicture = img;
				$scope.currentStep++;
			}
		};

	}]);
