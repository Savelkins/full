import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreateSportAsync } from "../../store/sportsSlice";
import { createValidateSchema } from "../../validation/sport.validate";
import styles from "./form.module.scss";
import { useNavigate } from "react-router-dom";

const FormCreateSport = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.sports);
  const onSubmit = (values, formikBag) => {
    dispatch(fetchCreateSportAsync(values));
    formikBag.resetForm();
    navigate("/");
  };
  return (
    <Formik
      initialValues={{ name: "", isOlimpic: false, image: "" }}
      onSubmit={onSubmit}
      validationSchema={createValidateSchema}
    >
      {({ setFieldValue }) => (
        <Form className={styles.form}>
          <p>{error && "Sport already exists "}</p>
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
            <input
              name="image"
              type="file"
              onChange={(event) => {
                setFieldValue("image", event.currentTarget.files[0]);
              }}
            />
            <ErrorMessage name="image" />
          </label>
          <button type="submit">Create</button>
        </Form>
      )}
    </Formik>
  );
};
export default FormCreateSport;
