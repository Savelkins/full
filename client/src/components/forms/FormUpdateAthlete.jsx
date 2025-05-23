import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CONSTANTS from "../../constants";
import { updateAthleteByIdAsync } from "../../store/athletesSlice";
import { fetchAllSportsAsync } from "../../store/sportsSlice";
import { updateValidateSchema } from "../../validation/athlete.validate";
import styles from "./form.module.scss";

const FormUpdateAthlete = ({ athlete, handleShowForm }) => {
  const dispatch = useDispatch();
  const { sports, isLoading, error } = useSelector((state) => state.sports);

  useEffect(() => {
    dispatch(fetchAllSportsAsync());
  }, [dispatch]);

  const initialValues = {
    name: athlete?.name || "",
    country: athlete?.country || "",
    birthYear: athlete?.birthYear || "",
    sportId: athlete?.sportId?._id || "",
    avatar: "",
  };

  const onSubmit = (values) => {
    console.log(values);
    dispatch(updateAthleteByIdAsync({ id: athlete._id, formData: values }));
    handleShowForm();
  };

  const showCountry = (country) => (
    <option value={country} key={country}>
      {country}
    </option>
  );
  const showSport = (sport) => (
    <option value={sport.id} key={sport.id}>
      {sport.name}
    </option>
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={updateValidateSchema}
    >
      {({ setFieldValue, values }) => {
        return (
          <Form className={styles.form}>
            <label>
              <span>Name</span>
              <Field name="name" />
              <ErrorMessage name="name" />
            </label>
            <label>
              <span>Country</span>
              <select
                name="country"
                value={values.country}
                onChange={(event) =>
                  setFieldValue(
                    "country",
                    event.currentTarget.selectedOptions[0].value
                  )
                }
              >
                <option value="">Select a country</option>
                {CONSTANTS.COUNTRIES.map(showCountry)}
              </select>
              <ErrorMessage name="country" />
            </label>
            <label>
              <span>birth of athlete</span>
              <Field
                name="birthYear"
                type="number"
                min="1900"
                max={new Date().getFullYear() - 15}
              />
              <ErrorMessage name="birthYear" />
            </label>
            <label>
              <span>Sport</span>
              <select
                name="sportId"
                value={values.sportId}
                onChange={(event) =>
                  setFieldValue(
                    "sportId",
                    event.currentTarget.selectedOptions[0].value
                  )
                }
              >
                <option>choose sport</option>
                {sports.map(showSport)}
              </select>
              <ErrorMessage name="sportId" />
            </label>
            <label>
              <span>Add picture</span>
              <input
                name="avatar"
                type="file"
                onChange={(event) => {
                  setFieldValue("avatar", event.currentTarget.files[0]);
                }}
              />
              <ErrorMessage name="avatar" />
            </label>
            <button type="submit">Update</button>
          </Form>
        );
      }}
    </Formik>
  );
};
export default FormUpdateAthlete;
