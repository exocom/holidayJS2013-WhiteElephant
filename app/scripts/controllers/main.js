'use strict';

angular.module('holidayJs2013WhiteElephantApp')
	.controller('MainCtrl', ['$scope', function ($scope) {
		// Use this to track which step the user is on. This is used to determine the message above the status bar
		$scope.currentStep = 0;

		$scope.user = {};

		$scope.camera = {
			status: false,
			isWebCam: true,
			isMobile: false
		};

		$scope.progress = {
			type:'success',
			value: 0
		};

		$scope.signUpSteps = [
			{
				description: 'Enable your webcam or choose cell phone',
				browser: {
					firefox: 'Click the camera just left of the address bar.',
					chrome: 'Click allow on the pop down bar directly below the address bar',
					ie: 'Just use another browser! LOL'
				},
				isComplete: false
			},
			{
				description: 'Take your profile picture!',
				btnText: 'Capture Profile Picture',
				isComplete: false
			},
			{
				description: 'Take a picture of your present!',
				btnText: 'Capture Picture of my Gift',
				isComplete: false
			},
			{
				description: 'Enter your name!',
				btnText: 'I\'m ready',
				isComplete: false
			}
		];

		$scope.updateProgress = function(){
			var completedSteps = 0;
			var numberOfSteps = $scope.signUpSteps.length;
			var setStep = false;
			angular.forEach($scope.signUpSteps,function(v,k){
				if(v.isComplete === true){
					completedSteps ++;
				} else if(setStep === false) {
					setStep = true;
					$scope.currentStep = k;
				}
			});
			$scope.progress.value = (completedSteps / numberOfSteps) * 100;
		};

		$scope.$watch('camera',function(newVal){
			if(newVal.status === true || newVal.isMobile === true){
				$scope.signUpSteps[0].isComplete = true;
			} else {
				$scope.signUpSteps[0].isComplete = false;
			}
			$scope.updateProgress();
		},true);

		$scope.$watch('user',function(newVal){
			if(newVal.name && typeof newVal.name === 'string' && newVal.name.length > 0){
				$scope.signUpSteps[3].isComplete = true;
			} else {
				$scope.signUpSteps[3].isComplete = false;
			}
			$scope.updateProgress();
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
				$scope.signUpSteps[1].isComplete = true;
			} else if (!$scope.user.presentPicture){
				$scope.user.presentPicture = img;
				$scope.signUpSteps[2].isComplete = true;
			}
			$scope.updateProgress();
		};

	}]);
