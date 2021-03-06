import React from 'react'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import { Select, Input, Form, DatePicker, Button, Checkbox } from 'antd'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

const FormItem = Form.Item
const Option = Select.Option

class FilterForm extends React.Component {
  state = {}
  // 查询点击事件
  handleFilterSubmit = () => {
    const params = this.props.form.getFieldsValue()
    // 过滤输出时间格式化
    const { datePicker = this.props.formConfig.filter(item =>
      item.type === 'DATEPICKER' || item.type === 'SIMPLE-DATEPICKER'
    )[0]} = this.state
    if (datePicker && !this.state.datePicker) {
      this.setState({
        datePicker
      })
    }
    if (datePicker) {
      for (let key in params) {
        if (params.hasOwnProperty(key)) {
          if (datePicker.field.includes(key)) {
            params[key] = params[key] && params[key].format(datePicker.outPutFormat)
          }
        }
      }
    }
    this.props.filterSubmit(params)
  }
  handleFilterReset = () => {
    this.props.form.resetFields()
  }
  handleFilterExport = () => {
    this.props.handleFilterExport()
  }
  // 初始化baseForm
  initBaseForm = () => {
    const { getFieldDecorator } = this.props.form
    const { formConfig } = this.props
    const result = []
    if (formConfig && formConfig.length) {
      formConfig.forEach(item => {
        const { type, label, field, initialValue = '', placeholder = '', style, list, format } = item
        switch (type) {
          case 'INPUT':
            const input = 
              <FormItem label={label} key={field} style={style}>
                {
                  getFieldDecorator([field], {
                    initialValue
                  })(
                   <Input type="text" placeholder={placeholder}/>
                  )
                }
              </FormItem>
            result.push(input)
            break
          case 'SELECT':
            const select = 
              <FormItem label={label} key={field}>
                {
                  getFieldDecorator([field], {
                    initialValue
                  })(
                    <Select style={style} placeholder={placeholder}>
                      {this._getOptionList(list)}
                    </Select>
                  )
                }
              </FormItem>
            result.push(select)
            break
          case 'CHECKBOX':
            const checkbox = 
              <FormItem key={field}>
                {
                  getFieldDecorator([field], {
                    valuePropName: 'checked',
                    initialValue
                  })(
                    <Checkbox>
                      {label}
                    </Checkbox>
                  )
                }
              </FormItem>
            result.push(checkbox)
            break
          case 'DATEPICKER':
            const startTime = 
              <FormItem key={field[0]}>
                {
                  getFieldDecorator([field[0]])(
                    <DatePicker locale={locale} placeholder={placeholder[0]} format={format}></DatePicker>
                  )
                }
              </FormItem>
            const endTime = 
              <FormItem key={field[1]} label="~" colon={false}>
                {
                  getFieldDecorator([field[1]])(
                    <DatePicker locale={locale} placeholder={placeholder[1]} format={format} style={style}></DatePicker>
                  )
                }
              </FormItem>
            result.push(startTime)
            result.push(endTime)
            break
          case 'SIMPLE-DATEPICKER':
            const simpleTime = 
              <FormItem key={field} label={label}>
                {
                  getFieldDecorator([field])(
                    <DatePicker locale={locale} placeholder={placeholder} format={format}></DatePicker>
                  )
                }
              </FormItem>
            result.push(simpleTime)
            break
          default:
        }
      })
    }
    return result
  }
  needExport = () => {
    const { needExport } = this.props
    return needExport ? <Button type={needExport.type} onClick={this.handleFilterExport}>导出</Button> : ''
  }
  render() {
    return (
      <section>
        <Form layout="inline">
          { this.initBaseForm() }
          <FormItem>
            <Button type="primary" onClick={this.handleFilterSubmit}>查询</Button>
            <Button onClick={this.handleFilterReset}>重置</Button>
            {this.needExport()}
          </FormItem>
        </Form>
      </section>
    )
  }
  _getOptionList = (data) => {
    if (!data) {
      return []
    }
    return data.map(item => {
      return <Option value={item.value} key={item.value}>{item.name}</Option>
    })
  }
}

export default Form.create({ name: 'FilterForm' })(FilterForm)