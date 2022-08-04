import React, { useCallback } from 'react';
import ProductItem from './ProductItem';
import { PRODUCTS } from './config';
import Cart from './Cart';
import Coupons from './Coupons';
import type { LineItem, Product, Coupon } from './types';
import { CartContext } from './CartContext'

const ShoppingCart = () => {
  // TODO 2
  const [totalAmount, setTotalAmount] = React.useState(0);
  /**
   * @type {[LineItem[], Function]}
   */
  const [lineItems, setLineItems] = React.useState([]);
  /**
   * @type {[Product[], Function]}
   */
  const [products, setProducts] = React.useState(PRODUCTS)
  /**
   * @type {[Coupon, Function]}
   */
  const [coupon, setCoupon] = React.useState([])

  // TODO 6
  // 當lineItems有變化時就計算商品小計
  React.useEffect(() => {
    // 使用array.reduce((acc, curr) => {}, 0)
    // 0代表起始值為0從0開始加lineItems裡面的每一個商品單價乘數量
    const calcTotalAmount = lineItems.reduce((total, currentItem) => {
      return total + currentItem.price * currentItem.quantity;
    }, 0);

    setTotalAmount(calcTotalAmount);
  }, [lineItems]);

  const atUpdateInventory = useCallback((id: string, condition: string) => {
    switch (condition) {
      case '+':
        setProducts((prev) => {
          return prev.map((product: Product) => {
            if (product.id === id) {
              return {
                ...product,
                inventory: product.inventory + 1
              }
            }
            return product
          })
        })
        break;
      case '-':
        setProducts((prev) => {
          return prev.map((product: Product) => {
            if (product.id === id) {
              return {
                ...product,
                inventory: product.inventory - 1
              }
            }
            return product
          })
        })
        break;
      default:
        break;
    }
  })

  // TODO 5
  const atUpdateQuantity = useCallback((id: string, quantity: number) => {
    // 增加數量
    setLineItems((prev) => {
      const newLineItems = prev.map((item: LineItem) => {
        if (item.id === id) {
          if (item.quantity > quantity) {
            atUpdateInventory(id, '+')
          } else {
            atUpdateInventory(id, '-')
          }
          return {
            ...item,
            quantity
          };
        }
        return item;
      });
      const filterLineItems = newLineItems.filter((item: LineItem) => item.quantity !== 0)
      return filterLineItems
    });
  }, []);

  // TODO 5
  const atAddToCart = useCallback(
    (id: string) => {
      const foundItem = lineItems.find((data) => data.id === id);
      if (foundItem) {
        atUpdateQuantity(id, foundItem.quantity + 1);
      } else {
        // 新增
        const foundProduct = PRODUCTS.find((data) => data.id === id);

        const lineItem = {
          id,
          price: foundProduct.price,
          title: foundProduct.title,
          quantity: 1,
        };
        setLineItems((prev) => prev.concat(lineItem));
        atUpdateInventory(id, '-')
      }
    },
    [atUpdateQuantity, lineItems],
  );

  // TODO
  const atRemoveItem = useCallback((id: string, quantity: number) => {
    setLineItems((prev) => prev.filter((item) => item.id !== id));
    setProducts((prev) => {
      return prev.map((product: Product) => {
        if (product.id === id) {
          return {
            ...product,
            inventory: product.inventory + quantity
          }
        }
        return product
      })
    })
  }, []);

  // TODO
  const atRemoveCart = useCallback(() => {
    lineItems.map((lineItem: LineItem) => {
      atRemoveItem(lineItem.id, lineItem.quantity)
    })
    setLineItems([]);
  }, [lineItems]);

  // FIXME 請實作 coupon

  const atApplyCoupon = useCallback((coupon: Coupon) => {
    console.log('coupon', coupon);
    setCoupon(coupon)
  }, []);

  const atRemoveCoupon = useCallback(() => {
    setCoupon([])
  }, [])


  const provideValue = {
    products,
    onUpdateQuantity: atUpdateQuantity,
    onRemoveItem: atRemoveItem
  }

  return (
    <CartContext.Provider value={provideValue}>
      <div className="container">
        <div className="row">
          {/* TODO 4 */}
          {products.map((product) => {
            return (
              <div className="col-3" key={product.id}>
                <ProductItem
                  id={product.id}
                  img={product.img}
                  title={product.title}
                  price={product.price}
                  inventory={product.inventory}
                  // TODO 5
                  onAddToCart={atAddToCart}
                />
              </div>
            );
          })}
        </div>
        <Cart
          lineItems={lineItems}
          totalAmount={totalAmount}
          coupon={coupon}
          onRemoveCoupon={atRemoveCoupon}
          onRemoveCart={atRemoveCart}
        />
        {/* FIXME 請實作 coupon 功能 */}
        <Coupons onApplyCoupon={atApplyCoupon} coupon={coupon} />
      </div>
    </CartContext.Provider>
  );
};

export default ShoppingCart;
