import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib';
import { t } from 'i18next';
import { checkPermission } from 'libs/utils/checkPermission';
import { EButtonPattern, ScreenType } from 'types';

const renderClass = (pattern?: EButtonPattern): string | undefined => {
  switch (pattern) {
    case EButtonPattern.ADD:
      return 'bg-white hover:opacity-80 text-slate-900 hover:bg-slate-200 active:bg-slate-300';
    case EButtonPattern.UPDATE:
      return 'bg-primary text-white';
    case EButtonPattern.DELETE:
      return 'border-slate-300 enabled:border-red-500 active';
    case EButtonPattern.FOOTER:
      return 'w-full bg-primary mt-4';
    case EButtonPattern.SEARCH:
      return 'text-white bg-green-400 hover:bg-green-500 active:bg-green-600';
    case EButtonPattern.PRIMARY:
    default:
      return 'text-blue-400 bg-white !hover:bg-blue-400 hover:text-white';
  }
};

const renderType = (pattern?: EButtonPattern): 'link' | 'text' | 'default' | 'primary' | 'dashed' | undefined => {
  switch (pattern) {
    case EButtonPattern.ADD:
      return 'default';
    case EButtonPattern.UPDATE:
      return 'default';
    case EButtonPattern.DELETE:
      return 'link';
    case EButtonPattern.FOOTER:
      return 'default';
    case EButtonPattern.SEARCH:
      return 'default';
    case EButtonPattern.PRIMARY:
      return 'primary';
    default:
      return undefined;
  }
};

const ButtonGlobal = ({
  title,
  pattern = EButtonPattern.PRIMARY,
  className,
  icon,
  type,
  ...props
}: ButtonProps & { pattern?: EButtonPattern }) => {
  return (
    <Button
      className={`${renderClass(
        pattern,
      )} ${title ? 'min-w-[100px]' : ''} flex w-fit items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 py-1 font-semibold shadow-md ${className}`}
      type={type ?? renderType(pattern)}
      {...props}
    >
      {icon}
      {title}
    </Button>
  );
};

ButtonGlobal.Add = (props: ButtonProps & { pattern?: EButtonPattern }) => (
  <ButtonGlobal pattern={EButtonPattern.ADD} title={t('add')} {...props} icon={<PlusOutlined />} />
);
ButtonGlobal.Update = (props: ButtonProps & { pattern?: EButtonPattern }) => (
  <ButtonGlobal pattern={EButtonPattern.ADD} title={t('update')} {...props} />
);
ButtonGlobal.Delete = (props: ButtonProps & { pattern?: EButtonPattern }) => (
  <ButtonGlobal
    pattern={EButtonPattern.DELETE}
    danger
    className=""
    title={t('delete')}
    icon={<DeleteOutlined />}
    {...props}
  />
);
ButtonGlobal.Search = (props: ButtonProps & { pattern?: EButtonPattern }) => (
  <ButtonGlobal pattern={EButtonPattern.SEARCH} title={t('search')} {...props} />
);
ButtonGlobal.Footer = (props: ButtonProps & { pattern?: EButtonPattern; isUpdate: boolean; screen?: ScreenType }) => {
  const permission = checkPermission(props.screen);

  const newProps: typeof props = {
    disabled: props.screen ? !permission?.isWrite : props.disabled,
    pattern: EButtonPattern.FOOTER,
    htmlType: 'submit',
    title: (props.title ?? props.isUpdate) ? t('update') : t('create'),
    ...props,
  };

  return <ButtonGlobal {...newProps} />;
};

export default ButtonGlobal;
