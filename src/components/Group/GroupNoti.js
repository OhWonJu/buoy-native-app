import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import { shadows } from "../../../styles/GlobalStyles";
import { Bouy, Wave, Weight, Wind } from "../../../styles/Icons";

const Container = styled.View`
  padding: 10px;
  margin-bottom: 15px;
  background-color: ${(props) => props.theme.mainColor};
  /* flex: 1; */
  /* align-items: flex-start; */
  /* justify-content: flex-start; */
`;

const GroupName = styled.Text`
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  padding: 10px 0px 10px 0px;
  color: ${(props) => props.theme.idnColor};
`;

const Card = styled.View`
  height: 200px;
  background-color: ${(props) => props.theme.mainColor};
  border-radius: 15px;
  margin: 10px 0px 10px 0px;
  flex-direction: row;
  padding: 10px 15px 10px 15px;
`;

const IconBox = styled.View`
  /* background-color: green; */
  justify-content: center;
  align-items: center;
  flex: 2;
`;
const Icon = styled.View``;

const InfoBox = styled.View`
  flex: 3;
`;
const InfoWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const InfoTitle = styled.Text`
  text-align: center;
  color: ${(props) => props.theme.darkUtilColor};
  font-weight: bold;
  font-size: 35px;
`;
const InfoContext = styled.Text`
  text-align: center;
  color: ${(props) => props.theme.subColor};
  font-weight: bold;
  font-size: 45px;
`;

const NotiBox = styled.View``;

export default GroupNoti = ({ data = null }) => {
  return (
    <Container>
      <GroupName>{data?.name}</GroupName>
      <Card style={shadows.boxWrapper}>
        <IconBox>
          <Icon>
            <Bouy width={105} height={88} />
          </Icon>
          <Icon style={{ top: -20 }}>
            <Wave width={89} height={39} />
          </Icon>
        </IconBox>
        <InfoBox>
          <InfoWrapper>
            <InfoTitle>해수면으로부터 평균 높이</InfoTitle>
          </InfoWrapper>
          <InfoWrapper>
            <InfoContext>40cm</InfoContext>
          </InfoWrapper>
        </InfoBox>
      </Card>
      {/*  */}
      <Card style={shadows.boxWrapper}>
        <IconBox>
          <Icon style={{ top: -10 }}>
            <Weight width={88} height={86} />
          </Icon>
        </IconBox>
        <InfoBox>
          <InfoWrapper>
            <InfoTitle>구역 부표 평균 무게</InfoTitle>
          </InfoWrapper>
          <InfoWrapper>
            <InfoContext>80Kg</InfoContext>
          </InfoWrapper>
        </InfoBox>
      </Card>
      {/*  */}
      <Card style={shadows.boxWrapper}>
        <IconBox>
          <Icon>
            <Wind width={84} height={60} />
          </Icon>
        </IconBox>
        <InfoBox>
          <InfoWrapper>
            <InfoTitle>추가 정보</InfoTitle>
          </InfoWrapper>
          <InfoWrapper>
            <InfoContext>-</InfoContext>
          </InfoWrapper>
        </InfoBox>
      </Card>
    </Container>
  );
};
