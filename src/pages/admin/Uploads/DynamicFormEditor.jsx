import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const DynamicFormEditor = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState(initialData);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      data: {
        ...formData.data,
        [name]: value
      }
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      {Object.entries(formData.metaData).map(([key, metadata]) => (
        <Form.Group key={key}>
          <Form.Label>{metadata.label}</Form.Label>
          <Form.Control
            as={metadata.type}
            name={key}
            placeholder={metadata.placeholder}
            value={formData.data[key]}
            onChange={handleInputChange}
            isInvalid={formData.metaData[key].rules.required && !formData.data[key]}
          />
          {formData.metaData[key].rules.required && (
            <Form.Control.Feedback type="invalid">{formData.metaData[key].rules.required}</Form.Control.Feedback>
          )}
        </Form.Group>
      ))}
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default DynamicFormEditor;
