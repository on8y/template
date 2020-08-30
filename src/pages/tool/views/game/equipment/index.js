import React, { useState, useEffect } from 'react';
import cfg from './config';
// import { form } from 'antd';

function Equipment() {
  // 声明一个叫 “count” 的 state 变量。
  const [equipment, setEquipment] = useState([]);

  function make () {

  }

  return (
    <div>
      <button onClick={() => {setEquipment(this.make())}}>生成装备</button>
      <div>{equipment.map((item,index) => <div key={index}>item</div>)}</div>
    </div>
  );
}

export default Equipment;