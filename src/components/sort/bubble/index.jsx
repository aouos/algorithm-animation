import React, { useEffect, useState, memo } from 'react';
import * as echarts from 'echarts';
import { Button, Row, Col, Slider } from 'tdesign-react';
import { PlayCircleIcon, RefreshIcon, StopCircleIcon } from 'tdesign-icons-react';

import { getBubbleData } from 'model/sort/bubble';

import './style.less';

const BubbleSort = memo(() => {
  const [value, setValue] = useState(1);
  const [disabled, setDisabled] = useState(false);
  let getData = getBubbleData();
  let myChart = null;

  useEffect(() => {
    myChart = echarts.init(document.getElementById('algo'));
    getData.next();

    const ret = getData.next();
    myChart.setOption(ret.value);

    return () => {
      getData.return();
      myChart = null;
    };
  }, []);

  const playAnimation = () => {
    setDisabled(true);

    const timer = setInterval(() => {
      const ret = getData.next();
      if (ret.done) {
        clearInterval(timer);
      } else {
        myChart.setOption(ret.value);
      }
    }, 1000);
  };

  return (
    <>
      <div id="algo"></div>

      <div className="contral-bar">
        <Row gutter={20}>
          <Col>
            <Button theme="default" icon={<RefreshIcon />} disabled={true}></Button>
          </Col>

          <Col>
            <Button
              icon={!disabled ? <PlayCircleIcon /> : <StopCircleIcon />}
              theme="default"
              onClick={playAnimation}
              disabled={disabled}
            ></Button>
          </Col>

          <Col>
            <Slider
              className="contral-slider"
              value={value}
              min={1}
              max={5}
              onChange={setValue}
              disabled={true}
            ></Slider>
          </Col>
        </Row>
      </div>
    </>
  );
});

export default BubbleSort;
