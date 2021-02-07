import { Slider } from "antd";
import React from "react";

interface IProps {
  value: any;
}

export const LogComponent = (props: IProps): JSX.Element => {
  const { value } = props;
  return (
    <>
      <Slider defaultValue={30} disabled={false} />
      <div>{"Value is: " + value}</div>
    </>
  );
};

export default LogComponent;
