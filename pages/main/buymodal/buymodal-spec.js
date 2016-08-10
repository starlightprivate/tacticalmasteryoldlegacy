describe('BuymodalCtrl', function() {

    beforeEach(module('tactical'));

    var scope,ctrl , timeout;

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('BuymodalCtrl', {$scope: scope , $timeout : timeout});
    }));

    it('should ...', inject(function() {

        expect(1).toEqual(1);

    }));

});
