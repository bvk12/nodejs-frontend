import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ImageUploadViewer from "../../components/ImageUploadViewer";
import "quill/dist/quill.snow.css";
import {
  IonCheckbox,  
  IonRadio,
  IonSelect,
  IonSelectOption,
  IonList,
  IonRadioGroup,
  IonItem,
  IonLabel  ,
} from "@ionic/react";
import InputField from "../../components/InputField";
import { Form } from "react-bootstrap";
import WYSIWYGEditor from "../../components/WYSIWYGEditor";

const TextInput = ({
  setValue,
  name,
  value,
  placeholder,
  type = "text",
  onChange,
}) => {
  return (
    <div className="form-control-wrap">
      <div className="form-control-hint">
        <span></span>
      </div>
      <Form.Control
        type={type}
        value={value}
        id={name}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
};

const TextArea = ({ setValue, name, value, placeholder, onChange, rows }) => {
  return (
    <div className="form-control-wrap">
      <Form.Control
        as="textarea"
        placeholder={placeholder}
        id={name}
        name={name}
        onChange={onChange}
        value={value}
        rows={rows ? rows : 3}
      ></Form.Control>
    </div>
  );
};

const DropDown = ({
  setValue,
  name,
  value,
  options,
  placeholder,
  onChange,
  register,
}) => {
  return (
    <div className="form-control-wrap">
      <Form.Select
        id={name}
        name={name}
        {...register(name)}
        onChange={(e) => {
          setValue(name, e.target.value);
        }}
      >
        {options.map((option) => (
          <option onChange={onChange} value={option}>
            {option}
          </option>
        ))}
      </Form.Select>
    </div>
  );
};

const DynamicInput = ({
  index,
  value,
  getValues,
  onChange,
  checked,
  register,
  defaultValue,
  setValue,
  type,
  name,
  label,
  helper,
  errors,
  control,
  contentState,
  rules,
  height,
  rows,
  ...rest
}) => {
  switch (type) {
    case "text":
      return (
        <>
          <InputField
            name={name}
            className="input-field "
            label={label}
            placeholder={rest?.placeholder}
            control={control}
            key={index}
            rules={rules}
            error={errors && errors[name]}
            component=<TextInput
              setValue={setValue}
              placeholder={rest?.placeholder}
              value={defaultValue}
              type={type}
              onChange={(e) => setValue(name, e.target.value)}
              name={name}
            ></TextInput>
          />
        </>
      );
    case "spacer":
      return (
        <>
          <InputField
            name={name}
            className="input-field "
            label={label}
            placeholder={rest?.placeholder}
            control={control}
            key={index}
            rules={rules}
            error={errors && errors[name]}
            component=<div>&nbsp;</div>
          />
        </>
      );
    case "number":
      return (
        <>
          <InputField
            name={name}
            className="input-field "
            label={label}
            placeholder={rest?.placeholder}
            control={control}
            key={index}
            rules={rules}
            error={errors && errors[name]}
            component=<TextInput
              setValue={setValue}
              placeholder={rest?.placeholder}
              value={defaultValue}
              onChange={(e) => setValue(name, e.target.value)}
              type="number"
              name={name}
            ></TextInput>
          />
        </>
      );

    case "image":
      return (
        <>
          <InputField
            name={name}
            className="input-field"
            label={label}
            placeholder={rest?.placeholder}
            control={control}
            key={index}
            rules={rules}
            error={errors && errors[name]}
            component=<ImageUploadViewer
              name={name}
              setValue={setValue}
              value={value}
              className="custom-input"
              placeholder={rest?.placeholder}
            />
          />
        </>
      );

    case "email":
      return (
        <InputField
          name={name}
          className="input-field "
          label={label}
          placeholder={rest?.placeholder}
          control={control}
          key={index}
          error={errors && errors[name]}
          component=<TextInput
            setValue={setValue}
            placeholder={rest?.placeholder}
            value={defaultValue}
            type="email"
            name={name}
          ></TextInput>
        />
      );

    case "textarea":
      return (
        <>
          <InputField
            name={name}
            className="input-field "
            label={label}
            placeholder={rest?.placeholder}
            control={control}
            key={index}
            rules={rules}
            error={errors && errors[name]}
            height={height}
            component=<TextArea
              autoGrow="true"
              style={{ border: "0px solid #cacaca", height: "300px" }}
              name={name}
              height={height}
              rows={rows}
              placeholder={rest?.placeholder}
              onChange={(e) => setValue(name, e.target.value)}
            />
          />
        </>
      );

    case "html":
      return (
        <>
          <InputField
            name={name}
            className="input-field "
            label={label}
            placeholder={rest?.placeholder}
            control={control}
            key={index}
            rules={rules}
            error={errors && errors[name]}
            component=<WYSIWYGEditor
              autoGrow="true"
              name={name}
              register={register}
              setValue={setValue}
              contentState={contentState}
              placeholder={rest?.placeholder}
              getValues={getValues}
            />
          />
        </>
      );

    case "radio2":
      return (
        <IonItem>
          <IonRadioGroup {...rest} {...register(name)}>
            <IonList>
              {rest?.options.map((e) => (
                <IonItem>
                  <IonLabel>{e}</IonLabel>
                  <IonRadio
                    onClick={(e) => setValue(name, e.detail.value)}
                    value={e}
                    slot="end"
                  ></IonRadio>
                </IonItem>
              ))}
            </IonList>
          </IonRadioGroup>
        </IonItem>
      );

    case "dropdown2" || "radio2":
      return (
        <>
          <IonLabel>{label}</IonLabel>
          <IonSelect
            {...register(name)}
            onIonChange={onChange}
            placeholder={rest.placeholder}
          >
            {rest?.options.map((option) => (
              <IonSelectOption>{option}</IonSelectOption>
            ))}
          </IonSelect>
        </>
      );

    case "dropdown":
      return (
        <>
          <InputField
            name={name}
            className="input-field "
            label={label}
            placeholder={rest?.placeholder}
            control={control}
            key={index}
            error={errors && errors[name]}
            component=<DropDown
              register={register}
              setValue={setValue}
              options={rest?.options}
              onChange={(e) => {
                setValue(name, e.target.value);
              }}
              placeholder={rest?.placeholder}
              value={defaultValue}
              name={name}
            ></DropDown>
          />
        </>
      );

    case "radio":
      return (
        <>
          <InputField
            name={name}
            className="input-field "
            label={label}
            placeholder={rest?.placeholder}
            control={control}
            key={index}
            error={errors && errors[name]}
            component=<DropDown
              setValue={setValue}
              options={rest?.options}
              register={register}
              onChange={(e) => {
                alert(e);
                setValue(name, e.target.value);
              }}
              placeholder={rest?.placeholder}
              value={defaultValue}
              name={name}
            ></DropDown>
          />
        </>
      );

    case "checkbox": {
      console.log("chekcbox", name, value);
      return (
        <>
          <IonItem>
            <IonCheckbox
              slot="start"
              checked={checked}
              onIonChange={({ detail: { checked } }) => setValue(name, checked)}
            />
            <IonLabel>{rest?.checkboxLabel}</IonLabel>
          </IonItem>
        </>
      );
    }

    default:
      return null;
  }
};

export default DynamicInput;
