import React from 'react';

export default class OrderForms extends React.Component {
  nameInput: React.RefObject<HTMLInputElement>;
  quantityInput: React.RefObject<HTMLInputElement>;
  presentPostcard: React.RefObject<HTMLInputElement>;
  presentWrapper: React.RefObject<HTMLInputElement>;
  presentBookmark: React.RefObject<HTMLInputElement>;
  sendPost: React.RefObject<HTMLInputElement>;
  sendDHL: React.RefObject<HTMLInputElement>;
  sendPony: React.RefObject<HTMLInputElement>;
  selectCountry: React.RefObject<HTMLSelectElement>;
  addressInput: React.RefObject<HTMLInputElement>;
  fileInput: React.RefObject<HTMLInputElement>;
  state = {
    file: '',
    errors: [],
  };
  constructor(props: PropertyDecorator) {
    super(props);
    this.handleSend = this.handleSend.bind(this);
    this.nameInput = React.createRef();
    this.quantityInput = React.createRef();
    this.presentPostcard = React.createRef();
    this.presentWrapper = React.createRef();
    this.presentBookmark = React.createRef();
    this.sendPost = React.createRef();
    this.sendDHL = React.createRef();
    this.sendPony = React.createRef();
    this.selectCountry = React.createRef();
    this.addressInput = React.createRef();
    this.fileInput = React.createRef();
  }

  handleSend(event: React.SyntheticEvent) {
    event.preventDefault();
    const error: { name: string; message: string }[] = [];
    const name = this.nameInput.current?.value;
    if (!name) {
      error.push({ name: 'name', message: 'Enter the name' });
    }
    const quantity = this.quantityInput.current?.value;
    if (!quantity || !+quantity || +quantity < 1 || +quantity > 10) {
      error.push({
        name: 'quantity',
        message: 'Quantity must be more then zero and not more then 9',
      });
    }
    const presents: string[] = [];
    if (this.presentPostcard.current?.checked) presents.push('postcard');
    if (this.presentWrapper.current?.checked) presents.push('wrapper');
    if (this.presentBookmark.current?.checked) presents.push('bookmark');
    if (presents.length === 0) {
      error.push({
        name: 'presents',
        message: 'Choose at least one present',
      });
    }
    let send = '';
    if (this.sendPost.current?.checked) send = 'post';
    if (this.sendDHL.current?.checked) send = 'dhl';
    if (this.sendPony.current?.checked) send = 'pony';
    if (!send) {
      error.push({
        name: 'send',
        message: 'Choose send type',
      });
    }
    const country = this.selectCountry.current?.value;
    if (!country) {
      error.push({
        name: 'country',
        message: 'Choose country',
      });
    }
    const address = this.addressInput.current?.value;
    if (!address) {
      error.push({ name: 'address', message: 'Enter your address' });
    }
    const fileResults = this.fileInput.current?.files;
    if (fileResults && fileResults.length > 0) {
      const dataFile = URL.createObjectURL(fileResults[0]);
    } else {
      error.push({ name: 'file', message: 'Add File' });
    }
    if (error.length > 0) {
      this.setState({ errors: error });
    } else {
      this.forceUpdate();
    }
  }

  render() {
    return (
      <div>
        <h2>Form:</h2>
        <form onSubmit={this.handleSend}>
          <input
            type="text"
            id="form-name"
            ref={this.nameInput}
            name="name"
            placeholder="Your Name"
          />
          <input type="number" ref={this.quantityInput} name="quantity" placeholder="Quantity" />
          <fieldset>
            <legend>Add presents:</legend>
            <input type="checkbox" name="presents" ref={this.presentPostcard} value="postcard" />
            <input type="checkbox" name="presents" ref={this.presentWrapper} value="wrapper" />
            <input type="checkbox" name="presents" ref={this.presentBookmark} value="bookmark" />
          </fieldset>
          <fieldset>
            <legend>Delivery:</legend>
            <input type="radio" name="send" ref={this.sendPost} value="post" />
            <input type="radio" name="send" ref={this.sendDHL} value="dhl" />
            <input type="radio" name="send" ref={this.sendPony} value="pony" />
          </fieldset>
          <select ref={this.selectCountry} name="country" placeholder="Country">
            <option value="UK">Uk</option>
            <option value="Ireland">Ireland</option>
            <option value="France">France</option>
          </select>
          <input type="text" ref={this.addressInput} name="address" placeholder="address" />
          <input
            type="file"
            ref={this.fileInput}
            name="invoice"
            placeholder="Upload check"
            accept=".jpg,.png,.svg"
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
