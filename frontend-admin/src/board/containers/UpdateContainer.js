'use client';
import React, { useLayoutEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import BoardForm from '../components/BoardForm';
import { regist } from '../apis/apiboard';

const UpdateContainer = ({ params }) => {
  const { bid } = params;
  const { setMenuCode, setSubMenuCode, setMainTitle } = getCommonActions();
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const { t } = useTranslation();

  useLayoutEffect(() => {
    setMenuCode('board');
    setSubMenuCode('register');
  }, [setSubMenuCode, setMenuCode]);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // 유효성 검사
      const requiredFields = {
        bid: t('게시판_ID를_입력하세요'),
        bName: t('게시판_이름을_입력하세요'),
      };
      const _errors = {};
      let hasErrors = false;
      for (const [field, message] of Object.entries(requiredFields)) {
        if (!form[field]?.trim()) {
          _errors[field] = _errors[field] ?? [];
          _errors[field].push(message);
          hasErrors = true;
        }
      }

      if (hasErrors) {
        setErrors(_errors);
        return;
      }

      try {
        res = await regist(form);
        console.log('res', res);
        // 성공 후 처리
      } catch (err) {
        setErrors(err.message);
      }
    },
    [form],
  );

  const onChange = useCallback((e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  }, []);

  const onToggle = useCallback((name, value) => {
    setForm((form) => ({ ...form, [name]: value }));
  }, []);

  return (
    <BoardForm
      form={form}
      errors={errors}
      onChange={onChange}
      onToggle={onToggle}
      onSubmit={onSubmit}
    />
  );
};

export default React.memo(UpdateContainer);
