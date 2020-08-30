import React, { Fragment } from 'react';
import { Row, Col, Table, Button, Input, Select, Checkbox, Tooltip, message, Radio, Upload } from 'antd';
import { CloseOutlined, UploadOutlined } from '@ant-design/icons';
const { Option } = Select;
const { TextArea } = Input;
import cfg from './config';
import styles from './style.module.css';
const width120 = { width: "90px" };
const SIZE = 'small';
const COLSPAN = 2;
const axios = require('axios');

//表格拖拽排序
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { BaseTexture } from 'pixi.js';
const type = 'DragableBodyRow';
const DragableBodyRow = ({ index, moveRow, className, style, ...restProps }) => {
  const ref = React.useRef();
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: monitor => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: item => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    item: { type, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));
  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ''}`}
      style={{ cursor: 'move', ...style }}
      {...restProps}
    />
  );
};

//表格titles
const BODYTITLES = [
  { key: "checked", label: '全选' },
  { key: "key", label: '键' },
  { key: "value", label: '值' },
  { key: "description", label: '描述' },
  { key: "todo", label: '' }
];
const BODYVALUE = { id: 0, checked: false, key: '', value: '', description: '' };



class HttpX extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      url: '',
      type: cfg.types[0],
      method: cfg.method[0],
      paramsMethod: cfg.params[cfg.method[0]][0].value,
      body: [Object.assign({}, BODYVALUE)],
      bodyAllChecked: false,
      indeterminate: false,
      api: cfg.apiList[0].value,
      fileList: [],
      textArea: '',
      rawType: cfg.rawType[0].value,
      isCharset: true, //charset=utf-8
      isCredentials: false, //withCredentials
      isBtnLoading: false
    }

    //表格拖拽
    this.components = { body: { row: DragableBodyRow } }
    this.moveRow = this.moveRow.bind(this);

    //获取表格格式
    this.getColumns = this.getColumns.bind(this);
    this.isBodyAllChecked = this.isBodyAllChecked.bind(this);
    this.getParamsInput = this.getParamsInput.bind(this);
    this.useAxios = this.useAxios.bind(this);
    this.useXHR = this.useXHR.bind(this);
    this.useFetch = this.useFetch.bind(this);
  }

  moveRow(dragIndex, hoverIndex) {
    const { body } = this.state;
    const dragRow = body[dragIndex];
    this.setState(update(this.state, { body: { $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]] } }));
  }

  isBodyAllChecked() {
    const { body } = this.state;
    let count = 0; //统计
    let len = body.length - 1;
    for (let i = 0; i < body.length; i++) {
      if (body[i].checked && i < len) {
        count++;
      }
    }
    // console.log('count', count, len, count == len)
    if (count == 0) {
      return {
        bodyAllChecked: false,
        indeterminate: false,
      }
    } else if (count < len) {
      return {
        bodyAllChecked: false,
        indeterminate: true,
      }
    } else {
      return {
        bodyAllChecked: true,
        indeterminate: false,
      }
    }
  }

  getColumns() {
    let { body, bodyAllChecked, indeterminate } = this.state;
    return BODYTITLES.map((item, index) => {
      switch (item.key) {
        case 'checked':
          return {
            title: <Tooltip title={item.label}>
              <Checkbox
                size={SIZE}
                indeterminate={indeterminate}
                checked={bodyAllChecked}
                onChange={e => {
                  bodyAllChecked = e.target.checked;
                  for (let i = 0; i < body.length; i++) {
                    if (i < body.length - 1) {
                      body[i].checked = e.target.checked;
                    }
                  }
                  this.setState({ body, bodyAllChecked, indeterminate: false });
                }}
              />
            </Tooltip>,
            dataIndex: item.key,
            width: 10,
            render: (text, record, index) => <Checkbox
              size={SIZE}
              defaultChecked={text}
              checked={text}
              onChange={(e) => {
                body[index].checked = e.target.checked;
                let { bodyAllChecked, indeterminate } = this.isBodyAllChecked();
                this.setState({ body, bodyAllChecked, indeterminate })
              }}
            />
          };
        case 'key':
        case 'value':
        case 'description':
          return {
            title: item.label,
            dataIndex: item.key,
            render: (text, record, index) => <Input
              size={SIZE}
              allowClear
              placeholder={item.key}
              defaultValue={text}
              value={text}
              onChange={e => {
                if (e.target.value && !body[index].checked) {
                  body[index].checked = true;
                }
                let next = index + 1;
                if (e.target.value && next == body.length && !body[next]) {
                  body[next] = Object.assign({}, { ...BODYVALUE, id: body.length });
                }
                body[index][item.key] = e.target.value
                this.setState({ body });
              }}
            />
          };
        case 'todo':
          return {
            title: item.label,
            dataIndex: item.key,
            width: 10,
            render: (text, record, index) => {
              return (index < body.length - 1) ? <Button
                type="text"
                size={SIZE}
                icon={<CloseOutlined />}
                onClick={() => {
                  body.splice(index, 1);
                  this.setState({ body })
                }}
              /> : ''
            }
          };
        default:
          return { title: item.label, dataIndex: item.key }
      }
    })
  }

  getParamsInput(paramsMethod) {
    const { body, textArea, rawType, fileList } = this.state;
    const columns = this.getColumns();
    let form;
    switch (paramsMethod) {
      case 'None':
        form = null;
        break;
      case 'Raw':
        form = <Fragment>
          <Col span={COLSPAN}><span>格式：</span></Col>
          <Radio.Group options={cfg.rawType} defaultValue={rawType} onChange={e => this.setState({ rawType: e.target.value })} />
          <TextArea value={textArea} onChange={e => this.setState({ textArea: e.target.value })} />
        </Fragment>
        break;
      case 'binary':
        form = <Upload name='file'
          fileList={fileList}
          // listType='picture'
          onRemove={() => this.setState({ fileList: [] })}
          beforeUpload={file => {
            this.setState({ fileList: [file] });
            return false;
          }}
        ><Button><UploadOutlined />点击上传文件</Button></Upload>
        break;
      default:
        form = <DndProvider backend={HTML5Backend}>
          <Table
            size={SIZE}
            rowKey='id'
            columns={columns}
            dataSource={[...body]}
            components={this.components}
            onRow={(record, index) => ({ index, moveRow: this.moveRow })}
            pagination={false}
            style={{ width: "100%" }}
          />
        </DndProvider>
    }
    return <Row className={styles.row}>{form}</Row>
  }

  //获取URL
  getURL() {
    const { type, url } = this.state;
    return `${type}://${url}`
  }

  //获取get请求参数
  getParams() {
    const { paramsMethod, body } = this.state;
    let str = '';
    if (paramsMethod === "k=v") {
      for (let k in body) {
        if (body[k].checked) {
          str += `&${body[k].key}=${body[k].value}`
        }
      }
      return str && `?${str.substring(1, str.length)}`;
    } else {
      for (let k in body) {
        if (body[k].checked) {
          str += `/${body[k].key}/${body[k].value}`
        }
      }
      return str;
    }
  }

  //获取post请求参数
  getBody() {
    const { paramsMethod, body, textArea } = this.state;
    switch (paramsMethod) {
      case 'None':
        return null;
      case 'Raw':
        return textArea;
      case 'FormData':
        let fd = new FormData();
        for (let k in body) {
          if (body[k].checked) {
            fd.append(body[k].key, body[k].value);
          }
        }
        return fd;
      case 'x-www-form-urlencoded':
        let sp = new URLSearchParams();
        for (let k in body) {
          if (body[k].checked) {
            sp.append(body[k].key, body[k].value);
          }
        }
        return sp;
      case 'binary':
        return;
    }
  }

  //获取请求头
  getHeaders() {
    const { rawType, isCharset } = this.state;
    switch (rawType) {
      case 'Json':
      case 'Text':
      case 'XML':
      case 'HTML':
        return { "content-type": `${cfg.params.POST[1].headers[rawType]}${isCharset ? '; charset=UTF-8' : ''}` };
      default:
        return undefined;
    }
  }

  // 封装获取 cookie 的方法
  getCookie(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
      return unescape(arr[2]);
    else
      return null;
  }

  //使用Axios
  useAxios() {
    console.log('state', this.state);
    const { method, paramsMethod, isCredentials } = this.state;
    let rUrl = this.getURL();
    let config = {};
    if (isCredentials) {
      config.withCredentials = isCredentials;
      config.headers = {
        'x-csrf-token': this.getCookie("csrfToken"), // 前后端不分离的情况加每次打开客户端，egg会直接在客户端的 Cookie 中写入密钥 ，密钥的 Key 就是 'scrfToken' 这个字段，所以直接获取就好了
      };
    }
    if (method === 'GET') {
      rUrl += this.getParams();
      return axios.get(rUrl, config);
    } else {  //POST
      let body = this.getBody();
      if (paramsMethod === 'Raw') {
        config.headers = this.getHeaders();
      }

      return axios.post(rUrl, body, config);
    }
  }

  useXHR() { }

  useFetch() { }

  //发送请求
  sendRequest() {
    const { api } = this.state;
    switch (api) {
      case 'Fetch':
        return this.useFetch();
      case 'XMLHttpRequest':
        return this.useXHR();
      case 'axios':
        return this.useAxios();
    }
  }

  render() {
    const { url, type, method, paramsMethod, api, isCharset, isCredentials, isBtnLoading } = this.state;
    return (
      <div>
        <div className={styles.title}>请求选项</div>
        <Row className={styles.row}>
          <Col span={COLSPAN}><span>链接：</span></Col>
          <Col span={24 - COLSPAN} className={styles.col}>
            <Input.Group className={styles.col}>
              <Select
                size={SIZE}
                style={width120}
                defaultValue={method}
                onChange={v => this.setState({ method: v, paramsMethod: cfg.params[v][0].value })}
              >{cfg.method.map(item => <Option key={item}>{item}</Option>)}</Select>
              <Select
                size={SIZE}
                style={width120}
                defaultValue={type}
                onChange={v => this.setState({ type: v })}
              >{cfg.types.map(item => <Option key={item}>{item}://</Option>)}</Select>
              <Input
                size={SIZE}
                value={url}
                onChange={e => this.setState({ url: e.target.value })}
              />
            </Input.Group>
          </Col>
        </Row>
        <Row className={`${styles.row}`}>
          <Col span={COLSPAN}><span>方法：</span></Col>
          <Col span={24 - COLSPAN} className={styles.col}>
            <Radio.Group options={cfg.apiList} value={api} onChange={e => this.setState({ api: e.target.value })} />
            <Checkbox
              defaultChecked={isCredentials}
              onChange={e => this.setState({ isCredentials: e.target.checked })}
            >withCredentials</Checkbox>
          </Col>
        </Row>
        <Row className={styles.row}>
          <Col span={COLSPAN}><span>参数：</span></Col>
          <Col span={24 - COLSPAN} className={styles.col}>
            <Radio.Group
              options={cfg.params[method]}
              value={paramsMethod}
              onChange={e => {
                console.log('v', e.target.value)
                this.setState({ paramsMethod: e.target.value })
              }}
            />
          </Col>
        </Row>
        {this.getParamsInput(paramsMethod)}
        {method === "POST" && paramsMethod === 'Raw' ? <Row className={`${styles.row}`}>
          <Col span={COLSPAN}><span>字符：</span></Col>
          <Checkbox
            defaultChecked={isCharset}
            onChange={e => this.setState({ isCharset: e.target.checked })}
          >charset={cfg.charset[0]}</Checkbox>
        </Row> : ''}
        <Row className={`${styles.row} ${styles.send_btn_box}`}>
          <Button
            size={SIZE}
            type="primary"
            // loading={isBtnLoading}
            onClick={() => {
              if (!url) {
                return message.error("未输入链接");
              }
              this.setState({ isBtnLoading: true })
              this.sendRequest()
                .then(res => { console.log('请求成功', res) })
                .catch(err => { message.error(err.message) })
                .finally(() => this.setState({ isBtnLoading: false }))
            }}
          >请求</Button>
        </Row>
        <div className={styles.title}>请求结果</div>

        <Row className={styles.row}>

        </Row>
      </div>
    );
  }
}

export default HttpX;