'use client';
import React, { useState, useEffect} from 'react';
import styled from 'styled-components';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  ClassicEditor,
  Image,
  ImageInsert,
  Bold,
  Essentials,
  Italic,
  Paragraph,
} from 'ckeditor5';
import { useTranslation } from 'next-i18next';
import { FaCheckSquare, FaRegCheckSquare } from 'react-icons/fa';
import { IoMdRadioButtonOn, IoMdRadioButtonOff } from 'react-icons/io';
import { getUserStates } from '@/commons/contexts/UserInfoContext';
import FileUpload from '@/commons/components/FileUpload';
import FileItems from '@/commons/components/FileItems';
import { StyledInput } from '@/commons/components/inputs/StyledInput';
import { StyledButton } from '@/commons/components/buttons/StyledButton';
import StyledMessage from '@/commons/components/StyledMessage';
import 'ckeditor5/ckeditor5.css';

const FormBox = styled.form`
dl {
    border-spacing: 0;
    width: 100%;
    border-top: 2px solid ${({ theme }) => theme.colors.black};
    background: ${({ theme }) => theme.colors.white};

    dt,
    dd {
      padding: 10px;
      border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
    }
    dt {
      background: ${({ theme }) => theme.colors.lightGrey};
      font-weight: normal;
    }
  }
  .input_grp {
    display: flex;
    align-items: center;
  }
  .search_btn {
    text-align: center;
    margin: 20px 0 30px;

    .btn {
      display: inline-block;
      min-width: 200px;
      text-align: center;
      font-size: 1.4rem;
      font-weight: 500;
      height: 45px;
      line-height: 45px;
      background: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.white};
      cursor: pointer;
      border-radius: 3px;
      border: 0;
    }
  }
`;


const PostingForm = ({ form, errors, onSubmit, onChange, onToggle }) => {
  const [mounted, setMounted] = useState(false);
  const [editor, setEditor] = useState(null);
  const {useEditor} = true;
  const { t } = useTranslation();
  const { isLogin, isAdmin } = getUserStates();


  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  return (
    <FormBox onSubmit={onSubmit} autoComplete="off">
      <dl>
        <dt>{t('작성자')}</dt>
        <dd>
          <StyledInput
            type="text"
            name="poster"
            value={form?.poster ?? ''}
            onChange={onChange}
          />
          <StyledMessage variant="danger">{errors?.email}</StyledMessage>
        </dd>
      </dl>
      <dl>
        <dt>{t('글제목')}</dt>
        <dd>
          <StyledInput
            type="text"
            name="userName"
            value={form?.userName ?? ''}
            onChange={onChange}
          />
          <StyledMessage variant="danger">{errors?.userName}</StyledMessage>
        </dd>
      </dl>
      <dl>
        <dt>{t('본문')}</dt>
        <dd>
          ({
            mounted && (
              <>
                <CKEditor
                  editor={ClassicEditor}
                  config={{
                    plugins: [
                      Bold,
                      Essentials,
                      Italic,
                      Paragraph,
                      Image,
                      ImageInsert,
                    ],
                    toolbar: ['undo', 'redo', 'bold', 'italic'],
                  }}
                  data={form?.content}
                  onReady={(editor) => setEditor(editor)}
                  onChange={(_, editor) => {
                    onChange({
                      target: { name: 'content', value: editor.getData() },
                    });
                  }}
                />
                  <>
                    <FileUpload
                      gid={form.gid}
                      location="editor"
                      imageOnly
                      color="primary"
                      width="120"
                      callback={(files) => fileUploadCallback(files, editor)}
                    >
                      {t('이미지_업로드')}
                    </FileUpload>
                    <FileItems
                      files={form?.editorImages}
                      mode="editor"
                      insertImageCallback={insertImageCallback}
                      fileDeleteCallback={fileDeleteCallback}
                    />
                  </>
              </>
            )
          }) 
          {errors?.content && (
            <StyledMessage color="danger" messages={errors.content} />
          )}
        </dd>
      </dl>
      <StyledMessage variant="danger">{errors?.agree}</StyledMessage>
      <StyledButton type="submit" variant="primary">
        {t('등록')}
      </StyledButton>
      <StyledMessage variant="danger">{errors?.global}</StyledMessage>
    </FormBox>
  );
};

export default React.memo(PostingForm);
