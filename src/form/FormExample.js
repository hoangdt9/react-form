import React from "react";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.css";
import dayjs from "dayjs";

const LoginSchema = (due_date) => Yup.object().shape({
	email: Yup.string()
		.email("Invalid email address format")
		.required("Email is required"),
	date: Yup.date()
		// .required("Date is required")
		.min(due_date, "Date cannot be in the past"),
});


const initialValues = { email: "", date: "" };
const handleSubmit = (values) => {
	console.log(values);
	alert("Form is validated! Submitting the form...");
};
const FormExample = () => {
	const dueDateStr = "2022-03-16";
	const dayJs = dayjs(dueDateStr, "YYYY-MM-DD")
	const due_date = new Date(dayJs)
	console.log(due_date);

	return (
		<div className="container">
			<div className="row">
				<div className="col-lg-12">
					<Formik
						initialValues={initialValues}
						validationSchema={LoginSchema(due_date)}
						onSubmit={handleSubmit}
					>
						{({ touched, errors, isSubmitting, values }) =>
							!isSubmitting ? (
								<div>
									<div className="row mb-5">
										<div className="col-lg-12 text-center">
											<h1 className="mt-5">Login Form</h1>
										</div>
									</div>
									<Form>
										<div className="form-group">
											<label htmlFor="email">Email</label>
											<Field
												type="email"
												name="email"
												placeholder="Enter email"
												autocomplete="off"
												className={`mt-2 form-control 
														${touched.email && errors.email ? "is-invalid" : ""}`}
											/>

											<ErrorMessage
												component="div"
												name="email"
												className="invalid-feedback"
											/>
										</div>

										<div className="form-group">
											<label htmlFor="date" className="mt-3">
												Date
											</label>
											<Field
												type="date"
												name="date"
												placeholder="Enter Date"
												className={`mt-2 form-control
														${touched.date && errors.date
														? "is-invalid"
														: ""}`}
											/>
											<ErrorMessage
												component="div"
												name="date"
												className="invalid-feedback"
											/>
										</div>

										<button
											type="submit"
											className="btn btn-primary btn-block mt-4">
											Submit
										</button>
									</Form>
								</div>
							) : (
								<div>
									<h1 className="p-3 mt-5">Form Submitted</h1>

									<div className="alert alert-success mt-3">
										Thank for your connecting with us. Here's what we got from
										you !
									</div>
									<ul className="list-group">
										<li className="list-group-item">Email: {values.email}</li>
										<li className="list-group-item">
											Password: {values.password}
										</li>
									</ul>
								</div>
							)
						}
					</Formik>
				</div>
			</div>
		</div>
	);
}

export default FormExample;
