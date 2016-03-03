app.controller("TabsCtrl", ['$scope', '$http', function ($scope, $http) {

    $scope.workspaces = [
        {
            id  : 1,
            url : '#/todo/list',
            name: '正在做'
        },
        {
            id  : 2,
            url : '#/giveup/list',
            name: '已经放弃'
        }
    ];

    $scope.setTab = function (idx) {
        angular.forEach($scope.workspaces, function (workspace) {
            workspace.active = ( workspace.id === idx);
        });
    };

    $scope.$on("userLoggedIn", function () {
        $scope.getWorkspaces();
    });

    $scope.$on("userLoggedOut", function () {
        $scope.workspaces = [];
    });
}]);