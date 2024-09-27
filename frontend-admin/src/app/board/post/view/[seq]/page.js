import AdminOnlyContainer from "@/member/containers/AdminOnlyContainer";
import ViewContainer from "@/board/containers/ViewContainer";

const ViewPage = () => {
  return (
    <AdminOnlyContainer>
      <ViewContainer />
    </AdminOnlyContainer>
  );
};

export default ViewPage;
