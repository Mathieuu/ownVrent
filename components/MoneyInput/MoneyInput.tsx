import { InputNumberProps } from "antd";
import InputNumber from "components/InputNumber/InputNumber";

const MoneyInput: React.FC<InputNumberProps> = (props) => {
  return <InputNumber prefix="$" {...props} />;
};

export default MoneyInput;
