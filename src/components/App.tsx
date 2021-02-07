import React, { useEffect, useState } from "react";
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
import { Planet } from "../../web/planets/planet";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: ${STANDARD_SPACING};
`;

const App = (): JSX.Element => {
  const [planet, setPlanet] = useState<Planet | undefined>();
  
  return (
    <Layout>
      <Row>
        <Col span={7}>
          <PlanetForm updatePlanet={setPlanet}/>
        </Col>
        <Col span={17}></Col>
      </Row>
    </Layout>
  );
};

export default App;
