import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './orderForm.css';
import { Order } from 'common/types';
import { useDispatch } from 'react-redux';
import { addNewCard } from '../../slices/OrderCardsSlice';

type Inputs = {
  name: string;
  date: string;
  quantity: number;
  presents: string[];
  send: string;
  country: string;
  address: string;
  invoice: FileList;
};

export default function OrderForms() {
  const dispatch = useDispatch();
  const [cardSubmit, setCardSubmit] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState,
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
    setCardSubmit(true);
    setTimeout(() => {
      setCardSubmit(false);
    }, 1500);
  };

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [formState, isSubmitSuccessful, reset]);

  return (
    <div className="form__wrapper">
      <h2>Form:</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Name:
          <input
            {...register('name', {
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
            {...register('date', { required: true })}
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
            {...register('quantity', { required: true, min: 1, max: 10 })}
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
              {...register('presents', { required: true })}
              autoComplete="off"
              type="checkbox"
              name="presents"
              value="postcard"
            />
          </label>
          <label>
            Wrapper:
            <input
              {...register('presents', { required: true })}
              autoComplete="off"
              type="checkbox"
              name="presents"
              value="wrapper"
            />
          </label>
          <label>
            Bookmark:
            <input
              {...register('presents', { required: true })}
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
              {...register('send', { required: true })}
              autoComplete="off"
              type="radio"
              name="send"
              value="post"
            />
          </label>
          <label>
            DHL:
            <input
              {...register('send', { required: true })}
              autoComplete="off"
              type="radio"
              name="send"
              value="dhl"
            />
          </label>
          <label>
            Pony:
            <input
              {...register('send', { required: true })}
              autoComplete="off"
              type="radio"
              name="send"
              value="pony"
            />
          </label>
        </fieldset>
        {errors.send && <div className="form-error">Please choose delivery</div>}
        <select {...register('country', { required: true })} autoComplete="off" name="country">
          <option value="">Country</option>
          <option value="UK">Uk</option>
          <option value="Ireland">Ireland</option>
          <option value="France">France</option>
        </select>
        {errors.country && <div className="form-error">Please choose country</div>}
        <label>
          Address:
          <input
            {...register('address', { required: true })}
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
