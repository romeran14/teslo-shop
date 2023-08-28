import { UiState } from './'

type NameActionType =
   | { type: '[UI] - ToggleMenu' }

export const uiReducer = (state: UiState, action: NameActionType): UiState => {
  switch (action.type) {
   case '[UI] - ToggleMenu':
   return {
    ...state,
    isMenuOpen:!state.isMenuOpen
    }

    default:
    return state
 }
}