import React from 'react';
import {
  GlobalOutlined,
  BgColorsOutlined
} from '@ant-design/icons';

import HttpX from './views/network/http/httpX';
import Picker from './views/color/picker';
import Pixi from './views/game/pixi/pixi';
import Equipment from './views/game/equipment'


const cfg = {};

cfg.menu = [
  {
    label: '网络', icon: <GlobalOutlined />,
    list: [
      { label: 'HTTP', key: "http", comp: <HttpX /> }
    ]
  }, {
    label: '色彩', icon: <BgColorsOutlined />,
    list: [
      { label: '选择器', comp: <Picker /> },
    ]
  }, {
    label: '游戏', icon: <BgColorsOutlined />,
    list: [
      { label: 'pixi', comp: <Pixi /> },
      { label: '装备', comp: <Equipment /> },
    ]
  }
]

export default cfg;