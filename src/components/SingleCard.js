import './SingleCard.css'

export default function SingleCard ({card, handleChoice, flipped, disabled}){

    const handleClick = () => {
        if (!disabled) {
        handleChoice(card)
     } 
    }
    return (
        <div className="card" >
          <div className={flipped ? "flipped" : ""}>
            <img className="opened" src={card.src} alt="card opened" />
            <img className="closed" src={"/img/cover.png.jpg"} 
            onClick={ handleClick} 
            alt="card closed" />
          </div>
        </div>
    )
}