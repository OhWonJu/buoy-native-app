import React, { useContext, useEffect } from "react";
import { View } from "react-native";
import styled, { ThemeContext } from "styled-components/native";

const Container = styled.View`
  width: ${(props) => props.width}px;
  height: 100%;
  align-items: center;
  padding-bottom: 23px;
`;

const MainWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  top: -4%;
`;
const SubWrapper = styled.View`
  padding-bottom: 10px;
  position: absolute;
  top: 74%;
`;

const MainText = styled.Text`
  color: ${(props) => props.theme.mainColor};
  font-size: 28px;
  font-weight: bold;
`;
const SubText = styled.Text`
  color: ${(props) => props.theme.mainColor};
  font-size: 23px;
  font-weight: bold;
`;
const AlertText = styled.Text`
  color: ${(props) => props.theme.mainColor};
  font-size: 14px;
`;

export default TemperaturePage = ({
  width,
  temperature = 10,
  type = "water", // water|| atmo
  isUpper = true,
}) => {
  const themeContext = useContext(ThemeContext);
  const types = { water: "수온", atmo: "기온" };

  const lr = 12.8;
  const hr = 14.2;

  let result = 0;
  const notBetween = (t) => {
    if (t < lr) {
      isUpper = false;
      return (result = (lr - t).toFixed(1));
    } else if (t > hr) {
      isUpper = true;
      return (result = (t - hr).toFixed(1));
    }
    return null;
  };

  return (
    <Container width={width}>
      <MainWrapper>
        <MainText>{types[`${type}`]}</MainText>
        <SubText>{temperature}º</SubText>
      </MainWrapper>
      {notBetween(temperature) && (
        <SubWrapper>
          <AlertText>동일 기간 평균 {types[`${type}`]}보다</AlertText>
          <View style={{ flexDirection: "row" }}>
            <AlertText
              style={{
                fontWeight: "bold",
                color: isUpper ? themeContext.redColor : themeContext.blueColor,
                backgroundColor: themeContext.mainColor + 60,
                borderRadius: 8,
                paddingHorizontal: 4.5,
              }}
            >
              {result}º
            </AlertText>
            <AlertText> {isUpper ? "높습니다." : "낮습니다."}</AlertText>
          </View>
        </SubWrapper>
      )}
    </Container>
  );
};
