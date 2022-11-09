// Update the relevant fields with the new data.

const setDOMInfo = info => {
    document.querySelector('h1').style.fontSize = '1.1em';
    document.querySelector('h2').textContent = "Questions: " + info.your_array.length;
    document.querySelector('h2').style.fontSize = '0.9em';
    document.querySelector('.kept-score').textContent = "Kept Score: " + info.kept;
    document.querySelector('.current-score').textContent = "Current Score: " + info.current;
    document.querySelector('.current-score').style.width = '120px';
    document.querySelector('.kept-score').style.width = '110px';
    const clipboardButton = document.createElement('button')
    clipboardButton.textContent = 'Copy'
    clipboardButton.className = 'btn btn-sm btn-primary ms-1'
    clipboardButton.style.fontSize = '13px'
    // copy answer array to clipboard
    clipboardButton.onclick=function()
    {
      let textToCopy = info.your_array;
      navigator.clipboard.writeText(textToCopy);
      clipboardButton.textContent = 'Copied!';
      let intrvl = setInterval(function()
      {
        clipboardButton.textContent = 'Copy'
        clearInterval(intrvl)
      }, 1000)
    }
    
    const headingArea = document.querySelector('h2');
    headingArea.appendChild(clipboardButton);
    const answerDiv = document.createElement('div');
    const baseUL = document.createElement('ul')
    baseUL.className = 'list-group list-group-flush'
    baseUL.classList.add('m-3')
    answerDiv.appendChild(baseUL)
    let iterCount = 1;
    // iterate through array
    document.querySelector('.quiz-title').textContent = info.title;
    info.your_array.forEach(function (innerArr) {
        const questionHead = document.createElement('h4');
        questionHead.textContent = 'Question ' + iterCount;
        questionHead.style.fontSize = '18px';
        let score_points = info.scores;
        let scoreDisp = document.createElement('div')
        scoreDisp.textContent = score_points[iterCount-1];
        scoreDisp.style.fontSize = '13px';
        scoreDisp.style.float = 'right';
        scoreDisp.className = 'text-bg-success rounded p-1 bg-opacity-100';
        let scoreWorth = (scoreDisp.textContent.substring(scoreDisp.textContent.indexOf('/')+2, scoreDisp.textContent.indexOf('pts')-1));
        let studentScore = scoreDisp.textContent.substring(0, scoreDisp.textContent.indexOf('/')-1)
        if (studentScore != scoreWorth)
        {
          scoreDisp.className = 'text-bg-warning rounded p-1 bg-opacity-75'
        }
        scoreDisp.style.cursor = 'default';
        questionHead.appendChild(scoreDisp);
        baseUL.appendChild(questionHead)
        const holder = document.createElement('div')
        innerArr.forEach(function (item) {
            const li = document.createElement('li')
            questionHead.className = 'list-group-item bg-opacity-25 bg-success mt-1 mb-1'
            li.className = 'p-2 m-1 list-unstyled'
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