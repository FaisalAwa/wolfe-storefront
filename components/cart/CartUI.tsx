'use client';

import { DeleteItemButton } from 'components/cart/delete-item-button';
import { EditItemQuantityButton } from 'components/cart/edit-item-quantity-button';
import { DEFAULT_OPTION } from 'lib/constants';
import { createUrl } from 'lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useFormStatus } from 'react-dom';
import { redirectToCheckout } from './actions';
import { useCart } from './cart-context';

function CheckoutButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-brand-secondary text-white rounded-lg py-[18px] text-base font-semibold cursor-pointer hover:opacity-90 mt-2 disabled:opacity-60"
    >
      {pending ? 'Redirecting...' : 'Proceed to Checkout'}
    </button>
  );
}

export default function CartUI() {
  const { cart, updateCartItem } = useCart();

  if (!cart || cart.lines.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-20 py-[120px] gap-6">
        <p className="font-heading text-[28px] font-bold text-brand-primary">Your cart is empty</p>
        <Link
          href="/collections/all"
          className="bg-brand-primary text-white px-10 py-4 rounded-md text-base hover:opacity-90 transition-opacity"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const subtotal = cart.cost.subtotalAmount.amount;
  const total = cart.cost.totalAmount.amount;
  const currency = cart.cost.totalAmount.currencyCode;

  return (
    <div className="flex gap-[60px] px-20 py-[60px] items-start">
      <div className="flex-1">
        <h1 className="font-heading text-[32px] font-bold mb-8 text-brand-primary">Your Cart</h1>

        {cart.lines.map((item, i) => {
          const searchParams: Record<string, string> = {};
          item.merchandise.selectedOptions.forEach(({ name, value }) => {
            if (value !== DEFAULT_OPTION) searchParams[name.toLowerCase()] = value;
          });
          const productUrl = createUrl(`/product/${item.merchandise.product.handle}`, new URLSearchParams(searchParams));

          return (
            <div key={i} className="flex gap-6 items-center py-6 border-b border-gray-100 relative">
              <div className="absolute -top-1 -left-3">
                <DeleteItemButton item={item} optimisticUpdate={updateCartItem} />
              </div>
              <div className="relative w-[100px] h-[100px] bg-surface rounded-lg flex-shrink-0 overflow-hidden">
                {item.merchandise.product.featuredImage && (
                  <Image
                    src={item.merchandise.product.featuredImage.url}
                    alt={item.merchandise.product.featuredImage.altText || item.merchandise.product.title}
                    fill
                    className="object-cover"
                    sizes="100px"
                  />
                )}
              </div>
              <div className="flex-1">
                <Link href={productUrl}>
                  <h3 className="text-base font-semibold text-brand-primary hover:underline">
                    {item.merchandise.product.title}
                  </h3>
                </Link>
                {item.merchandise.title !== DEFAULT_OPTION && (
                  <p className="text-[13px] text-muted mt-1">{item.merchandise.title}</p>
                )}
                <p className="text-base font-bold text-brand-secondary mt-2">
                  {currency} {Number(item.cost.totalAmount.amount).toFixed(2)}
                </p>
                <div className="flex items-center gap-3 mt-3 border border-gray-200 rounded-full w-fit">
                  <EditItemQuantityButton item={item} type="minus" optimisticUpdate={updateCartItem} />
                  <span className="text-[15px] font-semibold min-w-6 text-center">{item.quantity}</span>
                  <EditItemQuantityButton item={item} type="plus" optimisticUpdate={updateCartItem} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-[340px] flex-shrink-0 bg-surface rounded-xl p-8 sticky top-10">
        <h2 className="font-heading text-xl font-bold mb-6 text-brand-primary">Order Summary</h2>
        <div className="flex justify-between text-sm text-muted mb-[14px]">
          <span>Subtotal</span>
          <span>{currency} {Number(subtotal).toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-muted mb-[14px]">
          <span>Shipping</span><span>Calculated at checkout</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-brand-primary border-t border-gray-200 pt-4 mt-2">
          <span>Total</span>
          <span>{currency} {Number(total).toFixed(2)}</span>
        </div>
        <form action={redirectToCheckout} className="mt-4">
          <CheckoutButton />
        </form>
        <Link href="/collections/all" className="block text-center mt-[14px] text-sm text-muted underline">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
