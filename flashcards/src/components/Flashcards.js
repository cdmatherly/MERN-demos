import { useState } from 'react';

import flashcardsData from '../data/flashcards.json';
import { AddFlashcardForm } from './AddFlashcardForm';

import { Flashcard } from './Flashcard';

export const Flashcards = (props) => {
  // Array destructuring is shorthand for giving a var name to indexed items:
  /* 
  const flashcardsStatePair = useState(flashcardsData);
  const flashcards = flashcardsStatePair[0];
  const setFlashcards = flashcardsStatePair[1];
 */

  const [flashcards, setFlashcards] = useState(flashcardsData);

  const handleFlipCardClick = (event, selectedIdx) => {
    const updatedFlashcards = flashcards.map((card, i) => {
      if (selectedIdx === i) {
        return {
          ...card,
          flipped: !card.flipped,
        };
      }

      return card;
    });

    // If you don't pass in a new array, react won't re-render, that's why we
    // can't just `.push` / mutate.
    setFlashcards(updatedFlashcards);
  };

  const handleDelete = (e, delIdx) => {
    // Prevent the event from propagating to the parent elements on click which
    // hijacks the event and prevents the delete from happening.
    e.stopPropagation();
    const filteredFlashcards = flashcards.filter((card, i) => {
      // return false to remove, true to keep
      // this is only true for the one we want to delete
      return delIdx !== i;
    });

    console.log(filteredFlashcards);

    setFlashcards(filteredFlashcards);
  };

  // set state functions are async, if you ever need to log the current state
  // log it here, not right after a set state call.

  const addNewFlashcard = (newFlashcard) => {
    const updatedFlashcards = [newFlashcard, ...flashcards];
    setFlashcards(updatedFlashcards);
  };

  return (
    <div>
      <AddFlashcardForm addNewFlashcard={addNewFlashcard} />
      <hr />

      <div className="flex-row flex-wrap">
        {flashcards.map((card, i) => {
          // key should be an id if available instead of an index.
          return (
            <Flashcard
              key={i}
              card={card}
              handleFlipCardClick={handleFlipCardClick}
              handleDelete={handleDelete}
              idx={i}
            />
          );
        })}
      </div>
    </div>
  );
};