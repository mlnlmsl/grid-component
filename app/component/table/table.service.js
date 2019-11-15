angular.module("tableApp").service("tableService", function($q, $http) {
  /**
   * get all without pagination
   */
  this.getAllCount = function() {
    return $http.get(API_ENDPOINT + `locations`);
  };

  /**
   * get all the locations
   *
   * return promise
   */
  this.getData = function(pageNo, limit) {
    return $http.get(
      API_ENDPOINT + `locations?_page=${pageNo + 1}&_limit=${limit}`
    );
  };

  /**
   * @param {string} key used to search table data
   *
   * return promise
   *
   */
  this.search = function(key = "") {
    return $http.get(API_ENDPOINT + `locations?q=${key}`);
  };

  /**
   * @param {number} id id of data which is to be patched
   *
   * @param {bool} status set the location active/not-active of given id
   *
   * return promise
   */
  this.patchStatus = function(ids, status) {
    return $q.all(
      ids.map(id =>
        $http.patch(API_ENDPOINT + `locations/${id}`, { isActive: status })
      )
    );
  };
});
