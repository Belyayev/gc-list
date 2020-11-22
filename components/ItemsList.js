import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
let API_URL="https://limitless-lake-72784.herokuapp.com/listitems/";

const Item = (e) => (
    <tr>
      <td>{e.item.description}</td>
      <td>{e.item.quantity}</td>
      <td>
        <i onClick={() => { e.deleteItem(e.item._id) }} className="far fa-trash-alt fa-lg"></i>
      </td>
    </tr>
  )

function ItemsList (props) {

    let trigger=[1];

    const getItems = () => {
        axios.get(API_URL)
        .then(response => {
            props.dispatch({type: "UPDATE", payload: response.data})
        })
        .catch((error) => {
          console.log(error);
        });

    }

    useEffect(() => {
        getItems();
    }, trigger)

    const deleteItem = (id) => {
        axios.delete(API_URL+id)
          .then(response => { console.log(response.data)});
    
        props.dispatch({
          type: "UPDATE", payload: props.items.filter(el => el._id !== id)
        })
      }

    const itemList = () => {
        return props.items.map(currentitem => {
        return <Item item={currentitem} deleteItem={deleteItem} key={currentitem._id}/>;
      })
    }

    return (
        <div className="table-responsive">
        <table className="table table-striped">
         <thead>
           <tr>
             <th>Item description</th>
             <th>Qty</th>
             <th>Manage</th>
           </tr>
         </thead>
         <tbody>
           {itemList()}
         </tbody>
       </table>
     </div>
    )
  }

const mapStateToProps = state => ({
  items: state.items,
  count: state.count,
  description: state.description
});

export default connect(mapStateToProps)(ItemsList);