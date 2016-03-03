app.controller("ListTodoCtrl", function ($scope, $http, $filter, $uibModal) {
        $scope.paginatedTodos = [];
        $scope.currentPage = 1;
        $scope.numPerPage = 10;
        $scope.maxSize = 5;

        $scope.isLoading = false;

        $scope.getPaginatedTodos = function () {
            var begin = ($scope.currentPage - 1) * $scope.numPerPage;
            var end = begin + $scope.numPerPage;

            $scope.paginatedTodos = $scope.todos.slice(begin, end);
        };

        $scope.$watch("currentPage + numPerPage", function () {
            $scope.getPaginatedTodos();
        });

        $scope.getTodoList = function () {
            $scope.isLoading = true;
            $scope.todos = [];
            var querystring = $scope.querystring || '';
            $http.get('/services/todo?query=' + querystring).success(function (rsp) {
                $scope.isLoading = false;
                $scope.todos = rsp.data;
                $scope.getPaginatedTodos();
            });
        };

        $scope.getTodoList();

        $scope.$on('refresh-todo-list', function () {
            $scope.getTodoList();
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

        $scope.logTodo = function (item) {
            var obj = {
                todoId: item.id
            };

            $http.post('/services/todo/log', obj).success(function (rsp) {
                $scope.getTodoList();
            }).error(function (rsp) {
                console.log(rsp);
                $scope.error = "An error has occured while adding Todo! " + data.ExceptionMessage;
            });
        };

        $scope.showEditModal = function (item) {
            $uibModal.open({
                animation  : true,
                templateUrl: 'editModal.html',
                controller : 'EditModalCtrl',
                resolve    : {
                    items: function () {
                        if (item) {
                            return $http.get('/services/todo/' + item.id).then(function (rsp) {
                                return rsp.data.data;
                            })
                        } else {
                            return {};
                        }
                    }
                }
            });
        };

        $scope.delete = function (item, idx) {
            $http.delete('/services/todo/' + item.id).success(function (rsp) {
                $scope.todos.splice(idx, 1);
                $scope.getPaginatedTodos();
            }).error(function (rsp) {
                $scope.error = "An error has occured while deleting Todo! " + data;
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

app.controller('EditModalCtrl', function ($scope, $rootScope, $http, $uibModalInstance, items) {

    $scope.item = items;

    if (items.id) {
        $scope.item.id = items.id;
        $scope.title = "修改";
    } else {
        $scope.item.todoType = 1;
        $scope.title = "添加";
    }

    $scope.close = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.save = function () {
        $scope.$broadcast('show-errors-check-validity');

        if (!$scope.editForm.$valid) {
            return;
        }

        var obj = {
            id      : $scope.item.id,
            todoName: $scope.item.todoName,
            todoType: $scope.item.todoType
        };

        if ($scope.item.id) {
            $http.put('/services/todo/', obj).success(function (rsp) {
                $uibModalInstance.dismiss('cancel');
                $rootScope.$broadcast('refresh-todo-list');
            }).error(function (rsp) {
                $scope.error = "An error has occured while saving Todo! " + data.ExceptionMessage;
            });
        } else {
            $http.post('/services/todo/', obj).success(function (rsp) {
                $uibModalInstance.dismiss('cancel');
                $rootScope.$broadcast('refresh-todo-list');
            }).error(function (rsp) {
                console.log(rsp);
                $scope.error = "An error has occured while adding Todo! " + data.ExceptionMessage;
            });
        }
    };
});

app.controller('LogListModalCtrl', function ($scope, $uibModalInstance, items) {

    $scope.logList = items;

    $scope.close = function () {
        $uibModalInstance.dismiss('cancel');
    };
});