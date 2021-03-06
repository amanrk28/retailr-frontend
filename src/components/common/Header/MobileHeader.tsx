import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItemButton,
  IconButton,
  ListItem,
  Divider,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import LOGO_MAIN, { COMPANY_NAME } from 'utils/utils';
import { HEADER_ITEMS, drawerStyle, iconStyle } from './constants';
import './Header.scss';

interface MobileHeaderProps {
  isLoggedIn: boolean;
  onClickLogout: () => void;
  name: string;
  cartCount: number;
}

const MobileHeader = ({
  isLoggedIn,
  onClickLogout,
  name,
  cartCount,
}: MobileHeaderProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <div className="mobileHeader-wrapper">
        <Link to="/">
          <img className="header-logo" src={LOGO_MAIN} alt={COMPANY_NAME} />
        </Link>
        {isLoggedIn ? (
          <div className="mobileHeader-rightSide">
            <Link to="/cart">
              <div className="cart_logo__wrapper">
                <ShoppingCartIcon className="header__cartLogo" />
                <div className="cart__count center">{cartCount}</div>
              </div>
            </Link>
            <MenuIcon onClick={toggleDrawer} />
          </div>
        ) : (
          <div className="header__signin">
            <Link to="/login">
              <AccountCircleIcon />
            </Link>
          </div>
        )}
      </div>
      <Drawer
        sx={drawerStyle}
        variant="temporary"
        open={isDrawerOpen}
        anchor="right"
        onClose={toggleDrawer}
      >
        <List
          sx={{
            ['&.MuiList-root a']: {
              color: '#fff',
              fontWeight: '500',
              fontSize: 20,
            },
          }}
        >
          <ListItem
            sx={{
              color: 'white',
              fontWeight: 400,
              fontSize: 26,
            }}
          >
            Hello,&nbsp;
            <span style={{ fontWeight: 600 }}>{name}</span>
          </ListItem>
          <Divider sx={{ my: 3 }} />
          {HEADER_ITEMS.map(item => {
            if (item.dataname !== 'cart') {
              return (
                <Link key={item.name} to={item.url} onClick={toggleDrawer}>
                  <ListItemButton sx={{ py: 2 }}>{item.name}</ListItemButton>
                </Link>
              );
            }
          })}
        </List>
        <IconButton sx={iconStyle} onClick={onClickLogout}>
          <LogoutIcon fontSize="large" />
        </IconButton>
      </Drawer>
    </>
  );
};

export default MobileHeader;
