
import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import CardDeck from './components/CardDeck';
import ScoreCard from './components/ScoreCard';
import './App.css';

const App = () => {
    const [cards, setCards] = useState([]);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);

    useEffect(() => {
        fetchPokemonData();
    }, []);

    const fetchPokemonData = async () => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=6');
            const data = await response.json();
            const results = data.results;

            const promises = results.map(async (pokemon) => {
                const pokemonResponse = await fetch(pokemon.url);
                const pokemonData = await pokemonResponse.json();
                return {
                    id: pokemonData.id,
                    image: pokemonData.sprites.front_default,
                    isFlipped: false,
                };
            });

            const pokemonCards = await Promise.all(promises);

            setCards(shuffleArray([...pokemonCards, ...pokemonCards])); //Duplicate and shuffle the cards
        } catch (error) {
            console.error('Error fetching Pokemon data:', error);
        }
    };

    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    const handleCardClick = (id) => {
        const newCards = cards.map((card) => {
            if (card.id === id) {
                return { ...card, isFlipped: !card.isFlipped };
            }
            return card;
        });
        setCards(newCards);
        //update score logic
        const flippedCards = newCards.filter((card) => card.isFlipped);
        if (flippedCards.length === 2) {
            if (flippedCards[0].image === flippedCards[1].image) {
                setScore(score + 1);
                if (score + 1 > bestScore) {
                    setBestScore(score + 1);
                }
            } else {
                setTimeout(() => {
                    setCards(newCards.map((card) => ({ ...card, isFlipped: false })));
                }, 1000);
            }
        }
    };

    const handleBackButtonClick = () => {
        // Handle back button click event here, e.g., navigate back
        // You can use history.push() or window.history.back() for navigation
		window.location.reload(); // Navigate back one step in history
    };

    return (
        <div className="App">
            <button className="back-button" onClick={handleBackButtonClick}>
                Back
            </button>
            <h1>Memory Card Game</h1>
            <ScoreCard score={score} bestScore={bestScore} />
            <CardDeck cards={cards} handleCardClick={handleCardClick} />
        </div>
    );
};

export default App;

