import styled from "styled-components";

const Wrapper = styled.div`
  .table-rows {
    border-spacing: 0;
    width: 100%;
    background: ${({ theme }) => theme.colors.white};

    thead th {
      background: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.white};
      font-weight: normal;
      padding: 7px 10px;
    }
    thead th + th {
      border-left: 1px solid ${({ theme }) => theme.colors.white};
    }

    tbody td {
      border-bottom: 1px solid ${({ theme }) => theme.colors.lightGrey};
      padding: 7px 10px;
    }
  }
  .table-cols {
    border-spacing: 0;
    width: 100%;
    border-top: 2px solid ${({ theme }) => theme.colors.black};
    background: ${({ theme }) => theme.colors.white};

    th,
    td {
      padding: 10px;
      border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
    }
    th {
      background: ${({ theme }) => theme.colors.lightGrey};
      font-weight: normal;
    }
  }
  .input_grp {
    display: flex;
    align-items: center;
  }
  .search_btn {
    text-align: center;
    margin: 20px 0 30px;

    .btn {
      display: inline-block;
      min-width: 200px;
      text-align: center;
      font-size: 1.4rem;
      font-weight: 500;
      height: 45px;
      line-height: 45px;
      background: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.white};
      cursor: pointer;
      border-radius: 3px;
      border: 0;
    }
  }
`;

const List = ({items, onModifyClick}) => {
    console.log("items", items);
    return (
        <Wrapper>
          <table className="table-rows">
            <thead>
              <tr>
                <th>글번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>이메일</th>
                <th>게시글본문</th>
                <th>글 수정</th>
              </tr>
            </thead>
            <tbody>
              {items && items.length > 0 ? (
                items.map((item) => (
                  <tr key={item.seq}>
                    <td>{item.seq}</td>
                    <td>{item.subject}</td>
                    <td>{item.poster}</td>
                    <td>{item.email}</td>
                    <td>{item.content}</td>
                    <td><button 
                        onClick={() => onModifyClick(item.seq)}>
                            수정
                        </button> 
                        <button>삭제</button></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">데이터가 없습니다</td>
                </tr>
              )}
            </tbody>
          </table>
        </Wrapper>
      );

}
export default List;