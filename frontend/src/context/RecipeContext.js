import { createContext, useReducer } from 'react'

export const RecipeContext = createContext()

export const recipesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_RECIPES':
      return { 
        recipes: action.payload 
      }
    case 'CREATE_RECIPE':
      return { 
        recipes: [action.payload, ...state.recipes] 
      }
    case 'DELETE_RECIPE':
      return {
        recipes: state.recipes.filter((w) => w._id !== action.payload._id)
      }
    case 'UPDATE_RECIPE':
      return {
        recipes: state.recipes.map((w) =>
          w._id === action.payload._id ? action.payload : w
        )
      }
    default:
      return state
  }
}


export const RecipeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(recipesReducer, { 
    recipes: []  
  })
  
  return (
    <RecipeContext.Provider value={{ ...state, dispatch }}>
      { children }
    </RecipeContext.Provider>
  )
}

