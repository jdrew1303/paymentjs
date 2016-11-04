'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _response = require('./response');

var _response2 = _interopRequireDefault(_response);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Payment = function () {
  function Payment(config) {
    _classCallCheck(this, Payment);

    this.config = this.initialize(config);
  }

  _createClass(Payment, [{
    key: 'initialize',
    value: function initialize(config) {
      return config;
    }
  }, {
    key: 'purchase',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(order, options) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', this.response(order, {}));

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function purchase(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return purchase;
    }()
  }, {
    key: 'response',
    value: function response(body, options) {
      return new this.Response(body, options, this.config);
    }
  }, {
    key: 'Response',
    get: function get() {
      return _response2.default;
    }
  }]);

  return Payment;
}();

exports.default = Payment;