import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
import styles from './index.module.css'
import cfg from './config';

class ToolPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      breadcrumbList: [cfg.menu[0].label, cfg.menu[0].list[0].label],
      comp: cfg.menu[0].list[0].comp,
    };

    this.onCollapse = this.onCollapse.bind(this)
  }

  onCollapse(collapsed) {
    this.setState({ collapsed });
  }

  //获取菜单项目
  getMenuItem(item, key, breadcrumbList) {
    return <Menu.Item key={key} onClick={() => {
      this.setState({ breadcrumbList, comp: item.comp })
    }}>{item.label}</Menu.Item>
  }

  render() {
    const { breadcrumbList, comp } = this.state;
    return (<Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
        <div className={styles.logo} />
        <Menu theme="dark" defaultSelectedKeys={['0-0']} mode="inline"> {/* defaultOpenKeys={["0"]} */}
          {cfg.menu.map((item, index) => {
            if (item.list) {
              return <SubMenu key={index} icon={item.icon} title={item.label}>
                {item.list.map((it, idx) => {
                  return this.getMenuItem(it, `${index}-${idx}`, [item.label, it.label])
                })}
              </SubMenu>
            } else {
              return this.getMenuItem(item, index, [item.label]);
            }
          })}
        </Menu>
      </Sider>
      <Layout className={styles.site_layout}>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            {breadcrumbList.map((item, index) => <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>)}
          </Breadcrumb>
          <div className={styles.site_layout_background} style={{ padding: 24, minHeight: '100%' }}>{comp}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>);
  }
}

export default ToolPage;