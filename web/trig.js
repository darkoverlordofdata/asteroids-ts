(function () {

    var SIN_BITS = 12;
    var SIN_MASK = ~(-1 << SIN_BITS);
    var SIN_COUNT = SIN_MASK + 1;
    var radFull = (Math.PI * 2.0);
    var radToIndex = SIN_COUNT / radFull;
    var sin = new Array(SIN_COUNT);
    var cos = new Array(SIN_COUNT);

    for (var i = 0; i < SIN_COUNT; i++) {
        sin[i] = Math.sin((i + 0.5) / SIN_COUNT * radFull);
        cos[i] = Math.cos((i + 0.5) / SIN_COUNT * radFull);
    }
    
    Math.sin = function(rad) {
        return sin[(rad * radToIndex) & SIN_MASK];
    };

    Math.cos = function(rad) {
        return cos[(rad * radToIndex) & SIN_MASK];
    };

})();
