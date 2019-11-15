function tableController(tableService) {
  var self = this;
  self.searchKey = "";
  self.data = []; // tableService.getData();
  self.totalData = 0; //self.data.length;
  self.loading = true;
  self.count = 0;
  self.selectedRows = [];
  self.isChecked = false;
  self.pagination = [];
  self.currentPage = 0;
  self.perPage = 5;
  self.activateLoading = false;
  self.deactivateLoading = false;

  self.$onInit = function() {
    self.fetchAll();
    self.count();
  };

  // search automatic when user make input
  self.search = function() {
    self.loading = true;
    self.currentPage = 0;
    tableService
      .search(self.searchKey, self.currentPage, self.perPage)
      .then(function(response) {
        self.data = response.data;
        self.totalData = self.data.length;
        self.loading = false;
      });
  };

  //create pagination array
  self.makePaginationArray = function() {
    let i;
    self.pagination = [];
    for (i = 0; i < Math.ceil(self.count / self.perPage); ++i) {
      self.pagination.push(i);
    }
  };

  //fetch data with pagination
  self.fetchAll = function() {
    self.loading = true;
    tableService
      .getData(self.currentPage, self.perPage)
      .then(function(response) {
        self.data = response.data;
        self.totalData = self.data.length;
        self.loading = false;
        self.makePaginationArray();
      });
  };

  //count total data without pagination
  self.count = function() {
    tableService.getAllCount().then(function(response) {
      self.count = response.data.length;
      self.makePaginationArray();
    });
  };

  //operation need when page is clicked
  self.changePage = function(page) {
    self.currentPage = page;
    self.fetchAll();
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
    status ? (self.activateLoading = true) : (self.deactivateLoading = true);
    tableService
      .patchStatus(self.selectedRows, status)
      .then(function(response) {
        status
          ? (self.activateLoading = false)
          : (self.deactivateLoading = false);
        self.selectedRows = [];
        self.fetchAll();
      });
  };
}
