'use strict';

angular.module('holidayJs2013WhiteElephantApp')
	.controller('MainCtrl', [
		'$scope',
		'$location',
		'$cookies',
		'$routeParams',
		'FBURL',
		function ($scope, $location, $cookies, $routeParams, FBURL) {
			// CHECK TO SEE IF THE USER IS REGISTERED OR IS IN A GAME!
			if($cookies.userId && $cookies.gameId){
				$location.path('game-room/' + $cookies.gameId);
				$location.search({});
				$location.replace();
			} else if($cookies.userId){
				$location.path('lobby/');
				$location.search({});
				$location.replace();
			}

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
				dimensions: {
					height: 280,
					width: 280
				},
				fileUploading: false
			};

			// Quick test to see if browser has support for getUserMedia!
			navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
			if (typeof navigator.getUserMedia != 'function') { // The browser does not support getUserMedia
				$scope.camera.useFileInput = true;
				$scope.camera.useGetUserMedia = false;
				$scope.camera.removeGetUserMedia = true;
			}

			$scope.user = {};

			$scope.progress = {
				type: 'success',
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

			$scope.updateProgress = function () {
				var completedSteps = 0;
				var numberOfSteps = $scope.signUpSteps.length;
				var setStep = false;
				angular.forEach($scope.signUpSteps, function (v, k) {
					if (v.isComplete === true) {
						completedSteps++;
					} else if (setStep === false) {
						setStep = true;
						$scope.currentStep = k;
					}
				});
				$scope.progress.value = (completedSteps / numberOfSteps) * 100;
			};

			// TODO Move this into the file uploader directive!
			$scope.onFileSelect = function (files) {
				$scope.camera.fileUploading = true;
				// Read the files from the file input, this will give us the raw base64 for the image
				angular.forEach(files, function (file) {
					var reader = new FileReader();
					reader.onload = function (event) {
						$scope.$apply(function () {
							// Now that we have the base64, we want to create an html image element to pass to our resize function
							var img = new Image();
							img.onload = onload;
							img.src = event.target.result;
							function onload(){
								// call the resize function and pass the image element. Not passing base64 because canvas doesn't render it

								// TODO : Make this and the next function built into a directive that can be placed on a <input type="file">
								// NOTE : DOM manipulation was done to save time!  The resize is required in order to have small images in firebase, don't do this in production MAKE a directive!
								resizeFromFile(img);
							}
						});
					};
					reader.readAsDataURL(file);
				});
			};

			$scope.$watch('camera', function (newVal) {
				if (newVal.status === true || newVal.useFileInput === true) {
					$scope.signUpSteps[0].isComplete = true;
				} else {
					$scope.signUpSteps[0].isComplete = false;
				}
				$scope.updateProgress();
			}, true);

			$scope.$watch('user', function (newVal) {
				if (newVal.name && typeof newVal.name === 'string' && newVal.name.length > 0) {
					$scope.signUpSteps[3].isComplete = true;
				} else {
					$scope.signUpSteps[3].isComplete = false;
				}
				$scope.updateProgress();
			}, true);


			$scope.continue = function () {
				if ($routeParams.join) {
					// Manual way
					/*
					 var game = new Firebase(FBURL + '/games/' + $routeParams.join);
					 game.once('value',function(data){
					 });
					 */

					// AngularFire way
					var gameRef = new Firebase(FBURL+'/games/'+$routeParams.join);
					gameRef.once('value',function(snapshot){
						var game = snapshot.val();
						if (game.host && game.status && game.status === 1) {
							var countPlayers = 0;
							angular.forEach(game.players, function () {
								countPlayers++;
							});
							if (countPlayers < 6) {
								$scope.createUser({gameId: $routeParams.join,gameRef:gameRef});
							} else {
								$scope.createUser({error: 'You tried to join a game is already full! Continuing to lobby'});
							}
						} else {
							$scope.createUser({error: 'You tried to join an invalid game or a game that is already in progress!'});
						}
					});
				} else {
					$scope.createUser();
				}
			};

			$scope.createUser = function (options) {
				options = options || {};
				$scope.lock = true;
				var users = new Firebase(FBURL + '/users');
				var user = users.push($scope.user, function () {
					$scope.$apply(function () {
						$cookies.userId = user.name();
						if (options.error) {
							alert(options.error);
						}
          // TODO : TEST THIS! I sent an invite and the user did not get added!
						if (options.gameId) {
							$cookies.gameId = options.gameId;
							options.gameRef.child('/players/'+user.name()).set(true,function () {
								$scope.$apply(function(){
									$location.path('game-room/' + options.gameId);
									$location.search({});
									$location.replace();
								});
							});
						} else {
							$location.path('lobby');
							$location.replace();
						}
					});
				});
			};

			function resizeFromFile(img){
				// TODO : Make this and the previous function built into a directive that can be placed on a <input type="file">
				// NOTE : DOM manipulation was done to save time!  The resize is required in order to have small images in firebase, don't do this in production MAKE a directive!

				var canvas = angular.element('<canvas style="display: none;"></canvas>');
				var body = angular.element('body');
				var w = $scope.camera.dimensions.width;
				var h = $scope.camera.dimensions.width;

				body.append(canvas);

				canvas.css({width: w, height: h});
				canvas[0].width = w;
				canvas[0].height = h;

				var context = canvas[0].getContext('2d');
				context.drawImage(img, 0, 0, w, h);

				var format = 'image/jpeg';
				var imgData = canvas[0].toDataURL(format);
				canvas.remove();

				$scope.$apply(function(){
					angular.element('[name="userForm"]')[0].reset();
					$scope.camera.fileUploading = false;
					$scope.capturePicture(imgData);
				});
			};

			$scope.capturePicture = function (img) {
				if (!$scope.user.profilePicture) {
					$scope.user.profilePicture = img;
					$scope.signUpSteps[1].isComplete = true;
				} else if (!$scope.user.presentPicture) {
					$scope.user.presentPicture = img;
					$scope.signUpSteps[2].isComplete = true;
				}
				$scope.updateProgress();
			};
		}
	]);