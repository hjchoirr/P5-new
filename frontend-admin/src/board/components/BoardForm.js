'use client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { StyledInput } from '@/commons/components/inputs/StyledInput';
import { GroupButton } from '@/commons/components/buttons/GroupButton';
import { IoIosRadioButtonOff, IoIosRadioButtonOn } from "react-icons/io";
import FileUpload from '@/commons/components/FileUpload';

const FormBox = styled.form`
  width: 100%; /* 폼 전체 너비 */
  max-width: 1200px; /* 최대 너비 */
  padding: 20px; /* 내부 여백 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 그림자 */
  background-color: #fff; /* 배경색 */
  border-radius: 8px; /* 모서리 둥글게 */
`;

const RadioButtonContainer = styled.label`
  display: flex;
  align-items: center;
  margin-right: 15px;
  cursor: pointer;
  font-size: 16px;

  input {
    display: none; /* 원래 라디오 버튼은 숨김 */
  }

  svg {
    margin-right: 5px;
    color: #4A90E2; /* 선택된 색상 */
    transition: color 0.3s ease;
  }

  &:hover svg {
    color: #007BFF; /* 호버 시 색상 */
  }

  &.checked svg {
    color: #007BFF; /* 선택된 라디오 버튼 색상 */
  }
`;

const RadioButton = ({ id, name, value, checked, onChange, label }) => (
  <RadioButtonContainer className={checked ? 'checked' : ''}>
    {checked ? <IoIosRadioButtonOn /> : <IoIosRadioButtonOff />}
    <input
      type="radio"
      id={id}
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
    />
    {label}
  </RadioButtonContainer>
);

const StyledTable = styled.table`
  width: 100%; /* 테이블 전체 너비 */
  border-collapse: collapse; /* 테이블 경계 제거 */
  margin-bottom: 30px; /* 아래 여백 */
`;

const StyledTh = styled.th`
  padding: 12px; /* 여백 */
  background-color: #3f51b5; /* 변경할 배경색 */
  border-bottom: 1px solid white; /* 흰색 구분 선 추가 */
  height: 60px; /* 원하는 높이 설정 */
  color: white; /* 글자색을 흰색으로 설정 */
`;

const StyledTd = styled.td`
  padding: 12px; /* 여백 */
  border-bottom: 1px solid #e0e0e0; /* 아래 경계선 */
  display: flex; /* 가로 정렬을 위해 flex 사용 */
  align-items: center; /* 수직 정렬 */
  height: 60px; /* 원하는 높이 설정 */
  background-color: #f9f9f9; /* 배경색 추가 */
  
  textarea {
    width: 100%; /* 너비를 100%로 설정 */
    height: 100px; /* 원하는 높이로 설정 */
    resize: vertical; /* 수직으로 크기 조정 가능 */
    padding: 8px; /* 내부 여백 추가 */
    border: 1px solid #ccc; /* 테두리 추가 */
    border-radius: 4px; /* 모서리 둥글게 */
    font-size: 14px; /* 폰트 크기 설정 */
  }
`;

const StyledFileUpload = styled(FileUpload)`
  /* 원하는 크기와 스타일로 조정 */
  font-size: 0.8em; /* 폰트 크기 조정 */
  padding: 5px 10px; /* 패딩 조정 */
  margin: 5px 0; /* 위아래 여백 조정 */
`;

