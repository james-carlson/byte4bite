import React, { Component } from 'react';
import './App.css';
import { getUserById, getItems } from './dataService';



class App extends Component {
  state = {
    user: {},
    items: [],
  }

  async componentDidMount() {
    try {
      const user = await getUserById(1);
      const items = await getItems();

      this.setState({ user, items });
    } catch (error) {
      console.error(error);
    }
  }
  render() {
    const { user, items } = this.state;

    if (Object.keys(user).length === 0) return <div>loading...</div>;

    const userOrder = user.orders[0];
    const userItems = userOrder.items;

    const itemList = items.map((item, i) => {
      return (
        <div key={i} className="App-item">
          <div>{item.name}</div>
          <div>Price: {item.price}</div>
        </div>
      )
    })

    return (
      <div className="App">
        <header className="App-header">
          <div>welcome, {user.firstName} {user.lastName}!</div>
          <div>Your cart has {userItems.length} items</div>
        </header>
        <section className="App-body">
          {itemList}
        </section>
      </div>
    );
  }
}

export default App;
