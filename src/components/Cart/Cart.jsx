/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import CartLineItem from './CartLineItem';
import type { LineItem } from '../types';
import useCartContext from '../CartContext';

// TODO 7

const Cart: React.FC<CartProps> = (props) => {

  const { lineItems, totalAmount, onRemoveCart, coupon, onRemoveCoupon } = props

  const currentTotalPrice = (coupon.length !== 0 && totalAmount !== 0) ? `${totalAmount} - ${coupon.discount}(coupon優惠) = ${totalAmount - coupon.discount}` : totalAmount

  return (
    <section data-name="Cart">
      <h2>購物車</h2>
      <div className="row">
        <div className="col-2">項目</div>
        <div className="col-3">數量</div>
        <div className="col-2">單價</div>
        <div className="col-3">小計</div>
      </div>
      {lineItems.map((data) => {
        return (
          <CartLineItem
            key={data.id}
            id={data.id}
            title={data.title}
            price={data.price}
            quantity={data.quantity}
          />
        );
      })}
      <div className="text-end">totalAmount: {currentTotalPrice}</div>
      {coupon.length !== 0 && <h5 className='text-end mt-3'> {coupon.id} <span className="badge bg-warning">折扣金額：{coupon.discount}</span></h5>}
      <div className='text-end'>
        {coupon.length !== 0 && <button className='btn btn-danger m-2' onClick={onRemoveCoupon}>移除coupon</button>}
      </div>
      <button
        disabled={totalAmount === 0}
        className="btn btn-success m-2"
        onClick={onRemoveCart}
      >
        清空購物車
      </button>
    </section>
  );
};

export default Cart;
