import { useState } from 'react';
import { APP_NAME } from '../config';
import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import { signout, isAuth } from '../actions/auth';
// import logo from "../images/Arabic Channel Logo 2 Reverse.png";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';
import '.././node_modules/nprogress/nprogress.css';
import Search from './blog/search';

Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <React.Fragment>
      <Navbar color='light' light expand='md'>
        <Link href='/'>
          <NavLink className='font-weight-bold' style={{ fontSize: '30px', marginRight: '15px' }}>
            Seo Blog
          </NavLink>
        </Link>
        <Nav className='ml-auto'>
          <NavItem>
            <a
              href='/user/crud/blog'
              className='btn btn-primary text-light s-tn py-2'
              style={{ cursor: 'pointer' }}
            >
              Post Article
            </a>
          </NavItem>
          <NavItem>
            <Link href='/blogs'>
              <NavLink className='ml-2' style={{ cursor: 'pointer' }}>Posts</NavLink>
            </Link>
          </NavItem>
        </Nav>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='ml-auto' navbar>
            <NavItem>
              <Link href='/contact'>
                <NavLink style={{ marginRight: '20px' }}>Contact Us</NavLink>
              </Link>
            </NavItem>

            {!isAuth() && (
              <React.Fragment>
                <NavItem>
                  <Link href='/signin'>
                    <NavLink style={{ marginRight: '20px' }}>Login</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href='/signup'>
                    <NavLink style={{ marginRight: '20px' }}>Register</NavLink>
                  </Link>
                </NavItem>
              </React.Fragment>
            )}
            {isAuth() && isAuth().role === 0 && (
              <NavItem>
                <Link href='/user'>
                  <NavLink style={{ marginRight: '20px' }}>{`Dashboard ${isAuth().name}`}</NavLink>
                </Link>
              </NavItem>
            )}
            {isAuth() && isAuth().role === 1 && (
              <NavItem>
                <Link href='/admin'>
                  <NavLink style={{ marginRight: '20px' }}>{`Admin Dashboard`}</NavLink>
                </Link>
              </NavItem>
            )}
            {isAuth() && (
              <NavItem>
                <NavLink
                  style={{ marginRight: '20px' }}
                  onClick={() => signout(() => Router.replace(`/signin`))}
                >
                  Logout
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
      <Search />
    </React.Fragment>
  );
};

export default Header;
