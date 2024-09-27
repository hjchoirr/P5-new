/* eslint-disable react-hooks/rules-of-hooks */
import React, { createContext, useState, useContext, useEffect } from 'react';

import cookies from 'react-cookies';
import { apiUser } from '@/member/apis/apiLogin';

const UserInfoContext = createContext({
  states: {
    // 상태 값
    userInfo: null,
    isLogin: false,
    isAdmin: false, // 관리자 여부
  },
  actions: {
    // 상태 변경 함수
    setUserInfo: null,
    setIsLogin: null,
    setIsAdmin: null,
  },
});

const UserInfoProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const value = {
    states: { userInfo, isLogin, isAdmin},
    actions: {
      setUserInfo,
      setIsLogin,
      setIsAdmin,
    },
  };

  
  const token = cookies.load('token');
  useEffect(()=> {
    if(!isLogin) {
      alert("UserInfoProvider - isLogin " + isLogin);
    }

    if (!isLogin && token && token.trim()) {
      (async () => {
        try {

          const user = await apiUser();
          console.log("UserInfoProvider-user", user);

          setUserInfo(user);
          setIsLogin(true);

          setIsAdmin(user.authorities.some(a=> {
            return(a.authority === 'ADMIN');
          }));
        } catch (err) {
          // 토큰 만료, 토큰이 잘못된 경우
          cookies.remove('token', { path: '/' });
        }
        
      })();
    }
  }, [token, isLogin]);
  
  return (
    <UserInfoContext.Provider value={value}>
      {children}
    </UserInfoContext.Provider>
  );
}


const { Consumer: UserInfoConsumer } = UserInfoContext;

export { UserInfoConsumer, UserInfoProvider };

export const getUserStates = () => {
  const { states } = useContext(UserInfoContext);
  return states;
};

export const getUserActions = () => {
  const { actions } = useContext(UserInfoContext);
  return actions;
};

export const getUserContext = () => {
  return useContext(UserInfoContext);
};

export default UserInfoContext;
