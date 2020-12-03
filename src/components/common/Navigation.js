import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import DropdownMenu from './DropdownMenu';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #cdd7d8;

  .top {
    display: flex;
    padding: 7px 15px;
    flex-direction: row-reverse;
    border-bottom: 1px solid #a1a1a1;

    .top-right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 50%;

      .cart-icon {
        cursor: pointer;
        color: #363636;
        margin-left: 25px;

        span {
          font-weight: 500;
          font-size: 16px;
        }
      }
    }

    .top-left {
      display: flex;
      width: 50%;

      .user-profile {
        display: flex;
        align-items: center;

        svg {
          margin-right: 25px;
        }
      }
    }
  }

  .middle {
    padding: 15px 20px 0 20px;

    .search-bar-wrapper {
      text-align: center;
      border-bottom: 1px solid #a1a1a1;
      padding-bottom: 15px;

      input {
        position: relative;
        max-width: 500px;
        width: 100%;
        border: none;
        padding: 7px;
        font-size: 18px;
      }
    }
  }

  .bottom {
    height: 60px;
    /* border: 1px solid red; */
  }
`;

export default function Navigation({ userInfo, handleLogout }) {
  return (
    <Wrapper>
      <div className="top">
        <div className="top-right">
          <DropdownMenu
            name="My Market"
            items={['Purchase History', 'Saved Items', 'Messages']}
          />

          <Link to="/cart" className="cart-icon">
            <AiOutlineShoppingCart size="2.2em" color="#4a626e" />
          </Link>
        </div>

        <div className="top-left">
          <div className="user-profile">
            <FaUserCircle size="2.2em" color="#607d8b" />
            <DropdownMenu
              name={'Hi, ' + userInfo.name.split(' ')[0]}
              items={[
                'Account Settings',
                <span onClick={handleLogout}>Sign Out</span>,
              ]}
            />
          </div>
        </div>
      </div>

      <div className="middle">
        <div className="search-bar-wrapper">
          <input type="text" placeholder="🔍  Search MarketPlace" />
        </div>
      </div>

      <div className="bottom"></div>
    </Wrapper>
  );
}