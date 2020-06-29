chrome.browserAction.onClicked.addListener(function(activeTab) {
  console.log(activeTab);
  chrome.tabs.executeScript(null, {file: "content_script.js"});
});
