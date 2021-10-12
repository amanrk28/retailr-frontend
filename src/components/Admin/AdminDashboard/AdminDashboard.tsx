import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { useDispatch } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  Divider,
  IconButton,
} from '@mui/material';
import { logout } from 'store/actions/authActions';
import { adminActions, actionIds, paths } from './constants';
import './AdminDashboard.scss';

const sidebarWidth = 70;

const drawerStyle = {
  width: sidebarWidth,
  flexShrink: 0,
  [`& .MuiDrawer-paper`]: {
    width: sidebarWidth,
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'space-between',
    overflowX: 'hidden',
    bgcolor: 'var(--yellow-primary)',
    boxShadow: '0 0 16px #666',
  },
};

interface AdminSidebarProps extends RouteComponentProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const AdminSidebar = ({
  match,
  location,
  isSidebarOpen,
  toggleSidebar,
}: AdminSidebarProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const idx = Object.values(paths).indexOf(location.pathname);
    if (idx > -1) setSelectedIndex(idx);
  }, [location.pathname]);

  const routeObject = (id: string) => {
    switch (id) {
      case actionIds.AddProduct:
        return { pathname: paths.addProduct, hash: 'new' };
      case actionIds.ViewProduct:
        return { pathname: paths.viewProducts };
      case actionIds.ViewOrders:
        return { pathname: paths.viewOrders };
      case actionIds.UpdateOrderStatus:
        return { pathname: paths.viewOrders };
      default:
        return { pathname: `${match.url}` };
    }
  };

  return (
    <div className="adminDb-body">
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        sx={drawerStyle}
        open={isSidebarOpen}
      >
        <List>
          {adminActions.map((item, idx) => (
            <Link
              key={item.id}
              to={() => routeObject(item.id)}
              onClick={() => {
                setSelectedIndex(idx);
                toggleSidebar();
              }}
            >
              <ListItemButton
                selected={selectedIndex === idx}
                sx={{
                  [`&.Mui-selected`]: {
                    background: 'linear-gradient(-45deg, #a4ce38ee, #80ae38)',
                  },
                }}
              >
                <ListItemIcon style={{ padding: '1rem 8px', color: 'white' }}>
                  <item.icon />
                </ListItemIcon>
              </ListItemButton>
              {idx === 1 && <Divider sx={{ color: 'white' }} />}
            </Link>
          ))}
        </List>
        <IconButton
          sx={{
            width: 80,
            p: 2,
            color: 'white',
          }}
          onClick={() => dispatch(logout())}
        >
          <LogoutIcon fontSize="large" />
        </IconButton>
      </Drawer>
    </div>
  );
};

export default withRouter(AdminSidebar);
