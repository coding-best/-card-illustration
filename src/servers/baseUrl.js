const getBaseUrl = (url) => {
  let BASE_URL = ""
  if (process.env.NODE_ENV === "development") {
    //开发环境
    BASE_URL = "http://49.234.106.77:8080"
  } else {
    // 生产环境
    BASE_URL = ""
  }
  return BASE_URL
}

export default getBaseUrl
