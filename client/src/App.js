import React, { Component } from 'react';
import './App.css';
import { getUserById, getItems, addToOrder } from './dataService';


class App extends Component {
  state = {
    user: {},
    items: [],
  }

  async componentDidMount() {
    try {
      const user = await getUserById(2);
      const items = await getItems();

      this.setState({ user, items });
    } catch (error) {
      console.error(error);
    }
  }

  addToCart = async (orderId, itemId) => {
    await addToOrder(orderId, itemId);
    const user = await getUserById(2);
    this.setState({ user });
  }


  render() {
    const { user, items } = this.state;

    if (!user) return <div>loading...</div>;
    if (Object.keys(user).length === 0) return <div>loading...</div>;
    console.log(user);
    const userOrder = user.orders[0];
    const userItems = userOrder.items;

    const itemList = items.map((item, i) => {
      return ([
        <div key={i} className="App-item">
          <div>
            <div>{item.name}</div>
            <div>Price: {item.price}</div>
          </div>
          <div className="addButton">
            <button onClick={() => this.addToCart(userOrder.id, item.id)} className="addButton">Add To Cart</button>
          </div>
        </div>,
      ]
      )
    })

    return (
      <div className="App">
        <div className="App-Title">GSD Pantry Providers</div>
        <header className="App-header">
          <div>Welcome back, {user.firstName} {user.lastName}!</div>
          <div>Your cart has {userItems.length} items</div>
        </header>
        <section className="App-body">
          <div><span className="text1">What would you like to donate today?</span></div>
          <div className="items">{itemList}</div>
          <div className="right"><button className="submit" onClick={this.onSubmit}><span className="text2">Click Here to Submit</span></button></div>
        </section>
      </div>
    );
  }
}

export default App;
