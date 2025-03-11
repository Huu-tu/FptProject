import { SelectProps } from 'antd/lib';
import { SelectGlobal } from 'components/custom/Select';
import { ERoleType, getRoleType } from 'config/enum';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const map = {
  [ERoleType.ADMIN]: 'admin',
  [ERoleType.AGENCY]: 'agent',
  [ERoleType.PROVIDER]: 'provider',
};

const useRoleTypeValues = () => {
  const { t } = useTranslation();

  return useMemo(
    () =>
      Object.keys(map).map((item) => {
        return {
          label: t(
            map[
              item as unknown as keyof {
                [key in ERoleType]: string;
              }
            ],
          ),
          value: Number(item),
        };
      }),
    [t],
  );
};

const DisplayRoleType = ({ value }: { value: ERoleType }) => {
  const { t } = useTranslation();

  return useMemo(() => t(map[value]), [t, value]);
};

const SelectRoleType = (props: SelectProps) => {
  const { t } = useTranslation();
  const options = useRoleTypeValues();

  return (
    <SelectGlobal
      placeholder={t('placeholder.select_field', { field: t('role') })}
      options={options}
      value={getRoleType()}
      defaultValue={getRoleType()}
      {...props}
    />
  );
};

export { DisplayRoleType, SelectRoleType };
