// Update the relevant fields with the new data.

const setDOMInfo = info => {
    document.querySelector('h1 span').textContent = info.your_array.length;
    document.querySelector('h1').textContent = "Questions: " + info.your_array.length;

    const headingArea = document.querySelector('h1');
    const answerDiv = document.createElement('div');
    const baseUL = document.createElement('ul')
    baseUL.className = 'list-group list-group-flush'
    baseUL.classList.add('m-3')
    answerDiv.appendChild(baseUL)
    let iterCount = 1;
    // iterate through array
    info.your_array.forEach(function (innerArr) {
        const questionHead = document.createElement('h4');
        questionHead.textContent = 'Question ' + iterCount;
        baseUL.appendChild(questionHead)
        const holder = document.createElement('div')
        innerArr.forEach(function (item) {
            const li = document.createElement('li')
            questionHead.className = 'list-group-item bg-opacity-25 bg-success mt-1 mb-1'
            li.className = 'p-2 list-unstyled'
            li.textContent = item;
            holder.style.borderRadius = '4px';
            holder.style.borderCollapse = 'collapse';
            holder.style.width = 'fit-content';
            holder.className ='bg-opacity-25 bg-info'

            holder.appendChild(li)
        })
        baseUL.appendChild(holder);
        iterCount++;
    })
    headingArea.insertAdjacentElement("afterend", answerDiv)
  };
  
  // Once the DOM is ready...
  window.addEventListener('DOMContentLoaded', () => {
    // ...query for the active tab...
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, tabs => {
      // ...and send a request for the DOM info...
      chrome.tabs.sendMessage(
          tabs[0].id,
          {from: 'popup', subject: 'DOMInfo'},
          // ...also specifying a callback to be called 
          //    from the receiving end (content script).
          setDOMInfo);
    });
  });