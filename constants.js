import { Dimensions, StatusBar } from "react-native";

const { widht: screenW, height: screenH } = Dimensions.get("screen");
const { widht: windowW, height: windowH } = Dimensions.get("window");
const StatusBarHeight = StatusBar.currentHeight;

export default { screenW, screenH, windowW, windowH, StatusBarHeight };
