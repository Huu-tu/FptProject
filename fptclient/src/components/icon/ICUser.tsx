import { SVGProps } from 'react';

export const UserIcon = ({ fill = '#333', width = '24', height = '24', className }: SVGProps<SVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      aria-hidden="true"
      role="img"
      className={className}
      width={width}
      height={height}
      viewBox="0 0 32 32"
    >
      <path
        fill={fill}
        d="M23 9A7 7 0 1 1 9 9a7 7 0 0 1 14 0m-2 0a5 5 0 1 0-10 0a5 5 0 0 0 10 0M7.5 18A3.5 3.5 0 0 0 4 21.5v.5c0 2.393 1.523 4.417 3.685 5.793C9.859 29.177 12.802 30 16 30s6.14-.823 8.315-2.207C26.477 26.417 28 24.393 28 22v-.5a3.5 3.5 0 0 0-3.5-3.5zM6 21.5A1.5 1.5 0 0 1 7.5 20h17a1.5 1.5 0 0 1 1.5 1.5v.5c0 1.473-.94 2.949-2.759 4.106C21.434 27.256 18.877 28 16 28s-5.434-.744-7.241-1.894C6.939 24.95 6 23.472 6 22z"
      ></path>
    </svg>
  );
};
