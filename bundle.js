(function(angular) {
  angular.module("todoApp", ["ngComponentRouter"]);
})(window.angular);
const API_ENDPOINT = "http://localhost:3000/";
angular.module("tableApp", []).component("paginationComponent", {
  templateUrl: "./app/component/pagination/pagination.html",
  controller: paginationController,
  bindings: {
    total: "@"
  }
});
function paginationController($scope) {
  var self = this;
  this.perPage = 5;
  this.currentPage = 1;
}
angular.module("tableApp").component("tableComponent", {
  templateUrl: "./app/component/table/table.html",
  controller: tableController
});
function tableController(tableService) {
  var self = this;
  self.searchKey = "";
  self.data = []; // tableService.getData();
  self.totalData = 0; //self.data.length;
  self.loading = true;
  self.selectedRows = [];
  self.isChecked = false;

  self.$onInit = function() {
    tableService.getData().then(function(response) {
      self.data = response.data;
      self.totalData = self.data.length;
      self.loading = false;
    });
  };

  self.search = function() {
    self.loading = true;
    tableService.search(self.searchKey).then(function(response) {
      self.data = response.data;
      self.totalData = self.data.length;
      self.loading = false;
    });
  };

  /**
   * @param {number} id id of checked row
   *
   * @param {bool} isChecked whether row is selected or not
   *
   * return none
   */
  self.rowSelectionChange = function(id, isChecked) {
    if (isChecked) {
      self.selectedRows.push(id);
    } else {
      self.selectedRows = self.selectedRows.filter(function(x) {
        return x !== id;
      });
    }
  };

  /**
   * toggle status of each selected id
   *
   *  @param {bool} sttatus whether to activate or deactivate the location
   *
   * return none
   */
  self.alterStatus = function(status) {
    tableService
      .patchStatus(self.selectedRows, status)
      .then(function(response) {});
  };
}
angular.module("tableApp").service("tableService", function($q, $http) {
  /**
   * get all the locations
   *
   * return promise
   */
  this.getData = function() {
    return $http.get(API_ENDPOINT + "locations");
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
