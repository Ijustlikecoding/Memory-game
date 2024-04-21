import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImages = [
  { "src": "/img/Blue-Cupcake-Clipart.png", matched:false },
  { "src": "/img/Chocolate-Chip-Ice-Cream-Clipart-.png", matched:false },
  { "src": "/img/Chocolate-Frosted-Donut-Clipart.png", matched:false },
  { "src": "/img/Mint-ice-cream-Clipart-.png", matched:false },
  { "src": "/img/Strawberry-Frosted-Donut-Clipart.png", matched:false },
  { "src": "/img/Strawberry-ice-cream-Clipart-.png", matched:false }
 ]

function App() {
const [cards,setCards] = useState([])
const [turns,setTurns] = useState(0)
const[choiceOne, setChoiceOne] = useState(null)
const[choiceTwo, setChoiceTwo] = useState(null)
const[disabled, setDisabled] = useState(false)

  //shuffling
  const shuffleCards = () => {
    const shuffledCards = [...cardImages,...cardImages]
    .sort(()=> Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }
  
  //handle choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }
  // compare 
  useEffect(()=>{
    
    if (choiceOne && choiceTwo){
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src){
        console.log('its a match')
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src){
              return {...card,matched:true}
            } else{
              return card
            }
          })
        })
        resetTurn()
      }
      else{
        console.log("no match")
        setTimeout(() => resetTurn(), 1000)
      }
    } 

   },[choiceOne,choiceTwo])

   console.log(cards)

  // reset choice & increment turns
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  //start a new game automatically
  useEffect(()=> {
    shuffleCards()
  },[])

  return (
   <div className='bg'>
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button> <p>Turns : {turns} </p>
    </div>
    <div className="card-grid">
      {cards.map(card =>(
        <SingleCard 
        key={card.id} 
        card={card}
        handleChoice={handleChoice}
        flipped={card === choiceOne || card === choiceTwo || card.matched }
        disabled={disabled}
        /> 
      ))}
    </div>
  </div>
  );
}

export default App