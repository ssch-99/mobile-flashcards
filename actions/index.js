export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveDecks (decks) {
    return {
        type: RECEIVE_DECKS,
        decks,
    }
}
export function addDeck (deck) {
    return {
        type: ADD_DECK,
        deck,
    }
}
export function removeDeck (id) {
    return {
        type: REMOVE_DECK,
        id,
    }
}

export function addQuestion(deckId,question) {
    return {
        type: ADD_QUESTION,
        deckId,
        question
    }

}
