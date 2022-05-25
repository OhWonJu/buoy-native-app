// import { SkiaReadonlyValue } from "@shopify/react-native-skia";
// import {
//   mix,
//   Group,
//   BoxShadow,
//   Box,
//   FitBox,
//   rect,
//   rrect,
//   Circle,
//   useDerivedValue,
// } from "@shopify/react-native-skia";
// import React, { useContext } from "react";
// import { ThemeContext } from "styled-components/native";

// const src = rect(0, 0, 48, 24);
// const border = rrect(src, 12, 12);
// const container = rrect(rect(1, 1, 46, 22), 12, 12);
// const dot = rrect(rect(6, 6, 12, 12), 12, 12);

// export const NeumoSwitch = ({ x, y, size, pressed }) => {
//   const themeContext = useContext(ThemeContext);
//   return (
//     <FitBox src={src} dst={rect(x, y, size, size)}>
//       <Box box={border} color={themeContext.white1}>
//         <BoxShadow dx={-1} dy={-1} blur={3} color="white" />
//         <BoxShadow
//           dx={1.5}
//           dy={1.5}
//           blur={3}
//           color="rgba(174, 174, 192, 0.6)"
//         />
//       </Box>
//       <Box box={container} color={themeContext.white2}>
//         <BoxShadow
//           dx={-1}
//           dy={-1}
//           blur={3}
//           color="rgba(255, 255, 255, 0.6)"
//           inner
//         />
//         <BoxShadow
//           dx={1.5}
//           dy={1.5}
//           blur={3}
//           color="rgba(174, 174, 192, 0.4)"
//           inner
//         />
//       </Box>
//       <Group transform={transform}>
//         <Box box={dot} color={Theme.white1}>
//           <BoxShadow dx={0} dy={1} blur={4} color="rgba(174, 174, 192, 0.25)" />
//           <BoxShadow dx={2} dy={2} blur={3} color="rgba(174, 174, 192, 0.25)" />
//         </Box>
//         <Circle cx={12} cy={12} r={r} color="#745FF2" opacity={pressed} />
//       </Group>
//     </FitBox>
//   );
// };
