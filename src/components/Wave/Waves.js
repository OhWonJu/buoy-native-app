import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import Svg from "react-native-svg";
import MaskedView from "@react-native-masked-view/masked-view";

import Wave from "./Wave";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
`;

export default Waves = ({ wavy }) => {
  const data = ["#3163e1", "#5e85e8", "#8aa7ee"];

  return (
    // <Container>
    <MaskedView
      maskElement={
        <View
          style={{
            flex: 1,
            backgroundColor: "black",
            borderRadius: 15,
          }}
        />
      }
    >
      <Svg width="100%" height="100%" viewBox="0 0 1 1" style={{ top: "18%" }}>
        {data.map((d, i) => (
          <Wave
            key={i}
            totalWave={data.length}
            index={i}
            color={d}
            wavy={wavy}
          />
        ))}
      </Svg>
    </MaskedView>
    // </Container>
  );
};
