import { cva } from 'class-variance-authority';

export const navbarVariants = cva('flex items-center justify-between border-b px-4 transition-all duration-300', {
  variants: {
    isScrolled: {
      true: 'border-border py-4 backdrop-blur-md bg-transparent',
      false: 'border-transparent py-6 bg-background',
    },
    isSticky: {
      true: 'sticky top-0 z-10 ',
      false: '',
    },
  },
});
