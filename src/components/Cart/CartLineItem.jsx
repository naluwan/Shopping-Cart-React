import React, { useMemo } from 'react';
import useCartContext from '../CartContext';
import { Product } from '../types'

// TODO 7
type BuildItemProps = {
  id: string,
  title: string,
  quantity: number,
  price: number,
};

const BuildItem: React.FC<BuildItemProps> = (props) => {
  // prettier-ignore
  const {
    title,
    quantity,
    price,
    id,
  } = props;

  const { products, onRemoveItem, onUpdateQuantity } = useCartContext()
  const currentProduct = useMemo(() => {
    return products.filter((product: Product) => {
      if (product.id === id) {
        return product
      }
    })
  })

  // 商品剩餘數量
  const inventory = currentProduct[0].inventory


  // 小計
  const lineItemPrice = price * quantity;
  return (
    <section className="row" data-name="CartLineItem" data-gradient>
      <div className="col-2">{title}</div>
      <div className="col-3">
        {/* FIXME：這裡有 bug，怎麼修好他呢? */}
        <button onClick={() => onUpdateQuantity(id, quantity - 1)}>-</button>
        <span className="px-1">{quantity}</span>
        <button onClick={() => onUpdateQuantity(id, quantity + 1)} disabled={inventory === 0}>+</button>
      </div>

      <div className="col-2">{price}</div>
      <div className="col-3">{lineItemPrice}</div>
      <div className="col-2">
        <button className="btn btn-danger w-100" onClick={() => onRemoveItem(id, quantity)}>
          Remove
        </button>
      </div>
    </section>
  );
};

export default React.memo(BuildItem);
