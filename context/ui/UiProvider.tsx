import { FC, PropsWithChildren, useReducer } from 'react';
import { UIContext, uiReducer } from './';

export interface UiState {
    isMenuOpen:boolean;
}

const UI_INITIAL_STATE: UiState = {
    isMenuOpen:false,
}


const UIProvider:FC<PropsWithChildren> = ({children}) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

    const toggleSideMenu = ()=>{
        dispatch({type:'[UI] - ToggleMenu'})
    }


  return (
  <UIContext.Provider value={{
    ...state,
    //methods
    toggleSideMenu,
} }>
    {children}
  </UIContext.Provider>
  )
}

export default UIProvider