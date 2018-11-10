const axios = require('axios');
const instance = axios.create({ baseURL: 'https://32226816.ngrok.io' })

async function executeQuery(query) {
  return instance.post('/graphql', { query });
}


export async function getUserById(id) {
  try {
    const response = await executeQuery(`
    {
      users(id: ${id}) {
        firstName
        lastName
        orders {
          id
          complete
          items {
            id
            name
            price
          }
        }
      }
    }
    `);

    return response.data.data.users[0];
  } catch (error) {
    console.error(error);
  }
}

export async function getItems() {
  try {
    const response = await executeQuery(`
    {
      items {
        id
        name
        price
      }
    }
    `);

    return response.data.data.items;
  } catch (error) {
    console.error(error);
  }
}

export async function loginUser(firstName, lastName, phone) {
  try {
   const user = await instance.post('/login-user', { phone })

   if (!user) return await instance.post('/add-user', { firstName, lastName, phone });

   return user;

  } catch (error) {
    console.error(error);
  }
}

export async function addToOrder(orderId, itemId) {
  try {
    const result = await instance.post('/add', {orderId, itemId})
    console.log(result);
    return result;
  } catch (err) {
    console.log(err)
  }
}
