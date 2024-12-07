import { Button } from "../ui/button";
import FormControls from "./form-controls";
import PropTypes from 'prop-types';
CommonForm.propTypes = {
  formControls: PropTypes.array.isRequired,
  buttonText: PropTypes.string.isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  isButtonDisabled: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  buttonClass: PropTypes.string,
};
function CommonForm({
  handleSubmit,
  buttonText,
  formControls = [],
  formData,
  setFormData,
  isButtonDisabled = false,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {/* render form controls here */}
      <FormControls
        formControls={formControls}
        formData={formData}
        setFormData={setFormData}
      />
      <Button disabled={isButtonDisabled} type="submit" className="mt-5 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

export default CommonForm;
