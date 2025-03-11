import { HeaderTable } from 'components/custom/Table';
import { useGetDetailDocument } from 'libs/hooks/api/admin/useDocument';
import { useSearchParams } from 'libs/hooks/useSearchParams';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

const DocumentDetail: FC = () => {
  const { id } = useParams();
  const { params } = useSearchParams({
    documentId: id,
  });

  const { data: document } = useGetDetailDocument(params);
  return (
    <>
      <HeaderTable title={document?.data.name || ''} getListPage={true} />
      <div className="mt-4" dangerouslySetInnerHTML={{ __html: document?.data.content || '' }} />
    </>
  );
};

export default DocumentDetail;
