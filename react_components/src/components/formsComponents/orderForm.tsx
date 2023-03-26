import React from 'react';
import { OrderFormsType, FieldObject, OneFieldObject, OrderData, Order } from '../../common/types';
import './orderForm.css';

export default class OrderForms extends React.Component<OrderData> {
  fieldsData = new FieldObject();
  state: OrderFormsType = {
    errors: {},
  };

  constructor(props: OrderData) {
    super(props);
    this.handleSend = this.handleSend.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.setRefs();
  }

  setRefs() {
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
    this.fieldsData.date.ref = React.createRef() as React.RefObject<HTMLInputElement>;
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
    const newOrder: Order = {
      name: '',
      date: '',
      quantity: 1,
      presents: [''],
      send: '',
      country: '',
      address: '',
      invoice: '',
    };
    event.preventDefault();
    const error: { [key: string]: string } = {};

    if (!this.fieldsData.name.check()) {
      error.name = 'Enter the name';
    } else {
      newOrder.name = this.fieldsData.name.ref?.current?.value as string;
    }

    if (!this.fieldsData.date.check()) {
      error.date = 'Set the date';
    } else {
      newOrder.date = this.fieldsData.date.ref?.current?.value as string;
    }

    if (!this.fieldsData.quantity.check()) {
      error.quantity = 'Quantity must be more then zero and not more then 9';
    } else {
      const quantity = this.fieldsData.quantity.ref?.current?.value as string;
      newOrder.quantity = +quantity;
    }

    if (!this.fieldsData.presents.check()) {
      error.presents = 'Choose at least one present';
    } else {
      if (this.fieldsData.presents.refs) {
        const presents = Object.values(this.fieldsData.presents.refs).filter(
          (data) => data.current?.checked
        );
        newOrder.presents = presents.map((data) => data.current?.value as string);
      }
    }

    if (!this.fieldsData.send.check()) {
      error.send = 'Choose send type';
    } else {
      if (this.fieldsData.send.refs) {
        const send = Object.values(this.fieldsData.send.refs).filter(
          (data) => data.current?.checked
        );
        newOrder.send = send.map((data) => data.current?.value).join('');
      }
    }

    if (!this.fieldsData.country.check()) {
      error.country = 'Choose country';
    } else {
      newOrder.country = this.fieldsData.country.ref?.current?.value as string;
    }

    if (!this.fieldsData.address.check()) {
      error.address = 'Enter your address';
    } else {
      const address = this.fieldsData.address.ref?.current?.value as string;
      newOrder.address = address;
    }

    if (this.fieldsData.invoice.check()) {
      const fileInputRef = this.fieldsData.invoice.ref?.current as HTMLInputElement;
      const fileResults = fileInputRef.files;
      if (fileResults) newOrder.invoice = URL.createObjectURL(fileResults[0]);
    } else {
      error.invoice = 'Add File';
    }

    if (Object.keys(error).length > 0) {
      this.setState({ errors: error });
    } else {
      this.props.saveOrder(newOrder);
      this.clearFields();
    }
  }

  clearFields() {
    for (const field of Object.values(this.fieldsData)) {
      if (field.ref && field.ref.current) field.ref.current.value = '';
      if (field.refs) {
        Object.values(field.refs).forEach((data) => {
          const checkField = data as React.RefObject<HTMLInputElement>;
          if (checkField.current) {
            checkField.current.checked = false;
          }
        });
      }
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
      <div className="form__wrapper">
        <h2>Form:</h2>
        <form onSubmit={this.handleSend}>
          <label>
            Name:
            <input
              autoComplete="off"
              onInput={this.handleCheck}
              type="text"
              id="form-name"
              ref={this.fieldsData.name.ref as React.RefObject<HTMLInputElement>}
              name="name"
              placeholder="Your Name"
            />
          </label>
          {errorsElements[0]}
          <label>
            Date:
            <input
              autoComplete="off"
              onInput={this.handleCheck}
              type="date"
              id="form-name"
              ref={this.fieldsData.date.ref as React.RefObject<HTMLInputElement>}
              name="date"
              placeholder="Date"
            />
          </label>
          {errorsElements[1]}
          <label>
            Quantity:
            <input
              autoComplete="off"
              onInput={this.handleCheck}
              type="number"
              ref={this.fieldsData.quantity.ref as React.RefObject<HTMLInputElement>}
              name="quantity"
              placeholder="Quantity"
            />
          </label>
          {errorsElements[2]}
          <fieldset>
            <legend>Add presents:</legend>
            <label>
              Postcard:
              <input
                autoComplete="off"
                onInput={this.handleCheck}
                type="checkbox"
                name="presents"
                ref={this.fieldsData.presents.refs?.postcard as React.RefObject<HTMLInputElement>}
                value="postcard"
              />
            </label>
            <label>
              Wrapper:
              <input
                onInput={this.handleCheck}
                autoComplete="off"
                type="checkbox"
                name="presents"
                ref={this.fieldsData.presents.refs?.wrapper as React.RefObject<HTMLInputElement>}
                value="wrapper"
              />
            </label>
            <label>
              Bookmark:
              <input
                onInput={this.handleCheck}
                autoComplete="off"
                type="checkbox"
                name="presents"
                ref={this.fieldsData.presents.refs?.bookmark as React.RefObject<HTMLInputElement>}
                value="bookmark"
              />
            </label>
          </fieldset>
          {errorsElements[3]}
          <fieldset>
            <legend>Delivery:</legend>
            <label>
              Post:
              <input
                autoComplete="off"
                onInput={this.handleCheck}
                type="radio"
                name="send"
                ref={this.fieldsData.send.refs?.post as React.RefObject<HTMLInputElement>}
                value="post"
              />
            </label>
            <label>
              DHL:
              <input
                autoComplete="off"
                onInput={this.handleCheck}
                type="radio"
                name="send"
                ref={this.fieldsData.send.refs?.dhl as React.RefObject<HTMLInputElement>}
                value="dhl"
              />
            </label>
            <label>
              Pony:
              <input
                autoComplete="off"
                onInput={this.handleCheck}
                type="radio"
                name="send"
                ref={this.fieldsData.send.refs?.pony as React.RefObject<HTMLInputElement>}
                value="pony"
              />
            </label>
          </fieldset>
          {errorsElements[4]}
          <select
            autoComplete="off"
            onInput={this.handleCheck}
            ref={this.fieldsData.country.ref as React.RefObject<HTMLSelectElement>}
            name="country"
          >
            <option value="">Country</option>
            <option value="UK">Uk</option>
            <option value="Ireland">Ireland</option>
            <option value="France">France</option>
          </select>
          {errorsElements[5]}
          <label>
            Address:
            <input
              autoComplete="off"
              onInput={this.handleCheck}
              type="text"
              ref={this.fieldsData.address.ref as React.RefObject<HTMLInputElement>}
              name="address"
              placeholder="address"
            />
          </label>
          {errorsElements[6]}
          <label>
            Invoice:
            <input
              autoComplete="off"
              onInput={this.handleCheck}
              type="file"
              ref={this.fieldsData.invoice.ref as React.RefObject<HTMLInputElement>}
              name="invoice"
              placeholder="Upload check"
              accept=".jpg,.png,.svg"
            />
          </label>
          {errorsElements[7]}
          <input className="form__submit-button" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
