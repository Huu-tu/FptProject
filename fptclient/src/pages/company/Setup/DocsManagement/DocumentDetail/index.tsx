import { Skeleton } from 'antd';
import { HeaderTable } from 'components/custom/Table';
import { useGetCompanyDetailDoc } from 'libs/hooks/api/company/useCompanyDocs';
import { useSearchParams } from 'libs/hooks/useSearchParams';
import { useParams } from 'react-router-dom';

const CompanyDocDetail = () => {
  const { id } = useParams();
  const { params } = useSearchParams({
    documentId: id,
  });

  const { data: document, isFetching } = useGetCompanyDetailDoc(params);
  return isFetching ? (
    <Skeleton className="place-content-center" />
  ) : (
    <>
      <HeaderTable title={document?.data.name ?? ''} getListPage={true} />
      <div className="mt-4" dangerouslySetInnerHTML={{ __html: document?.data.content ?? '' }} />
    </>
  );
};

export default CompanyDocDetail;