const BoardForm = ({ form, errors, onSubmit, onChange, insertImageCallback }) => {
  const { t } = useTranslation();

  return (
    <FormBox onSubmit={onSubmit} autoComplete="off">
      <div className="error global">{errors.global && errors.global.map(err => <div key={err}>{err}</div>)}</div>
      <input type="hidden" name="gid" value={form.gid} />

      <h2>{t('기본 설정')}</h2>
      <StyledTable>
        <tbody>
          <tr>
            <StyledTh>{t('사용 여부')}</StyledTh>
            <StyledTd>
              <RadioButton
                id="active_true"
                name="active"
                value="true"
                checked={form.active === 'true'}
                onChange={onChange}
                label={t('사용')}
              />
              <RadioButton
                id="active_false"
                name="active"
                value="false"
                checked={form.active === 'false'}
                onChange={onChange}
                label={t('미사용')}
              />
            </StyledTd>
          </tr>
          <tr>
            <StyledTh>{t('게시판 ID')}</StyledTh>
            <StyledTd>
              <StyledInput type="text" name="bid" value={form.bid} onChange={onChange} />
              {errors.bid && <div className="error">{errors.bid}</div>}
            </StyledTd>
          </tr>
          <tr>
            <StyledTh>{t('게시판 이름')}</StyledTh>
            <StyledTd>
              <StyledInput type="text" name="bName" value={form.bName} onChange={onChange} />
              {errors.bName && <div className="error">{errors.bName}</div>}
            </StyledTd>
          </tr>
          <tr>
            <StyledTh>{t('진열가중치')}</StyledTh>
            <StyledTd>
              <StyledInput type="number" name="listOrder" value={form.listOrder} onChange={onChange} />
            </StyledTd>
          </tr>
          <tr>
            <StyledTh>{t('1페이지 게시글 수')}</StyledTh>
            <StyledTd>
              <StyledInput type="number" name="rowsPerPage" min="1" value={form.rowsPerPage} onChange={onChange} />
            </StyledTd>
          </tr>
          <tr>
            <StyledTh>{t('페이지 구간 갯수(PC)')}</StyledTh>
            <StyledTd>
              <StyledInput type="number" name="pageCountPc" min="1" value={form.pageCountPc} onChange={onChange} />
            </StyledTd>
          </tr>
          <tr>
            <StyledTh>{t('페이지 구간 갯수(Mo)')}</StyledTh>
            <StyledTd>
              <StyledInput type="number" name="pageCountMobile" min="1" value={form.pageCountMobile} onChange={onChange} />
            </StyledTd>
          </tr>
          <tr>
            <StyledTh>{t('답글 사용')}</StyledTh>
            <StyledTd>
              <RadioButton
                id="useReply_true"
                name="useReply"
                value="true"
                checked={form.useReply === 'true'}
                onChange={onChange}
                label={t('사용')}
              />
              <RadioButton
                id="useReply_false"
                name="useReply"
                value="false"
                checked={form.useReply === 'false'}
                onChange={onChange}
                label={t('미사용')}
              />
            </StyledTd>
          </tr>
          <tr>
            <StyledTh>{t('댓글 사용')}</StyledTh>
            <StyledTd>
              <RadioButton
                id="useComment_true"
                name="useComment"
                value="true"
                checked={form.useComment === 'true'}
                onChange={onChange}
                label={t('사용')}
              />
              <RadioButton
                id="useComment_false"
                name="useComment"
                value="false"
                checked={form.useComment === 'false'}
                onChange={onChange}
                label={t('미사용')}
              />
            </StyledTd>
          </tr>
          <tr>
            <StyledTh>{t('에디터')}</StyledTh>
            <StyledTd>
              <RadioButton
                id="useEditor_true"
                name="useEditor"
                value="true"
                checked={form.useEditor === 'true'}
                onChange={onChange}
                label={t('사용')}
              />
              <RadioButton
                id="useEditor_false"
                name="useEditor"
                value="false"
                checked={form.useEditor === 'false'}
                onChange={onChange}
                label={t('미사용')}
              />
            </StyledTd>
          </tr>
          <tr>
            <StyledTh>{t('이미지 첨부')}</StyledTh>
            <StyledTd>
              <RadioButton
                id="useUploadImage_true"
                name="useUploadImage"
                value="true"
                checked={form.useUploadImage === 'true'}
                onChange={onChange}
                label={t('사용')}
              />
              <RadioButton
                id="useUploadImage_false"
                name="useUploadImage"
                value="false"
                checked={form.useUploadImage === 'false'}
                onChange={onChange}
                label={t('미사용')}
              />
            </StyledTd>
          </tr>
          <tr>
            <StyledTh>{t('파일 첨부')}</StyledTh>
            <StyledTd>
              <RadioButton
                id="useUploadFile_true"
                name="useUploadFile"
                value="true"
                checked={form.useUploadFile === 'true'}
                onChange={onChange}
                label={t('사용')}
              />
              <RadioButton
                id="useUploadFile_false"
                name="useUploadFile"
                value="false"
                checked={form.useUploadFile === 'false'}
                onChange={onChange}
                label={t('미사용')}
              />
            </StyledTd>
          </tr>
          <tr>
            <StyledTh>{t('글작성 후 이동')}</StyledTh>
            <StyledTd>
              <RadioButton
                id="locationAfterWriting_true"
                name="locationAfterWriting"
                value="true"
                checked={form.locationAfterWriting === 'true'}
                onChange={onChange}
                label={t('사용')}
              />
              <RadioButton
                id="locationAfterWriting_false"
                name="locationAfterWriting"
                value="false"
                checked={form.locationAfterWriting === 'false'}
                onChange={onChange}
                label={t('미사용')}
              />
            </StyledTd>
          </tr>
          <tr>
            <StyledTh>{t('글보기 하단 목록 노출')}</StyledTh>
            <StyledTd>
              <RadioButton
                id="showListBelowView_true"
                name="showListBelowView"
                value="true"
                checked={form.showListBelowView === 'true'}
                onChange={onChange}
                label={t('사용')}
              />
              <RadioButton
                id="showListBelowView_false"
                name="showListBelowView"
                value="false"
                checked={form.showListBelowView === 'false'}
                onChange={onChange}
                label={t('미사용')}
              />
            </StyledTd>
          </tr>
          <tr>
          <StyledTh>{t('스킨')}</StyledTh>
          <StyledTd>
            <RadioButton
              id="skin_counseling"
              name="skin"
              value="counseling"
              checked={form.skin === 'counseling'}
              onChange={onChange}
              label={t('상담 게시판')}
            />
            <RadioButton
              id="skin_review"
              name="skin"
              value="review"
              checked={form.skin === 'review'}
              onChange={onChange}
              label={t('리뷰 게시판')}
            />
            <RadioButton
              id="skin_notice"
              name="skin"
              value="notice"
              checked={form.skin === 'notice'}
              onChange={onChange}
              label={t('공지사항')}
            />
          </StyledTd>
          </tr>
        </tbody>
      </StyledTable>

      <h2>{t('게시판 분류')}</h2>
      <StyledTable>
        <tbody>
          <tr>
            <StyledTh>{t('분류')}</StyledTh>
            <StyledTd>
              <textarea name="category" 
              placeholder={t('여러 분류는 줄개행하여 입력')} 
              value={form.category} 
              onChange={onChange}>
              </textarea>
            </StyledTd>
          </tr>
        </tbody>
      </StyledTable>

      <h2>{t('권한 설정')}</h2>
      <StyledTable className="table_cols mb30">
        <tbody>
          <tr>
            <StyledTh>{t('글 목록')}</StyledTh>
            <StyledTd>
              <RadioButton id="listAccessType_ALL" name="listAccessType" value="ALL" checked={form.listAccessType === 'ALL'} onChange={onChange} label={t('비회원+학생+교수+상담사+관리자')} />
              <RadioButton id="listAccessType_MEMBER" name="listAccessType" value="USER" checked={form.listAccessType === 'USER'} onChange={onChange} label={t('학생+교수+상담사+관리자')} />
              <RadioButton id="listAccessType_ADMIN" name="listAccessType" value="ADMIN" checked={form.listAccessType === 'ADMIN'} onChange={onChange} label={t('관리자')} />
            </StyledTd>
          </tr>
          <tr>
            <StyledTh>{t('글 보기')}</StyledTh>
            <StyledTd>
              <RadioButton id="viewAccessType_ALL" name="viewAccessType" value="ALL" checked={form.viewAccessType === 'ALL'} onChange={onChange} label={t('비회원+학생+교수+상담사+관리자')} />
              <RadioButton id="viewAccessType_MEMBER" name="viewAccessType" value="USER" checked={form.viewAccessType === 'USER'} onChange={onChange} label={t('학생+교수+상담사+관리자')} />
              <RadioButton id="viewAccessType_ADMIN" name="viewAccessType" value="ADMIN" checked={form.viewAccessType === 'ADMIN'} onChange={onChange} label={t('관리자')} />
            </StyledTd>
          </tr>
          <tr>
            <StyledTh>{t('글 쓰기')}</StyledTh>
            <StyledTd>
              <RadioButton id="writeAccessType_ALL" name="writeAccessType" value="ALL" checked={form.writeAccessType === 'ALL'} onChange={onChange} label={t('비회원+학생+교수+상담사+관리자')} />
              <RadioButton id="writeAccessType_MEMBER" name="writeAccessType" value="USER" checked={form.writeAccessType === 'USER'} onChange={onChange} label={t('학생+교수+상담사+관리자')} />
              <RadioButton id="writeAccessType_ADMIN" name="writeAccessType" value="ADMIN" checked={form.writeAccessType === 'ADMIN'} onChange={onChange} label={t('관리자')} />
            </StyledTd>
          </tr>
          <tr>
            <StyledTh>{t('답글')}</StyledTh>
            <StyledTd>
              <RadioButton id="replyAccessType_ALL" name="replyAccessType" value="ALL" checked={form.replyAccessType === 'ALL'} onChange={onChange} label={t('비회원+학생+교수+상담사+관리자')} />
              <RadioButton id="replyAccessType_MEMBER" name="replyAccessType" value="USER" checked={form.replyAccessType === 'USER'} onChange={onChange} label={t('학생+교수+상담사+관리자')} />
              <RadioButton id="replyAccessType_ADMIN" name="replyAccessType" value="ADMIN" checked={form.replyAccessType === 'ADMIN'} onChange={onChange} label={t('관리자')} />
            </StyledTd>
          </tr>
          <tr>
            <StyledTh>{t('댓글')}</StyledTh>
            <StyledTd>
              <RadioButton id="commentAccessType_ALL" name="commentAccessType" value="ALL" checked={form.commentAccessType === 'ALL'} onChange={onChange} label={t('비회원+학생+교수+상담사+관리자')} />
              <RadioButton id="commentAccessType_MEMBER" name="commentAccessType" value="USER" checked={form.commentAccessType === 'USER'} onChange={onChange} label={t('학생+교수+상담사+관리자')} />
              <RadioButton id="commentAccessType_ADMIN" name="commentAccessType" value="ADMIN" checked={form.commentAccessType === 'ADMIN'} onChange={onChange} label={t('관리자')} />
            </StyledTd>
          </tr>
        </tbody>
      </StyledTable>

      <h2>{t('게시판 상단')}</h2>
      <StyledTable className="table_cols mb30">
        <tbody>
          <tr>
            <StyledTh>{t('내용')}</StyledTh>
            <StyledTd>
              <textarea id="html_top" name="htmlTop" value={form.htmlTop} onChange={onChange}></textarea>
              <FileUpload
                imageOnly={true}
                gid={form?.gid}
                color="primary"
                callback={insertImageCallback}
              >
                {t('이미지 추가')}
              </FileUpload>
              <div className="uploaded_files" id="uploaded_files_html_top"></div>
            </StyledTd>
          </tr>
        </tbody>
      </StyledTable>

      <h2>{t('게시판 하단')}</h2>
      <StyledTable className="table_cols">
        <tbody>
          <tr>
            <StyledTh>{t('내용')}</StyledTh>
            <StyledTd>
              <textarea id="html_bottom" name="htmlBottom" value={form.htmlBottom} onChange={onChange}></textarea>
              <FileUpload
                imageOnly={true}
                gid={form?.gid}
                color="primary"
                callback={insertImageCallback}
              >
                {t('이미지 추가')}
              </FileUpload>
              <div className="uploaded_files" id="uploaded_files_html_bottom"></div>
            </StyledTd>
          </tr>
        </tbody>
      </StyledTable>

      <GroupButton type="submit" >{t('등록')}</GroupButton>
    </FormBox>
  );
};

export default React.memo(BoardForm);