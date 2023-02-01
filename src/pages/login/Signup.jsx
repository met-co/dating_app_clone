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
import Box from "@mui/material/Box";
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
      longitude: position.coords.latitude,
      latitude: position.coords.longitude,
    };
    setLatitude(location.latitude);
    setLongitude(location.longitude);
  });

  console.log(latitude);
  console.log();

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
  const [phonenumInput, setphonenumInput] = useState(false);
  const [nickNameInput, setnickNameInput] = useState(false);
  const [passInput, setPassInput] = useState(false);
  const [birthDateInput, setbirthDateInput] = useState(false);
  const [wantingFemale, setWantingFemale] = useState(false);
  const [wantingMale, setWantingMale] = useState(false);

  //남성 여성 스테이트 생성
  const [myGender, setMyGender] = useState(null);

  //상대 남성 여성 스테이트 생성
  const [togender, setToGender] = useState(null);
  //정규식
  // const regphonenum = /^[0-9]{11}$/;
  // const regnickName = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{2,6}$/;
  // const regpassword = /^(?=.[A-Za-z])(?=.\\d)[A-Za-z\\d]{8,12}$/;
  // const regpassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,12}&/;
  // const regbirthdate = /^[0-9]{6}$/;

  // 생년월일 검증
  // \\d{2}연도 두 자리는 아무거나 와도 되니까 따로 조건을 걸지 않고 숫자만 오면 상관없게 하였음.
  // ([0]\\d|[1][0-2]) 월의 경우 앞자리가 0이면 뒤에는 1-9만 오도록 하였음.
  // 앞의 자리가 1인 경우에는 0,1,2만 올 수 있도록 하였음.
  //([0][1-9]|[1-2]\\d|[3][0-1]) 일의 경우 앞자리가 0이면 뒤에는 1-9,
  // 1이나 2인 경우엔 숫자 아무거나, 3인 경우에는 0이나 1만 올 수 있도록 함.
  // const regBirthDate =
  //   /^\\d{2}([0]\\d|[1][0-2])([0][1-9]|[1-2]\\d|[3][0-1]).{6}$/;
  const regBirthDate = /^[0-9]{6}$/;

  // 전화번호 검증
  // const regPhoneNum = /^010(\\d{8})$/;
  const regPhoneNum = /^[0-9]{11}$/;

  // 닉네임 검증
  const regNickName = /^[가-힣a-zA-Z]{2,6}$/;

  // 비밀번호 검증
  const regPassword = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,12}$/;

  //유효성 검사 및 유저 스테이트 작성
  const onChangeUserHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    if (name === "phoneNum")
      !regPhoneNum.test(value)
        ? setphonenumInput(false)
        : setphonenumInput(true);
    if (name === "nickName")
      !regNickName.test(value)
        ? setnickNameInput(false)
        : setnickNameInput(true);
    if (name === "password")
      !regPassword.test(value) ? setPassInput(false) : setPassInput(true);

    if (name === "birthDate")
      !regBirthDate.test(value)
        ? setbirthDateInput(false)
        : setbirthDateInput(true);
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
                    label="닉 네 임"
                    variant="standard"
                    // onChange={onChangeHandler}
                    // value={post.name || ""}
                    error={nickNameInput === true ? false : true}
                    helperText="닉네임은 2 ~ 6자로 입력해주세요."
                    name="nickName"
                    value={nickName}
                    onChange={onChangeUserHandler}
                    maxLength={6}
                    required
                  />
                  {/* <p>{nickNameInput}</p> */}

                  {/* <span>생 일</span> */}
                  <TextField
                    id="standard-basic"
                    label="생 년 월 일"
                    variant="standard"
                    // onChange={onChangeHandler}
                    // value={post.price || ""}
                    name="birthDate"
                    error={birthDateInput === true ? false : true}
                    helperText="생년월일은 6자로 입력해주세요. (ex: 860405)"
                    maxLength={20}
                    required
                    value={birthDate}
                    onChange={onChangeUserHandler}
                  />
                  {/* <p>{birthDateInput}</p> */}
                  {/* <span>비밀번호</span> */}
                  <TextField
                    id="outlined-password-input"
                    type="password"
                    autoComplete="current-password"
                    label="비 밀 번 호"
                    error={passInput === true ? false : true}
                    helperText="비밀번호는 영 대소문자와 숫자릂 포함해 8~12자로 입력해주세요."
                    variant="standard"
                    // onChange={onChangeHandler}
                    // value={post.price || ""}
                    name="password"
                    maxLength={12}
                    required
                    value={password}
                    onChange={onChangeUserHandler}
                  />
                  {/* <p>{passInput}</p> */}
                  {/* <span>전화번호</span> */}
                  <TextField
                    id="standard-basic"
                    label="전 화 번 호"
                    variant="standard"
                    // onChange={onChangeHandler}
                    // value={post.price || ""}
                    name="phoneNum"
                    error={phonenumInput === true ? false : true}
                    helperText="전화번호는 010을 포함한 11자리의 숫자로 입력해주세요."
                    maxLength={11}
                    required
                    value={phoneNum}
                    onChange={onChangeUserHandler}
                  />
                  {/* <p>{phonenumInput}</p> */}
                  <Stbox>
                    <FormControl sx={{ pt: 2 }}>
                      <FormLabel id="demo-radio-buttons-group-label">
                        나의 성별
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
                  </Stbox>
                </StinputBox>
                <StLoadingContainer>
                  {isLoading && <Loading />}
                </StLoadingContainer>
                {(phonenumInput &&
                  nickNameInput &&
                  passInput &&
                  birthDateInput &&
                  myGender &&
                  wantingFemale) ||
                wantingMale ? (
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ bgcolor: gTheme.color.primary, mt: 3 }}
                  >
                    회원가입
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    type="submit"
                    disabled
                    sx={{ bgcolor: gTheme.color.primary, mt: 3 }}
                  >
                    회원가입
                  </Button>
                )}
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
    color: #333333;
  }
`;

const StSignup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 120px;
  margin-top: 50px;
`;

const StimgBox = styled.div`
  width: 80vw;
  max-width: 400px;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > p {
  }
`;

const Stpersonal = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
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
  border: 1px solid #721d1d;
  border-radius: 10px;
  width: 80vw;
  max-width: 400px;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    /* height: 100%; */
    object-fit: cover;
    border-radius: 10px;
  }
`;

const StLoadingContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 30px;
`;

const Stbox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;
