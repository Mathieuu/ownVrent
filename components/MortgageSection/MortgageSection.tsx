import { Card, Form } from "antd";
import { useState } from "react";
import InputNumber from "components/InputNumber/InputNumber";
import MoneyInput from "components/MoneyInput/MoneyInput";
import { formatMoney } from "utils/money";
import { buildMortgage, MortgageInputType } from "utils/mortgage";

export function MortgageSection() {
  const [mortgageInput, setMortgageInput] = useState<MortgageInputType>({
    housePrice: 500_000,
    closingCosts: 0,
    downpayment: 180_000,
    amortizationInYears: 30,
    compoundedPerYears: 2,
    interestRatePerYear: 4.9,
  });

  const mortgage = buildMortgage(mortgageInput);

  const onValuesChange = (changes: MortgageInputType) => {
    setMortgageInput({ ...mortgageInput, ...changes });
  };

  return (
    <Card title="Mortgage">
      <Form
        layout="vertical"
        autoComplete="off"
        requiredMark={false}
        initialValues={mortgageInput}
        onValuesChange={onValuesChange}
      >
        <Form.Item<MortgageInputType>
          label="House price"
          name="housePrice"
          rules={[{ required: true, message: "Please input a number" }]}
        >
          <MoneyInput />
        </Form.Item>
        <Form.Item<MortgageInputType>
          label="Downpayment"
          name="downpayment"
          rules={[{ required: true, message: "Please input a number" }]}
        >
          <MoneyInput />
        </Form.Item>
        <Form.Item<MortgageInputType>
          label="Amortization"
          name="amortizationInYears"
          rules={[{ required: true, message: "Please input a number of years" }]}
        >
          <InputNumber suffix="years" />
        </Form.Item>
        <Form.Item<MortgageInputType>
          label="Interest rate"
          name="interestRatePerYear"
          rules={[{ required: true, message: "Please input a number" }]}
        >
          <InputNumber suffix="%" />
        </Form.Item>
      </Form>

      <div>
        Your monthly payments will be <b>{formatMoney(mortgage.paymentsPerMonth)}</b>.
      </div>
    </Card>
  );
}
