import React, { useState, useEffect } from 'react';
import * as PIXI from 'pixi.js'
// import { form } from 'antd';
import Img from './bunny.png'

const app = new PIXI.Application({
  width: 256,
  height: 256,
  antialias: true,    // default: false 圆滑边界
  transparent: false, // default: false Canvas标签的透明度
  resolution: 1,      // default: 1     分辨率和像素密度的平台上运行变得简单
  forceCanvas: true,  //强制使用Canvas
});

app.renderer.backgroundColor = 0x061639;

function Pixi() {
  // 声明一个叫 “count” 的 state 变量。
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
    let dom = document.getElementById('px-render');
    if(!dom.innerHTML) {
      dom.appendChild(app.view);
    }
  });

  return (
    <div>
      <p>You 222 clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <div id="px-render"></div>
    </div>
  );
}

export default Pixi;


app.loader.add('bunny', Img).load((loader, resources) => { //'bunny.png'
  // This creates a texture from a 'bunny.png' image
  const bunny = new PIXI.Sprite(resources.bunny.texture);

  // Setup the position of the bunny
  bunny.x = app.renderer.width / 2;
  bunny.y = app.renderer.height / 2;

  // Rotate around the center
  bunny.anchor.x = 0.5;
  bunny.anchor.y = 0.5;

  // Add the bunny to the scene we are building
  app.stage.addChild(bunny);

  // Listen for frame updates
  app.ticker.add(() => {
       // each frame we spin the bunny around a bit
      bunny.rotation += 0.01;
  });
});