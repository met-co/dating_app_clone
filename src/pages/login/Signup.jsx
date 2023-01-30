import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Layout from "../../components/Layout";
import Button from "@mui/material/Button";
import { gTheme } from "../../theme/globalTheme";
import DeleteIcon from "@mui/icons-material/Delete";
import { __profileImageUpload } from "../../redux/modules/fileSlice";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { AlertView } from "../../components/ui/Alert";
import { Loading } from "../../components/ui/Loading";
import { __userReset } from "../../redux/modules/userSlice";
import { __fileReset } from "../../redux/modules/fileSlice";
import { __signup } from "../../redux/modules/userSlice";
import { useSelector } from "react-redux";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imageURL, setImageURL] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("img/base_pic.png");
  const [imageFile, setImageFile] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [alertMessage, setAlertMessage] = useState({ type: "", message: "" });
  const { isSuccess, isLoading, error } = useSelector((state) => state.user);
  const { fileData } = useSelector((state) => state.file);

  useEffect(() => {
    setAlertMessage({ type: "error", message: error });

    handleSuccess();
  }, [fileData, error, isSuccess]);

  const handleSuccess = () => {
    if (isSuccess) {
      setAlertMessage({ type: "success", message: "가입 성공🎉" });

      setTimeout(() => {
        dispatch(__userReset());
        dispatch(__fileReset());

        navigate("/signin");
      }, 1500);
    }
  };

  const imagePreview = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImage(reader.result);
        resolve();
      };
    });
  };

  const imageUpLoad = async (e) => {
    imagePreview(e.target.files[0]);
    setImageFile(e.target.files[0]);
    const imgFile = e.target.files[0];
    console.log(imgFile);
    const formData = new FormData();
    formData.append("file", imgFile);
    console.log(formData);
    dispatch(__profileImageUpload(formData));
  };

  navigator.geolocation.getCurrentPosition(function (position) {
    const location = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
    setLatitude(location.latitude);
    setLongitude(location.longitude);
  });

  //초기값 생성
  const initialState = {
    phoneNum: "",
    nickName: "",
    password: "",
    birthDate: "",
  };
  //유저 스테이트 생성
  const [user, setUser] = useState(initialState);

  //유저 스테이트 구조분해 할당
  const { phoneNum, nickName, password, confirmpassword, birthDate } = user;
  //상태관리 위해 초기값 세팅
  const [phonenumInput, setphonenumInput] = useState("");
  const [nickNameInput, setnickNameInput] = useState("");
  const [passInput, setPassInput] = useState("");
  const [birthDateInput, setbirthDateInput] = useState("");
  const [wantingFemale, setWantingFemale] = useState(false);
  const [wantingMale, setWantingMale] = useState(false);

  //남성 여성 스테이트 생성
  const [myGender, setMyGender] = useState();

  //상대 남성 여성 스테이트 생성
  const [togender, setToGender] = useState();
  //정규식
  const regphonenum = /^[0-9]{11}$/;
  const regnickName = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{2,6}$/;
  const regpassword = /^(?=.[A-Za-z])(?=.\\d)[A-Za-z\\d]{8,12}$/;
  //   const regpassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,12}&/;
  const regbirthdate = /^[0-9]{6}$/;
  //유효성 검사 및 유저 스테이트 작성
  const onChangeUserHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    if (name === "phoneNum")
      !regphonenum.test(value)
        ? setphonenumInput("전화번호를 다시 입력해주세요.")
        : setphonenumInput("");
    if (name === "nickName")
      !regnickName.test(value)
        ? setnickNameInput("2~6자, 한글, 영 대소문자로 입력해주세요.")
        : setnickNameInput("");
    if (name === "password")
      !regpassword.test(value)
        ? setPassInput("8~12자, 영 대소문자와 숫자로 입력해주세요.")
        : setPassInput("");
    // if (name === "confirmpassword")
    //   password !== value
    //     ? setconfirmpasswordInput("비밀번호가 불일치합니다")
    //     : setconfirmpasswordInput("");

    if (name === "birthDate")
      !regbirthdate.test(value)
        ? setbirthDateInput("생년월일을 6자로 입력해주세요.")
        : setbirthDateInput("");
  };

  // 회원가입 POST요청 및 공백 존재 시 경고창 생성
  const onSubmitUserHandler = (e) => {
    e.preventDefault();
    if (nickName.trim() === "" || password.trim() === "") {
      return alert("아이디랑 비밀번호를 입력해주세요!");
    }
    // if (password !== confirmpassword) {
    //   return alert("비밀번호 확인해주세요");
    // }

    console.log(user);
    console.log(process.env.REACT_APP_BASE_URL);

    dispatch(
      __signup({
        ...user,
        myGender: Number(myGender),
        wantingFemale,
        wantingMale,
        profile: fileData,
        latitude,
        longitude,
      })
    );
    // navigate("/signin");
  };

  return (
    <Layout>
      <Stcontainer>
        <StForm onSubmit={onSubmitUserHandler}>
          {alertMessage.message && (
            <AlertView
              type={alertMessage.type}
              message={alertMessage.message}
            />
          )}
          <StSignupBox>
            <div>계정 만들기</div>
            <StSignup>
              <StimgBox>
                {/* <p>프로필 사진 업로드</p> */}
                <Stimg>
                  <ViewImg>
                    <img src={image} />
                  </ViewImg>
                  <div>
                    <Button
                      variant="contained"
                      component="label"
                      sx={{ bgcolor: gTheme.color.primary }}
                    >
                      Upload
                      <input
                        hidden
                        accept="image/*"
                        multiple
                        type="file"
                        onChange={imageUpLoad}
                      />
                    </Button>
                    {/* <Button
                    variant="contained"
                    startIcon={<DeleteIcon />}
                    sx={{ bgcolor: gTheme.color.primary }}
                    onClick={handleDelete}
                  >
                    Delete
                  </Button> */}
                  </div>
                </Stimg>
              </StimgBox>
              <Stpersonal>
                <StinputBox>
                  {/* <span>닉네임</span> */}
                  <TextField
                    id="standard-basic"
                    label="닉 네 임 (2 ~ 4자)"
                    variant="standard"
                    // onChange={onChangeHandler}
                    // value={post.name || ""}
                    name="nickName"
                    value={nickName}
                    onChange={onChangeUserHandler}
                    maxLength={6}
                    required
                  />
                  <p>{nickNameInput}</p>

                  {/* <span>생 일</span> */}
                  <TextField
                    id="standard-basic"
                    label="생 년 월 일 (ex: 890304)"
                    variant="standard"
                    // onChange={onChangeHandler}
                    // value={post.price || ""}
                    name="birthDate"
                    maxLength={20}
                    required
                    value={birthDate}
                    onChange={onChangeUserHandler}
                  />
                  <p>{birthDateInput}</p>
                  {/* <span>비밀번호</span> */}
                  <TextField
                    id="outlined-password-input"
                    type="password"
                    autoComplete="current-password"
                    label="비 밀 번 호 (8자 ~ 12자, 영대소문자 & 숫자)"
                    variant="standard"
                    // onChange={onChangeHandler}
                    // value={post.price || ""}
                    name="password"
                    maxLength={12}
                    required
                    value={password}
                    onChange={onChangeUserHandler}
                  />
                  <p>{passInput}</p>
                  {/* <span>전화번호</span> */}
                  <TextField
                    id="standard-basic"
                    label="전 화 번 호 (11자리, 숫자만 입력해주세요.)"
                    variant="standard"
                    // onChange={onChangeHandler}
                    // value={post.price || ""}
                    name="phoneNum"
                    minLength={8}
                    maxLength={12}
                    required
                    value={phoneNum}
                    onChange={onChangeUserHandler}
                  />
                  <p>{phonenumInput}</p>
                  <FormControl sx={{ pt: 2 }}>
                    <FormLabel id="demo-radio-buttons-group-label">
                      성별
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        value="0"
                        control={<Radio />}
                        label="여성"
                        onChange={(e) => setMyGender(e.target.value)}
                      />
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="남성"
                        onChange={(e) => setMyGender(e.target.value)}
                      />
                    </RadioGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      상대의 성별
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        value="여성"
                        control={<Radio />}
                        label="여성"
                        onChange={(e) => (
                          setWantingFemale(true), setWantingMale(false)
                        )}
                      />
                      <FormControlLabel
                        value="남성"
                        control={<Radio />}
                        label="남성"
                        onChange={(e) => (
                          setWantingFemale(false), setWantingMale(true)
                        )}
                      />
                      <FormControlLabel
                        value="모두"
                        control={<Radio />}
                        label="모두"
                        onChange={(e) => (
                          setWantingFemale(true), setWantingMale(true)
                        )}
                      />
                    </RadioGroup>
                  </FormControl>
                </StinputBox>
                <SLoadingContainer>
                  {isLoading && <Loading />}
                </SLoadingContainer>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ bgcolor: gTheme.color.primary }}
                >
                  회원가입
                </Button>
              </Stpersonal>
            </StSignup>
          </StSignupBox>
        </StForm>
      </Stcontainer>
    </Layout>
  );
};

export default Signup;

const Stcontainer = styled.div`
  width: 80%;
  height: 90vh;
  margin: 0 auto;
  margin-top: 40px;
`;

const StForm = styled.form``;

const StSignupBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  & > div:first-child {
    height: 100px;
    display: flex;
    align-items: center;
    font-size: 35px;
    font-weight: 700;
  }
`;

const StSignup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 120px;
  margin-top: 20px;
`;

const StimgBox = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > p {
  }
`;

const Stpersonal = styled.div`
  width: 40%;
  /* height: 500px; */
`;

const StinputBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  & > div {
    padding-bottom: 20px;
  }
`;

const Stimg = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > div:nth-child(2) {
    margin-top: 40px;
  }
`;

const ViewImg = styled.div`
  border: 1px solid #004a7c;
  border-radius: 10px;
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const SLoadingContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
