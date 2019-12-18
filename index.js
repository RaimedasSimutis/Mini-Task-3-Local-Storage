const inputForm = document.querySelector('form');
const clearCardsBtn = document.querySelector('#clear-cards');
const outputContainer = document.querySelector('#output');

const saveCardsToLocalStorage = (arr) => {
    const cardsArrString = JSON.stringify(arr);
    localStorage.setItem('cards', cardsArrString);
}

const getCardsFromLocalStorage = () => {
    const cardsFromStorage = localStorage.getItem('cards');
    return (cardsFromStorage===null) ? [] : JSON.parse(cardsFromStorage);
}

const addCard = (card) => {
    cardsArr.push(card);
    saveCardsToLocalStorage(cardsArr);
    generateCards(cardsArr);
}

const generateCards = (arr) => {
    outputContainer.innerHTML = '';

    arr.forEach((element, index) => {
        // creating HTML elements
        const cardContainer = document.createElement('div');
        const cardName = document.createElement('h4');
        const cardEmail = document.createElement('p');
        const cardAddress = document.createElement('p');
        const cardPhoneNum = document.createElement('p');
        const cardDescription = document.createElement('p');
        const cardDeleteBtn = document.createElement('button');

        //add class name
        cardContainer.classList.add('card-container');

        // add content to HTML elements
        cardName.textContent = element.name;
        cardEmail.textContent = element.email; 
        cardAddress.textContent = element.address; 
        cardPhoneNum.textContent = element.phoneNum; 
        cardDescription.textContent = element.description; 
        cardDeleteBtn.textContent = 'Delete';

        // append HTML elements
        cardContainer.appendChild(cardName);
        cardContainer.appendChild(cardEmail);
        cardContainer.appendChild(cardAddress);
        cardContainer.appendChild(cardPhoneNum);
        cardContainer.appendChild(cardDescription);
        cardContainer.appendChild(cardDeleteBtn);
        outputContainer.appendChild(cardContainer);

        cardDeleteBtn.addEventListener('click', (event) => {

            cardContainer.remove();
            cardsArr = cardsArr.filter((el) => {
                return el.id !== element.id;
                
            }) 
            
            saveCardsToLocalStorage(cardsArr);
        })
    })
}

inputForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const date = new Date();
    const card = {
        id: date.getTime(),
        name: inputForm[0].value,
        email: inputForm[1].value,
        address: inputForm[2].value,
        phoneNum: inputForm[3].value,
        description: inputForm[4].value
    }

    addCard(card);
});

clearCardsBtn.addEventListener('click', (event) => {
    window.localStorage.clear();
    cardsArr= getCardsFromLocalStorage();
    generateCards(cardsArr);
});

let cardsArr = getCardsFromLocalStorage();
generateCards(cardsArr);