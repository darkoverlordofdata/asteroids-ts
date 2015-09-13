/**
 * trig.js
 *
 * Math.cos, Math.sin lookup tables
 * Math.Tau constant value
 *
 */
(function () {

    var SIN_BITS = 12;
    var SIN_MASK = ~(-1 << SIN_BITS);
    var SIN_COUNT = SIN_MASK + 1;
    var Tau = Math.PI * 2;
    var radToIndex = SIN_COUNT / Tau;
    var sin = new Array(SIN_COUNT);
    var cos = new Array(SIN_COUNT);

    for (var i = 0; i < SIN_COUNT; i++) {
        sin[i] = Math.sin((i + 0.5) / SIN_COUNT * Tau);
        cos[i] = Math.cos((i + 0.5) / SIN_COUNT * Tau);
    }

    /**
     * Math.sin lookup table
     * @param rad
     * @returns {number}
     */
    Math.sin = function(rad) {
        return sin[(rad * radToIndex) & SIN_MASK];
    };

    /**
     * Math.cos lookup table
     * @param rad
     * @returns {number}
     */
    Math.cos = function(rad) {
        return cos[(rad * radToIndex) & SIN_MASK];
    };

    /** @const */
    Math.Tau = Tau


})();
