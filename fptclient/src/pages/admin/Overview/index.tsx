import { Col, Divider, Row } from 'antd';
import { AgentIcon, BusinessIcon, DiaryIcon, EmployeeIcon } from 'components/icon';
import { useGetAuth, useGetRevenue, useGetSummary } from 'libs/hooks';
import { useTranslation } from 'react-i18next';

import ReactECharts from 'echarts-for-react';

import { KpiCard } from 'components/custom/KpiCard';

const OverviewAdminPage = () => {
  const { t } = useTranslation();
  const { data: overview } = useGetSummary();
  const { data: revenue } = useGetRevenue();
  const { data: auth } = useGetAuth();

  const overviewData = [
    {
      className: 'bg-amber-250',
      icon: <BusinessIcon />,
      value: overview?.data?.totalCompanies,
      description: t('total_businesses'),
    },
    {
      className: 'bg-cyan-250',
      icon: <AgentIcon />,
      value: overview?.data?.totalAgencies,
      description: t('total_agents'),
    },
    {
      className: 'bg-yellow-250',
      icon: <EmployeeIcon />,
      value: overview?.data?.totalRevenue,
      description: t('total_revenue'),
    },
    {
      className: 'bg-teal-250',
      icon: <DiaryIcon />,
      value: overview?.data?.totalAuthentications,
      description: t('total_verifications'),
    },
  ];

  const options = [
    {
      option: {
        title: {
          text: t('chart_revenue'),
          textStyle: {
            fontSize: 14,
            fontWeight: 'medium',
          },
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: revenue?.data?.map((item) => item.name) || [],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: revenue?.data?.[0]?.data?.map((item) => item.name) || [],
        },
        yAxis: {
          type: 'value',
        },
        series:
          revenue?.data?.map((value) => ({
            name: value.name,
            type: 'line',
            stack: 'Total',
            data: value?.data?.map((item) => item.value),
          })) || [],
      },
    },
    {
      option: {
        title: {
          text: t('chart_auth'),
          textStyle: {
            fontSize: 14,
            fontWeight: 'medium',
          },
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: auth?.data?.map((telcoData) => telcoData.telco) || [],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: auth?.data?.[0]?.data?.map((item) => item.name) || [],
        },
        yAxis: {
          type: 'value',
        },
        series:
          auth?.data?.map((telcoData) => ({
            name: telcoData.telco,
            type: 'line',
            stack: 'Total',
            data: telcoData?.data?.map((item) => item.value),
          })) || [],
      },
    },
  ];

  return (
    <>
      <div className="text-xl font-bold"> {t('overview')} </div>
      <Divider className="mt-4 border-[1px] border-gray-200" />
      <div className="w-full">
        <Row gutter={[16, 16]} justify="space-between">
          {overviewData.map((item) => (
            <Col xs={24} sm={12} md={6} key={item.description}>
              <KpiCard
                className={item.className}
                icon={item.icon}
                value={`${item.value}`}
                description={item.description}
              />
            </Col>
          ))}
        </Row>
      </div>
      <Row gutter={16} className="mt-10">
        {options.map((item) => (
          <Col xs={24} sm={12} key={item.option.title.text}>
            <div className="h-[400px] rounded-sm border-solid border-gray-100 p-4">
              <ReactECharts option={item.option} style={{ height: '100%' }} />
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default OverviewAdminPage;
