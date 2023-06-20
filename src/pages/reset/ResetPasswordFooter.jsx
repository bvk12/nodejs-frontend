import { Button, Stack } from "react-bootstrap";
import { DialogTypes, routes } from "../../utils/constants";

const ResetPasswordFooter = ({ submitText }) => {
  return (
    <Stack
      direction="horizontal"
      className="justify-content-between xs-center mt-5"
    >
      <div>
        Remember Password?{" "}
        <a href={`${routes.home}#${DialogTypes.login}`}>
          <strong> Sign In</strong>
        </a>
      </div>

      <Button type="submit" variant="primary">
        {submitText}
      </Button>
    </Stack>
  );
};

export default ResetPasswordFooter;
