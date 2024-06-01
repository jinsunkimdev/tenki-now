export const convertUnixToReadable = (timestamp) => {
  const date = new Date(timestamp * 1000); // Unix 타임스탬프는 밀리초가 아닌 초 단위이므로 1000을 곱함
  return date.toLocaleString(); // 현지 시간대를 사용한 사람이 읽을 수 있는 문자열 반환
};
export const handleLayout = (event, index, setMaxHeights) => {
  const { height } = event.nativeEvent.layout;
  setMaxHeights((prev) => {
    const newHeights = [...prev];
    const rowIndex = Math.floor(index / 2); // 한 줄에 2개의 카드
    if (!newHeights[rowIndex] || height > newHeights[rowIndex]) {
      newHeights[rowIndex] = height;
    }
    return newHeights;
  });
};

export const getCardStyle = (index,maxHeights) => {
  const rowIndex = Math.floor(index / 2);
  return {
    height: maxHeights[rowIndex] || "auto",
  };
};
