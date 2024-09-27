// 여기에서 API 호출을 위한 함수들을 정의할 수 있습니다.
export const fetchPosts = async (searchParams) => {
    // 게시글 데이터를 가져오는 로직 추가
    const response = await fetch(`/api/posts?${new URLSearchParams(searchParams)}`);
    if (!response.ok) {
        throw new Error('네트워크 응답이 실패했습니다.');
    }
    return response.json();
};

export const savePost = async (postData) => {
    const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    });
    if (!response.ok) {
        throw new Error('게시글 저장에 실패했습니다.');
    }
    return response.json();
};
