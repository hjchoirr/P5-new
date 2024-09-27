import styled from 'styled-components';
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { StyledInput } from '@/commons/components/inputs/StyledInput';
import FileUpload from '../../commons/components/FileUpload';
import FileItems from '../../commons/components/FileItems';

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
const ContentEditor = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

const EditorContainer = styled.div`
  flex-grow: 1;
  height: 200px;
  overflow: auto;

  .ck-editor__editable {
    min-height: 150px;
  }
`;

const Form = ({ form, content, onChange, onEditorChange, onSubmit }) => {

  const [editor, setEditor] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]); // 선택한 파일 저장

  const handleFileUpload = (files) => {
    if (!files || files.length === 0) {
      return;
    }

    // 선택한 파일 상태로 저장
    console.log('Uploaded files:', files);
    setSelectedFiles([...files]);
  };
  return (
    <FormBox onSubmit={onSubmit}>
      <dl>
        <dt>게시판 ID</dt>
        <dd>
          <StyledInput
          type="text"
          name="bid"
          value={form?.bid}
          onChange={onChange}
          required
          />
        </dd>
      </dl>
      <dl>
        <dt>작성자</dt>
        <dd>
          <StyledInput
          type="text"
          name="poster"
          value={form?.poster}
          onChange={onChange}
          required
        />
        </dd>
      </dl>
      <dl>
        <dt>비회원 비밀번호</dt>
        <dd>
          <StyledInput
          type="password"
          name="guestPw"
          value={form?.guestPw}
          onChange={onChange}
        />
        </dd>
      </dl>
      <dl>
        <dt>제목</dt>
        <dd>
          <StyledInput
          type="text"
          name="subject"
          value={form?.subject}
          onChange={onChange}
          required
        />
        </dd>
      </dl>
      <dl>
        <dt>공지글 여부</dt>
        <dd>
          <StyledInput
          type="checkbox"
          name="notice"
          checked={form?.notice}
          onChange={onChange}
        />
        </dd>
      </dl>
      <dl>
        <dt>내용</dt>
        <ContentEditor>
          <EditorContainer>

        <CKEditor
          editor={ClassicEditor}
          onReady={(editor) => setEditor(editor)} 
          data={content}
          //data={form?.content} //이렇게 하면 수정 페이지 안됨
          onChange={onEditorChange} 
        />
        </EditorContainer>
        </ContentEditor>

      </dl>
        {/* 파일 업로드 */}
        {(form.mode === 'edit') && (
            <FileUpload
              gid={form?.gid}
              callback={handleFileUpload}
              color="navy"
            >
              <label>파일 첨부</label>
            </FileUpload>
        )}
        {selectedFiles.length > 0 && (
          <>
            <button>선택한 파일</button>
            <ul>
              {selectedFiles.map((file, index) => (
                <li key={index}>{file.fileName || file.originalName || file.name}</li> // 파일 이름을 찾는 방식 변경
              ))}
            </ul>
          </>
        )}  
      <div className="search_btn">
      <button className="btn" type="submit">등록</button>
      </div>
    </FormBox>
  );
};

export default Form;
