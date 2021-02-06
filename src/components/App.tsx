import React, { useState } from "react";
import LogComponent from "./LogComponent";
import Button from "./Button";
import styled from "styled-components";
import { STANDARD_SPACING } from "../constants/styles";
import Checkbox from "./Checkbox";
import RadioGroup, { IRadioOption } from "./RadioGroup";
import SimpleSelect from "./SimpleSelect";
import 'antd/dist/antd.css';
import PlanetForm from "./PlanetForm";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: ${STANDARD_SPACING};
`;

const radioOptions: IRadioOption[] = [
  {label: "Option 1", value: "Value 1"},
  {label: "Option 2", value: "Value 2"},
  {label: "Option 3", value: "Value 3"},
  {label: "Option 4", value: "Value 4"}
]

const App = (): JSX.Element => {
  const [testValue, setTestValue] = useState<number>(0);
  const [checked, setChecked] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleCheckboxChange = () => {
    setTestValue(testValue + 1);
    setChecked(!checked);
  };

  const handleButtonPress = () => {
    setTestValue(testValue - 1);
  };

  const handleSelectChange = (value: string) => {
    setSelectedValue(value)
  }

  return (
    <Layout>
        <PlanetForm />
    </Layout>
  );
};

export default App;
