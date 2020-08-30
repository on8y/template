import React, { Component } from 'react';
import './index.css';
import IconSearch from './images/icon-search.png';
import IconHeart from './images/icon-heart.png';
import IconLoop from './images/icon-loop.png';
import IconShare from './images/icon-share.png';
import IconLeft from './images/icon-left.png';
import IconRight from './images/icon-right.png';

import { observer } from "mobx-react"

@observer
class HomePage extends Component {

  render() {
    return (
      <div className="app-home-page">
        <div className="home-page-top">
          <div className="top-left-btn">三</div>
          <div className="top-center-title">Music Player</div>
          <div className="top-right-btn"><img src={IconSearch} /></div>
        </div>
        <div className="home-page-middle">
          <div className="middle-front">
            {/* 歌词 */}
            <div className="lyric">Love Me Like You Do</div>
            {/* 圆盘 */}
            <div className="record">
              
            </div>
            {/* 分享按钮 */}
            <div className="btn-box">
              <img className="btn-icon" src={IconLoop} />
              <img className="btn-icon" src={IconHeart} />
              <img className="btn-icon" src={IconShare} />
            </div>
            {/* 切换按钮 */}
            <div className="btn-box2">
              <div className="btn-item">
                <div className="top-right-btn"><img src={IconLeft} /></div>
                <span className="btn-text">上一曲</span>
              </div>
              <div className="btn-item">
                <span className="btn-text">下一曲</span>
                <div className="top-right-btn"><img src={IconRight} /></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default HomePage;