import { useState } from 'react';

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function updateValues(e) {
    let { value } = e.target;
    if (e.target.value === 'number') {
      value = parseInt(e.target.value);
    }
    setValues({
      // copy values
      ...values,
      [e.target.name]: value,
    });
  }
  return { values, updateValues };
}
