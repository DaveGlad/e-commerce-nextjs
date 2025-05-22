import { ShoppingCart } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";

const Header = async () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex-between">
        <div className="flex-start">
          <Link href="/" className="flex-start">
            {APP_NAME}
          </Link>
        </div>
        <div className="space-x-2">
          <Button asChild variant="ghost">
            <Link href="/cart">
              <ShoppingCart />
              Cart
            </Link>
          </Button>
          <Button asChild>
            <Link href="/cart">
              <ShoppingCart />
              Sign In
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
