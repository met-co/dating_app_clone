import styled from "styled-components";
import React from "react";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFireFlameCurved } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { __signin, __userReset } from "../../redux/modules/userSlice";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import { AlertView } from "../../components/ui/Alert";
import { Loading } from "../../components/ui/Loading";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSuccess, isLoading, error } = useSelector((state) => state.user);
  const [alertMessage, setAlertMessage] = useState({ type: "", message: "" });

  //초기값
  const initialState = {
    phoneNum: "",
    password: "",
  };

  useEffect(() => {
    setAlertMessage({ type: "error", message: error });

    handleSuccess();
  }, [error, isSuccess]);

  const handleSuccess = () => {
    if (isSuccess) {
      setAlertMessage({ type: "success", message: "로그인 성공🎉" });

      setTimeout(() => {
        dispatch(__userReset());

        navigate("/main");
      }, 1000);
    }
  };

  //유저 스테이트 생성
  const [user, setUser] = useState(initialState);

  //로그인 체크 전역변수 불러오기
  //   const { isLogin } = useSelector((state) => state.user);

  //로그인에 필요한 인풋값 유저스테이트에 저장
  const onChangeLoginHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const onSubmitLoginHandler = (e) => {
    e.preventDefault();
    if (user.phoneNum.trim() === "" || user.password.trim() === "") {
      alert("전화번호/아이디를 입력하세요");
    }
    dispatch(__signin(user));
  };

  //   useEffect(() => {
  //     isLogin && navigate("/main");
  //   }, [isLogin, navigate]);

  return (
    <Layout>
      <Container>
        {alertMessage.message && (
          <AlertView type={alertMessage.type} message={alertMessage.message} />
        )}
        <Wrapper>
          <TopBox>
            {/* <FontAwesomeIcon icon={faFireFlameCurved} size="3x" /> */}
            <h1> 로그인 </h1>
            <Stform onSubmit={onSubmitLoginHandler}>
              {/* <input
                required
                type="text"
                name="phoneNum"
                placeholder="전화번호를 입력하세요"
                onChange={onChangeLoginHandler}
              ></input> */}
              {/* <input
                required
                type="text"
                name="password"
                placeholder="password"
                onChange={onChangeLoginHandler}
              ></input>

               */}
              <TextField
                id="standard-basic"
                label="전 화 번 호"
                variant="standard"
                // onChange={onChangeHandler}
                // value={post.price || ""}
                name="phoneNum"
                // error={birthDateInput === true ? false : true}
                helperText="010을 포함한 11자리"
                maxLength={11}
                required
                onChange={onChangeLoginHandler}
              />
              <TextField
                id="outlined-password-input"
                type="password"
                autoComplete="current-password"
                label="비 밀 번 호"
                // error={passInput === true ? false : true}
                helperText="영 대소문자와 숫자릂 포함해 8~12자"
                variant="standard"
                // onChange={onChangeHandler}
                // value={post.price || ""}
                name="password"
                maxLength={12}
                required
                // value={password}
                onChange={onChangeLoginHandler}
              />
              <input type="submit" value="Log in" />
            </Stform>
            <Separator>
              <div></div>
              <div></div>
            </Separator>{" "}
            <button
              onClick={() => {
                navigate("/SignUp");
              }}
            >
              {" "}
              회원가입
            </button>
          </TopBox>
        </Wrapper>
      </Container>
    </Layout>
  );
};

export default Signin;

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 100px;
`;

const WhiteBox = styled.div`
  background-color: white;
  border: 1px solid rgb(219, 219, 219);
  border-radius: 10px;
`;

const TopBox = styled(WhiteBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 35px 40px 25px 40px;
  margin-bottom: 10px;

  h1 {
    color: #333333;
  }
  button {
    border: none;
    width: 130px;
    height: 30px;
    border-radius: 10px;
    background-color: #f56753;
    color: white;
    font-weight: 800;
    font-size: 15px;
    cursor: pointer;
  }
`;

const Stform = styled.form`
  display: flex;
  gap: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  & > input:last-child {
    border: none;
    border-radius: 10px;
    font-size: 16px;
    color: white;
    height: 30px;
    background-color: #f86767;
    font-weight: 800;
    cursor: pointer;
  }
`;

// const StDiv1 = styled.div`
//   margin-top: 35px;
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
// `;

// const StButton1 = styled.div`
//   margin-top: 35px;
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
// `;

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;

const Separator = styled.div`
  margin: 10px 0px 30px 0px; //or과 login 사이 띄운다
  margin-top: 10px;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center; // or 이 중앙으로 온다.  원래 위로 되어있음
  width: 100%;
  div {
    width: 100%;
    height: 2px;
    background-color: rgb(219, 219, 219);
  }
  span {
    // or을 마진을 줘서 중앙으로 띄운다
    margin: 0px 10px;
    color: #8e8e8e;
    font-weight: 600;
  }
`;

// const signUpBtn = styled`
//   padding: 20px 0px;
//   text-align: center;
//   font-weight: 600;
//     color: #0095f6;
// `'
