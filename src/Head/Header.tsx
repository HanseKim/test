import React, { useState, useEffect } from "react";
import data from "../Pages/data/login.json";
import "./Header.css";
import Modal from "./Modal";

type HeaderProps = {
  login: boolean;
  Login: (user: any) => void;
  Logout: () => void;
  Gohome: () => void;
  Gorank: () => void;
  GoStylist: () => void;
  Golike: () => void;
  Gomypage: (user: any) => void; // mydata를 매개변수로 받음
};

const Header: React.FC<HeaderProps> = ({
  login,
  Login,
  Logout,
  Gohome,
  Gorank,
  GoStylist,
  Golike,
  Gomypage,
}) => {
  const [dataList, setDataList] = useState<any[]>([]);
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isOpen, setIsOpen] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<any>(null); // 현재 사용자 상태 추가

  useEffect(() => {
    setDataList(data); // JSON 데이터를 상태에 저장
  }, []);

  const handleLogin = () => {
    const user = dataList.find((user) => user.id === id);

    if (user && user.password === password) {
      setCurrentUser(user); // 현재 사용자 설정
      setErrorMessage("");
      Login(user);
      Gohome();
      closeModal();
    } else {
      setErrorMessage(
        "로그인 실패: 사용자 이름이나 비밀번호가 잘못되었습니다."
      );
    }
  };

  const handleLogout = () => {
    Logout();
    closeModal();
    setPassword("");
    setCurrentUser(null);
  };

  const openModal = () => setIsOpen(1);

  const closeModal = () => {
    setIsOpen(0);
    setId("");
    setPassword("");
    setErrorMessage("");
  };

  const openJoin = () => {
    setIsOpen(2);
  };

  const openLogin = () => {
    setIsOpen(1);
  };

  return (
    <div className="border-2 HeaderCont">
      <Modal isOpen={isOpen} onClose={closeModal} openLogin={openLogin}>
        {!login ? (
          <div className="flex">
            <div className="text-center w-[100%] font-bold">로그인</div>
            <input
              type="text"
              placeholder="사용자 이름"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin(); // 엔터 키를 누르면 로그인 실행
                }
              }}
            />
            <div className="flex flex-col">
              <button className="bg-gray-300 rounded-xl" onClick={handleLogin}>
                로그인
              </button>
              <button className="bg-green-50 rounded-xl" onClick={openJoin}>
                회원가입
              </button>
            </div>

            {errorMessage && <p className="error">{errorMessage}</p>}
          </div>
        ) : (
          <div>
            <p className="mtitle">정말 로그아웃 하시겠습니까?</p>
            <button className="logoutbtn" onClick={handleLogout}>
              로그아웃
            </button>
          </div>
        )}
      </Modal>
      <div className="text-6xl font-bold">
        <button onClick={Gohome}>Myst</button>
      </div>
      <div className="category">
        <div>
          <button onClick={Gorank}>랭킹</button>
        </div>
        <div>
          <button onClick={GoStylist}>스타일리스트</button>
        </div>
        <div>
          <button onClick={Golike}>찜</button>
        </div>
      </div>
      {login ? (
        <div className="mypage">
          <div>
            <button onClick={() => Gomypage(currentUser)}>MyPage</button>
          </div>
          <button onClick={openModal}>log out</button>
        </div>
      ) : (
        <div className="login">
          <button onClick={openModal}>log in</button>
        </div>
      )}
    </div>
  );
};

export default Header;
