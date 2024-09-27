import apiRequest from '@/commons/libs/apiRequest';
import requestData from '@/commons/libs/requestData';


// 게시글 작성 API 호출
export const createBoardData = async (form) => {
  try {
    const response = await apiRequest(`/board/write/${form.bid}`, 'POST', form);
    return response;
  } catch (error) {
    throw handleApiError(error);
  }
};

// 게시글 수정 API 호출
export const updateBoardData = async (form) => {
  try {
    const response = await apiRequest(`/board/update/${form.seq}`, 'PATCH', form);
    return response;
  } catch (error) {
    throw handleApiError(error);
  }
};


export const boardDataList = (bid, search) => {
  search = search ?? {};

  const qs = [];
  for (const [k, v] of Object.entries(search)) {
    qs.push(`${k}=${v}`);
  }

  let url = `/board/list/${bid}`;
  if (qs.length > 0) url += `?${qs.join('&')}`;
  return requestData(url);
};

export const boardData = (seq) => {
  // 게시글 하나 조회
  let url = `/board/info/${seq}`;
  return requestData(url);
};

// API 에러 처리 함수
const handleApiError = (error) => {
  console.error('API 요청 중 오류 발생:', error);
  if (error.response && error.response.data && error.response.data.errors) {
    throw error.response.data.errors;
  }
  throw new Error('API 요청에 문제가 발생했습니다.');
};

export const regist = (bid, form) =>
  saveProcess(`/board/admin/save/${bid}`, 'POST', form);
//saveProcess(`/board/regist/${bid}`, 'POST', form);

export const update = (seq, form) =>
  saveProcess(`/board/update/${seq}`, 'PATCH', form);

function saveProcess(url, method, form) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const res = await apiRequest(url, method, form);
        if (res.status === 201) {
          resolve(res.data.data);
          return;
        }

        reject(res.data);
      } catch (err) {
        console.error(err);
        reject(err);
      }
    })();
  });
}

// 게시글 하나 조회
export const getInfo = (seq) => requestData(`/board/info/${seq}`);

// 게시글 목록 조회
export const getList = (bid, search) => {
  search = search ?? {};
  let qs = Object.entries(search)
    .map(([k, v]) => `${k}=${v}`)
    .join('&');

  qs = qs ? `?${qs}` : qs;

  const url = `/board/list/${bid}${qs}`;

  return requestData(url);
};

export const deleteData = (seq) =>
  requestData(`/board/delete/${seq}`, 'DELETE');