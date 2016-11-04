'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlipayResponse = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _payment = require('../payment');

var _payment2 = _interopRequireDefault(_payment);

var _response = require('../response');

var _response2 = _interopRequireDefault(_response);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _blueimpMd = require('blueimp-md5');

var _blueimpMd2 = _interopRequireDefault(_blueimpMd);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function sign(params, options) {
  params = _lodash2.default.omit(params, ['sign', 'sign_type']);
  var params_signed = {};
  _lodash2.default.keys(params).sort().forEach(function (k) {
    params_signed[k] = params[k];
  });
  params_signed['sign'] = (0, _blueimpMd2.default)(_qs2.default.stringify(params), options.key);
  params_signed['sign_type'] = options.type;

  return params_signed;
}

var AlipayResponse = exports.AlipayResponse = function (_Response) {
  _inherits(AlipayResponse, _Response);

  function AlipayResponse() {
    _classCallCheck(this, AlipayResponse);

    return _possibleConstructorReturn(this, (AlipayResponse.__proto__ || Object.getPrototypeOf(AlipayResponse)).apply(this, arguments));
  }

  _createClass(AlipayResponse, [{
    key: 'isSuccess',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var signed, options, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.body) {
                  _context.next = 3;
                  break;
                }

                this.errors = 'body is empty';
                return _context.abrupt('return', false);

              case 3:
                signed = sign(this.body, {
                  key: this.config.key,
                  type: this.config.sign_type
                });

                if (!(signed.sign !== this.body.sign)) {
                  _context.next = 7;
                  break;
                }

                this.errors = 'sign in is invalid';
                return _context.abrupt('return', false);

              case 7:
                options = void 0;

                if (this.config.cacert) {
                  options = {
                    httpsAgent: _https2.default.Agent({
                      ca: _fs2.default.readFileSync(this.config.cacert)
                    })
                  };
                }
                _context.next = 11;
                return _axios2.default.get(this.queryUrl[this.config.transport] + '?' + _qs2.default.stringify({
                  partner: this.config.partner,
                  notify_id: this.body.notify_id
                }), options);

              case 11:
                response = _context.sent;

                if (!(response.data != 'true')) {
                  _context.next = 15;
                  break;
                }

                this.errors = 'notify is not sent by alipay';
                return _context.abrupt('return', false);

              case 15:
                return _context.abrupt('return', true);

              case 16:
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
  }, {
    key: 'queryUrl',
    get: function get() {
      return {
        'https': 'https://mapi.alipay.com/gateway.do?service=notify_verify&',
        'http': 'http://notify.alipay.com/trade/notify_query.do?'
      };
    }
  }]);

  return AlipayResponse;
}(_response2.default);

var Alipay = function (_Payment) {
  _inherits(Alipay, _Payment);

  function Alipay() {
    _classCallCheck(this, Alipay);

    return _possibleConstructorReturn(this, (Alipay.__proto__ || Object.getPrototypeOf(Alipay)).apply(this, arguments));
  }

  _createClass(Alipay, [{
    key: 'initialize',
    value: function initialize() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return Object.assign({
        //合作身份者ID，签约账号，以2088开头由16位纯数字组成的字符串，查看地址：https://b.alipay.com/order/pidAndKey.htm
        partner: '',
        //收款支付宝账号，以2088开头由16位纯数字组成的字符串，一般情况下收款账号就是签约账号
        seller_id: '',
        // MD5密钥，安全检验码，由数字和字母组成的32位字符串，查看地址：https://b.alipay.com/order/pidAndKey.htm
        key: '',
        // 服务器异步通知页面路径  需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
        notify_url: '',
        // 页面跳转同步通知页面路径 需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
        return_url: '',
        //签名方式
        sign_type: 'MD5',
        //字符编码格式 目前支持 gbk 或 utf-8
        input_charset: 'utf-8',
        //ca证书路径地址，用于curl中ssl校验
        //请保证cacert.pem文件在当前文件夹目录中
        cacert: './cacert.pem',
        //访问模式,根据自己的服务器是否支持ssl访问，若支持请选择https；若不支持请选择http
        transport: 'http',
        // 支付类型 ，无需修改
        payment_type: 1,
        // 产品类型，无需修改
        service: 'create_direct_pay_by_user',
        // 防钓鱼时间戳  若要使用请调用类文件submit中的query_timestamp函数
        anti_phishing_key: '',
        // 客户端的IP地址 非局域网的外网IP地址，如：221.0.0.1
        exter_invoke_ip: ''
      }, config);
    }
  }, {
    key: 'purchase',
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(order) {
        var params, signed;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = {
                  service: this.config.service,
                  partner: this.config.partner,
                  seller_id: this.config.seller_id,
                  payment_type: this.config.payment_type,
                  notify_url: this.config.notify_url,
                  return_url: this.config.return_url,
                  anti_phishing_key: this.config.anti_phishing_key,
                  exter_invoke_ip: this.config.exter_invoke_ip,
                  out_trade_no: order.id,
                  subject: order.title,
                  total_fee: order.amount,
                  body: order.contents,
                  _input_charset: this.config.input_charset
                };
                signed = sign(params, {
                  key: this.config.key,
                  type: this.config.sign_type
                });
                return _context2.abrupt('return', this.response(signed, {
                  redirect: {
                    url: this.gateway,
                    method: 'get'
                  }
                }));

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function purchase(_x2) {
        return _ref2.apply(this, arguments);
      }

      return purchase;
    }()
  }, {
    key: 'gateway',
    get: function get() {
      return 'https://mapi.alipay.com/gateway.do';
    }
  }, {
    key: 'Response',
    get: function get() {
      return AlipayResponse;
    }
  }]);

  return Alipay;
}(_payment2.default);

exports.default = Alipay;