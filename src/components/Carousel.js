import React, { useState } from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  /* justify-content: center; */
  align-items: center;
`;
const Indicator = styled.View`
  margin: 0px 2px;
  background-color: ${(props) =>
    props.focused ? props.theme.lightUtilColor : props.theme.utilColor};
  width: 6px;
  height: 6px;
  border-radius: 3px;
`;
const IndicatorWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  position: absolute;
  top: 92%;
`;

export default Carousel = ({
  data,
  pageWidth,
  gap = 0,
  offset = 0,
  renderItem,
}) => {
  const [page, setPage] = useState(0);

  // const renderItem = ({ item }) => {
  //   return <TemperaturePage width={pageWidth} {...item} />;
  // };

  const onScroll = (event) => {
    const newPage = Math.round(
      event.nativeEvent.contentOffset.x / (pageWidth + gap)
    );
    setPage(newPage);
  };

  return (
    <Container>
      <FlatList
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={{
          paddingHorizontal: offset + gap / 2,
        }}
        data={data}
        decelerationRate="fast"
        horizontal
        keyExtractor={(item) => `page__${item.type}`}
        onScroll={onScroll}
        pagingEnabled
        renderItem={renderItem}
        snapToInterval={pageWidth + gap}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
      />
      <IndicatorWrapper>
        {Array.from({ length: data.length }, (_, i) => i).map((i) => (
          <Indicator key={`indicator_${i}`} focused={i === page} />
        ))}
      </IndicatorWrapper>
    </Container>
  );
};
