'use client';
import React, { useLayoutEffect, useEffect, useState, useCallback } from 'react';
import {useRouter} from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import Form from '../components/Form';
import { createBoardData, updateBoardData, boardData} from '../apis/apiboard';

const PostingContainer = ({ bid, seq }) => {
  const { setMenuCode, setSubMenuCode } = getCommonActions();
  useLayoutEffect(() => {
    setMenuCode('post');
    setSubMenuCode('register');
  }, [setSubMenuCode, setMenuCode]);


  const [initialValues, setInitialValues] = useState({
    bid: bid || '', // 게시판 ID
    seq: '',
    gid: Date.now() + '',
    poster: '',     // 작성자
    guestPw: '',    // 비회원 비밀번호
    subject: '',    // 제목
    notice: false,  // 공지글 여부
    content: '',    // 글 내용
    mode: seq ? 'edit' : 'write', // 모드에 따라 작성 또는 수정
  });

  const [form, setForm] = useState(initialValues);
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {

    seq && (async() => {
      try {
        const bdata = await boardData(seq);
        if(bdata) {
          
          setForm({
            ...form,
            seq : bdata.seq,
            poster : bdata.poster,
            gid: bdata.gid,
            subject : bdata.subject,
            notice : bdata.notice,
            content: bdata.content,
          });
          setContent(bdata.content);
        }

      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const router = useRouter();
  const { t } = useTranslation();
  const { setMainTitle } = getCommonActions();

  useLayoutEffect(() => {
    setMainTitle(t('게시판'));
  }, [setMainTitle, t]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (form.mode === 'edit') {
        await updateBoardData({ ...form, seq, content });
      } else {
        
        await createBoardData({...form, content});
      }
      // 게시글 목록 페이지로 이동
      //router.replace(`/board/post/list/${bid}`);
    } catch (error) {
      console.error(error);
    }
    
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
      //[e.target.name]: e.target.value,
    });

  };

  

  const handleEditorChange = (event, editor) => {

    const edata = editor.getData();
    setContent(edata);
    //setForm({...form, content: content}); //이거 하면 CKEDITOR 글수정 문제

  };

  return (
    <div>
      <h1>{seq ? '게시글 수정' : '게시글 등록'} {bid} {seq} {subject}</h1>
      <Form 
        form={form} content={content} 
        //form={form} 
        onChange={handleChange} 
        onEditorChange={handleEditorChange} 
        onSubmit={handleSubmit} 
      />
    </div>
  );
};
export default React.memo(PostingContainer);
