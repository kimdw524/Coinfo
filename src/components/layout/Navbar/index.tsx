'use client';

import Link from 'next/link';

import { useIsScrolled } from '@kimdw524/react-utils';
import clsx from 'clsx';

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

interface NavbarProps {
  className?: string;
  sticky?: boolean;
}

const Navbar = ({ className, sticky = false }: NavbarProps) => {
  const isScrolled = useIsScrolled();

  return (
    <div className={clsx(className, navbarVariants({ isScrolled: isScrolled && sticky, isSticky: sticky }))}>
      <div>
        <h1>
          <Link href="/" legacyBehavior passHref>
            Coinfo
          </Link>
        </h1>
      </div>
      <NavigationMenu>
        <NavigationMenuList className="gap-2">
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
          <NavigationMenuItem>
            <Button>Login</Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Navbar;
