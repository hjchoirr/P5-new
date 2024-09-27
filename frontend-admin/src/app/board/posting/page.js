import PostingContainer from '@/board/containers/PostingContainer';
import AdminOnlyContainer from '@/member/containers/AdminOnlyContainer';
const PostsPage = () => {
  return (
    <AdminOnlyContainer>
      <PostingContainer />
    </AdminOnlyContainer>
  );
};

export default PostsPage;
