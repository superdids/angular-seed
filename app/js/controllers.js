app.controller('SelectionCtrl', function(CalendarService, $interval, $scope, moment) {

    $scope.date = moment().format('MMMM Do YYYY');

    $scope.time = moment().format('LTS');
    $interval(function() {
        $scope.time = moment().format('LTS');
    }, 1000);

    $scope.calendarData = CalendarService;
});

app.controller('WeekAllCtrl', function(CalendarService, $scope, moment) {
    $scope.events = CalendarService.getEvents();
    $scope.calendarView = CalendarService.getCalendarView();
    $scope.viewDate = CalendarService.getViewDate();

    $scope.calendarData = CalendarService;

    $scope.clicky = function() {
        console.log($scope.calendarView + " | " + $scope.viewDate);
    };
});

app.controller('MonthAllCtrl', function(CalendarService, $scope) {
    $scope.events = CalendarService.getEvents();
    $scope.calendarView = CalendarService.getCalendarView();
    $scope.viewDate = CalendarService.getViewDate();

    $scope.calendarData = CalendarService;

    $scope.clicky = function() {
        console.log($scope.calendarView + " | " + $scope.viewDate);
    };
})