import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Animated,
  findNodeHandle,
  TouchableOpacity,
} from "react-native";
import styled, { ThemeContext } from "styled-components/native";

import constants from "../../../constants";
import GroupGraph from "./GroupGraph";

const TabText = styled.Text`
  color: ${(props) => props.theme.subColor};
  font-size: ${(props) => props.size}px;
  font-weight: bold;
`;
const IndicatorView = styled(Animated.View)`
  height: 2px;
  background-color: ${(props) => props.theme.idnColor};
`;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const data = [
  {
    key: 1,
    title: "수용량 예측",
    subContext: "일주일간 수용량 변화 및 향후 N일 간의 변화 예측",
    ref: React.createRef(),
  },
  {
    key: 2,
    title: "성장 예측",
    subContext: "일주일간 양식 성장 변화 및 향후 N일간의 변화 예측",
    ref: React.createRef(),
  },
];

const Tab = React.forwardRef(({ item, onItemPress }, ref) => {
  return (
    <TouchableOpacity onPress={onItemPress} activeOpacity={1}>
      <View ref={ref}>
        <TabText size={32 / data.length}>{item.title}</TabText>
      </View>
    </TouchableOpacity>
  );
});

const Indicator = ({ measures, scrollX }) => {
  const inputRange = data.map((_, index) => index * constants.screenW);

  const indicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measure) => measure.width),
  });
  const indicatorX = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measure) => measure.x),
  });

  return (
    <IndicatorView
      style={{
        width: indicatorWidth,
        left: 0,
        transform: [
          {
            translateX: indicatorX,
          },
        ],
      }}
    />
  );
};

const Tabs = ({ scrollX, data, onItemPress }) => {
  const [measures, setMeasures] = useState([]);
  const containerRef = useRef();
  useEffect(() => {
    let m = [];
    data.forEach((item) => {
      item.ref.current.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          m.push({
            x,
            y,
            width,
            height,
          });
          if (m.length === data.length) {
            setMeasures(m);
          }
        }
      );
    });
  }, []);

  return (
    <View style={{ height: 50, width: constants.screenW }}>
      <View
        ref={containerRef}
        style={{
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "row",
          flex: 1,
        }}
      >
        {data.map((item, index) => {
          return (
            <Tab
              key={item.key}
              item={item}
              ref={item.ref}
              onItemPress={() => onItemPress(index)}
            />
          );
        })}
      </View>
      {measures.length > 0 && (
        <Indicator measures={measures} scrollX={scrollX} />
      )}
    </View>
  );
};

export default GroupGraphTab = ({ item }) => {
  const themeContext = useContext(ThemeContext);

  const GRAPH = ({ item }) => <GroupGraph item={item} />;

  const scrollX = useRef(new Animated.Value(0)).current;
  const ref = useRef();

  const onItemPress = useCallback((itemIndex) => {
    ref?.current?.scrollToOffset({
      offset: itemIndex * constants.screenW,
    });
  });

  return (
    <View style={{ backgroundColor: themeContext.mainColor }}>
      <Tabs scrollX={scrollX} data={data} onItemPress={onItemPress} />
      <AnimatedFlatList
        ref={ref}
        data={data}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        renderItem={GRAPH}
      />
    </View>
  );
};
