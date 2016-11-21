//Controllers
angular.module('stock').controller('ResourceController', function($scope, Data, $interval) {

    var promise;
    var count = 0;
    var CAC40 = [];
    var NASDAQ = [];
    var i = 0;

    $scope.start = function() {
        $scope.stop();
        promise = $interval(getData, 1000);
    };

    $scope.stop = function() {
        $interval.cancel(promise);
    };

    function getData() {
        var stock = Data.query(function() {
            count = stock.length;
            $scope.data = valuesToChart(stock);
        });
    };

    $scope.start();

    $scope.editItem = function(item) {
        item.editing = true;
    };

    $scope.doneEditing = function(item) {
        item.editing = false;
    };

    $scope.options = {
        chart: {
            type: 'lineChart',
            height: 450,
            margin: {
                top: 20,
                right: 20,
                bottom: 40,
                left: 55
            },
            x: function(d) {
                return d.x;
            },
            y: function(d) {
                return d.y;
            },
            useInteractiveGuideline: true,
            xAxis: {
                axisLabel: 'Time'
            },
            yAxis: {
                axisLabel: 'Value (v)',
                tickFormat: function(d) {
                    return d3.format('.02f')(d);
                },
                axisLabelDistance: -10
            },
            callback: function(chart) {
                console.log("callback");
            }
        },
        title: {
            enable: true,
            text: 'CAC40 / NASDAQ'
        },
        subtitle: {
            enable: true,
            text: 'Chart showing the 20 last values of CAC40 and NASDAQ',
            css: {
                'text-align': 'center',
                'margin': '10px 13px 0px 7px'
            }
        }
    };

    Number.prototype.round = function(p) {
        p = p || 10;
        return parseFloat(this.toFixed(p));
    };

    function valueToArray(pArray, pos, value) {
        pArray.push({
            x: pos,
            y: value,
            editing: false
        });
    };

    function valuesToChart(stock) {
        if (count < 20 || CAC40.length < 20) {
            while (i < stock.length) {
                valueToArray(CAC40, i, stock[i].stocks.CAC40.round(2));
                valueToArray(NASDAQ, i, stock[i].stocks.NASDAQ.round(2));
                i++;
            }
        } else {
            i++;
            CAC40.shift();
            NASDAQ.shift();
            valueToArray(CAC40, i, stock[count - 1].stocks.CAC40.round(2));
            valueToArray(NASDAQ, i, stock[count - 1].stocks.NASDAQ.round(2));
        }
        return [{
            values: CAC40,
            key: 'CAC40',
            color: '#ff7f0e',
            strokeWidth: 2,
            classed: 'dashed'
        }, {
            values: NASDAQ,
            key: 'NASDAQ',
            color: '#2ca02c'
        }];
    };
});
