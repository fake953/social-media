import swal from "sweetalert";
const alertFunction = (value: string) => {
  return swal(
    "Ops",
    `please login or create an account to ${value} !`,
    "warning"
  );
};
export default alertFunction;
