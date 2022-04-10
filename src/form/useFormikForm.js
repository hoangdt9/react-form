import React from "react";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.css";

const LoginSchema = (dua_date) => Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address format")
        .required("Email is required"),
    date: Yup.date()
        // .required("Date is required")
        .min(dua_date, "Date cannot be in the past"),
});


const initialValues = { email: "", date: "" };
const handleSubmit = (values) => {
    console.log(values);
    alert("Form is validated! Submitting the form...");
};

const UseFormikForm = () => {
    const dua_date = new Date(2021, 11, 24, 10, 33, 30, 0);// first step

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: handleSubmit,
        validationSchema: LoginSchema(dua_date)
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email">Email Address</label>
            <input
                id="email"
                name="email"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.firstName}
            />
            <label htmlFor="date">Date</label>
            <input
                id="date"
                name="date"
                type="date"
                onChange={formik.handleChange}
                value={formik.values.lastName}
            />
            {!!formik.errors.date && <text>{formik.errors.date}</text>}
            <button type="submit">Submit</button>
        </form>
    );
}

export default UseFormikForm;
