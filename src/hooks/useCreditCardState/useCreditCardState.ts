import { useReducer, useCallback } from 'react';

/**
 * State for a single credit card
 */
export interface CardState {
  showInfo: boolean;
  blocked: boolean;
}

/**
 * Combined state for both cards
 */
export interface CreditCardSessionState {
  physical: CardState;
  digital: CardState;
}

/**
 * Actions for credit card state management
 */
export type CardAction =
  | { type: 'TOGGLE_VISIBILITY'; cardType: 'physical' | 'digital' }
  | { type: 'TOGGLE_BLOCK'; cardType: 'physical' | 'digital' };

/**
 * Return type for the useCreditCardState hook
 */
export interface UseCreditCardStateReturn {
  /** State for physical card */
  physicalState: CardState;
  /** State for digital card */
  digitalState: CardState;
  /** Toggle visibility for a card type */
  toggleVisibility: (cardType: 'physical' | 'digital') => void;
  /** Toggle block status for a card type */
  toggleBlock: (cardType: 'physical' | 'digital') => void;
}

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
 * @returns {UseCreditCardStateReturn} Object containing card states and action handlers
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
export const useCreditCardState = (): UseCreditCardStateReturn => {
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

