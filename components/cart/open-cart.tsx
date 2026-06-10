import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function OpenCart({
  className,
  quantity,
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative flex h-9 w-9 items-center justify-center bg-brand-secondary text-white transition-opacity hover:opacity-80">
      <ShoppingBagIcon className={clsx("h-4 w-4", className)} />
      {quantity ? (
        <div className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-brand-primary text-white text-[10px] font-bold flex items-center justify-center">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
