angular.module("todoApp", []).component("paginationComponent", {
  templateUrl: "./app/component/pagination/pagination.html",
  controller: paginationController,
  bindings: {
    total: "<"
  }
});
