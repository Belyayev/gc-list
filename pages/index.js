import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import ItemsList from '../components/ItemsList';
import NewItem from '../components/NewItem';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const initialState = {
  items: [],
  description: '',
  count: 1
}

function reducer(state = initialState, action) {
  switch(action.type) {
    case "UPDATE":
      return {
        items: action.payload,
        description: state.description,
        count: state.count
      }
    case "FORMUPDATE":
      return {
        items: state.items,
        description: action.payload,
        count: state.count
      }
    case "RESET":
      return {
        items: state.items,
        description: '',
        count: 1
      }
    case "INCREMENT":
      return {
        items: state.items,
        count: state.count+1,
        description: state.description
      }
      case "DECREMENT":
        if (state.count<1) return {count: 0}
        return {
          items: state.items,
          count: state.count-1,
          description: state.description
        };
      default: return state;
  }
}

const store = createStore(reducer);

const Index = (props) => (
  <Layout>
    <div>
      <Provider store={store}>
        <NewItem />
        {/* <Items/> */}
        <ItemsList />
      </Provider>
    </div>
  </Layout>
)

export default Index;