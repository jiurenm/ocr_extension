document.addEventListener('keydown', function(e) {
    if(e.ctrlKey&&e.keyCode===73) {
        getPic()
    }
})

async function getPic() {
    try {
        const clipboardItems = await navigator.clipboard.read()
        for (const clipboardItem of clipboardItems) {
            for (const type of clipboardItem.types) {
                const blob = await clipboardItem.getType(type)
                if(blob.type == "image/png") {
                    blob2Base64(blob, function(data) {
                        chrome.runtime.sendMessage({
                            info: data
                        }, res => {
                            
                        })
                    })
                }
            }
        }
    } catch (err) {
        console.log(err)
    }
}

function blob2Base64(blob, callback) {
    var reader = new FileReader()
    reader.onload = function(e) {
        callback(e.target.result)
    }
    reader.readAsDataURL(blob)
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    alert(request)
    sendResponse("ok！！！")
})
