import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-scroll';
import { StarFilled } from '@ant-design/icons';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import TimeAgo from 'react-timeago';
import { formatDate } from '../../../helpers';
import { Feedback, ProductCard } from '../../common';

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: #f7f7f7;

  .main {
    .seller-info {
      display: flex;
      justify-content: center;
      height: 300px;
      background: linear-gradient(
        0deg,
        rgba(209, 81, 26, 1) 0%,
        rgba(27, 82, 126, 1) 100%
      );

      .info {
        position: relative;
        max-width: 1100px;
        top: 100px;
        padding: 15px;
        border-radius: 5px;
        background-color: #fff;
        margin: 0 15px;

        .top {
          display: flex;
          padding-bottom: 10px;
          margin-bottom: 10px;
          border-bottom: 1px solid #9fb1cc;

          .avatar {
            height: 150px;
            width: 150px;
            background-color: orange;
          }

          .top-right {
            display: flex;
            width: calc(100% - 150px);
            padding: 5px;
            justify-content: space-between;

            .details {
              min-width: 220px;

              h3 {
                a {
                  font-weight: normal;
                  margin-left: 3px;
                  letter-spacing: 2px;
                }
              }
            }

            .description {
              align-self: center;
              padding: 20px;
            }
          }
        }

        .bottom {
          display: flex;
          justify-content: space-between;
          height: calc(100% - 170px);

          .left,
          .right {
            display: flex;
            padding: 10px;
          }

          .left {
            width: 60%;
            flex-direction: column;

            section {
              display: flex;
              justify-content: space-between;
              flex-wrap: wrap;
              border-bottom: 1px solid #9fb1cc;
              margin-top: 10px;
            }
          }

          .right {
            width: 30%;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            gap: 10px;

            a {
              text-decoration: underline;
            }
          }

          .middle {
            width: 2px;
            background-color: #9fb1cc;
            margin: 10px 0;
          }
        }
      }
    }

    h2 {
      margin: 0 0 20px 0;
      font-weight: bold;
      border-bottom: 2px solid #b8b9b9;
    }

    h3 {
      font-weight: bold;
      margin: 0;
    }

    .products-wrapper {
      padding: 150px 15px 15px 15px;

      .products {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
      }
    }

    .reviews-wrapper {
      padding: 40px 15px 15px 15px;

      .review {
        section {
          display: flex;
          align-items: center;
          margin-bottom: 10px;

          h3 {
            margin-left: 7px;
          }
        }
      }
    }
  }
`;

export default function RenderSeller({
  selectedSeller,
  inventory,
  reviews,
  loadingInventory,
  loadingReviews,
}) {
  const avgRating = reviews
    ? reviews.reduce((acc, curr) => acc + curr.rate, 0)
    : 0;

  return (
    <Wrapper>
      <div className="main">
        {!selectedSeller || loadingReviews ? (
          <div>Loading...</div>
        ) : (
          <div className="seller-info">
            <section className="info">
              <div className="top">
                <div className="avatar">Seller Avatar</div>
                <div className="top-right">
                  <section className="details">
                    <h3>
                      {selectedSeller.name}
                      <Link to="reviews-wrapper" smooth={true} duration={700}>
                        ({reviews.length}
                        <StarFilled />)
                      </Link>
                    </h3>
                  </section>

                  <section className="description">
                    <p>
                      Hey just a seller who sells anything to make some money, i
                      collect supreme and any shoes. Feel safe buying with me!
                    </p>
                  </section>
                </div>
              </div>

              <div className="bottom">
                <div className="left">
                  <section>
                    <h3>Feedback Ratings:</h3>
                    <Feedback
                      value={avgRating === 0 ? 0 : avgRating / reviews.length}
                    />
                  </section>

                  <section>
                    <h3>Member since:</h3>
                    <div style={{ display: 'flex' }}>
                      {formatDate(selectedSeller.created_at)}
                      |
                      <LocationOnIcon color="secondary" fontSize="small" />{' '}
                      California
                    </div>
                  </section>
                </div>

                <div className="middle" />

                <div className="right">
                  <Link to="reviews-wrapper" smooth={true} duration={700}>
                    {' '}
                    Seller reviews
                  </Link>
                </div>
              </div>
            </section>
          </div>
        )}

        {!selectedSeller || loadingInventory || loadingReviews ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="products-wrapper">
              <h2>Items for sale({inventory.length})</h2>

              <div className="products">
                {inventory.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>

            <div className="reviews-wrapper">
              <h2>Reviews:({reviews.length})</h2>

              {reviews.map((review, i) => (
                <div
                  className="review"
                  key={review.buyer_id}
                  style={
                    i !== reviews.length - 1
                      ? {
                          padding: '30px 0',
                          borderBottom: '1px solid #b8b9b9',
                        }
                      : { padding: '30px 0 20px  0' }
                  }
                >
                  <section>
                    <Feedback value={review.rate} addLabel={false} />
                    <h3>{review.title}</h3>
                  </section>

                  <section style={{ gap: '5px' }}>
                    <VerifiedUserIcon
                      style={{ color: 'green' }}
                      fontSize="small"
                    />
                    <span>Verified Purchase</span>
                    <span style={{ fontWeight: 'bold' }}> | </span>
                    <span>
                      Posted <TimeAgo date={review.created_at} />.
                    </span>
                  </section>

                  <p>{review.description}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Wrapper>
  );
}
