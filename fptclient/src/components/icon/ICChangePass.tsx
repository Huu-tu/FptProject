import { SVGProps } from 'react';

export const ChangePassIcon = ({ fill = 'none', width = '24', height = '24', className }: SVGProps<SVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill={fill} />
      <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" />
      <circle cx="12" cy="11" r="1" />
      <line x1="12" y1="12" x2="12" y2="14.5" />
    </svg>
  );
};
