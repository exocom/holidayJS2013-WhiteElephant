'use strict';

angular.module('holidayJs2013WhiteElephantApp')
	.controller('MainCtrl', ['$scope', function ($scope) {
		// TODO : create a image upload directive with resize similar to camera directive
		// TODO : put data into firebase

		// Use this to track which step the user is on. This is used to determine the message above the status bar
		$scope.currentStep = 0;

		// This is the state object for the camera
		// Some Android Phones support getUserMedia with firefox and android, however no IOS device supports getUserMedia
		$scope.camera = {
			status: false,
			useGetUserMedia: true,
			useFileInput: false,
			removeGetUserMedia: false,
		};

		// Quick test to see if browser has support for getUserMedia!
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
		if(typeof navigator.getUserMedia != 'function'){ // The browser does not support getUserMedia
				$scope.camera.useFileInput = true;
			  $scope.camera.useGetUserMedia = false;
			  $scoep.camera.removeGetUserMedia = true;
		}

		$scope.user = {};

		$scope.progress = {
			type:'success',
			value: 0
		};

		$scope.signUpSteps = [
			{
				description: 'Enable your streaming camera (webcam & android 2.3+) or use camera/file upload',
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
				description: 'Take a picture of your gift!',
				btnText: 'Capture Picture of my Gift',
				isComplete: false
			},
			{
				description: 'Enter your user name!',
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

		// TODO Move this into the file uploader directive!
		$scope.onFileSelect = function(files){
			angular.forEach(files, function (file) {
				var reader = new FileReader();
				reader.onload = function (event) {
                  $scope.$apply(function(){
                      $scope.capturePicture(event.target.result);
                  });
				};
				reader.readAsDataURL(file);
			});
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

		$scope.createUser = function(){
			// TODO : pass user to firebase and once complete we can redirect to game-room!
			alert('Coming Soon!');
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