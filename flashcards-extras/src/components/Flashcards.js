import { useEffect, useState } from 'react';

import { getQuestions } from '../services/triviaApiService';
import { CreateCard } from './CreateCard';
import { OneFlashcard } from './OneFlashcard';

export const Flashcards = (props) => {
  const { title, query } = props;

  /* 
    Array destructuring is shorthand for giving a var name to indexed items:
    const flashcardsStatePair = useState(flashcardsData);
    const flashcards = flashcardsStatePair[0];
    const setFlashcards = flashcardsStatePair[1];
    */
  const [flashcards, setFlashcards] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      getQuestions(query)
        .then((data) => {
          setFlashcards(data.results);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          // This happens after the .then OR the .catch so instead of having to setIsLoading(false) in both we can do it
          // only here.
          setIsLoading(false);
        });
    }, 3000);
  }, [query]);

  const handleCardFlipClick = (selectedIdx) => {
    const updatedFlashcards = flashcards.map((card, i) => {
      if (selectedIdx === i) {
        card.flipped = !card.flipped;

        /* Without mutating the card object: */
        // return {
        //   ...card,
        //   flipped: !card.flipped,
        // };
      }

      return card;
    });

    setFlashcards(updatedFlashcards);
  };

  const handleCardDeleteClick = (event, delIdx) => {
    event.stopPropagation();

    const filteredFlashcards = flashcards.filter((card, i) => {
      const isCardToDelete = delIdx === i;

      if (isCardToDelete) {
        // false to remove
        return false;
      }
      // true to keep
      return true;
    });

    setFlashcards(filteredFlashcards);

    // One liner
    // setFlashcards(flashcards.filter((_, i) => delIdx !== i));
  };

  const addNewCard = (newCard) => {
    setFlashcards([newCard, ...flashcards]);
  };

  return (
    <div>
      <CreateCard addNewCard={addNewCard} />

      <h2>{title}</h2>

      {isLoading && (
        <img
          src="http://static.demilked.com/wp-content/uploads/2016/06/gif-animations-replace-loading-screen-14.gif"
          alt="Loading"
          width="25%"
        />
      )}

      <div className="flex-row flex-wrap">
        {flashcards !== null &&
          flashcards.map((card, cardIdx) => {
            return (
              <OneFlashcard
                key={cardIdx}
                card={card}
                cardIdx={cardIdx}
                handleCardFlipClick={handleCardFlipClick}
                handleCardDeleteClick={handleCardDeleteClick}
              />
            );
          })}
      </div>
      <hr />
    </div>
  );
};
