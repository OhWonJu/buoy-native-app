import { Dimensions, StatusBar } from "react-native";

const { width: screenW, height: screenH } = Dimensions.get("screen");
const { width: windowW, height: windowH } = Dimensions.get("window");
const StatusBarHeight = StatusBar.currentHeight;

export default { screenW, screenH, windowW, windowH, StatusBarHeight };
