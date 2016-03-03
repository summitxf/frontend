app.filter('todoFilter', function () {

    return function (input) {
        if (input == '1') {
            return "default";
        } else if (input == '2') {
            return 'info';
        } else if (input == '3') {
            return 'warning';
        } else if (input == '4') {
            return 'danger';
        }
    };
});

app.filter('todayFilter', function () {
    return function (input) {
        return new Date(input).getDay() != new Date().getDay();
    };
});