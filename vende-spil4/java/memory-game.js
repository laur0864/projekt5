var Score = 0;
const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard(){
    if(lockBoard) return;
    if(this === firstCard) return;
    this.classList.add('flip');
    
    if(!hasFlippedCard) {
        //first click
        hasFlippedCard = true;
        firstCard = this;
        
        return;
    }
        //secon click
        secondCard = this;
        
        checkForMatch();
}

function checkForMatch() {
    //do cards match?
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework; 
        
    isMatch ? disableCards() : unflipCards();
}

function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    
    Score++;
    checkForWin();
    resetBoard();
}

function unflipCards(){
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        
        resetBoard();
        }, 1500);
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function checkForWin(){
    if(Score === 4){
        setTimeout(() => {
            window.location.replace("https://www.youtube.com/?gl=DK&hl=da");
            
            }, 1000);
        }
    }

(function shuffle(){
    cards.forEach(card =>{
            let randomPos = Math.floor(Math.random() * 12);
            card.style.order = randomPos;
        });
    })();
    
cards.forEach(card => card.addEventListener('click', flipCard));