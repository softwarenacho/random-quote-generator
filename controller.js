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
    let url = "http://quotes.stormconsultancy.co.uk/random.json"
    $http.get( url, { method: 'GET' } )
    .then( (res) => {
      $scope.quote = res.data;
      addPastQuote($scope.quote);
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
