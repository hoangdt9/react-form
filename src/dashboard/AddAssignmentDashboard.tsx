// import {
//   Button,
//   Paper,
//   Stack,
//   Step,
//   StepButton,
//   StepContent,
//   StepLabel,
//   Stepper,
//   Typography,
// } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import { FormikProps, useFormik } from "formik";
// import { FC, ReactNode, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import BorderLinearProgress from "src/common/BorderLineProgressBar";
// import Breadcrumb from "src/common/Breadcrumb/Breadcrumb";
// import {
//   useAddNewAssignment,
//   useGetClientListForAssignmentCreation,
//   useGetDueDate,
// } from "src/services/Assignment/assignmentQueries";
// import { IAssignmentCreationForm } from "src/services/Assignment/assignmentTypes";
// import { useGetApplicableUsersForAssignmentType } from "src/services/AssignmentType/assignmentTypeQueries";
// import * as Yup from "yup";
// import BasicDetails from "./Assignment/forms/AssignmentDetails/BasicDetails";
// import DateDetails from "./Assignment/forms/AssignmentDetails/DateDetails";
// import MapRoles from "./Assignment/forms/AssignmentDetails/MapRoles";
// import SelectClient from "./Assignment/forms/SelectClient/SelectClients";
// import "./assignmentDashboard.scss";

// interface AssignmentDetailsProps {
//   assignmentCreationFormik: FormikProps<IAssignmentCreationForm>;
// }

// const AssignmentDetails: FC<AssignmentDetailsProps> = (
//   props: AssignmentDetailsProps
// ) => {
//   const { assignmentCreationFormik } = props;

//   const { data: mapRole } = useGetApplicableUsersForAssignmentType(
//     assignmentCreationFormik.values.assignment_type_id
//   );

//   const { data: dueDateInStr } = useGetDueDate(
//     assignmentCreationFormik.values.assignment_type_id,
//     assignmentCreationFormik.values.period_id
//   );

//   // const dueDate = dueDateInStr ? new Date(dueDateInStr) : new Date();

//   // if (dueDateInStr) {
//   // 	assignmentCreationFormik.setFieldValue('due_date', dueDateInStr);
//   // }
//   return (
//     <form>
//       <BasicDetails assignmentCreationFormik={assignmentCreationFormik} />
//       <MapRoles
//         mapRole={mapRole}
//         assignmentCreationFormik={assignmentCreationFormik}
//       />
//       <DateDetails
//         dueDate={dueDateInStr ?? ""}
//         assignmentCreationFormik={assignmentCreationFormik}
//       />
//     </form>
//   );
// };

// const STEPS = [
//   {
//     label: "Assignment Details",
//     description: "Type, Period, Map roles",
//     stepPoints: 50,
//   },
//   {
//     label: "Select Client",
//     description: "Single/Multiple Client selection",
//     stepPoints: 50,
//   },
// ];

// const validationSchema = (due_date: Date, companyRequired: number) =>
//   Yup.object().shape({
//     assignment_type_id: Yup.string().required("Assignment Type is required"),
//     frequency_id: Yup.string().required("Frequency is required"),
//     period_id: Yup.string().when("frequency_id", {
//       is: (frequency_id: string) => frequency_id !== "one_time",
//       then: Yup.string().required("Period is required."),
//     }),
//     one_time_assignment_name: Yup.string().when("frequency_id", {
//       is: (frequency_id: string) => frequency_id === "one_time",

//       then: Yup.string().required("Assignment name is required"),
//     }),
//     description: Yup.string()
//       .min(4, "minimum 4 character")
//       .max(30, "maximum of 30 character")
//       .matches(/^[a-zA-Z0-9\s]+$/, "special character except _ are not allowed")
//       .when("frequency_id", {
//         is: "one_time",
//         then: Yup.string().required("Description is required."),
//       }),
//     company: Yup.array()
//       .of(Yup.string())
//       .required("Required")
//       .min(companyRequired, "Atleast one should be selected"),
//     makers: Yup.array()
//       .of(Yup.string())
//       .required("Required")
//       .min(1, "Atleast one should be selected"),
//     checkers: Yup.array().of(Yup.string()),
//     approvers: Yup.array().of(Yup.string()),
//     full_name: Yup.string(),

//     target_date: Yup.date().min(
//       due_date,
//       "target date should be less than Due Date."
//     ),
//   });

// const AddAssignmentDashboard: FC<{ due_date:Date, companyRequired:number }> = (props) => {
//   const navigate = useNavigate();
//   const [activeStep, setActiveStep] = useState(0);
//   const [points, setPoints] = useState(0);
//   const theme = useTheme();
//   const { mutate: addNewAssignment } = useAddNewAssignment();
//   const isHorizontal = useMediaQuery(theme.breakpoints.down("md"));
//   const BREADCRUMBS = [
//     {
//       label: "Assignment Dashboard",
//       link: "/dashboard/assigned-to-me",
//     },
//     {
//       label: "Create New Assignment",
//       link: "",
//     },
//   ];

//   const { due_date, companyRequired } = props;

