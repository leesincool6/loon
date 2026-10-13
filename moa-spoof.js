// MOA 版本伪装：把请求头 moa3versioncode / User-Agent 里的版本号改掉
// 用途：测试服务端是否依据请求头判定「强制升级」
const FAKE = "3.3.68";

try {
  const headers = ($request && $request.headers) ? $request.headers : {};
  for (const key of Object.keys(headers)) {
    const lower = key.toLowerCase();
    if (lower === "moa3versioncode") {
      headers[key] = FAKE;
    } else if (lower === "user-agent") {
      headers[key] = String(headers[key]).replace(/MOA\/[\d.]+/, "MOA/" + FAKE);
    }
  }
  $done({ headers: headers });
} catch (e) {
  // 出错就原样放行，绝不卡住请求
  $done({});
}
