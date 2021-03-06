// 格式化当前时间 eg: 2019-04-01 23:09:29
const optimizeCurrentTime = () => {
  let current = new Date()
  let date = [current.getMonth() + 1, current.getDate()].map(item => {
    return item.toString().padStart(2, '0')
  }).join('-')
  let time = [current.getHours(), current.getMinutes(), current.getSeconds()].map(item => {
    return item.toString().padStart(2, '0')
  }).join(':')
  return `${current.getFullYear()}-${date} ${time}`
}

// page分页
const pagination = (data, options) => {
  const {
    onChange, 
    showQuickJumper,
    pageSizeOptions,
    hideOnSinglePage,
    onShowSizeChange
  } = options
  
  return {
    current: data.pageNo,
    pageSize: data.pageSize,
    total: data.totalCount,
    pageSizeOptions,
    showSizeChanger: pageSizeOptions ? true : false,
    onChange: onChange ? (current) => {
      onChange(current)
    } : null,
    showTotal: () => {
      return `共${data.totalCount}条, ${Math.ceil(data.totalCount / data.pageSize)}页`
    },
    onShowSizeChange: onShowSizeChange ? (current, size) => {
      onShowSizeChange(current, size)
    } : null,
    showQuickJumper: showQuickJumper ? true : false,
    hideOnSinglePage: hideOnSinglePage ? true : false
  }
}

export {
  optimizeCurrentTime,
  pagination
}