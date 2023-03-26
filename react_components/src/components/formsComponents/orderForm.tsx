import React from 'react';
import { OrderFormsType, FieldObject, OneFieldObject } from '../../common/types';

export default class OrderForms extends React.Component {
  fieldsData = new FieldObject();
  state: OrderFormsType = {
    errors: {},
  };

  constructor(props: PropertyDecorator) {
    super(props);
    this.handleSend = this.handleSend.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.fieldsData.name.ref = React.createRef() as React.RefObject<HTMLInputElement>;
    this.fieldsData.quantity.ref = React.createRef() as React.RefObject<HTMLInputElement>;
    this.fieldsData.presents.refs = {};
    this.fieldsData.presents.refs.postcard = React.createRef() as React.RefObject<HTMLInputElement>;
    this.fieldsData.presents.refs.wrapper = React.createRef() as React.RefObject<HTMLInputElement>;
    this.fieldsData.presents.refs.bookmark = React.createRef() as React.RefObject<HTMLInputElement>;
    this.fieldsData.send.refs = {};
    this.fieldsData.send.refs.post = React.createRef() as React.RefObject<HTMLInputElement>;
    this.fieldsData.send.refs.dhl = React.createRef() as React.RefObject<HTMLInputElement>;
    this.fieldsData.send.refs.pony = React.createRef() as React.RefObject<HTMLInputElement>;
    this.fieldsData.country.ref = React.createRef() as React.RefObject<HTMLSelectElement>;
    this.fieldsData.address.ref = React.createRef() as React.RefObject<HTMLInputElement>;
    this.fieldsData.invoice.ref = React.createRef() as React.RefObject<HTMLInputElement>;
  }

  handleCheck(event: React.SyntheticEvent) {
    const targetEl = event.target as HTMLInputElement;
    const name = targetEl.name;
    let dataField: OneFieldObject | undefined = undefined;
    Object.entries(this.fieldsData).forEach(([key, value]) => {
      if (key === name) dataField = value as OneFieldObject;
    });
    if (dataField !== undefined) {
      dataField = dataField as OneFieldObject;
      if (dataField.check() && this.state.errors[name]) {
        const oldErrors = this.state.errors;
        delete oldErrors[name];
        this.setState({ errors: oldErrors });
      }
    }
  }

  handleSend(event: React.SyntheticEvent) {
    event.preventDefault();
    const error: { [key: string]: string } = {};
    const name = this.fieldsData.name.ref?.current?.value;
    if (!name) {
      error.name = 'Enter the name';
    }
    const quantity = this.fieldsData.quantity.ref?.current?.value;
    if (!quantity || !+quantity || +quantity < 1 || +quantity > 10) {
      error.quantity = 'Quantity must be more then zero and not more then 9';
    }
    const presents: string[] = [];
    if (this.fieldsData.presents.refs?.postcard.current?.checked) presents.push('postcard');
    if (this.fieldsData.presents.refs?.wrapper.current?.checked) presents.push('wrapper');
    if (this.fieldsData.presents.refs?.bookmark.current?.checked) presents.push('bookmark');
    if (presents.length === 0) {
      error.presents = 'Choose at least one present';
    }
    let send = '';
    if (this.fieldsData.send.refs?.post.current?.checked) send = 'post';
    if (this.fieldsData.send.refs?.dhl.current?.checked) send = 'dhl';
    if (this.fieldsData.send.refs?.pony.current?.checked) send = 'pony';
    if (!send) {
      error.send = 'Choose send type';
    }
    const country = this.fieldsData.country.ref?.current?.value;
    if (!country) {
      error.country = 'Choose country';
    }
    const address = this.fieldsData.address.ref?.current?.value;
    if (!address) {
      error.address = 'Enter your address';
    }
    const fileInputRef = this.fieldsData.invoice.ref?.current as HTMLInputElement;
    const fileResults = fileInputRef.files;
    if (fileResults && fileResults.length > 0) {
      const dataFile = URL.createObjectURL(fileResults[0]);
    } else {
      error.invoice = 'Add File';
    }
    if (Object.keys(error).length > 0) {
      this.setState({ errors: error });
    } else {
      this.forceUpdate();
    }
  }

  render() {
    const errorsElements = Object.keys(this.fieldsData).map((key, index) => {
      if (this.state.errors[key]) {
        return (
          <div className="form-error" key={key + '_' + index}>
            {this.state.errors[key]}
          </div>
        );
      } else return '';
    });
    return (
      <div>
        <h2>Form:</h2>
        <form onSubmit={this.handleSend}>
          <input
            onInput={this.handleCheck}
            type="text"
            id="form-name"
            ref={this.fieldsData.name.ref as React.RefObject<HTMLInputElement>}
            name="name"
            placeholder="Your Name"
          />
          {errorsElements[0]}
          <input
            onInput={this.handleCheck}
            type="number"
            ref={this.fieldsData.quantity.ref as React.RefObject<HTMLInputElement>}
            name="quantity"
            placeholder="Quantity"
          />
          {errorsElements[1]}
          <fieldset>
            <legend>Add presents:</legend>
            <input
              onInput={this.handleCheck}
              type="checkbox"
              name="presents"
              ref={this.fieldsData.presents.refs?.postcard as React.RefObject<HTMLInputElement>}
              value="postcard"
            />
            <input
              onInput={this.handleCheck}
              type="checkbox"
              name="presents"
              ref={this.fieldsData.presents.refs?.wrapper as React.RefObject<HTMLInputElement>}
              value="wrapper"
            />
            <input
              onInput={this.handleCheck}
              type="checkbox"
              name="presents"
              ref={this.fieldsData.presents.refs?.bookmark as React.RefObject<HTMLInputElement>}
              value="bookmark"
            />
          </fieldset>
          {errorsElements[2]}
          <fieldset>
            <legend>Delivery:</legend>
            <input
              onInput={this.handleCheck}
              type="radio"
              name="send"
              ref={this.fieldsData.send.refs?.post as React.RefObject<HTMLInputElement>}
              value="post"
            />
            <input
              onInput={this.handleCheck}
              type="radio"
              name="send"
              ref={this.fieldsData.send.refs?.dhl as React.RefObject<HTMLInputElement>}
              value="dhl"
            />
            <input
              onInput={this.handleCheck}
              type="radio"
              name="send"
              ref={this.fieldsData.send.refs?.pony as React.RefObject<HTMLInputElement>}
              value="pony"
            />
          </fieldset>
          {errorsElements[3]}
          <select
            onInput={this.handleCheck}
            ref={this.fieldsData.country.ref as React.RefObject<HTMLSelectElement>}
            name="country"
            placeholder="Country"
          >
            <option value="UK">Uk</option>
            <option value="Ireland">Ireland</option>
            <option value="France">France</option>
          </select>
          {errorsElements[4]}
          <input
            onInput={this.handleCheck}
            type="text"
            ref={this.fieldsData.address.ref as React.RefObject<HTMLInputElement>}
            name="address"
            placeholder="address"
          />
          {errorsElements[5]}
          <input
            onInput={this.handleCheck}
            type="file"
            ref={this.fieldsData.invoice.ref as React.RefObject<HTMLInputElement>}
            name="invoice"
            placeholder="Upload check"
            accept=".jpg,.png,.svg"
          />
          {errorsElements[6]}
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
