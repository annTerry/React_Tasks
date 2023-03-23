import React, { MouseEventHandler } from 'react';

export default class OrderForms extends React.Component {
  constructor(props: PropertyDecorator) {
    super(props);
    this.handleSend = this.handleSend.bind(this);
  }

  handleSend(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    console.log('submit handler');
  }

  render() {
    return (
      <div>
        <h2>Form:</h2>
        <form>
          <input type="text" id="form-name" name="name" placeholder="Your Name" />
          <input type="text" id="form-surname" name="surname" placeholder="Your Surname" />
          <input type="number" name="quantity" placeholder="Quantity" />
          <fieldset>
            <legend>Add presents:</legend>
            <input type="checkbox" name="presents" value="postcard" />
            <input type="checkbox" name="presents" value="wrapper" />
            <input type="checkbox" name="presents" value="bookmark" />
          </fieldset>
          <input type="mail" name="mail" placeholder="mail" />
          <fieldset>
            <legend>Delivery:</legend>
            <input type="radio" name="send" value="post" />
            <input type="radio" name="send" value="dhl" />
            <input type="radio" name="send" value="pony" />
          </fieldset>
          <select name="country" placeholder="Country">
            <option value="UK">Uk</option>
            <option value="Ireland">Ireland</option>
            <option value="France">France</option>
          </select>
          <input type="text" name="address" placeholder="address" />
          <input type="file" name="invoice" placeholder="Upload check" accept=".jpg,.png,.svg" />
          <button onClick={this.handleSend}>Submit</button>
        </form>
      </div>
    );
  }
}
