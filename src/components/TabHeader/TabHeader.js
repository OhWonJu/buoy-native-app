import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { View, Text, FlatList, Animated, TouchableOpacity } from "react-native";
import styled, { ThemeContext } from "styled-components/native";

import constants from "../../../constants";

const TabText = styled.Text`
  color: ${(props) => props.theme.subColor};
  font-size: ${(props) => props.size}px;
  font-weight: bold;
`;
const IndicatorView = styled(Animated.View)`
  top: 4%;
  height: 1.2px;
  background-color: ${(props) => props.theme.subColor};
`;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const Tab = React.forwardRef(({ item, onItemPress }, ref) => {
  return (
    <TouchableOpacity
      onPress={onItemPress}
      activeOpacity={1}
      style={{ paddingHorizontal: 15 }}
    >
      <View ref={ref}>
        <TabText size={12}>{item.title}</TabText>
      </View>
    </TouchableOpacity>
  );
});

const Indicator = ({ data, measures, scrollX }) => {
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
    <View
      style={{
        height: 35,
        width: constants.screenW,
        borderBottomWidth: 1.2,
        borderBottomColor: "#E1E1E1",
      }}
    >
      <View
        ref={containerRef}
        style={{
          justifyContent: "flex-start",
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
              onItemPress={() => onItemPress({ item, index })}
            />
          );
        })}
      </View>
      {measures.length > 0 && (
        <Indicator data={data} measures={measures} scrollX={scrollX} />
      )}
    </View>
  );
};

export default TabHeader = ({ data, navigation }) => {
  const themeContext = useContext(ThemeContext);

  const scrollX = useRef(new Animated.Value(0)).current;
  const ref = useRef();

  const onItemPress = useCallback(({ item, index }) => {
    ref?.current?.scrollToOffset({
      offset: index * constants.screenW,
    });
    navigation.navigate(item.name);
  });

  return (
    <View
      style={{ backgroundColor: themeContext.mainColor }}
      pointerEvents="box-none"
    >
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
        renderItem={() => (
          <View style={{ height: "0%", width: constants.screenW }} />
        )}
      />
    </View>
  );
};
