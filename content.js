// popup.js
document.getElementById('cleanEmails').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {action: "cleanEmails"});
  });
});

// content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "cleanEmails") {
    cleanInbox();
  }
});

function cleanInbox() {
  const junkKeywords = ['unsubscribe', 'newsletter', 'promotional', 'sale', 'discount'];
  
  // Select all email items
  const emailItems = document.querySelectorAll('.zA');
  
  emailItems.forEach((item) => {
    const subject = item.querySelector('.y6').innerText.toLowerCase();
    const sender = item.querySelector('.yP, .zF').getAttribute('email').toLowerCase();
    
    if (isJunkEmail(subject, sender, junkKeywords)) {
      // Click the checkbox to select the email
      item.querySelector('div[role="checkbox"]').click();
    }
  });
  
  // Click the delete button
  document.querySelector('div[act="10"]').click();
}

function isJunkEmail(subject, sender, keywords) {
  return keywords.some(keyword => subject.includes(keyword) || sender.includes(keyword));
}
