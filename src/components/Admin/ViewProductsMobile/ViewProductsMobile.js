import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { debounce } from 'lodash';
import MenuIcon from '@mui/icons-material/Menu';
import Input from 'components/common/Input/Input';
import * as actions from 'store/actions/productActions';
import { queryStringify } from 'utils/utils';
import Filter from 'components/Filter/Filter';
import './ViewProductsMobile.scss';
import Loading from 'components/common/Loading/Loading';

class ViewProductsMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      category: 'all',
      isLoading: false,
    };
  }

  componentDidMount = () => {
    const { actions, query } = this.props;
    let queryObj = {};
    if (query?.search) {
      queryObj.search = query.search;
    }
    if (query?.category && query.category !== 'all') {
      queryObj.category = query.category;
    }
    this.setState({ ...queryObj });
    actions.getProducts({ query: queryObj });
  };

  onEditProduct = id => {
    const { match, history } = this.props;
    history.push({ pathname: `${match.url}/${id}/edit`, hash: 'edit' });
  };

  getFilteredResult = queryObj => {
    const { history, actions } = this.props;
    for (const k in queryObj) {
      if (queryObj.hasOwnProperty(k) && !queryObj[k]) delete queryObj[k];
      if (k === 'category' && queryObj[k] === 'all') delete queryObj[k];
    }
    history.push({ search: queryStringify(queryObj) });
    this.setState({ isLoading: true });
    const onCb = () => {
      this.setState({ isLoading: false });
    };
    actions.getProducts({ query: queryObj, cb: onCb });
  };

  debounceFn = debounce(queryObj => this.getFilteredResult(queryObj), 400);

  onChangeFilter = e => {
    const { query } = this.props;
    let { value } = e.target;
    const key = e.currentTarget.getAttribute('data-name');
    const queryObj = { ...query, [key]: value };
    this.setState({ ...this.state, ...queryObj });
    if (key === 'search') this.debounceFn(queryObj);
    else this.getFilteredResult(queryObj);
  };

  getCategoryFromId = product => {
    const { productCategories } = this.props;
    const category = productCategories.find(x => x.id === product.category);
    if (category) return category.name;
    return product.category;
  };

  render() {
    const { productList, productCategories, toggleSidebar } = this.props;
    const { search, category, isLoading } = this.state;
    return (
      <div className="viewProductsMobile-wrapper">
        <div className="viewProductsMobile-header-wrapper center">
          <div className="menuIcon center" onClick={toggleSidebar}>
            <MenuIcon />
          </div>
          <div className="viewProductsMobile-header">Products</div>
        </div>
        <div className="viewProductsMobile-topbar center">
          <div className="viewProductsMobile-searchBar">
            <Input
              label="Search"
              dataname="search"
              value={search}
              onChange={this.onChangeFilter}
              placeholder="Search By Product Name"
            />
          </div>
          <div className="viewProductsMobile-filters-container">
            <Filter
              filterName="Category"
              filterOptions={productCategories}
              value={category}
              onChange={this.onChangeFilter}
              dataname="category"
            />
          </div>
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <ul className="mobile-table-wrapper">
            {productList.length > 0 ? (
              productList.map(product => (
                <li
                  key={product.id}
                  onClick={() => this.onEditProduct(product.id)}
                >
                  <div className="image">
                    <img
                      src={product.image}
                      alt={product.name}
                      width="80"
                      height="80"
                    />
                  </div>
                  <div className="productDetails-container">
                    <div className="name">
                      <p>{product.name}</p>
                    </div>
                    <div className="description">
                      <p>{product.description}</p>
                    </div>
                    <div className="price">
                      <p>&#8377; {product.price}</p>
                    </div>
                    <div className="stock">
                      <p>
                        <span>Stock: </span>
                        {product.stock}
                      </p>
                    </div>
                    <div className="category">
                      <p>
                        <span>Category: </span>
                        {this.getCategoryFromId(product)}
                      </p>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <div className="tableEmpty center">No Products Found</div>
            )}
          </ul>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  query: state.router.location.query,
  productList: state.product.products,
  productCategories: state.product.product_categories,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ViewProductsMobile));
