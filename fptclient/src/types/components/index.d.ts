import type { ReactNode } from 'react';
import { FormItemProps } from 'antd/lib';

export type AuthenticationProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export type SwitchCustomProps = {
  id: number;
  isChecked: boolean;
  onChange: (checked: boolean, id: number) => void;
};

export interface IFormBoxItem<T extends object> extends FormItemProps {
  span?: number;
  isFormItem?: boolean;
  name?: keyof T | undefined; // pass undefined when isFormItem = true
}

export type KpiCardProps = {
  icon?: ReactNode;
  value?: string;
  description?: string;
  className?: string;
};
