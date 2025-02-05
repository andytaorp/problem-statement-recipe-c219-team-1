import { useState } from 'react'
import { useRecipesContext } from '../hooks/useRecipesContext'
import { useAuthContext } from '../hooks/useAuthContext'

const RecipeForm = () => {
    const { dispatch } = useRecipesContext()
    const { user } = useAuthContext()
    const [formData, setFormData] = useState({
        name: '',
        ingredients: '',
        instructions: '',
        prepTime: '',
        difficulty: 'easy'
    })
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!user) {
          setError('You must be logged in to add a recipe')
          return
        }
    
        const newRecipe = {
          ...formData,
          ingredients: formData.ingredients.split(',').map(ing => ing.trim())
        }
    
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/recipes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
          body: JSON.stringify(newRecipe),
        })
        const json = await response.json()
    
        if (!response.ok) {
          setError(json.error)
        } else {
          dispatch({ type: 'ADD_RECIPE', payload: json })
          setFormData({ name: '', ingredients: '', instructions: '', prepTime: '', difficulty: 'easy' })
          setError(null)
        }
      }
}