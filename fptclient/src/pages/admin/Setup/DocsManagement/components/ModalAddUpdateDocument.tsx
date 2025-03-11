import { Form, Input } from 'antd';
import ButtonGlobal from 'components/custom/Button';
import FormBoxItem from 'components/custom/Form/FormBoxItem';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import { useValidation } from 'libs/hooks';
import { useCreateDocument, useUpdateDocument } from 'libs/hooks/api/admin/useDocument.ts';
import { useEffect, useState } from 'react';
import FroalaEditor from 'react-froala-wysiwyg';
import { useTranslation } from 'react-i18next';
import { removeModal } from 'store/slices/modalSlice';
import { ScreenType, Status } from 'types';
import { IFormBoxItem } from 'types/components';
import { Document } from 'types/SwaggerTypeAdmin.ts';
import { FormDocumentSchema, documentSchema } from './validationAddUpdateDocument.ts';

const ModalAddUpdateDocument = ({ document, screen }: { document?: Document; screen: ScreenType }) => {
  const { t } = useTranslation();
  const [form, rule] = useValidation(documentSchema(t));
  const { mutate: createDocument, isPending: loadingCreate } = useCreateDocument();
  const { mutate: updateDocument, isPending: loadingUpdate } = useUpdateDocument();
  const [editorContent, setEditorContent] = useState('');

  useEffect(() => {
    if (document) {
      setEditorContent(document.content || '');
    }
  }, [document]);

  const handleModelChange = (content: string) => {
    form.setFieldsValue({ content: content });
    setEditorContent(content);
  };

  const handleSubmitForm = (values: FormDocumentSchema) => {
    if (document) {
      updateDocument(
        {
          ...values,
          documentId: document.id,
        },
        {
          onSuccess: () => {
            removeModal();
          },
        },
      );
      return;
    }
    createDocument(
      { ...values, status: Status.ACTIVE, imageId: undefined },
      {
        onSuccess: () => {
          removeModal();
        },
      },
    );
  };

  const formItems: IFormBoxItem<FormDocumentSchema>[] = [
    {
      name: 'name',
      label: t('title'),
      required: true,
      span: 24,
      children: <Input placeholder={t('placeholder.enter_field', { field: t('title') })} />,
    },
    {
      name: 'description',
      label: t('description'),
      required: true,
      span: 24,
      children: <Input placeholder={t('placeholder.enter_field', { field: t('description') })} />,
    },
    {
      name: 'content',
      label: t('content'),
      required: true,
      span: 24,
      children: <FroalaEditor tag="textarea" model={editorContent} onModelChange={handleModelChange} />,
    },
  ];

  return (
    <Form form={form} layout="vertical" initialValues={document} onFinish={handleSubmitForm}>
      <FormBoxItem listItems={formItems} defaultSpan={12} columnGap={[20, 5]} rule={rule} />

      <ButtonGlobal.Footer
        isUpdate={!!document}
        htmlType="submit"
        loading={loadingCreate ?? loadingUpdate}
        screen={screen}
      />
    </Form>
  );
};

export default ModalAddUpdateDocument;
