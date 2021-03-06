const axios = require('axios');
const instance = axios.create({ baseURL: 'https://b2b617bd.ngrok.io' })

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
   const response = await instance.post('/login-user', {phone})
   console.log(response.data);
   if (!response.data) {
     console.log('hit!')
     const resp = await instance.post('/add-user', {firstName, lastName, phone});
     return resp.data.userId;
   }

   return response.data.id;

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
