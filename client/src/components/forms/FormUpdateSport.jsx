import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { updateSportByIdAsync } from "../../store/sportsSlice";
import { updateValidateSchema } from "../../validation/sport.validate";
import styles from "./form.module.scss";
const FormUpdateSport = ({ sport, handleShowForm }) => {
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    const formData = new FormData();
    if (values.name) {
      formData.append("name", values.name);
    }
    formData.append("isOlimpic", values.isOlimpic);
    if (values.image) {
      formData.append("image", values.image);
    }
    dispatch(updateSportByIdAsync({ id: sport._id, formData }));
    handleShowForm();
  };

  const initialValues = {
    name: sport.name || "",
    isOlimpic: sport.isOlimpic || false,
    image: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validateSchema={updateValidateSchema}
      onSubmit={onSubmit}
    >
      {({ setFieldValue }) => {
        const handleImage = (event) => {
          setFieldValue("image", event.currentTarget.files[0]);
        };
        return (
          <Form className={styles.form}>
            <label>
              <span>Name of sport</span>
              <Field name="name" />
              <ErrorMessage name="name" />
            </label>
            <label>
              <span>Choose olimpic</span>
              <Field name="isOlimpic" type="checkbox" />
              <ErrorMessage name="isOlimpic" />
            </label>
            <label>
              <span>Add picture</span>
              <input name="image" type="file" onChange={handleImage} />
              <ErrorMessage name="image" />
            </label>
            <button type="submit">Update</button>
          </Form>
        );
      }}
    </Formik>
  );
};
export default FormUpdateSport;
