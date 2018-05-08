import React from 'react';

import Cache from './utils/Cache';
import provideDisplayName from './utils/provideDisplayName';

function preload(products) {
    const _products = Array.isArray(products) ? products : [products];

    return Promise.all(
        _products.map(
            id =>
                new Promise(res => {
                    window.Paddle.Product.Prices(id, prices => {
                        Cache.set(id, prices);
                    });
                    res();
                })
        )
    );
}
function ReactPaddlePricesHOC(WrappedComponent) {
    return class extends React.Component {
        displayName = provideDisplayName('PaddlePrices', WrappedComponent);

        constructor(props) {
            super(props);

            if (!Cache.has(this.props.productId)) {
                preload(this.props.productId).then(this.setPrice);
            } else {
                this.setPrice();
            }
        }

        state = {
            price: undefined
        };

        setPrice = () => {
            this.setState({
                price: Cache.get(this.props.productId)
            });
        };

        render() {
            return (
                <WrappedComponent {...this.props} price={this.state.price} />
            );
        }
    };
}

export { preload, ReactPaddlePricesHOC };
export default ReactPaddlePricesHOC;
