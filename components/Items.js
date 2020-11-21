import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

const Item = (e) => (
  <tr>
    <td>{e.item.description}</td>
    <td>{e.item.quantity}</td>
    <td>
      <i onClick={() => { e.deleteItem(e.item._id) }} className="far fa-trash-alt fa-lg"></i>
    </td>
  </tr>
)

class Items extends Component {
  constructor(props) {
    super(props);

    this.state = {items: []};
  }

  componentDidMount() {
    axios.get('https://limitless-lake-72784.herokuapp.com/listitems/')
      .then(response => {
        this.setState({ items: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteItem = (id) => {
    axios.delete('https://limitless-lake-72784.herokuapp.com/listitems/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      items: this.state.items.filter(el => el._id !== id)
    })
  }

  itemList() {
      return this.state.items.map(currentitem => {
      return <Item item={currentitem} deleteItem={this.deleteItem} key={currentitem._id}/>;
    })
  }

  render() {
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
            { this.itemList() }
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  count: state.count,
  description: state.description
});

export default connect(mapStateToProps)(Items)