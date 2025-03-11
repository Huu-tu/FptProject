import { Col, Divider, Row } from 'antd';
import { AgentIcon, BusinessIcon, DiaryIcon, EmployeeIcon } from 'components/icon';
import { useTranslation } from 'react-i18next';

import ReactECharts, { EChartsOption } from 'echarts-for-react';

import { KpiCard } from 'components/custom/KpiCard';

const OverviewPage = () => {
  const { t } = useTranslation();

  const option: EChartsOption = {
    title: {
      text: 'Stacked Line',
      textStyle: {
        fontSize: 14,
        fontWeight: 'medium',
      },
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['Email', 'Union Ads', 'Video Ads'],
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
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Email',
        type: 'line',
        stack: 'Total',
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: 'Union Ads',
        type: 'line',
        stack: 'Total',
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: 'Video Ads',
        type: 'line',
        stack: 'Total',
        data: [150, 232, 201, 154, 190, 330, 410],
      },
    ],
  };

  return (
    <>
      <div className="text-xl font-bold"> {t('overview')} </div>
      <Divider className="mt-4 border-[1px] border-gray-200" />
      <div className="w-full">
        <Row gutter={[16, 16]} justify="space-between">
          <Col xs={24} sm={12} md={6}>
            <KpiCard
              className="bg-amber-250"
              icon={<BusinessIcon />}
              value="2.000"
              description={t('total_businesses')}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <KpiCard className="bg-cyan-250" icon={<AgentIcon />} value="5.000" description={t('total_agents')} />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <KpiCard className="bg-yellow-250" icon={<EmployeeIcon />} value="1.200" description={t('total_revenue')} />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <KpiCard
              className="bg-teal-250"
              icon={<DiaryIcon />}
              value="10.000"
              description={t('total_verifications')}
            />
          </Col>
        </Row>
      </div>
      <Row gutter={16} className="mt-10">
        <Col xs={24} sm={12}>
          <div className="h-[400px] rounded-sm border-solid border-gray-100 p-4">
            <ReactECharts option={option} style={{ height: '100%' }} />
          </div>
        </Col>

        <Col xs={24} sm={12}>
          <div className="h-[400px] rounded-sm border-solid border-gray-100 p-4">
            <ReactECharts option={option} style={{ height: '100%' }} />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default OverviewPage;
