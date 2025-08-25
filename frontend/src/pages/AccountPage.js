import Account from "../components/Account/account";
import ErrorPage from "../components/ErrorPage";

function AccoutPage() {
  return (
    <div>
      {localStorage.getItem("Token") ? (
        <div>
          <Account />
        </div>
      ) : (
        <ErrorPage />
      )}
    </div>
  );
}
export default AccoutPage;
