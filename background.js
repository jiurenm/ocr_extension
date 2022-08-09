async function getDefaultUrl() {
    var request = new Request('http://i.rcuts.com/update/404', {
        method: 'GET',
    })

    var res = await fetch(request)
    var v = await res.json()
    return v.api
}

async function postImgToOCR(url, base64str) {
    const form = new FormData();
    form.append('image', base64str);
    var request = new Request(url, {
        method: 'POST',
        body: form
    })

    const res = await fetch(request)
    const json = await res.json()
    const words = ([''].concat(json.words_result.map((word) => word.words))).join("\n")
    return words
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    sendResponse("ok")
    getDefaultUrl().then(url => {
        postImgToOCR(url, request.info).then(v => {
            sendMessage(v, request.info)
        })
    })
})

function sendMessage(message, pic, callback) {
    chrome.tabs.create({url: chrome.runtime.getURL('./index.html')})
    setTimeout(() => {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {"pic": pic, "msg": message}, function(response) {
                if (callback) callback(response)
            })
        })
    }, 1000)
    
}
