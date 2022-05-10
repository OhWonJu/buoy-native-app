import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { View, TouchableOpacity } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import styled, { ThemeContext } from "styled-components/native";

import constants from "../../../constants";

const TabText = styled.Text`
  color: ${(props) =>
    props.isFocused ? props.theme.subColor : props.theme.utilColor};
  font-size: ${(props) => props.size}px;
  font-weight: bold;
`;
const IndicatorView = styled(Animated.View)`
  top: 4%;
  height: 1.65px;
  background-color: ${(props) => props.theme.subColor};
`;

// const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const Tab = React.forwardRef(
  ({ item, onItemPress, isFocused, scrollX, measure }, ref) => {
    useEffect(() => {
      if (isFocused && measure) {
        scrollX.value = measure.x;
      }
    }, [isFocused, measure]);
    return (
      <TouchableOpacity
        onPress={onItemPress}
        activeOpacity={1}
        style={{ paddingHorizontal: 15 }}
      >
        <View ref={ref}>
          <TabText size={15} isFocused={isFocused}>
            {item.title}
          </TabText>
        </View>
      </TouchableOpacity>
    );
  }
);

const Indicator = ({ measures, scrollX }) => {
  const inputRange = measures.map((measure) => measure.x);
  const outputRange = measures.map((measure) => measure.width);

  const indicatorWidth = useDerivedValue(() => {
    return interpolate(scrollX.value, inputRange, outputRange);
  });
  const indicatorX = useDerivedValue(() => {
    return interpolate(scrollX.value, inputRange, inputRange);
  });

  const DURATION = 200;

  const animeStyle = useAnimatedStyle(() => {
    return {
      left: 0,
      width: withTiming(indicatorWidth.value, {
        duration: DURATION,
      }),
      transform: [
        { translateX: withTiming(indicatorX.value, { duration: DURATION }) },
      ],
    };
  });

  return <IndicatorView style={animeStyle} />;
};

const Tabs = ({ scrollX, data, state, onItemPress }) => {
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
        height: 48,
        width: constants.screenW,
        borderBottomWidth: 1.65,
        borderBottomColor: "#E1E1E1" + 30,
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
              onItemPress={() => onItemPress({ item, index })}
              isFocused={state.index === index}
              measure={measures[index]}
              scrollX={scrollX}
              ref={item.ref}
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

export default TabHeader = ({ data, navigation, state }) => {
  const themeContext = useContext(ThemeContext);

  const scrollX = useSharedValue(0);

  const onItemPress = useCallback(({ item, index }) => {
    navigation.navigate(item.name);
  });

  return (
    <View
      style={{ backgroundColor: themeContext.mainColor }}
      pointerEvents="box-none"
    >
      <Tabs
        scrollX={scrollX}
        data={data}
        state={state}
        onItemPress={onItemPress}
      />
    </View>
  );
};
