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
