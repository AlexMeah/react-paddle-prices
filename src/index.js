import React from 'react';

import Cache from './utils/Cache';
import provideDisplayName from './utils/provideDisplayName';

function preload(products) {
    const _products = Array.isArray(products) ? products : [products];

    return Promise.all(
        _products.map(id => {
            if (Cache.has(`${id}_loading`)) {
                return Cache.get(`${id}_loading`);
            }

            const prom = new Promise(res => {
                window.Paddle.Product.Prices(id, prices => {
                    Cache.set(id, prices);
                    res();
                });
            });

            Cache.set(`${id}_loading`, prom);

            return prom;
        })
    );
}
function ReactPaddlePricesHOC(WrappedComponent) {
    return class extends React.Component {
        displayName = provideDisplayName('PaddlePrices', WrappedComponent);

        state = {
            price: Cache.get(this.props.productId)
        };

        componentDidMount() {
            if (!Cache.has(this.props.productId)) {
                preload(this.props.productId).then(this.setPrice);
            }
        }

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
