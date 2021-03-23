function prolog_process(elementId, queryId) {
    session.consult(elementId)
    session.query(document.getElementById(queryId).value)
    session.answer({ success: prolog_result })
}

function prolog_result(res) {
    const answer = pl.format_answer(res)
    console.log('Res:',res)
    console.log('Ans:',answer)
    document.getElementById('prolog-result').innerHTML = answer
}

function prolog_output(text) {
    console.log('Text:',text)
    document.getElementById('prolog-output').innerHTML = text
}

function prolog_clear() {
    document.getElementById('prolog-result').innerHTML = ''
    document.getElementById('prolog-output').innerHTML = ''
}

document.querySelectorAll('.prolog-program').forEach((tag) => {
    fetch(tag.src).then(res => res.text()).then(data => tag.innerHTML = data)
})

const session = pl.create(1000)
session.current_output.stream.put = prolog_output