import { cva } from 'class-variance-authority';

export const changeVariants = cva('flex flex-col items-end', {
  variants: {
    changeType: {
      rise: 'text-red-500',
      same: 'text-gray-800',
      fall: 'text-blue-500',
    },
  },
});
