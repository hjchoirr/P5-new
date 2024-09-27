'use client';
import React, { useState, useLayoutEffect, useEffect } from 'react';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import { getUserStates, getUserActions, getUserContext} from '@/commons/contexts/UserInfoContext';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { boardDataList } from '../apis/apiboard';
import List from '../components/List';

const PostsContainer = ({ bid }) => {
  const { setMenuCode, setSubMenuCode } = getCommonActions();
  useLayoutEffect(() => {
    setMenuCode('post');
    setSubMenuCode('list');
  }, [setSubMenuCode, setMenuCode]);

  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const { setMainTitle } = getCommonActions();
  useLayoutEffect(() => {
    setMainTitle(t('게시판'));
  }, [setMainTitle, t]);

  const [pagination, setPagination] = useState({});
  const [search, setSearch] = useState({});
  const [searchTmp, setSearchTmp] = useState({ // 기본값 통합검색으로 설정
    sopt: 'ALL',
    authority: '',
    page: 1,
  });
  const [items, setItems] = useState([]);

  useEffect(() => {

    (async () => {
      try {
        const { items, pagination } = await boardDataList(bid, searchTmp);
        setItems(items);
        setPagination(pagination);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [bid, searchTmp]); // [search] 아님 :  search의 변화감지 안하려고


  const onModifyClick = (seq) => {
    console.log("seq: ", seq);
    console.log(`/board/post/write/${bid}?seq=${seq}`);
    router.replace(`/board/post/write/${bid}?seq=${seq}`);

  }

  //if (loading) return <h1>Loading...</h1>;
  //if (error) return <h1>Error loading posts: {error.message}</h1>;

  console.log("getUserStates() : ", getUserStates());
  console.log("getUserActions() : ", getUserActions());
  console.log("getUserContext() : ", getUserContext());
  return (
    <div>
      
      <h1>게시글 목록</h1>
      <List items={items} onModifyClick={onModifyClick} />
    </div>
  );
};

export default React.memo(PostsContainer);
