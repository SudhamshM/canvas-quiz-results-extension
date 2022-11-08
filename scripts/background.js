chrome.runtime.onMessage.addListener((msg, sender) =>
{
    if ((msg.from === 'content') && (msg.subject === 'changeBadge'))
    {
        chrome.action.setBadgeText({
            text: msg.badgeText,
            tabId: sender.tab.id,
        })
    }
});