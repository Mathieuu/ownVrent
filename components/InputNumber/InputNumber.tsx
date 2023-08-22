import { InputNumber as AntdInputNumber } from "antd";
import { InputNumberProps } from "antd/lib/input-number";

const InputNumber: React.FC<InputNumberProps> = (props) => {
  return (
    <AntdInputNumber
      controls={false}
      style={{ width: "100%", minWidth: 90, maxWidth: 180 }}
      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      parser={(value) => (value ?? "").replace(/(,*)/g, "")}
      {...props}
    />
  );
};

export default InputNumber;
