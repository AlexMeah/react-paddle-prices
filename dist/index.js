let _createClass = (function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
})();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
        );
    }
    return call && (typeof call === 'object' || typeof call === 'function')
        ? call
        : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError(
            'Super expression must either be null or a function, not ' +
                typeof superClass
        );
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass)
        Object.setPrototypeOf
            ? Object.setPrototypeOf(subClass, superClass)
            : (subClass.__proto__ = superClass);
}

import React from 'react';

import Cache from './utils/Cache';
import provideDisplayName from './utils/provideDisplayName';

function preload(products) {
    let _products = Array.isArray(products) ? products : [products];

    return Promise.all(
        _products.map(function(id) {
            return new Promise(function(res) {
                window.Paddle.Product.Prices(id, function(prices) {
                    Cache.set(id, prices);
                    res();
                });
            });
        })
    );
}
function ReactPaddlePricesHOC(WrappedComponent) {
    return (function(_React$Component) {
        _inherits(_class2, _React$Component);

        function _class2() {
            let _ref;

            let _temp, _this, _ret;

            _classCallCheck(this, _class2);

            for (
                var _len = arguments.length, args = Array(_len), _key = 0;
                _key < _len;
                _key++
            ) {
                args[_key] = arguments[_key];
            }

            return (
                (_ret = ((_temp = ((_this = _possibleConstructorReturn(
                    this,
                    (_ref =
                        _class2.__proto__ ||
                        Object.getPrototypeOf(_class2)).call.apply(
                        _ref,
                        [this].concat(args)
                    )
                )),
                _this)),
                (_this.displayName = provideDisplayName(
                    'PaddlePrices',
                    WrappedComponent
                )),
                (_this.state = {
                    price: Cache.get(_this.props.productId)
                }),
                (_this.setPrice = function() {
                    _this.setState({
                        price: Cache.get(_this.props.productId)
                    });
                }),
                _temp)),
                _possibleConstructorReturn(_this, _ret)
            );
        }

        _createClass(_class2, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    if (!Cache.has(this.props.productId)) {
                        preload(this.props.productId).then(this.setPrice);
                    }
                }
            },
            {
                key: 'render',
                value: function render() {
                    return React.createElement(
                        WrappedComponent,
                        Object.assign({}, this.props, {
                            price: this.state.price
                        })
                    );
                }
            }
        ]);

        return _class2;
    })(React.Component);
}

export { preload, ReactPaddlePricesHOC };
export default ReactPaddlePricesHOC;
