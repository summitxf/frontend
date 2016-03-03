app.factory('urlInjector', ['$log', function ($log) {
    var urlInjector = {
        request: function (config) {
            if (config.url.indexOf('/services') == 0) {
                config.url = config.url.replace('/services', '/cxf');
                config.url = "/backend-service" + config.url;
            }
            return config;
        }
    };
    return urlInjector;
}]);

app.factory('authInterceptor', function ($rootScope, $location, $q, $window) {
    return {
        request      : function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = $window.sessionStorage.token;
            } else {
                $location.path('/user/login');
            }
            return config;
        },
        responseError: function (response) {
            if (response.status === 401) {
                console.log(response);
                $location.path('/noPermission');
            } else if (response.status === 403) {
                console.log(response);
                $location.path('/user/login');
            }
            return $q.reject(response);
        }
    };
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('urlInjector');
    //$httpProvider.interceptors.push('authInterceptor');
});