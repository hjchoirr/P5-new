import AdminOnlyContainer from '@/member/containers/AdminOnlyContainer';
import PostsContainer from '@/board/containers/PostsContainer';

const ListPage = ({params}) => {
    const {bid} = params;
    return (
        <AdminOnlyContainer>
          <PostsContainer bid={bid}/>
        </AdminOnlyContainer>
      );
}
export default ListPage;