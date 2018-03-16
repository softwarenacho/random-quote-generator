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
    let urlS = "https://nacho-api.herokuapp.com/api/quotes-api";
    let url = "http://quotes.stormconsultancy.co.uk/random.json";
    let req = window.location.href;
    fetch(req.includes('https') ? urlS : url).then( (res) => res.json() )
      .then( (data) => {
        $scope.quote = data;
        addPastQuote($scope.quote);
        $scope.$apply();
      }, (error) => {
        console.log('error',error);
    });
  }

  $scope.selectPastQuote = (quote) => {
    $scope.quote = quote;
  }

  $scope.redirect = (link) => {
    let newWindow = $window.open();
    newWindow.location = link;
  }

  $scope.share = (site) => {
    let sites = {
      twitter: "https://twitter.com/intent/tweet?text=",
      facebook: "https://www.facebook.com/sharer/sharer.php?u=https://softwarenacho.github.io/random-quote-generator/&quote="
    }
    let url = sites[site] + formattedQuote();
    $scope.redirect(url);
  }

  let formattedQuote = () => {
    if ($scope.quote) return `"${$scope.quote.quote}" - ${$scope.quote.author}`;
  }

  let addPastQuote = (quote) => {
    $scope.pastQuotes = $scope.pastQuotes.filter( x => x.id != quote.id );
    $scope.pastQuotes.push($scope.quote);
  }

}]);
