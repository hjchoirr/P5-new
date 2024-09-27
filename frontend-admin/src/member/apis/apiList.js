import requestData from '@/commons/libs/requestData';
import apiRequest from '@/commons/libs/apiRequest';

// 사용자 목록 가져오기
export const apiList = (search) => {
  search = search ?? {};

  const qs = [];
  for (const [k, v] of Object.entries(search)) {
    qs.push(`${k}=${v}`);
  }

  let url = '/member/admin';
  if (qs.length > 0) url += `?${qs.join('&')}`;
  return requestData(url);
};


export const apiSaveAuthority = (form) =>
  new Promise((resolve, reject) => {
    //cookies.remove('token', { path: '/' });
    console.log("form", form);
    apiRequest('/member/admin/updateAuthority', 'PATCH', form)
      .then((res) => {
        console.log('res', res);
        if (res.status !== 200) {
          // 검증 실패
          reject(res.data);
          return;
        }
        
        resolve(res.data); // 성공
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });