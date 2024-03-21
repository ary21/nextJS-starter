import { useState } from 'react';

export const useForm = (initialState, handleAction) => {
  const [formState, setFormState] = useState(initialState);

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAction(formState);
  };

  const handleReset = (initialState) => {
    setFormState(initialState);
  }

  return { formState, handleChange, handleReset, handleSubmit };
};