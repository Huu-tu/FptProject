import { SelectProps } from 'antd/lib';
import { SelectGlobal } from 'components/custom/Select';
import { t } from 'i18next';
import { useGetAgent, useInfiniteAgents } from 'libs/hooks';
import { UIEvent, useMemo } from 'react';

const useAgentValue = (id: number) => {
  const { data: agents, fetchNextPage, isFetching } = useInfiniteAgents();
  const { data: detailAgent, isFetching: fetchingDetail } = useGetAgent({ agencyId: id });

  const options = useMemo(() => {
    return (
      agents.every((agent) => detailAgent?.data.name && agent.id !== id) ? [...agents, detailAgent?.data] : agents
    ).map((agent) => ({
      label: agent?.name,
      value: agent?.id,
    }));
  }, [agents, id, detailAgent]);

  return { options, fetchNextPage, loading: isFetching || fetchingDetail };
};

export const DisplayAgent = ({ id }: { id: number }) => {
  const { options } = useAgentValue(id);
  return options.find((o) => o.value === id)?.label;
};

const SelectAgent = (props: SelectProps) => {
  const { options, loading, fetchNextPage } = useAgentValue(props.value);

  const handleScroll = (e: UIEvent) => {
    const target = e.target as HTMLDivElement;
    const isScrollToBottom = target.scrollTop + target.offsetHeight === target.scrollHeight;

    if (isScrollToBottom) {
      fetchNextPage();
    }
  };

  return (
    <SelectGlobal
      placeholder={t('placeholder.select_field', { field: t('agent') })}
      onPopupScroll={handleScroll}
      loading={loading}
      options={options}
      {...props}
    />
  );
};

export default SelectAgent;
