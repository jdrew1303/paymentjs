'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StripeResponse = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _payment = require('../payment');

var _payment2 = _interopRequireDefault(_payment);

var _response = require('../response');

var _response2 = _interopRequireDefault(_response);

var _stripe = require('stripe');

var _stripe2 = _interopRequireDefault(_stripe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StripeResponse = exports.StripeResponse = function (_Response) {
  _inherits(StripeResponse, _Response);

  function StripeResponse() {
    _classCallCheck(this, StripeResponse);

    return _possibleConstructorReturn(this, (StripeResponse.__proto__ || Object.getPrototypeOf(StripeResponse)).apply(this, arguments));
  }

  _createClass(StripeResponse, [{
    key: 'isSuccess',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', this.options.error !== true);

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function isSuccess() {
        return _ref.apply(this, arguments);
      }

      return isSuccess;
    }()
  }]);

  return StripeResponse;
}(_response2.default);

var Stripe = function (_Payment) {
  _inherits(Stripe, _Payment);

  _createClass(Stripe, [{
    key: 'Response',
    get: function get() {
      return StripeResponse;
    }
  }]);

  function Stripe(config) {
    _classCallCheck(this, Stripe);

    var _this2 = _possibleConstructorReturn(this, (Stripe.__proto__ || Object.getPrototypeOf(Stripe)).call(this, config));

    _this2.stripe = (0, _stripe2.default)(config.key);
    return _this2;
  }

  _createClass(Stripe, [{
    key: 'purchase',
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(order, options) {
        var charge, response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                charge = Object.assign({
                  amount: order.amount,
                  currency: order.currency
                }, options);
                _context2.next = 4;
                return this.stripe.charges.create(charge);

              case 4:
                response = _context2.sent;

                if (!(response.statusCode >= 200 && response.statusCode < 300)) {
                  _context2.next = 9;
                  break;
                }

                return _context2.abrupt('return', this.response(response));

              case 9:
                return _context2.abrupt('return', this.response(response, { error: true }));

              case 10:
                _context2.next = 15;
                break;

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2['catch'](0);
                return _context2.abrupt('return', this.response(_context2.t0, { error: true }));

              case 15:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 12]]);
      }));

      function purchase(_x, _x2) {
        return _ref2.apply(this, arguments);
      }

      return purchase;
    }()
  }]);

  return Stripe;
}(_payment2.default);

exports.default = Stripe;