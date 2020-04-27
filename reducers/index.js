import {RECEIVE_DECKS, ADD_DECK, REMOVE_DECK, ADD_QUESTION} from '../actions'

function decks (state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS :
            return {
                ...state,
                ...action.decks,
            }
        case ADD_DECK :
            return {
                ...state,
                ...action.deck
            }
        case REMOVE_DECK:
            console.log("REMOVE REDUCER");
            let copy = Object.assign({}, state)
            delete copy[action.id]
            return copy

        case ADD_QUESTION:
            //deckId, question
            let decks = Object.assign({}, state)
            decks[action.deckId].questions.push(action.question)

            return {
                ...state,
                decks
            }

        default :
            return state
    }
}

export default decks
