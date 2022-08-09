function query(name){
    const search=location.search
    const p = new URLSearchParams(search)
    return p.get(name)
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    const d = document.getElementById('res')
    d.insertAdjacentHTML('afterend', `<div><img src="${request.pic}" /><div>${request.msg}</div></div>`)
    sendResponse("ok")
})