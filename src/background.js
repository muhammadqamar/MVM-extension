chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension Installed');
});

chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTab = tabs[0];
    chrome.tabs.create({ url: activeTab.url }, function (newTab) {
      chrome.tabs.executeScript(newTab.id, {
        code: `
          var iframe = document.createElement('iframe');
          iframe.src = '${activeTab.url}';
          iframe.style.width = '100%';
          iframe.style.height = '100vh';
          document.body.innerHTML = '';
          document.body.appendChild(iframe);
        `,
      });
    });
  });
});
