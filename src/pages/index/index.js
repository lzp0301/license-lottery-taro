import {
  View,
  Input,
  Icon,
  Picker,
} from '@tarojs/components'
import React, { useState } from 'react'
import Taro, { useDidShow, useShareAppMessage } from '@tarojs/taro'
import './index.scss'
//index.js

function Index() {

  const [inputVal, setInputVal] = useState('')
  const [status, setStatus] = useState('')
  const [selectorChecked, setSelectorChecked] = useState('广州')
  const [results, setResults] = useState([])
  const map = { '': '待查询', "0": "未中签", "1": '恭喜你！' }
  const selector = ['北京', '上海', '广州', '深圳', '石家庄', '天津', '杭州', '贵阳', '海南']


  /**
 * picker 数据改变
 */
  function onChange(params) {
    const value = params?.detail?.value
    setSelectorChecked(selector[value])
    setResults([])
    setStatus('')
  }
  /**
   * 输入确认
   */
  function onConfirm(params) {
    if (!inputVal) {
      return
    }

    Taro.setStorageSync('inputVal', inputVal)

    requestData()
  }

  function requestData() {
    Taro.showLoading()
    const data = {
      name: inputVal,
      city: selectorChecked
    }
    Taro.request({
      url: 'https://sp0.baidu.com/9_Q4sjW91Qh3otqbppnN2DJv/pae/common/api/yaohao',
      data: data,
      method: 'GET',
      dataType: 'json',
      success: res => {
        console.log(res)
        const data = res.data.data[0]
        if (+data.dispNum >= 1) {
          const results = data.disp_data.map(item => {
            item.eid = item.eid.slice(0, 4) + '年' + item.eid.slice(4) + '月'
            return item
          })
          setResults(results)
          setStatus('1')
        } else {
          setStatus('0')
        }
        Taro.hideLoading()
      },
      fail: function (res) {
        Taro.hideLoading()
      },
    })
  }

  useDidShow(() => {

  })

  useShareAppMessage(() => {
    return {
      title: '来查查你的摇号申请中签了没',
      path: 'pages/index/index'
    }
  })


  return (
    <View className="index page">
      <View className="header">
        <View>
          <View className="title">摇号结果查询</View>
          <View className="sub-title">马上掌握指标状态</View>
        </View>

        <Picker mode="selector" range={selector} onChange={onChange} className="selector">
          <View className="picker">{selectorChecked} ▼</View>
        </Picker>
      </View>

      <View className="input-box">
        <Input
          type="text"
          placeholder="请输入个人申请编号/姓名"
          value={inputVal}
          className="input"
          confirmType="search"
          onConfirm={onConfirm}
          onInput={e => setInputVal(e.target.value)}
        />
        <View onClick={onConfirm} className="icon-box">
          <Icon type="search" className="icon"></Icon>
        </View>
      </View >

      <View className="section">
        <View className="section-hd">摇号结果</View>
        <View className="section-content">
          <View className="result">
            <View className="result-title">
              {
                map[status]
              }
            </View>
            <View className="result-sub-title">
              {status === '1' ? '查到以下结果' : '很遗憾！请期待下次摇号'}</View>
          </View>

          <View className="list">
            {results.map(item => {
              return <View className="list-item" >
                <View className="left">
                  <View className="name">{item.name}</View>
                  <View className={`id ${item.type === '1' ? 'ecard' : ''}`}>编号：{item.tid}</View>
                </View>
                <View className="date">{item.eid}</View>
              </View>
            })}
          </View>
          <View className="tips">个人申请编号有效期3个月，请在期满前至官方网站或相关窗口申请延期，否则编码无效</View>
        </View>
      </View >
    </View >
  )
}

export default Index
