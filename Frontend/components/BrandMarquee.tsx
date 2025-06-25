'use client';

import React from 'react';
import Marquee from 'react-fast-marquee'; // or your specific marquee library

const BrandMarquee = () => {
  return (
    <div className="background-100 pt-55 pb-55">
      <div className="container">
        <div className="box-search-category">
          <div className="text-center wow fadeInUp">
            <div>
              <h3 className="heading-4 mb-0 neutral-1000">Our Partners</h3>
            </div>
          </div>
              <Marquee
              
                direction="left"
                pauseOnHover={true}
                className="carouselTicker carouselTicker-left box-list-brand-car justify-content-center wow fadeIn"
              >
                <ul className="carouselTicker__list">
                  {[
                    'dubizzle',
                    'Emirates-NBD',
                    'costums',
                    'etisalat',
                  ].map((brand, idx) => (
                    <li key={idx} className="carouselTicker__item">
                      <div className="item-brand">
                        <img
                          className="light-mode"
                          src={`/assets/imgs/page/homepage2/${brand}.png`}
                          alt="Tokoss Motors"
                        />
                        <img
                          className="dark-mode"
                          src={`/assets/imgs/page/homepage2/${brand}-w.png`}
                          alt="Tokoss Motors"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </Marquee>
            </div>
        </div>
    </div>
  );
};

export default BrandMarquee;
