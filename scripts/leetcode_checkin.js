const checkinURL = {
  url: 'https://leetcode.com/graphql',
  headers: {
    'Referer': 'https://leetcode.com/hoyangtsai',
    'Cookie': $persistentStore.read('LeetcodeCookie'),
    'x-csrftoken': $persistentStore.read('LeetcodeCSRFToken'),
  }
};

const checkinParams = {
  operationName: 'checkin',
  query: 'mutation checkin { checkin { checkedIn ok error __typename } }',
};

function checkin() {
  const query = Object.keys(checkinParams).map(key => key + '=' + checkinParams[key]).join('&');
  $httpClient.get(checkinURL + '?' + query, function(err, resp, data) {
    if (err) {
      $notification.post('簽到失敗', '', '連線錯誤');
    } else {
      if (resp.statusCode == 200) {
        const obj = JSON.parse(data);
        const result = JSON.stringify(obj);
        $notification.post('簽到成功', result, '本日已簽到');
      } else {
        $notification.post('Cookie 已過期', '', '請重新登入');
      }
      $done();
    }
  });
}