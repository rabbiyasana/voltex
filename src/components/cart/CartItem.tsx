import {
    Minus,
    Plus,
    Trash2,
  } from "lucide-react";
  import { useDispatch } from "react-redux";
  import { useNavigate } from "react-router-dom";
  
  import type { AppDispatch } from "../../app/store";
  import {
    decreaseQuantity,
    increaseQuantity,
    removeFromCart,
  } from "../../slices/cartSlice";
  import type { Product } from "../../types/productType";
  
  interface CartItemProps {
    item: {
      product: Product;
      quantity: number;
    };
  }
  
  function CartItem({ item }: CartItemProps) {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
  
    const itemTotal =
      item.product.price * item.quantity;
  
    return (
      <article className="flex gap-4 rounded-2xl bg-white p-4">
        {/* PRODUCT IMAGE */}
        <button
          type="button"
          onClick={() =>
            navigate(`/products/${item.product.id}`)
          }
          className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-[#F5F5F7]"
        >
          <img
            src={item.product.image}
            alt={item.product.name}
            className="h-full w-full object-cover"
          />
        </button>
  
        {/* PRODUCT INFO */}
        <div className="min-w-0 flex-1">
          <div className="flex justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                {item.product.brand}
              </p>
  
              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/products/${item.product.id}`
                  )
                }
                className="mt-1 text-left text-sm font-bold text-[#1D1D1F]"
              >
                {item.product.name}
              </button>
            </div>
  
            {/* REMOVE */}
            <button
              type="button"
              onClick={() =>
                dispatch(
                  removeFromCart(item.product.id)
                )
              }
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500"
            >
              <Trash2 size={15} />
            </button>
          </div>
  
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            {/* QUANTITY */}
            <div className="flex items-center rounded-xl border border-black/10">
              <button
                type="button"
                onClick={() =>
                  dispatch(
                    decreaseQuantity(
                      item.product.id
                    )
                  )
                }
                className="flex h-9 w-9 items-center justify-center"
              >
                <Minus size={14} />
              </button>
  
              <span className="w-9 text-center text-sm font-bold">
                {item.quantity}
              </span>
  
              <button
                type="button"
                onClick={() =>
                  dispatch(
                    increaseQuantity(
                      item.product.id
                    )
                  )
                }
                className="flex h-9 w-9 items-center justify-center"
              >
                <Plus size={14} />
              </button>
            </div>
  
            {/* PRICE */}
            <div className="text-right">
              <p className="text-xs text-gray-400">
                ${item.product.price} each
              </p>
  
              <p className="font-extrabold text-[#1D1D1F]">
                ${itemTotal.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </article>
    );
  }
  
  export default CartItem;