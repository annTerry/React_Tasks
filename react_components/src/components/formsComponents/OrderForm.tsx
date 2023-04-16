import React, { useState, ChangeEvent } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './orderForm.css';
import { Order, Inputs } from 'common/types';
import { useDispatch, useSelector } from 'react-redux';
import { addNewCard } from '../../slices/OrderCardsSlice';
import type { RootState } from '../../common/store';
import {
  setName,
  setAddress,
  setCountry,
  setDate,
  setPresents,
  setQuantity,
  setSend,
} from '../../slices/formsDataSlice';

export default function OrderForms() {
  const dispatch = useDispatch();
  const [cardSubmit, setCardSubmitted] = useState<boolean>(false);
  const formsValue = useSelector((state: RootState) => state.formData);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful, errors },
  } = useForm<Inputs>({ reValidateMode: 'onSubmit' });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const newOrder: Order = {
      name: data.name,
      date: data.date,
      quantity: data.quantity,
      presents: data.presents,
      send: data.send,
      country: data.country,
      address: data.address,
      invoice: URL.createObjectURL(data.invoice[0]),
    };
    dispatch(addNewCard(newOrder));
    setCardSubmitted(true);
    setTimeout(() => {
      setCardSubmitted(false);
    }, 1500);
  };

  function handleChange(event: ChangeEvent) {
    const element = event.target as HTMLInputElement;
    const value = element.value;
    const checked = element.checked;
    const name = element.name;
    if (name === 'name') dispatch(setName(value));
    if (name === 'quantity') dispatch(setQuantity(+value));
    if (name === 'address') dispatch(setAddress(value));
    if (name === 'country') dispatch(setCountry(value));
    if (name === 'send') dispatch(setSend(value));
    if (name === 'date') dispatch(setDate(value));
    if (name === 'presents') {
      let oldPresents: string[];
      if (checked) {
        oldPresents = formsValue.presents.map((val) => val);
        oldPresents.push(value);
      } else oldPresents = formsValue.presents.filter((oldValue) => oldValue != value);
      dispatch(setPresents(oldPresents));
    }
  }

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      dispatch(setName(''));
      dispatch(setQuantity(0));
      dispatch(setAddress(''));
      dispatch(setCountry(''));
      dispatch(setSend(''));
      dispatch(setDate(''));
      dispatch(setPresents([]));
      reset();
    }
  }, [dispatch, isSubmitSuccessful, reset]);

  return (
    <div className="form__wrapper">
      <h2>Form:</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Name:
          <input
            value={formsValue.name}
            {...register('name', {
              onChange: handleChange,
              required: true,
              minLength: 2,
              validate: (nameValue) => {
                if (nameValue.length > 2 && nameValue[0] != nameValue[0].toUpperCase()) {
                  return 'First letter must be capital';
                }
              },
            })}
            autoComplete="off"
            type="text"
            id="form-name"
            name="name"
            placeholder="Your Name"
          />
        </label>
        {errors.name && (
          <div className="form-error">
            Name is required, must have at least two symbols and begins with capital letter
          </div>
        )}
        <label>
          Date:
          <input
            value={formsValue.date}
            {...register('date', { onChange: handleChange, required: true })}
            autoComplete="off"
            type="date"
            id="form-name"
            name="date"
            placeholder="Date"
          />
        </label>
        {errors.date && <div className="form-error">Date is required</div>}
        <label>
          Quantity:
          <input
            value={formsValue.quantity > 0 ? formsValue.quantity : ''}
            {...register('quantity', { onChange: handleChange, required: true, min: 1, max: 10 })}
            autoComplete="off"
            type="number"
            name="quantity"
            placeholder="Quantity"
          />
        </label>
        {errors.quantity && (
          <div className="form-error">Quantity is required and must be less then 10</div>
        )}
        <fieldset>
          <legend>Add presents:</legend>
          <label>
            Postcard:
            <input
              checked={formsValue.presents.includes('postcard')}
              {...register('presents', { onChange: handleChange, required: true })}
              autoComplete="off"
              type="checkbox"
              name="presents"
              value="postcard"
            />
          </label>
          <label>
            Wrapper:
            <input
              checked={formsValue.presents.includes('wrapper')}
              {...register('presents', { onChange: handleChange, required: true })}
              autoComplete="off"
              type="checkbox"
              name="presents"
              value="wrapper"
            />
          </label>
          <label>
            Bookmark:
            <input
              checked={formsValue.presents.includes('bookmark')}
              {...register('presents', { onChange: handleChange, required: true })}
              autoComplete="off"
              type="checkbox"
              name="presents"
              value="bookmark"
            />
          </label>
        </fieldset>
        {errors.presents && <div className="form-error">Please choose present</div>}
        <fieldset>
          <legend>Delivery:</legend>
          <label>
            Post:
            <input
              checked={formsValue.send === 'post'}
              {...register('send', { onChange: handleChange, required: true })}
              autoComplete="off"
              type="radio"
              name="send"
              value="post"
            />
          </label>
          <label>
            DHL:
            <input
              checked={formsValue.send === 'dhl'}
              {...register('send', { onChange: handleChange, required: true })}
              autoComplete="off"
              type="radio"
              name="send"
              value="dhl"
            />
          </label>
          <label>
            Pony:
            <input
              checked={formsValue.send === 'pony'}
              {...register('send', { onChange: handleChange, required: true })}
              autoComplete="off"
              type="radio"
              name="send"
              value="pony"
            />
          </label>
        </fieldset>
        {errors.send && <div className="form-error">Please choose delivery</div>}
        <select
          {...register('country', { onChange: handleChange, required: true })}
          autoComplete="off"
          name="country"
          defaultValue={formsValue.country}
        >
          <option value="">Country</option>
          <option value="UK">Uk</option>
          <option value="Ireland">Ireland</option>
          <option value="France">France</option>
        </select>
        {errors.country && <div className="form-error">Please choose country</div>}
        <label>
          Address:
          <input
            value={formsValue.address}
            {...register('address', { onChange: handleChange, required: true })}
            autoComplete="off"
            type="text"
            name="address"
            placeholder="address"
          />
        </label>
        {errors.address && <div className="form-error">Please enter your address</div>}
        <label>
          Invoice:
          <input
            {...register('invoice', {
              required: true,
              validate: (invoiceValue) => {
                const correctValue = invoiceValue as FileList;
                if (correctValue && correctValue.length > 0) {
                  if (!/^image/.test(correctValue[0].type)) {
                    return 'add picture';
                  }
                }
              },
            })}
            autoComplete="off"
            type="file"
            name="invoice"
            placeholder="Upload check"
            accept=".jpg,.png,.svg"
          />
        </label>
        {errors.invoice && <div className="form-error">Please add invoice image</div>}
        <input className="form__submit-button" type="submit" value="Submit" />
      </form>
      {cardSubmit && <div className="data-submit-info">Submitted!</div>}
    </div>
  );
}
