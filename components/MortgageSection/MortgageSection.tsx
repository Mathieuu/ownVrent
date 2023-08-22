import { Card, Form } from "antd";
import InputNumber from "components/InputNumber/InputNumber";
import MoneyInput from "components/MoneyInput/MoneyInput";

type FieldType = {
  housePrice?: number;
  downpayment?: number;
  amortizationInYears?: number;
  interestRatePerYear?: number;
};

export function MortgageSection() {
  return (
    <Card title="Mortgage">
      <Form layout="vertical" autoComplete="off" requiredMark={false}>
        <Form.Item<FieldType>
          label="House price"
          name="housePrice"
          rules={[{ required: true, message: "Please input a number" }]}
        >
          <MoneyInput />
        </Form.Item>
        <Form.Item<FieldType>
          label="Downpayment"
          name="downpayment"
          rules={[{ required: true, message: "Please input a number" }]}
        >
          <MoneyInput />
        </Form.Item>
        <Form.Item<FieldType>
          label="Amortization"
          name="amortizationInYears"
          rules={[{ required: true, message: "Please input a number of years" }]}
        >
          <InputNumber suffix="years" />
        </Form.Item>
      </Form>
    </Card>
  );
}
