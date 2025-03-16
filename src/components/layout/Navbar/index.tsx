'use client';

import Link from 'next/link';

import { useIsScrolled } from '@kimdw524/react-utils';

import ThemeToggleButton from '@/components/ThemeToggleButton';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

import { navbarVariants } from './style';

const Navbar = () => {
  const isScrolled = useIsScrolled();

  return (
    <div className={navbarVariants({ isScrolled })}>
      <div>
        <h1>
          <Link href="/" legacyBehavior passHref>
            Coinfo
          </Link>
        </h1>
      </div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <ThemeToggleButton />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>News</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Statistics</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="ml-2">
            <Button>Login</Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Navbar;
