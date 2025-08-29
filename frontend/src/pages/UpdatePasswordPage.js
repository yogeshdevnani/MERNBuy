import UpdatePassword from "../components/Account/updatepassword";
import ErrorPage from "./ErrorPage";
function UpdatePasswordPage() {
  return (
    <div>
      {localStorage.getItem("Token") ? (
        <div>
          <UpdatePassword />
        </div>
      ) : (
        <ErrorPage />
      )}
    </div>
  );
}
export default UpdatePasswordPage;
