var app = angular.module('app', ['ui.router', 'mwl.calendar']);

app.run(function($rootScope) {
   $rootScope.$on('$stateChangeStart', function(event, toState, toParam, fromState) {
      if(toState.title) {
         $rootScope.title = toState.title;
         console.log(toState.title);
      } else
         $rootScope.title = 'Month Draft';
      console.log($rootScope.title);

   });
});

app.config(function($stateProvider, $urlRouterProvider, calendarConfig) {
   $stateProvider.state('app', {
      url: '',
      abstract: true,
      views: {
         'calendarSelection': {
            templateUrl: 'app/templates/calendarSelection.html',
            controller: 'SelectionCtrl'
         }
      }
   }).state('app.draft', {
      url: '/draft',
      abstract: true,
   }).state('app.draft.week', {
      url: '/week',
      views: {
         'content@': {
            templateUrl: 'app/templates/weekAll.html',
            controller: 'WeekAllCtrl'
         }
      }
   }).state('app.draft.month', {
      url: '/month',
      views: {
         'content@': {
            templateUrl: 'app/templates/monthAll.html',
            controller: 'MonthAllCtrl'
         }
      }
   });

   $urlRouterProvider.otherwise('/draft/week');

   calendarConfig.templates.calendarWeekView = "app/templates/mwl-calendar/week.html";
});

app.service('CalendarService', function(moment) {
   var events = [{
      title: 'asd',
      type: 'warning',
      startsAt: moment().toDate(),
      endsAt: moment().add(2, 'day').toDate(),
      resizable: true
   },{
      title: 'asd',
      type: 'special',
      startsAt: moment().add(3,'day').toDate(),
      endsAt: moment().add(4, 'day').toDate(),
      resizable: true
   }, {
      title: 'asd',
      type: 'warning',
      startsAt: moment().add(4,'day').toDate(),
      endsAt: moment().add(5, 'day').toDate(),
      resizable: true
   }];
   var calendarView = 'week';
   var viewDate = new Date();
   return {
      getEvents: function() {
         return events;
      },
      getCalendarView: function() {
         return calendarView;
      },
      getViewDate: function() {
         return viewDate;
      },
      setEvents: function(newValue) {
         events = newValue;
      },
      setCalendarView: function(newValue) {
         calendarView = newValue;
      },
      setViewDate: function(newValue) {
         viewDate = newValue;
      },
      decrement: function() {
         viewDate = moment(viewDate).subtract(1, calendarView).toDate();
         return viewDate;
      },
      today: function() {
         viewDate = new Date();
         return viewDate;
      },
      increment: function() {
         viewDate = moment(viewDate).add(1, calendarView).toDate();
         return viewDate;
      }
   };
});