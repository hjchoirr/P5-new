'use client';
import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
} from 'react';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import ListForm from '../components/ListForm';
import { apiList, apiSaveAuthority } from '../apis/apiList';
import { getUserStates, getUserActions, getUserContext} from '@/commons/contexts/UserInfoContext';
import Pagination from '@/commons/components/Pagination';
const ListContainer = () => {
  const { setMenuCode, setSubMenuCode } = getCommonActions();

  useLayoutEffect(() => {
    setMenuCode('member');
    setSubMenuCode('list');
  }, [setMenuCode, setSubMenuCode]);

  const [search, setSearch] = useState({});
  const [searchTmp, setSearchTmp] = useState({ // 기본값 통합검색으로 설정
    sopt: 'ALL',
    authority: '',
    page: 1,
  });
  const [items, setItems] = useState([]);

  const [requestAuthority, setRequestAuthority] = useState({});
  const [requestAuthorities, setRequestAuthorities] = useState({});
  const [pagination, setPagination] = useState({});
  const [errors, setErrors] = useState({});


  useEffect(() => {

    (async () => {
      try {
        const { items, pagination } = await apiList(searchTmp);

        setItems(items);
        setPagination(pagination);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [searchTmp]); // [search] 아님 :  search의 변화감지 안하려고

  /* 페이지 변경 함수 */
  const onChangePage = useCallback((p) => {
    setSearchTmp((searchTmp) => ({ ...searchTmp, page: p }));
  }, []);

  const onChange = (e) => {
    
    setSearch({
      ...search,
      [e.target.name]: [e.target.value],
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSearchTmp(search);
    
  };
  const onChangeCheck = (e, memberSeq, t) => {
    console.log(e.target.checked);
    console.log("memberSeq", memberSeq);
    console.log("t", t);

    setRequestAuthority({
      memberSeq: memberSeq,
      authorityName: t,
      invoke: e.target.checked,
    });

  }
  const onChangeAuthorities = () => {
    /* authorities 통째로 업데이트 로직 구현 예정 */
  };
  useEffect(() => {
    const _errors = {};
    if(requestAuthority == {}) return;
    (async() => {
      try {
        await apiSaveAuthority(requestAuthority);

      } catch(err) {
        // 검증 실패, 가입 실패
        const messages =
          typeof err.message === 'string'
            ? { global: [err.message] }
            : err.message;
        if(messages) 
        for (const [field, _messages] of Object.entries(messages)) {
          _errors[field] = _errors[field] ?? [];
          _errors[field].push(_messages);
        }
        setErrors({ ..._errors });
      }

    })();

  }, [requestAuthority]);

  console.log("getUserStates() : ", getUserStates());
  console.log("getUserActions() : ", getUserActions());
  console.log("getUserContext() : ", getUserContext());
  return (
    <>
      <h1>회원 목록</h1>
      <ListForm
        search={search}
        items={items}
        onChange={onChange}
        onSubmit={onSubmit}
        onChangeCheck={onChangeCheck}
        onChangeAuthorities={onChangeAuthorities}
      />
      <Pagination pagination={pagination} onClick={onChangePage} />

    </>
  );
};

export default React.memo(ListContainer);
