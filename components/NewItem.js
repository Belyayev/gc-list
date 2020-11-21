import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

function NewItem (props) {

  const getItems = () => {
    axios.get('https://limitless-lake-72784.herokuapp.com/listitems/')
    .then(response => {
        props.dispatch({type: "UPDATE", payload: response.data})
    })
    .catch((error) => {
      console.log(error);
    });

}

  const onSubmit = (e) => {
    e.preventDefault();

    const item = {
      description: props.description,
      quantity: props.count
    }

    if(props.description!=''){

      console.log(item);
      
      axios.post('https://limitless-lake-72784.herokuapp.com/listitems/add', item)
      .then(res => console.log(res.data));

      props.dispatch({type: "RESET"});
    }
    setTimeout(getItems, 500);
  };

  const increment = () => {
    props.dispatch({type: "INCREMENT"});
  };

  const decrement = () => {
    props.dispatch({type: "DECREMENT"});
  };

    return (
    <div className="input-group mb-3">
          <input id="g-item" type="text" placeholder="Item description"
                required
                className="form-control"
                value={props.description}
                onChange={e => props.dispatch({type: "FORMUPDATE", payload: e.target.value})}
                />
         <div className="input-group-append ml-2">
          <button onClick={decrement} className="btn btn-outline-dark btn-sm" type="button">-</button>
          <h3 className="font-weight-bold ml-2 mr-2 mb-0">{props.count}</h3>
          <button onClick={increment} className="btn btn-outline-dark btn-sm" type="button">+</button>
          <button onClick={onSubmit} className="btn btn-primary btn-sm ml-1" type="button">Add</button>
      </div>
      </div>
    )
  }

const mapStateToProps = state => ({
  items: state.items,
  count: state.count,
  description: state.description
});

export default connect(mapStateToProps)(NewItem);