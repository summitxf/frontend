app.controller("ListGiveupCtrl", function ($scope, $http, $filter, $uibModal) {
        $scope.paginatedGiveups = [];
        $scope.currentPage = 1;
        $scope.numPerPage = 10;
        $scope.maxSize = 5;

        $scope.isLoading = false;

        $scope.getPaginatedGiveups = function () {
            var begin = ($scope.currentPage - 1) * $scope.numPerPage;
            var end = begin + $scope.numPerPage;

            $scope.paginatedGiveups = $scope.giveups.slice(begin, end);
        };

        $scope.$watch("currentPage + numPerPage", function () {
            $scope.getPaginatedGiveups();
        });

        $scope.getGiveupList = function () {
            $scope.isLoading = true;
            $scope.giveups = [];
            var querystring = $scope.querystring || '';
            $http.get('/services/todo/giveup?query=' + querystring).success(function (rsp) {
                $scope.isLoading = false;
                $scope.giveups = rsp.data;
                $scope.getPaginatedGiveups();
            });
        };

        $scope.getGiveupList();

        $scope.$on('refresh-giveup-list', function () {
            $scope.getGiveupList();
        });

        $scope.showDetailModal = function (item) {
            $uibModal.open({
                animation  : true,
                templateUrl: 'detailModal.html',
                controller : 'DetailModalCtrl',
                resolve    : {
                    items: function () {
                        return $http.get('/services/todo/' + item.id).then(function (rsp) {
                            return rsp.data.data;
                        })
                    }
                }
            });
        };

        $scope.delete = function (item, idx) {
            $http.delete('/services/todo/' + item.id).success(function (rsp) {
                $scope.giveups.splice(idx, 1);
                $scope.getPaginatedGiveups();
            }).error(function (rsp) {
                $scope.error = "An error has occured while deleting Giveup! " + data;
            });
        };

        $scope.logListModal = function (item) {
            $uibModal.open({
                animation  : true,
                templateUrl: 'logListModal.html',
                controller : 'LogListModalCtrl',
                resolve    : {
                    items: function () {
                        return $http.get('/services/todo/log/' + item.id).then(function (rsp) {
                            return rsp.data.data;
                        })
                    }
                }
            });
        };
    }
);

app.controller('DetailModalCtrl', function ($scope, $uibModalInstance, items) {

    $scope.item = items;

    $scope.close = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

app.controller('LogListModalCtrl', function ($scope, $uibModalInstance, items) {

    $scope.logList = items;

    $scope.close = function () {
        $uibModalInstance.dismiss('cancel');
    };
});