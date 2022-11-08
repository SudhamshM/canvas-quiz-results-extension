'use strict';
let answer_array = []
let badgeCount = ''
function myMain() {
    const question_area = document.querySelectorAll('.display_question.question');
    let count = 1
    question_area.forEach(function (question) {
        if (question.classList.contains('text_only_question')) {
            //skip
            return;
        }
        console.log('<-----------Question ' + count + "-------------->");
        if (question.classList.contains('file_upload_question')) {
            let filename = question.querySelector('.icon-download').textContent.trim();
            let displayContent = "FILE UPLOAD: " + filename;
            answer_array.push([displayContent])
            console.log(displayContent)
        }


        else if (question.classList.contains('multiple_dropdowns_question')) {
            multDropdown(question);
        }
        else if (question.classList.contains('matching_question')) {
            let innerArray = []
            const inputs = question.querySelectorAll('select.question_input');
            inputs.forEach(input => input.replaceWith(input.firstElementChild.textContent))
            inputs.forEach(function (input) {
                let answer = input.firstElementChild.textContent.trim()
                innerArray.push(answer)
                console.log(answer)
                input.replaceWith(answer);
            })
            answer_array.push(innerArray)
        }
        else if (question.classList.contains('multiple_answers_question')) {
            const selections = question.querySelectorAll('.selected_answer .answer_text')
            let innerArray = []
            selections.forEach(selection => innerArray.push('☑️' + selection.textContent.trim()));
            selections.forEach(selection => console.log('☑️' + selection.textContent.trim()));
            answer_array.push(innerArray)
        }
        else if (question.classList.contains('multiple_choice_question')) {
            multChoice(question)
        }
        else if (question.classList.contains('fill_in_multiple_blanks_question')) {
            let innerArray = []
            question.querySelectorAll('.question_input').forEach(blank => innerArray.push(blank.value.trim()))
            question.querySelectorAll('.question_input').forEach(blank => console.log(blank.value.trim()))
            answer_array.push(innerArray)
        }
        else if (question.classList.contains('true_false_question')) {
            answer_array.push([question.querySelector('.selected_answer .answer_text').textContent.trim()]);
            console.log(question.querySelector('.selected_answer .answer_text').textContent.trim());
        }
        else if (question.classList.contains('short_answer_question')) {
            let innerArray = []
            question.querySelectorAll('.question_input').forEach(short => innerArray.push(short.value.trim()))
            question.querySelectorAll('.question_input').forEach(short => console.log(short.value.trim()))
            answer_array.push(innerArray)
        }
        else if (question.classList.contains('numerical_question')) {
            answer_array.push([question.querySelector('.question_input')?.value.trim()])
            console.log(question.querySelector('.question_input')?.value.trim())
        }
        else if (question.classList.contains('essay_question')) {
            let found = (question.querySelector('.answers .user_content.quiz_response_text.enhanced').textContent.trim());
            console.log(found)
            answer_array.push([found])
        }
        count++;
    })
    badgeCount += answer_array.length;


    function multChoice(regionToSearch) {
        const options = regionToSearch.querySelectorAll('.question_input')
        options.forEach(function (option) {
            if (option.checked) {
                answer_array.push(['🔘' + option.nextElementSibling.textContent.trim()]);
                console.log('🔘' + option.nextElementSibling.textContent.trim());
            }
        })
    }

    function multDropdown(regionToSearch) {
        const answers = regionToSearch.querySelectorAll('.selected_answer .answer_text')
        let innerArray = []
        answers.forEach(answer => innerArray.push(answer.textContent.trim()))
        answers.forEach(answer => console.log(answer.textContent.trim()))
        answer_array.push(innerArray)
    }
    console.log(answer_array);
    // iterate over array of arrays to print answers
    // const headingArea = document.getElementById('quiz_student_details')
    // const answerDiv = document.createElement('div')
    // answerDiv.textContent = "TESTTTTT"
    // answerDiv.style.borderStyle = 'solid'
    // const baseUL = document.createElement('ul')
    // answerDiv.appendChild(baseUL)
    // let iterCount = 1;
    // answer_array.forEach(function (innerArr) {
    //     const questionHead = document.createElement('h2');
    //     questionHead.textContent = 'Question ' + iterCount;
    //     baseUL.appendChild(questionHead)
    //     innerArr.forEach(function (item) {
    //         const li = document.createElement('li')
    //         li.textContent = item;
    //         baseUL.appendChild(li);
    //     })
    //     iterCount++;
    // })
    // headingArea.insertAdjacentElement("afterend", answerDiv)

}

function whole()
{
    myMain();
    chrome.runtime.sendMessage(
        {
            from: 'content',
            subject: 'changeBadge',
            badgeText: ('%s', badgeCount)
        }
    )
}


window.addEventListener('load', whole)


chrome.runtime.onMessage.addListener((msg, sender, response) => {
    // First, validate the message's structure.
    if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
        // Collect the necessary data. 
        var domInfo = {
            // total: document.querySelectorAll('*').length,
            // inputs: document.querySelectorAll('input').length,
            // buttons: document.querySelectorAll('button').length,
            your_array: answer_array,
        };

        // Directly respond to the sender (popup), 
        // through the specified callback.
        response(domInfo);
    }
});
