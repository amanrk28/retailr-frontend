import React, { lazy, Suspense } from 'react';
import { isMobile } from 'react-device-detect';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import Loading from 'components/common/Loading/Loading';
import Header from 'components/common/Header/Header';

const Checkout = lazy(() => import('./Checkout/Checkout'));
const UserAccount = lazy(() => import('./UserAccount/UserAccount'));
const Home = lazy(() => import('./Home/Home'));
const Orders = lazy(() => import('./Orders/Orders'));
const ProductDetail = lazy(() => import('./ProductDetail/ProductDetail'));
const ViewOrderItem = lazy(() => import('./OrderItem/OrderItem'));
const Cart = lazy(() => import('./Cart/Cart'));
const CartMobile = lazy(() => import('./CartMobile/CartMobile'));

interface CustomerRoutesProps extends RouteComponentProps {}

const CustomerRoutes = ({ match, location }: CustomerRoutesProps) => {
  return (
    <>
      <Header enableSearch={location.pathname === '/'} />
      <Suspense fallback={<Loading fullLoader />}>
        <Switch>
          <Route
            path={`${match.path}cart`}
            render={({ history }) => {
              return isMobile ? (
                <CartMobile history={history} />
              ) : (
                <Cart history={history} />
              );
            }}
          />
          <Route path={`${match.path}checkout`} component={Checkout} />
          <Route
            path={`${match.path}orders/:id/view`}
            render={({ history, match }) => (
              <div style={{ padding: '2rem' }}>
                <ViewOrderItem history={history} match={match} />
              </div>
            )}
          />
          <Route path={`${match.path}orders`} component={Orders} />
          <Route path={`${match.path}account`} component={UserAccount} />
          <Route path={`${match.path}products/:id`} component={ProductDetail} />
          <Route exact path={`${match.path}`} component={Home} />
        </Switch>
      </Suspense>
    </>
  );
};

export default CustomerRoutes;
