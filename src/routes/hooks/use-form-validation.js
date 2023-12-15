import { useState, useEffect } from 'react';

export const useFormValidation = (initialData, validationRules) => {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    Object.entries(validationRules).forEach(([fieldName, rules]) => {
      rules.forEach((rule) => {
        const { test, message } = rule;
        const value = fieldName.split('.').reduce((obj, key) => obj[key], data);

        if (!test(value)) {
          newErrors[fieldName] = message;
        }
      });
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  return { data, errors, validateForm, handleInputChange };
};
