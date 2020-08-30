import React from 'react';

const cfg = {};

//请求方法
cfg.method = [
  "GET",
  "POST"
];

//请求类型
cfg.types = [
  "http",
  "https"
];

cfg.params = {
  "GET": [{ value: 'k=v', label: "k=v 方式" }, { value: 'path', label: "path 方式" }],
  "POST": [
    { value: "None", label: "None", headers: "" },
    { value: "Raw", label: "Raw", headers: { "Json": 'application/json', "Text": 'text/plain', "XML": 'text/xml', "HTML": 'text/html' } },
    { value: "FormData", label: "FormData", headers: "multipart/form-data" },
    { value: "x-www-form-urlencoded", label: "x-www-form-urlencoded", headers: "application/x-www-form-urlencoded" },
    { value: "binary", label: "binary", headers: "application/octet-stream" },
  ],
}

// "ArrayBuffer","ArrayBufferView","Blob/File", "string", "URLSearchParams", "FormData"
// arrayBuffer()                   blob()       json() text()                formData()
// GraphQL 以后支持

//请求头
cfg.contentType = [
  'application/x-www-form-urlencoded',  //'表单数据格式'
  'application/octet-stream',           //'二进制流数据'
  'application/json',                   //'JSON数据格式'
  'application/xml',                    //'XML数据格式'
  'multipart/form-data',                //'表单中上传文件格式'
  'text/html',                          //'HTML格式'
  'text/plain',                         //'纯文本格式'
  'text/xml',                           //'XML格式'
  'image/gif',                          //'gif图片格式'
  'image/jpeg',                         //'jpg图片格式'
  'image/png',                          //'png图片格式'
  'application/xhtml+xml',              //'XHTML格式'
  'application/atom+xml',               //'Atom XML聚合格式'
  'application/pdf',                    //'pdf格式'
  'application/msword',                 //'Word文档格式'
];

//contentType 使用的字符集
cfg.charset = [
  'UTF-8',
]

cfg.apiList = [
  // { label:"Fetch", value: "Fetch"},
  // { label:"XMLHttpRequest", value: "XMLHttpRequest"},
  { label:"axios", value: "axios"},
];

cfg.rawType = [
  { label:"Json", value: "Json"},
  { label:"Text", value: "Text"},
  { label:"XML", value: "XML"},
  { label:"HTML", value: "HTML"},
]

export default cfg;