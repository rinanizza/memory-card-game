import React  from 'react';
import Card from './Card';
import '../styles/CardDeck.css';

const CardDeck = ({ cards, handleCardClick }) => {
	return(
	<div className="card-deck">
	{cards.map((card) => (
	<Card 
	key={card.id} 
	id={card.id}
    image={card.image}	
	isFlipped={card.isFlipped} 
	handleClick={handleCardClick}/>
	))}
	</div>
	);
	
};
export default CardDeck;