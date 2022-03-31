import React, { useContext } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { NavigationActions } from "react-navigation";
import { useDrawerProgress } from "@react-navigation/drawer";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";
import { ThemeContext } from "styled-components";
import { FontAwesome, Entypo } from "@expo/vector-icons";

import styled from "styled-components/native";
import { MockData } from "../../MockData";
import constants from "../../constants";

const Container = styled(Animated.View)`
  flex: 1;
`;

const DrawerBox = styled.View`
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  background-color: rgba(255, 255, 255, 0.2);
  flex: 1;
  padding: 20px;
  padding-top: ${constants.StatusBarHeight}px;
`;

const Top = styled.View`
  flex: 1;
  align-items: flex-end;
`;
const Mid = styled.View`
  flex: 8;
  /* background-color: green; */
`;
const Bottom = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const OptionBtn = styled.TouchableOpacity`
  justify-content: flex-end;
  padding: 5px 10px 5px 10px;
  margin: 12.5px 0px 0px 10px;
`;

const TitleBox = styled.View`
  /* background-color: red; */
  flex-direction: row;
`;
const TitleText = styled.Text`
  color: ${(props) => props.theme.mainColor};
  font-size: 18px;
  font-weight: bold;
`;
const BtnBox = styled.View`
  /* background-color: blue; */
  padding: 10px 0px 10px 0px;
`;
const Button = styled.TouchableOpacity`
  /* background-color: red; */
  height: 40px;
  margin: 0px 10px 0px 10px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainColor + 20};
`;

const ListBox = styled.View`
  flex: 1;
  /* background-color: blue; */
  border: ${(props) => props.theme.boxBorder};
  border-left-width: 0;
  border-right-width: 0;
`;

const ItemBox = styled.TouchableOpacity`
  padding: 20px;
  margin: 8px 16px 8px 16px;
  background-color: ${(props) => props.theme.mainColor + 20};
  border-radius: 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const ItemName = styled.Text`
  color: ${(props) => props.theme.mainColor};
  font-size: 18px;
  font-weight: bold;
  /* width: 65%; */
`;
const InfoBox = styled.View`
  /* width: 35%; */
  flex-direction: row;
  justify-content: space-around;
`;
const InfoWrapper = styled.View`
  justify-content: center;
  align-items: center;
  padding: 0px 0px 0px 12px;
`;
const InfoMainText = styled.Text`
  color: ${(props) => props.theme.mainColor};
  font-size: 12px;
  font-weight: bold;
`;
const InfoSubText = styled.Text`
  color: ${(props) => props.theme.mainColor};
  font-size: 11px;
`;

const data = MockData;

const Item = (item) => {
  const { id, name } = item.item;
  return (
    <ItemBox>
      <ItemName>{name}</ItemName>
      <InfoBox>
        <InfoWrapper>
          <InfoMainText>수온</InfoMainText>
          <InfoSubText>15℃</InfoSubText>
        </InfoWrapper>
        <InfoWrapper>
          <InfoMainText>수용량</InfoMainText>
          <InfoSubText>15%</InfoSubText>
        </InfoWrapper>
        <InfoWrapper></InfoWrapper>
      </InfoBox>
    </ItemBox>
  );
};

export default DrawerBar = (props) => {
  const themeContext = useContext(ThemeContext);

  const progress = useDrawerProgress();
  const color = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      ["#4F77A3", "#273b51"]
    );
    return {
      backgroundColor,
    };
  });

  const renderItem = ({ item }) => <Item item={item} />;

  return (
    <Container style={color}>
      <DrawerBox>
        <Top>
          <OptionBtn>
            <FontAwesome name="gear" size={24} color={themeContext.mainColor} />
          </OptionBtn>
        </Top>
        <Mid>
          <TitleBox style={{ paddingBottom: 15 }}>
            <Entypo
              name="location-pin"
              size={24}
              color={themeContext.mainColor}
            />
            <TitleText style={{ marginLeft: 10 }}>구역 목록</TitleText>
          </TitleBox>
          <ListBox>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </ListBox>
          <BtnBox style={{ paddingTop: 20 }}>
            <Button>
              <TitleText>구역 관리</TitleText>
            </Button>
          </BtnBox>
        </Mid>
        <Bottom>
          <TouchableOpacity>
            <TitleText style={{ padding: 20 }}>로그아웃</TitleText>
          </TouchableOpacity>
        </Bottom>
      </DrawerBox>
    </Container>
  );
};
