import { Schema } from './models.js';

export const data: Schema = {
    users: [
      {
        username: "glenn",
        password: "snygg-glenn",
        orders: 
          [
            {
              date: "YYYY-MM-DD HH:mm:ss",
              items: 
                [
                  {
                    title: "Ratatouille",
                    price: 90,
                    ingredients: "aubergine, zucchini, tomatoe, red peppers, garlic, beef",
                    allergies: "egg, almond",
                    imgUrl: "https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1540&q=80",
                    id: "1"
                  }
                ],
              orderId: 1001,
              status: "",
              userComment: "",
              adminComment: "",
              id: "1"
            },
            {
              date: "YYYY-MM-DD HH:mm:ss",
              items: 
                [
                  {
                    title: "Ratatouille",
                    price: 90,
                    ingredients: "aubergine, zucchini, tomatoe, red peppers, garlic, beef",
                    allergies: "egg, almond",
                    imgUrl: "https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1540&q=80",
                    id: "1"
                  }
                ],
              orderId: 1002,
              status: "",
              userComment: "",
              adminComment: "",
              id: "2"
            }
          ],
        customer: true,
        id: "1"
      },
      {
        username: "ada",
        password: "code4life",
        orders: 
          [
            {
              date: "YYYY-MM-DD HH:mm:ss",
              items: 
                [
                  {
                    title: "Ratatouille",
                    price: 90,
                    ingredients: "aubergine, zucchini, tomatoe, red peppers, garlic, beef",
                    allergies: "egg, almond",
                    imgUrl: "https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1540&q=80",
                    id: "1"
                  },
                  {
                    title: "Ratatouille (spicy, veg)",
                    price: 85,
                    ingredients: "aubergine, zucchini, tomatoe, red peppers, garlic, chili",
                    allergies: "egg, almond",
                    imgUrl: "https://images.unsplash.com/photo-1659192456502-dd99305efbc0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1827&q=80",
                    id: "2"
                  }
                ],
              orderId: 1003,
              status: "",
              userComment: "",
              adminComment: "",
              id: "1"
            }
          ],
        customer: true,
        id: "2"
      },
      {
        username: "Stina",
        password: "work4life",
        orders: [],
        customer: false,
        id: "3"
      }
    ],
    menu: [
        { title: 'Ratatouille', price: 90, ingredients: "aubergine, zucchini, tomatoe, red peppers, garlic, beef", allergies: "egg, almond", imgUrl: "https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1540&q=80", id: "1" },
        { title: 'Ratatouille (veg)', price: 80, ingredients: "aubergine, zucchini, tomatoe, red peppers, garlic", allergies: "egg, almond", imgUrl: "https://images.unsplash.com/photo-1630173314503-544080d4dee7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80", id: "2" },
        { title: 'Ratatouille (spicy)', price: 95, ingredients: "aubergine, zucchini, tomatoe, red peppers, garlic, chili, beef", allergies: "egg, almond", imgUrl: "https://images.unsplash.com/photo-1652622550740-f90d03edfbf0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1635&q=80", id: "3" },
        { title: 'Ratatouille (spicy, veg)', price: 85, ingredients: "aubergine, zucchini, tomatoe, red peppers, garlic, chili", allergies: "egg, almond", imgUrl: "https://images.unsplash.com/photo-1659192456502-dd99305efbc0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1827&q=80", id: "4" },
        { title: 'Kids Ratatouille', price: 60, ingredients: "aubergine, zucchini, tomatoe, red peppers, chicken", allergies: "egg, almond", imgUrl: "https://images.unsplash.com/photo-1659192963263-c4e3b53586db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1827&q=80", id: "5" },
        { title: 'Coca-Cola', price: 20, ingredients: "A cold refreshing drink for your meal", allergies: "", imgUrl: "https://images.unsplash.com/photo-1629654613528-5d0a2e4166de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1664&q=80", id: "6" },
        { title: 'Fanta', price: 20, ingredients: "A cold refreshing drink for your meal", allergies: "", imgUrl: "https://images.unsplash.com/photo-1506408656147-dab2bc936117?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80", id: "7" }
    ]
}

