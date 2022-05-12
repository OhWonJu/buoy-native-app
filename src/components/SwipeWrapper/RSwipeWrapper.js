import React, { useRef } from "react";
import { Animated, StyleSheet, View, Text, Alert } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";

export default RSwipeWrapper = ({ onSwipe, children, height = 65 }) => {
  const ref = useRef(null);
  const closeSwipeable = () => {
    if (ref) ref.current.close();
  };

  function renderRightActions(progress, dragX) {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [-(100 - height), height],
    });

    return (
      <RectButton
        onPress={() =>
          Alert.alert("", "해당 그룹에서 해제 하시겠습니까?", [
            {
              text: "취소",
              style: "cancel",
              onPress: () => closeSwipeable(),
            },
            {
              text: "확인",
              onPress: () => {
                closeSwipeable();
                onSwipe();
              },
            },
          ])
        }
      >
        <Animated.View
          style={{
            height,
            width: height,
            backgroundColor: "#eb2f06",
            justifyContent: "center",
            alignItems: "center",
            // height: size,
            // width: size,
            // borderRadius,
            transform: [{ translateX: trans }],
          }}
        >
          <Text style={styles.remove}>해제</Text>
        </Animated.View>
      </RectButton>
    );
  }

  return (
    <View style={{ height, width: "100%" }}>
      <Swipeable
        ref={ref}
        rightThreshold={50}
        renderRightActions={renderRightActions}
      >
        {children}
      </Swipeable>
    </View>
  );
};

const styles = StyleSheet.create({
  remove: {
    color: "white",
    // fontFamily: "UberMoveMedium",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1.8,
  },
});
