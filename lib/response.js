'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Response = function () {
  function Response(body, options, config) {
    _classCallCheck(this, Response);

    this.body = body;
    this.options = options;
    this.config = config;
  }

  _createClass(Response, [{
    key: 'isSuccess',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', false);

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
  }, {
    key: 'isRedirect',
    value: function isRedirect() {
      return this.options.redirect;
    }
  }, {
    key: 'redirect',
    value: function redirect() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var redirect = _this.options.redirect;

        if (redirect) {
          resolve(_ejs2.default.render('<form method="<%=method%>" action="<%=url%>" id="payment"><% for (let k in body){ %><input type="hidden" name="<%=k%>" value="<%=body[k]%>" /><% } %></form><script type="text/javascript">document.getElementById("payment").submit();</script>', {
            url: redirect.url,
            method: redirect.method,
            body: _this.body
          }));
        } else {
          reject();
        }
      });
    }
  }]);

  return Response;
}();

exports.default = Response;