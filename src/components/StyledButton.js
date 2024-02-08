import { Button } from "native-base";

const StyledButton = (props) => {
  const { children, buttonClickHandler } = props;
  return (
    <Button
      onClick={buttonClickHandler}
      borderRadius="lg"
      colorScheme="purple"
      bg="#4C1D95"
    >
      {children}
    </Button>
  );
};

export default StyledButton;
