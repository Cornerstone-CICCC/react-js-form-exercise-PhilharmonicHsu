import { ChangeEvent, useState } from "react"

import './App.css'

type FormData = {
  firstname: string,
  lastname: string,
  age: number,
  favoriteFoods: string[],
}

const InitFormData = {
  firstname: '',
  lastname: '',
  age: 0,
  favoriteFoods: [],
}

const favoriteFoods = [
  {
    key: "chicken",
    value: "Chicken"
  },
  {
    key: "beef",
    value: "Beef"
  },
  {
    key: "vegetables",
    value: "Vegetables"
  },
  {
    key: "dessert",
    value: "Dessert"
  },
  {
    key: "pork",
    value: "Pork"
  },
]

function App() {
  const [formData, setFormData] = useState<FormData>(InitFormData)
  const [isShow, setIsShow] = useState<boolean>(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target

    setFormData(prevState => {
      const updatedFavoriteFoods = checked
      ? [...prevState.favoriteFoods, value]
      : prevState.favoriteFoods.filter(food => food !== value)

      return {
        ...prevState,
        favoriteFoods: updatedFavoriteFoods
      }
    })
  }

  const handleDisplay = () => {
    setIsShow(true)
  }

  const handleClear = () => {
    setFormData(InitFormData)
    setIsShow(false);
  }
  
  return (
    <div>
      <h1>User Form</h1>
      <form>
        <div>
          <label htmlFor="firstname">First Name:</label>
          <input 
            type="text" 
            id="firstname" 
            name="firstname" 
            value={formData.firstname} 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label htmlFor="lastname">Last Name:</label>
          <input 
            type="text" 
            id="lastname" 
            name="lastname" 
            value={formData.lastname} 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input 
            type="number" 
            id="age" 
            name="age" 
            value={formData.age} 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label>Favorite Foods:</label>
          {
            favoriteFoods.map((food, index) => <div key={index}>
              <input 
                type="checkbox" 
                id={food.key} 
                name="favoriteFoods" 
                value={food.value} 
                checked={formData.favoriteFoods.includes(food.value)}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={food.key} >{food.value}</label>
            </div>)
          }
        </div>
      </form>

      <button onClick={handleDisplay}>Display User</button>
      <button onClick={handleClear}>Clear</button>

      <div className="output">
        {
          isShow 
            ? `Hello ${formData.firstname} ${formData.lastname}. You are ${formData.age} years old and your favorite foods are: ${formData.favoriteFoods.join(',')}.`
            : ''
        }
      </div>
    </div>
  );
}

export default App
