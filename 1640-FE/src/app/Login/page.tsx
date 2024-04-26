'use client'
import { ButtonGroup, styled } from '@mui/material';

import GoogleIcon from '@mui/icons-material/Google';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import AppleIcon from '@mui/icons-material/Apple';


import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { axiosPrivate, axiosPublic } from '../lib/axios';
import cookie from 'js-cookie';


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();


  const handleSubmit = async(e: any) => {
    e.preventDefault();
    try {
      
      const response = await axiosPublic.post('/auth/login', JSON.stringify({
        email: email,
        password: password
      }))
      
      cookie.set('access_token', response?.data.access_token, { expires: 100000 });
      cookie.set('refresh_token', response?.data.refresh_token, { expires: 300000 });
      cookie.set('role', response?.data.role, { expires: 100000 });
      cookie.set('userID', response?.data.userID, { expires: 100000 });
      cookie.set('facultyID', response?.data.facultyID, { expires: 100000 });
      router.push("/home")
    } catch (error) {
      alert("Fail to login")
    }
  }

  return (
    <BigContainer className='bg-auto bg-no-repeat bg-center bg-cover'>
      <Logo src='/images/Logo.png' />
      <FormContainer onSubmit={handleSubmit}>
        <div className='flex flex-col'>
          <WelcomeTxtStyle>
            Welcome to
            <span> Greenwich Magazine</span>
          </WelcomeTxtStyle>
          <TitleStyle>Sign In</TitleStyle>
          <div className='mt-[20px]'>
            <ButtonGroup className='gap-5 flex justify-between' >
              <SocialButton>
                <GoogleIcon />
              </SocialButton>
              <SocialButton>
                <FacebookOutlinedIcon />
              </SocialButton>
              <SocialButton>
                <AppleIcon />
              </SocialButton>
            </ButtonGroup>
          </div>
          <div className="mt-[20px] flex flex-col gap-[20px]">
            <ContentStyle>
              Enter email address
            </ContentStyle>
            <LoginInput
              type="text"
              id='email'
              placeholder='Username or email address'
              name="email"
              onChange={(e) => setEmail(e.target.value)} />
            <ContentStyle>
              Enter your Password
            </ContentStyle>
            <LoginInput
              type="password"
              id='password'
              placeholder='Password'
              name="password"
              onChange={(e) => setPassword(e.target.value)} />
          </div>
          <ForgotPassword href=''>
            Forgot Password
          </ForgotPassword>
          <SignUpBtn>
            <span>Sign In</span>
          </SignUpBtn>
        </div>
      </FormContainer>
    </BigContainer>
  );
}

const BigContainer = styled("div")`
  width: 100%;
  height: 100%;
  background-image: url(${"/images/SignInBg.png"});
  padding: 5%;
`

const FormContainer = styled("form")`
  padding: 5%;
  max-width: 560px;
  min-height: 750px;
  background: #dededeab;
  border-radius: 40px;
  margin-left: auto;
  border: 2px solid;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0);
`

const WelcomeTxtStyle = styled("p")`
  font-size: 22px;
  font-weight: 500;

  color: black;
  & span {
    color: #779341;
  }
`

const TitleStyle = styled("p")`
  font-size: 60px;
  font-weight: 500;
  color: black;
`

const ContentStyle = styled("p")`

  font-size: 18px;
  font-weight: 500;
  color: black;
`

const SocialButton = styled("button")`
  margin: 20px 0px;
  background: #E9F1FF;
  color: #4285F4;
  min-width: 70px;
  min-height: 50px;
  border-radius: 10px;
  align-items: center;
  gap: 10px;
  &:focus{
    min-width: 150px;
  }
`

const LoginInput = styled("input")`
  min-height: 60px;
  border-radius: 10px;
  align-self: center;
  color: black;
  padding: 0px 20px;
  @media (max-width: 500px) {
    width: 200px;
  }
  @media (min-width: 600px) {
    width: 450px;
  }
  &:focus{
  outline: 2px solid transparent;
  outline-offset: 0.5px;
  outline-color: #4285F4;
  }
`

const SignUpBtn = styled("button")`
  min-height: 60px;
  border-radius: 10px;
  background:#779341;
  align-self: end;
  @media (max-width: 600px) {
    width: 200px;
  }
  @media (min-width: 600px) {
    width: 300px;
  }
    & span{
      color: white;

      font-size: 18px;
      font-weight: 500;
    }
    &:hover{
      background: #329407f0;
    }
`

const ForgotPassword = styled("a")`
  font-size: 18px;
  font-weight: 400;
  color: #4285F4;
  align-self: end;
  margin: 20px 0px;
  }
`
const Logo = styled("img")`
  width:220px;
  height: 50px;
`


