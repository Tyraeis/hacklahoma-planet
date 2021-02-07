import { Button as AntDesignButton } from "antd";
import React from "react";

interface IProps {
  onPress?: () => void;
}

const Button = (props: IProps): JSX.Element => {
  const { onPress } = props;

  return <AntDesignButton type="primary" onClick={onPress}>Primary Button</AntDesignButton>;
};

export default Button;
