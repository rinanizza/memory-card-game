
import '../styles/Card.css'

const Card = ({ id, image, isFlipped, handleClick }) => {
	return(
	<div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={() => handleClick(id)}>
	<div className="card-image">
	<img src={image} alt="card front" className="front" />
	<img src="/card-back.png" alt="card back" className="back"/>
	</div>
	</div>
	);
};
export default Card;