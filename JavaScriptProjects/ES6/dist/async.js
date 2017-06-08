"use strict";

var sum1 = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(x) {
        var a, b;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        a = getData(20);
                        b = getData(30);
                        _context.t0 = x;
                        _context.next = 5;
                        return a;

                    case 5:
                        _context.t1 = _context.sent;
                        _context.t2 = _context.t0 + _context.t1;
                        _context.next = 9;
                        return b;

                    case 9:
                        _context.t3 = _context.sent;
                        return _context.abrupt("return", _context.t2 + _context.t3);

                    case 11:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function sum1(_x) {
        return _ref.apply(this, arguments);
    };
}();

var sum2 = function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(x) {
        var a, b;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        a = getData(20);
                        b = getData(30);
                        return _context2.abrupt("return", x + a + b);

                    case 3:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function sum2(_x2) {
        return _ref2.apply(this, arguments);
    };
}();

var sum3 = function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(x) {
        var a, b;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        a = getData(20);
                        b = getData(30);
                        _context3.t0 = x + a;
                        _context3.next = 5;
                        return b;

                    case 5:
                        _context3.t1 = _context3.sent;
                        return _context3.abrupt("return", _context3.t0 + _context3.t1);

                    case 7:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function sum3(_x3) {
        return _ref3.apply(this, arguments);
    };
}();

var sum4 = function () {
    var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(x) {
        var a, b;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        a = getData(20);
                        b = getData(30);
                        _context4.t0 = x;
                        _context4.next = 5;
                        return a;

                    case 5:
                        _context4.t1 = _context4.sent;
                        _context4.t2 = _context4.t0 + _context4.t1;
                        _context4.t3 = b;
                        return _context4.abrupt("return", _context4.t2 + _context4.t3);

                    case 9:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));

    return function sum4(_x4) {
        return _ref4.apply(this, arguments);
    };
}();

//sum1(10).then(v => console.log(v));
// Ждет 3 секунды и после этого возвращает 60 (10 + 20 + 30)

//sum2(10).then(v => console.log(v));
// Сразу возвращает 10[object Promise][object Promise] и после ждет 3 секунды

//sum3(10).then(v => console.log(v));
// Ждет 3 секунды и после этого возвращает 10[object Promise]30

//sum4(10).then(v => console.log(v));
//Ждет 3 секунды и после этого возвращает 30[object Promise] (10 + 20 + [object Promise]

var newSum1 = function () {
    var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(x) {
        var a, b;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.next = 2;
                        return getData(20);

                    case 2:
                        a = _context5.sent;
                        _context5.next = 5;
                        return getData(30);

                    case 5:
                        b = _context5.sent;
                        return _context5.abrupt("return", x + a + b);

                    case 7:
                    case "end":
                        return _context5.stop();
                }
            }
        }, _callee5, this);
    }));

    return function newSum1(_x5) {
        return _ref5.apply(this, arguments);
    };
}();

var newSum2 = function () {
    var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(x) {
        var a, b;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        a = getData(20);
                        _context6.next = 3;
                        return getData(30);

                    case 3:
                        b = _context6.sent;
                        return _context6.abrupt("return", x + a + b);

                    case 5:
                    case "end":
                        return _context6.stop();
                }
            }
        }, _callee6, this);
    }));

    return function newSum2(_x6) {
        return _ref6.apply(this, arguments);
    };
}();

var newSum3 = function () {
    var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(x) {
        var a, b;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        _context7.next = 2;
                        return getData(20);

                    case 2:
                        a = _context7.sent;
                        b = getData(30);
                        return _context7.abrupt("return", x + a + b);

                    case 5:
                    case "end":
                        return _context7.stop();
                }
            }
        }, _callee7, this);
    }));

    return function newSum3(_x7) {
        return _ref7.apply(this, arguments);
    };
}();

//newSum1(10).then(v => console.log(v));
// Ждет 6 секунд и после этого возвращает 60 (10 + 20 + 30)

//newSum2(10).then(v => console.log(v));
// Ждет 3 секунды и после этого возвращает 10[object Promise]30

//newSum3(10).then(v => console.log(v));
//Ждет 3 секунды и после этого возвращает 30[object Promise] после чего ждет еще 3 секунды


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require("babel-polyfill");

function getData(x) {
    return new Promise(function (resolve) {
        return setTimeout(function () {
            return resolve(x);
        }, 3000);
    });
}