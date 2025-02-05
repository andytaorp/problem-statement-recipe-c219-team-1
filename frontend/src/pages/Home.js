import { useEffect }from 'react'
import { useRecipeContext } from "../hooks/useRecipeContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import RecipeDetails from '../components/RecipeDetails'
import RecipeForm from '../components/RecipeForm'

const Home = () => {
  const {Recipe, dispatch} = useRecipeContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/recipes`, {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_RECIPE', payload: json})
      }
    }

    if (user) {
      fetchRecipe()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="recipe">
        {Recipe && Recipe.map((recipe) => (
          <RecipeDetails key={Recipe._id} Recipe={Recipe} />
        ))}
      </div>
      <RecipeForm />
    </div>
  )
}

export default Home