
import '../styles/ScoreCard.css';
const ScoreCard = ({ score, bestScore }) => {
	return (
	<div className="score-card">
	<h2>Score: {score}</h2>
	<h2>Best Score: {bestScore}</h2>
	</div>
	);
}
export default ScoreCard;