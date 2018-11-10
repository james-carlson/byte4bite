const db = require('./db');
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
} = require('graphql');

const User = new GraphQLObjectType({
  name: 'User',
  description: 'represents a user',
  fields() {
    return {
      id: {
        type: GraphQLInt,
        resolve(user) {
          return user.id;
        }
      },
      firstName: {
        type: GraphQLString,
        resolve(user) {
          return user.firstName;
        }
      },
      lastName: {
        type: GraphQLString,
        resolve(user) {
          return user.lastName;
        }
      },
      orders: {
        type: GraphQLList(Order),
        resolve(user) {
          return user.getOrders();
        }
      }
    }
  }
});

const Order = new GraphQLObjectType({
  name: 'Order',
  description: 'represents a user',
  fields() {
    return {
      id: {
        type: GraphQLInt,
        resolve(order) {
          return order.id;
        }
      },
      complete: {
        type: GraphQLString,
        resolve(order) {
          return order.complete;
        }
      },
      user: {
        type: User,
        resolve(order) {
          return order.getUser();
        }
      },
      products: {
        type: GraphQLList(Product),
        resolve(order) {
          return order.getProducts();
        }
      },
    }
  }
});

const Product = new GraphQLObjectType({
  name: 'Product',
  description: 'represents a user',
  fields() {
    return {
      id: {
        type: GraphQLInt,
        resolve(product) {
          return product.id;
        }
      },
      name: {
        type: GraphQLString,
        resolve(product) {
          return product.name;
        }
      },
      price: {
        type: GraphQLString,
        resolve(product) {
          return product.price;
        }
      },
    }
  }
});

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'This is the root query',
  fields() {
    return {
      users: {
        type: GraphQLList(User),
        args: {
          id: { type: GraphQLInt },
          firstName: { type: GraphQLInt },
          lastName: { type: GraphQLInt },
        },
        resolve(root, args) {
          return db.models.user.findAll({ where: args })
        }
      },
      orders: {
        type: GraphQLList(Order),
        args: {
          id: { type: GraphQLInt },
          complete: { type: GraphQLString },
        },
        resolve(root, args) {
          return db.models.order.findAll({ where: args })
        }
      },
      products: {
        type: GraphQLList(Order),
        args: {
          id: { type: GraphQLInt },
          name: { type: GraphQLString },
          price: { type: GraphQLString },
        },
        resolve(root, args) {
          return db.models.product.findAll({ where: args })
        }
      },
    }
  }
});

const Schema = new GraphQLSchema({
  query: Query,
})

module.exports = Schema;
