const axios = require('axios');
const instance = axios.create({ baseURL: 'http://localhost:8080' })

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