//   const assignmentCreationFormik = useFormik<IAssignmentCreationForm>({
//     initialValues: {
//       assignment_type_id: "",
//       assignment_type_name: "",
//       one_time_assignment_name: "",
//       frequency_id: "",
//       display_text: "",
//       period_id: "",
//       description: "",
//       period_name: "",
//       makers: [] as string[],
//       checkers: [] as string[],
//       approvers: [] as string[],
//       is_checker_applicable: false,
//       target_date: "",
//       due_date: null,
//       company: [] as string[],
//     },

//     validationSchema: validationSchema(due_date, companyRequired),
//     validateOnChange: false,
//     validateOnBlur: false,
//     onSubmit: () => handleCreateAssignmentForClients(),
//   });

//   const setClientListCompany = async (params: string[]) => {
//     await assignmentCreationFormik.setFieldValue("company", params);
//   };

//   const { data: selectClientList } = useGetClientListForAssignmentCreation(
//     {
//       assignment_type_id: assignmentCreationFormik.values.assignment_type_id,
//       period_id: assignmentCreationFormik.values.period_id,
//       makers: assignmentCreationFormik.values.makers,
//       checkers: assignmentCreationFormik.values.checkers,
//       approvers: assignmentCreationFormik.values.approvers,
//     },
//     activeStep === 1
//   );

//   const handleCreateAssignmentForClients = () => {
//     addNewAssignment({
//       assignment_type_id: assignmentCreationFormik.values.assignment_type_id,
//       frequency_id: assignmentCreationFormik.values.frequency_id,
//       period_id: assignmentCreationFormik.values.period_id,
//       one_time_assignment_name:
//         assignmentCreationFormik.values.one_time_assignment_name,
//       description: assignmentCreationFormik.values.description,
//       makers: assignmentCreationFormik.values.makers,
//       checkers: assignmentCreationFormik.values.checkers,
//       approvers: assignmentCreationFormik.values.approvers,
//       // due_date: assignmentCreationFormik.values.due_date,
//       target_date: assignmentCreationFormik.values.target_date,
//       client_list: assignmentCreationFormik.values.company,
//     });
//     navigate("/dashboard/assigned-to-me");
//   };

//   const handleNextStep = async () => {
//     const errorBasicDetails = await assignmentCreationFormik.validateForm();
//     const errorMapRoles = await assignmentCreationFormik.validateForm();
//     const errorClientList = await assignmentCreationFormik.validateForm();
//     switch (activeStep) {
//       case 0:
//         if (
//           !Object.keys(errorBasicDetails).length &&
//           !Object.keys(errorMapRoles).length
//         ) {
//           setActiveStep((index) => index + 1);
//           setPoints((point) => point + STEPS[activeStep].stepPoints);
//           // await handleCreateAssignmentForClients();
//         }
//         break;
//       case 1:
//         if (
//           !Object.keys(errorBasicDetails).length &&
//           !Object.keys(errorMapRoles).length &&
//           !Object.keys(errorClientList).length
//         ) {
//           handleCreateAssignmentForClients();
//         }
//         break;
//       default:
//         break;
//     }
//   };

//   const handleBackStep = () => {
//     if (activeStep === 0) {
//       navigate("/dashboard");
//     } else {
//       setActiveStep((index) => index - 1);
//       setPoints((point) => point - STEPS[activeStep].stepPoints);
//     }
//   };

//   // eslint-disable-next-line react/no-unstable-nested-components
//   const ActionItems = () => (
//     <Stack direction="row" spacing={2}>
//       <BorderLinearProgress variant="determinate" value={points} />
//       <Button
//         variant="outlined"
//         onClick={handleBackStep}
//         disabled={activeStep === 0}
//       >
//         Back
//       </Button>
//       <Button
//         variant="contained"
//         onClick={handleNextStep}
//         disabled={activeStep === STEPS.length}
//       >
//         {activeStep === STEPS.length - 1 ? "Finish" : "Next"}
//       </Button>
//     </Stack>
//   );

//   const renderByFormStep = (step: number): ReactNode => {
//     // This is straight forward approach to render step content
//     // You can also use dynamic render using map function
//     switch (step) {
//       case 0:
//         return (
//           <AssignmentDetails
//             assignmentCreationFormik={assignmentCreationFormik}
//           />
//         );
//       case 1:
//         return (
//           <SelectClient
//             selectClientList={selectClientList ?? []}
//             setClientListCompany={setClientListCompany}
//           />
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="assignment-details-container">
//       <div className="assignment-detail-header">
//         <Breadcrumb value={BREADCRUMBS} size="medium" />
//         <ActionItems />
//       </div>
//       <div className="two-column-grid">
//         <Paper className="two-column1">
//           <Stepper
//             activeStep={activeStep}
//             orientation={isHorizontal ? "horizontal" : "vertical"}
//           >
//             {STEPS.map((step) => (
//               <Step key={step.label}>
//                 <StepButton color="inherit">
//                   <StepLabel>{step.label}</StepLabel>
//                 </StepButton>
//                 {isHorizontal ? null : (
//                   <StepContent>
//                     <Typography>{step.description}</Typography>
//                   </StepContent>
//                 )}
//               </Step>
//             ))}
//           </Stepper>
//         </Paper>
//         <Paper className="two-column2">{renderByFormStep(activeStep)}</Paper>
//       </div>
//     </div>
//   );
// };


// export default AddAssignmentDashboard;
