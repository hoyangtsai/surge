if ($request.headers['Cookie']) {
  const cookie = $request.headers['Cookie'];
  const csrftoken = $request.headers['x-csrftoken'];
  if (!cookie) {
    $notification.post("Leetcode cookie save error", "", "Please sign-in again.")
  } else {
    $persistentStore.write($request.headers['Cookie'], "LeetcodeCookie");
    $persistentStore.write($request.headers['x-csrftoken'], "LeetcodeCSRFToken");
    $notification.post("Leetcode cookie saved 🎉", "", "")
  }
} else {
  $notification.post("Leetcode header cookie not found", "", "Please sign-in again.")
}
$done({})
