var randomQuoteApp = angular.module('randomQuoteApp', []);

randomQuoteApp.controller('randomQuoteCtrl', ['$scope', '$http', '$window',
  function randomQuoteCtrl($scope, $http, $window) {

  $scope.quote;
  $scope.pastQuotes;

  $scope.init = () => {
    $scope.pastQuotes = [];
    $scope.getQuote();
  }

  $scope.getQuote = () => {
    let url = "http://quotes.stormconsultancy.co.uk/random.json";
    fetch(url).then( (res) => res.json() )
      .then( (data) => {
        console.log('data',data)
        $scope.quote = data;
        console.log('quote',$scope.quote);
        addPastQuote($scope.quote);
        $scope.$apply();
      }, (error) => {
      console.log('error',error);
    });
  }

  $scope.redirect = (link) => {
    let newWindow = $window.open();
    newWindow.location = link;
  }

  $scope.share = (site) => {
    let sites = {
      twitter: "https://twitter.com/intent/tweet?text=",
      facebook: "https://www.facebook.com/sharer/sharer.php?u=nacho.software&quote="
    }
    let url = sites[site] + formattedQuote();
    $scope.redirect(url);
  }

  let formattedQuote = () => {
    if ($scope.quote) return `"${$scope.quote.quote}" - ${$scope.quote.author}`;
  }

  let addPastQuote = (quote) => {
    $scope.pastQuotes.push($scope.quote);
    $scope.pastQuotes = [...$scope.pastQuotes];
  }

}]);
