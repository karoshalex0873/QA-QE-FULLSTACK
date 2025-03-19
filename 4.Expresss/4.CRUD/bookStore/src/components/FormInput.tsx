import { FormInputProps } from "../utils/types";

const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div>
      <label className="text-md font-medium text-gray-700 px-2">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required // This makes the input required
        className="w-full px-4 py-2 bg-gray-700/20 rounded-md focus:outline-none focus:bg-primary/20"
      />
    </div>
  );
};

export default FormInput;
