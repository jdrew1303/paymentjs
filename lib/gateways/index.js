'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alipay = require('./alipay');

Object.defineProperty(exports, 'Alipay', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_alipay).default;
  }
});

var _stripe = require('./stripe');

Object.defineProperty(exports, 'Stripe', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_stripe).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }