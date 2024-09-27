import styled from 'styled-components';
import userType from '../constants/userType';

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

const ListForm = ({ search, items, onChange, onSubmit, onChangeCheck, onChangeAuthorities }) => {


  return (
    <Wrapper>
      <SearchBox search={search} onChange={onChange} onSubmit={onSubmit} />
      <table className="table-rows">
        <thead>
          <tr>
            <th>회원번호</th>
            <th>이메일</th>
            <th>회원명</th>
            <th>전화번호</th>
            <th>권한관리</th>
            <th>회원삭제</th>
          </tr>
        </thead>
        <tbody>
          {items && items.length > 0 ? (
            items.map((item) => (
              <tr key={item.seq}>
                <td>{item.seq}</td>
                <td>{item.userName}</td>
                <td>{item.email}</td>
                <td>{item.mobile}</td>
                <td>{Object.keys(userType).map((t,i) => 
                  (<label key={i}>
                    <input 
                      type="checkbox" 
                      defaultChecked={item.authorities.some(a => a.authority === t)} 
                      onChange={(e) => onChangeCheck(e, item.seq, t)}
                    />
                    {t}
                  </label>)
                )}
                </td>
                <td><button onClick={() => onChangeAuthorities(item.seq, item.authorities)}>권한변경</button> <button>삭제</button></td>
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
};
export default ListForm;

const SearchBox = ({ search, onChange, onSubmit }) => {

  search.limit = !search.limit ? search.limit = 10 : search.limit ;

  return (
    <form autoComplete="off" onSubmit={onSubmit}>
      <table className="table-cols">
        <tbody>
          <tr>
            <th>키워드</th>
            <td>
              <div className="input_grp">
                <select name="sopt" value={search?.sopt} onChange={onChange}>
                  <option value="ALL">통합검색</option>
                  <option value="NAME">회원명</option>
                  <option value="EMAIL">이메일</option>
                </select>
                <input
                  type="text"
                  name="skey"
                  value={search?.skey}
                  onChange={onChange}
                />
              </div>
            </td>
            <th>권한</th>
            <td>
              <div className="input_grp" onChange={onChange}>
                <select name="authority" value={search?.authority} onChange={onChange}>
                  <option value=""></option>
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>
            </td>
            <th>목록수</th>
            <td>
              <div className="input_grp" onChange={onChange}>
                <select name="limit" value={search?.limit} onChange={onChange}>
                  <option value="5">5개</option>
                  <option value="10">10개</option>
                  <option value="20">20개</option>
                  <option value="30">30개</option>
                </select>
              </div>
            </td>
            <th>정렬기준</th>
            <td>
              <div className="input_grp">
                <select name="sort" value={search?.sort} onChange={onChange}>
                  <option value="createdAt_DESC">가입최근순</option>
                  <option value="userName_ASC">이름순</option>
                  <option value="email_ASC">이메일</option>
                </select>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="search_btn">
        <button type="submit" className="btn" onSubmit={onSubmit}>
          검색하기
        </button>
      </div>
    </form>
  );
};
