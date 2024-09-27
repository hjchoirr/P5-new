import AdminOnlyContainer from "@/member/containers/AdminOnlyContainer";
import PostingContainer from "@/board/containers/PostingContainer";

const WritePage = ({params, searchParams}) => {
  const {bid} = params;
  const {seq} = searchParams;
  
  return (

    <AdminOnlyContainer>
      <PostingContainer bid={bid} seq={seq}/>
    </AdminOnlyContainer>
  );
};

export default WritePage;
