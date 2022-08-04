import React from 'react';
import useCartContext from './CartContext';
import { coupons } from './config';

type CouponsProps = {
  onApplyCoupon: (coupon: string) => void,
};
const Coupons: React.FC<CouponsProps> = (props) => {
  const { onApplyCoupon, coupon } = props;

  const currentCoupon = coupon.id
  return (
    <section data-name="coupons">
      {coupons.map((couponItem) => {
        return (
          <button
            key={couponItem.id}
            className="btn btn-info m-2"
            disabled={currentCoupon === couponItem.id}
            onClick={() => {
              onApplyCoupon(couponItem);
            }}
          >
            {couponItem.id}
          </button>
        );
      })}
    </section>
  );
};

export default Coupons;
