import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NotifyMe } from 'components/common/NotifyMe/NotifyMe';
import * as cartActions from 'store/actions/cartActions';
import Product from '../Product/Product';
import './Home.scss';

class Home extends Component {
  componentDidMount = () => {
    const { auth, cartActions, cartItems } = this.props;
    if (cartItems.length === 0 && auth.user_id && !auth.isCartEmpty) {
      cartActions.getCartItems();
    }
  };

  componentDidUpdate = prevProps => {
    const { auth, cartActions } = this.props;
    if (
      prevProps.auth.user_id !== auth.user_id &&
      auth.user_id &&
      !auth.isCartEmpty
    ) {
      cartActions.getCartItems();
    }
  };

  onClickAddToCart = id => {
    const { cartActions, history, auth } = this.props;
    if (!auth.user_id) {
      NotifyMe('warning', 'Please Login to continue shopping');
      history.push({ pathname: '/login', hash: 'addtocart', state: id });
    } else cartActions.addCartItem(id);
  };

  updateCartCount = (id, quantity, stock) => {
    const { cartActions } = this.props;
    if (quantity <= stock)
      cartActions.updateCartItem({ product_id: id, quantity });
  };

  render() {
    const { productList, cartItemIds, cartItems } = this.props;
    return (
      <div className="home">
        {productList.length > 0 ? (
          <div className="home__row">
            {productList.map(product => (
              <Product
                key={product.id}
                product={product}
                cartItems={cartItems}
                cartItemIds={cartItemIds}
                onClickAddToCart={this.onClickAddToCart}
                updateCartCount={this.updateCartCount}
              />
            ))}
          </div>
        ) : (
          <div className="home__empty_products center">
            <p>No Products available right now!</p>
            <p>Please Try again later</p>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  productList: state.product.products,
  auth: state.auth,
  cartItemIds: state.cart.cart_item_ids,
  cartItems: state.cart.cart_items,
});

const mapDispatchToProps = dispatch => ({
  cartActions: bindActionCreators(cartActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
