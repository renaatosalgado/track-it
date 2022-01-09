import React, { useContext } from "react";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <HeaderContainer>
      <HeaderBox>
        <Title>TrackIt</Title>
        <UserPicture src={user.image} />
      </HeaderBox>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  height: 70px;
  background-color: #126ba5;
  display: flex;
  justify-content: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
`;

const HeaderBox = styled.div`
  width: calc((100vw - 36px));
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 39px;
  font-family: "Playball", cursive;
  color: #ffffff;
`;

const UserPicture = styled.img`
  height: 51px;
  width: 51px;
  border-radius: 100px;
`;
