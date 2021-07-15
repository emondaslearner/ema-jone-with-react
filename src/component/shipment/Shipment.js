import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { theme } from '../../App';
import './Shipment.css';

const Shipment = () => {
    const [loginUser,setLoginUser] = useContext(theme);
    console.log(loginUser);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form className="hook-form" onSubmit={handleSubmit(onSubmit)}>

      <input placeholder="Write your name" defaultValue={loginUser.displayName} className="hook-input" {...register("name", { required: true })} />
      {errors.name && <span>Name is required</span>}

      <input placeholder="Write your email" defaultValue={loginUser.email} className="hook-input" {...register("email", { required: true })} />
      {errors.email && <span>Email is required</span>}

      <input placeholder="Write your address" className="hook-input" {...register("address", { required: true })} />
      {errors.address && <span>Address is required</span>}

      <input placeholder="Write your phone number" className="hook-input" {...register("phone", { required: true })} />
      {errors.phone && <span>Phone number is required</span>}
      
      <input className="hook-input" type="submit" />
    </form>
  );
};

export default Shipment;