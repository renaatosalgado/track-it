import React from "react";
import styled from "styled-components";

import Header from "./Header";
import Bottom from "./Bottom";

export default function History() {
  return (
    <>
      <Header />
      <HistoryContainer>
        <PageTitle>Histórico</PageTitle>
        <DefaulMessage>
          Em breve você poderá ver o histórico dos seus hábitos aqui!
        </DefaulMessage>
      </HistoryContainer>
      <Bottom />
    </>
  );
}

const HistoryContainer = styled.div`
  background-color: #f2f2f2;
  width: 100%;
  height: 100vh;
  margin-top: 70px;
  margin-bottom: 70px;
  font-family: "Lexend Deca", sans-serif;
`;

const PageTitle = styled.div`  
  font-size: 22px;
  color: #52b6ff;
  padding-top: 17px;
  margin: 0 0 17px 17px;
`;

const DefaulMessage = styled.div`
    font-size: 18px;
    color: #666666;
    padding-left: 17px;
    line-height: 23px;
`
