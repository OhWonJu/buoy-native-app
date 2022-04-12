import React, { useContext, useState, useEffect } from "react";
import { TouchableOpacity, FlatList } from "react-native";
import { useDrawerProgress, useDrawerStatus } from "@react-navigation/drawer";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";
import styled, { ThemeContext } from "styled-components/native";
import { FontAwesome, Entypo } from "@expo/vector-icons";

import { MockData } from "../../MockData";
import constants from "../../constants";

const Container = styled(Animated.View)`
  flex: 1;
`;

const DrawerBox = styled.View`
  margin-top: ${constants.StatusBarHeight}px;
  border-top-right-radius: 15px;
  /* border-bottom-right-radius: 15px; */
  background-color: rgba(255, 255, 255, 0.2);
  flex: 1;
  padding: 20px;
  padding-top: 0px;
`;

const Top = styled.View`
  /* flex: 1; */
  height: 7%;
  align-items: flex-end;
`;
const Mid = styled.View`
  flex: 1;
`;
const Bottom = styled.View`
  height: 65px;
  justify-content: center;
  align-items: center;
`;

const OptionBtn = styled.TouchableOpacity`
  justify-content: flex-end;
  padding: 5px 10px 5px 10px;
  margin: 10px 0px 0px 10px;
  /* background-color: blue; */
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
  margin: 0px 12px 0px 12px;
  border-radius: 12px;
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
  margin: 8px 12px 8px 12px;
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
//                             setSwipealbe같은건,,redux로 관리하는게 안전쓰..
const Item = ({ item, navigation, disable }) => {
  const { id, name, location, temperature, capacity } = item;
  return (
    <ItemBox
      disabled={disable}
      onPress={() => {
        navigation.navigate(id);
        navigation.closeDrawer();
      }}
    >
      <ItemName>{name}</ItemName>
      <InfoBox>
        <InfoWrapper>
          <InfoSubText>{location}</InfoSubText>
        </InfoWrapper>
        <InfoWrapper>
          <InfoMainText>수온</InfoMainText>
          <InfoSubText>{temperature}º</InfoSubText>
        </InfoWrapper>
        <InfoWrapper>
          <InfoMainText>수용량</InfoMainText>
          <InfoSubText>{capacity}%</InfoSubText>
        </InfoWrapper>
        <InfoWrapper></InfoWrapper>
      </InfoBox>
    </ItemBox>
  );
};

export default DrawerBar = ({ state, navigation }) => {
  const themeContext = useContext(ThemeContext);
  // const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const [disable, setDisable] = useState(true);

  const isDrawerOpen = useDrawerStatus() === "open";

  // Drawer가 제대로 안 닫히는 이유는. Drawer가 다 열리기전에 이벤트가 발생했기 때문.
  // Drawer가 다 열릴 때 까지 터치 이벤트를 disable 하면된다.
  useEffect(() => {
    if (isDrawerOpen) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [isDrawerOpen]);

  // 드로어 백그라운드 색 관련
  const progress = useDrawerProgress();
  const color = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [themeContext.idnColor, themeContext.idnShadow]
    );
    return {
      backgroundColor,
    };
  });
  // -------------------------------------------------

  // 드로어 뷰 간 이동을 위한 토글
  const toggleBtn = [
    { nav: "GroupList", name: "구역 관리" },
    { nav: "Home", name: "종합 정보" },
  ];
  // ------------------------------------------------

  const renderItem = ({ item }) => (
    <Item item={item} navigation={navigation} disable={disable} />
  );

  return (
    <Container style={color}>
      <DrawerBox>
        <Top>
          <OptionBtn disabled={disable}>
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
            <Button
              disabled={disable}
              onPress={() => {
                navigation.navigate(toggleBtn[index].nav);
                setIndex((index + 1) % toggleBtn.length);
                navigation.closeDrawer();
                navigation.closeDrawer();
              }}
            >
              <TitleText>{toggleBtn[index].name}</TitleText>
            </Button>
          </BtnBox>
        </Mid>
        <Bottom>
          <TouchableOpacity disabled={disable}>
            <TitleText style={{ padding: 20 }}>로그아웃</TitleText>
          </TouchableOpacity>
        </Bottom>
      </DrawerBox>
    </Container>
  );
};
