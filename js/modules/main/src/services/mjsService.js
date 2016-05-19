angular.module('main').
	factory('mjs', ['$http', '$resource', 'apiClient', '$rootScope', 'item',
					'auth', '$q', '$sessionStorage', '$window',
					function($http, $resource, apiClient, $rootScope, item,
							 auth, $q, $sessionStorage, $window) {
		var self = this;
		self.item = item;

		var mjs = {

			dict: {},
			_latest: auth.user,

			_update_latest: function (response) {
				var user = response.data;
				angular.extend(mjs.latest, user);
			},

			rename_branch: function(branch_num, new_name) {
				$http.post(apiClient.urls.mjs +'/'+ branch_num + '/name', new_name)
					 .then(mjs._update_latest);
			},

			add: function(item_string) {
				return $http.post(apiClient.urls.mjs, item_string)
								  .then(mjs._update_latest);
			},

			remove: function(item_string) {
				return $http.delete(apiClient.urls.mjs +'/'+ item_string)
							.then(mjs._update_latest);
			},

			add_to_branch: function(item_string, branch_num) {
				var self = this;
				$http.post(apiClient.urls.mjs +'/'+ (parseInt(branch_num) + 1),
						   item_string)
							.then(mjs._update_latest)
			},

			remove_from_branch: function(item_string, branch_num) {
				$http.delete(apiClient.urls.mjs + '/' + (parseInt(branch_num) + 1) + '/' + item_string)
					 .then(mjs._update_latest);
			},

			get_items_ids: function () {
				var ret = [];
				if (this.latest)
					this.latest.story_items.forEach(function (i) {
						ret.push(i.id);
					});
				return ret;
			}
		};
		//get latest from session storage
		Object.defineProperty(mjs, 'latest', {
			enumerable: true,
			get: function () {
				return this._latest;
			},
			set: function(story) {
				this._latest = story;
				$rootScope.$broadcast('mjs-updated', story);
			}
		});
		Object.defineProperty(mjs, 'items_counters', {
			get: function () {
				var story = mjs.latest,
					ret = [0,0,0,0];

				if (story && story.story_items)
					story.story_items.forEach(function(i, _i) {
						i.in_branch.forEach(function (flag, _flag) {
							if (flag)
								ret[_flag]++;
						});
					});
				return ret;
			}
		});
		/*
		** When a new Item is loaded, check if it's in the story and update `in_mjs` on the `item_data`
		*/
		$rootScope.$on('item-loaded', function (event, items) {
			if (mjs.latest && mjs.latest.story_items) {
				if (items.constructor !== Array)
					items = [items]
				items.forEach(function (item_data) {
					var item_string = self.item.get_key(item_data);

					var in_mjs = false;

					mjs.latest.story_items.every(function(item) {
						if (item_string == item.id) {
							in_mjs = true;
							item_data.in_branch = item.in_branch.slice();
							mjs.dict[item_string] = item;
						}
						return !in_mjs;
					});
					item_data.in_mjs = in_mjs;
				});
			}
		});
		$rootScope.$on('loggedin', function (event, user) {
			mjs.latest = user;
		});

		return mjs;
	}]);
