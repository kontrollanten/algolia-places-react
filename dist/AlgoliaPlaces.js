'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _places = require('places.js');

var _places2 = _interopRequireDefault(_places);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AlgoliaPlaces = function (_React$Component) {
  _inherits(AlgoliaPlaces, _React$Component);

  function AlgoliaPlaces() {
    _classCallCheck(this, AlgoliaPlaces);

    return _possibleConstructorReturn(this, (AlgoliaPlaces.__proto__ || Object.getPrototypeOf(AlgoliaPlaces)).apply(this, arguments));
  }

  _createClass(AlgoliaPlaces, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.autocomplete = (0, _places2.default)(_extends({}, this.props.options, {
        container: this.autocompleteElem
      }));

      this.autocomplete.on('suggestions', this.props.onSuggestions);
      this.autocomplete.on('cursorchanged', this.props.onCursorChanged);
      this.autocomplete.on('change', this.props.onChange);
      this.autocomplete.on('clear', this.props.onClear);
      this.autocomplete.on('limit', this.props.onLimit);
      this.autocomplete.on('error', this.props.onError);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('input', {
          placeholder: this.props.placeholder,
          type: 'text',
          ref: function ref(_ref) {
            _this2.autocompleteElem = _ref;
          }
        })
      );
    }
  }]);

  return AlgoliaPlaces;
}(_react2.default.Component);

AlgoliaPlaces.propTypes = {
  placeholder: _propTypes2.default.string,
  onCursorChanged: _propTypes2.default.func,
  onSuggestions: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  onClear: _propTypes2.default.func,
  onLimit: _propTypes2.default.func,
  onError: _propTypes2.default.func,
  options: _propTypes2.default.shape({
    type: _propTypes2.default.oneOf(['city', 'country', 'address', 'busStop', 'trainStation', 'townhall', 'airport']),
    countries: _propTypes2.default.arrayOf(function (propValue, key, componentName, location, propFullName) {
      if (propValue[key].length !== 2) {
        return new Error('Invalid prop `' + propFullName + '` supplied to' + (' `' + componentName + '`. Validation failed.'));
      }
      return true;
    }),
    aroundLatLng: _propTypes2.default.string,
    aroundLatLngViaIP: _propTypes2.default.bool,
    aroundRadius: _propTypes2.default.number,
    templates: _propTypes2.default.object,
    style: _propTypes2.default.bool,
    appId: _propTypes2.default.string,
    apiKey: _propTypes2.default.string,
    useDeviceLocation: _propTypes2.default.bool,
    computeQueryParams: _propTypes2.default.object,
    clientOptions: _propTypes2.default.object,
    autocompleteOptions: _propTypes2.default.object,
    insideBoundingBox: _propTypes2.default.string,
    insidePolygon: _propTypes2.default.string
  })
};
AlgoliaPlaces.defaultProps = {
  placeholder: 'Type an address',
  onCursorChanged: function onCursorChanged() {
    return undefined;
  },
  onSuggestions: function onSuggestions() {
    return undefined;
  },
  onChange: function onChange() {
    return undefined;
  },
  onClear: function onClear() {
    return undefined;
  },
  onLimit: function onLimit() {
    return undefined;
  },
  onError: function onError() {
    return undefined;
  },
  options: {}
};
exports.default = AlgoliaPlaces;