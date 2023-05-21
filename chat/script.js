console.log('funguju!');

const sendFormElm = document.querySelector('form')
const messageElm = document.querySelector('#message')
const nameElm = document.querySelector('#name')

const sendMessage = (event) => {
    event.preventDefault()
    fetch('https://czechichat.deno.dev/api/send-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // 'Content-Type' je v uvozovkách proto, že je v názvu pomlčka
        },
        body: JSON.stringify({
            message: messageElm.value,
            name: nameElm.value
        })
    })
    .then(response => {
        if (response.status === 200) {
            messageElm.value = ''
            nameElm.value = ''
        } else {
            alert(`Odeslání zprávy se nezdařilo.\n${response.statusText}`)
        }
    })
}

const MessageItem = (props) => {
    const {name, message, date} = props

    const element = document.createElement('li')
    element.innerHTML = `${name}: ${message} ${date}`
    return element
}

const showMessages = (messages) => {
    const ulELm = document.querySelector('ul')
    ulELm.append(...messages
        .map(message => MessageItem({
            name: message.name,
            message: message.message,
            date: message.date
        }))
    )
}

fetch('https://czechichat.deno.dev/api/list-messages', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
    })
    .then(response => response.json())
    .then(data => showMessages(data.messages))

sendFormElm.addEventListener('submit', sendMessage)
