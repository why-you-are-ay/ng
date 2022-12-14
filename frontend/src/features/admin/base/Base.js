import React, {useEffect} from "react";
import {useNavigate}from 'react-router-dom'
import SideBar from "../sidebar/SideBar";
import styled from "styled-components";

const ContainerDiv = styled.div`

  `

const MainDiv = styled.div`
  padding-top:50px;
  padding-right: 100px;
  font-size:20px;
  margin-left:400px;
  `

const Hr = styled.hr`
  height: 1px;
  background-color: black;
  width:100%;
  `

const InfoDiv = styled.div`
  width: 98%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  margin-left:30px;
  `

const TitleP = styled.p`
  font-size: 40px;
  font-weight: bold;
  font-family: 'MaruBuri-Regular';
  margin-top: 4rem;
  display: flex;
  justify-content: center
  `

function Home() {
  const history = useNavigate();
  useEffect(() => {
      if (1 === 2) {
        history('/admin/deny')
      }
    }, []);
    
  return (
    <ContainerDiv>
      <SideBar/>
      <MainDiv>
      <TitleP>요청 기업 목록</TitleP><Hr/>
        <InfoDiv>
        </InfoDiv>
      </MainDiv>
    </ContainerDiv>
  )
}
export default Home;