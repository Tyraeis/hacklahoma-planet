import React, { useState } from "react";
import LogComponent from "./LogComponent";
import Button from "./Button";
import styled from "styled-components";
import { STANDARD_SPACING } from "../constants/styles";
import Checkbox from "./Checkbox";
import RadioGroup, { IRadioOption } from "./RadioGroup";
import SimpleSelect from "./SimpleSelect";
import "antd/dist/antd.css";
import PlanetForm from "./PlanetForm";
import { Col, Row } from "antd";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: ${STANDARD_SPACING};
`;

const App = (): JSX.Element => {

  return (
    <Layout>
      <Row>
        <Col span={12}>
          <PlanetForm />
        </Col>
        <Col span={12}></Col>
      </Row>
    </Layout>
  );
};

export default App;
