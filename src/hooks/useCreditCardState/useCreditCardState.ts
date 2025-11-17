import { useReducer, useCallback } from 'react';

/**
 * State for a single credit card
 */
interface CardState {
  showInfo: boolean;
  blocked: boolean;
}

/**
 * Combined state for both cards
 */
interface CreditCardSessionState {
  physical: CardState;
  digital: CardState;
}

/**
 * Actions for credit card state management
 */
type CardAction =
  | { type: 'TOGGLE_VISIBILITY'; cardType: 'physical' | 'digital' }
  | { type: 'TOGGLE_BLOCK'; cardType: 'physical' | 'digital' };

/**
 * Reducer for credit card state management
 * 
 * @param state - Current credit card session state
 * @param action - Action to perform on the state
 * @returns Updated state
 */
function cardReducer(state: CreditCardSessionState, action: CardAction): CreditCardSessionState {
  switch (action.type) {
    case 'TOGGLE_VISIBILITY':
      return {
        ...state,
        [action.cardType]: {
          ...state[action.cardType],
          showInfo: !state[action.cardType].showInfo,
        },
      };
    case 'TOGGLE_BLOCK':
      return {
        ...state,
        [action.cardType]: {
          ...state[action.cardType],
          blocked: !state[action.cardType].blocked,
        },
      };
    default:
      return state;
  }
}

/**
 * Custom hook for managing credit card session state
 * 
 * Consolidates multiple useState calls into a single reducer-based state management
 * for better performance and maintainability.
 * 
 * @returns {Object} Card states and action handlers
 * @returns {CardState} physicalState - State for physical card
 * @returns {CardState} digitalState - State for digital card
 * @returns {Function} toggleVisibility - Toggle visibility for a card type
 * @returns {Function} toggleBlock - Toggle block status for a card type
 * 
 * @example
 * ```tsx
 * const { physicalState, digitalState, toggleVisibility, toggleBlock } = useCreditCardState();
 * 
 * // Toggle visibility for physical card
 * toggleVisibility('physical');
 * 
 * // Toggle block status for digital card
 * toggleBlock('digital');
 * ```
 */
export function useCreditCardState() {
  const [state, dispatch] = useReducer(cardReducer, {
    physical: { showInfo: false, blocked: false },
    digital: { showInfo: false, blocked: false },
  });

  const toggleVisibility = useCallback((cardType: 'physical' | 'digital') => {
    dispatch({ type: 'TOGGLE_VISIBILITY', cardType });
  }, []);

  const toggleBlock = useCallback((cardType: 'physical' | 'digital') => {
    dispatch({ type: 'TOGGLE_BLOCK', cardType });
  }, []);

  return {
    physicalState: state.physical,
    digitalState: state.digital,
    toggleVisibility,
    toggleBlock,
  };
}

