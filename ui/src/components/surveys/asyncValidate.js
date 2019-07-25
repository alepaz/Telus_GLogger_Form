import Axios from "axios";
import Swal from "sweetalert2";
import { colorAccessibleGreen } from "@tds/core-colours";
import "../../css/styles.css"; // Import regular stylesheet

const asyncValidate = async (values /*, dispatch */) => {
  const errors = {};
  console.log("values:", values);
  if (values.hasOwnProperty('id')) {
    //If employee has an ID, he is registered
    console.log("Employee ID", values["id"]);
    const employee = await Axios.get(`/api/employees/${values["id"]}`);
    //If employee email is different we must validate
    console.log("Employee data:", employee.data);
    if (employee.data.length) {
      if (
        employee.data[0].email.trim().toLowerCase() ===
        values["email"].trim().toLowerCase()
      ) {
        console.log("Same email not worry");
      } else {
        //Lets verify if email is available
        const email = await Axios.get(
          `/api/employees?email=${values["email"]}`
        );
        console.log("repeated email:", email.data);
        if (email.data.length) {
          console.log("I've entered", email.data.length);
          //Another person has this email
          
          Swal.fire({
            type: "error",
            title: "Email",
            confirmButtonColor: colorAccessibleGreen,
            text: "You cannot take an email that is already used"
          });
          throw { username: 'That username is taken' };
        }
      }
      console.log("Employee email:", employee.data[0].email);
    }
  } else {
    //Lets verify if email is available
    const email = await Axios.get(`/api/employees?email=${values["email"]}`);
    console.log("repeated email:", email.data);
    if (email.data.length) {
      console.log("I've entered", email.data.length);
      //Another person has this email
      Swal.fire({
        type: "error",
        title: "Email",
        confirmButtonColor: colorAccessibleGreen,
        text: "You cannot take an email that is already used"
      });
      throw { username: 'That username is taken' };
    }
  }

  return errors;
};

export default asyncValidate;
