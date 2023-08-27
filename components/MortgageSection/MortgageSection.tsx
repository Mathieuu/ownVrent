import { Card, Form } from "antd";
import InputNumber from "components/InputNumber/InputNumber";
import MoneyInput from "components/MoneyInput/MoneyInput";
import { formatMoney } from "utils/money";
import { MortgageInputType, MortgageType } from "utils/mortgage";

type PropType = {
  onValuesChange: (changes: MortgageInputType) => void;
  mortgageInput: MortgageInputType;
  mortgage: MortgageType;
  className?: string;
};

export function MortgageSection({ onValuesChange, mortgageInput, mortgage, className }: PropType) {
  return (
    <div className={className}>
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
          Your monthly payments will be <b>{formatMoney(mortgage.paymentEachMonth)}</b>.
        </div>
        <div>
          You will repay <b>{formatMoney(mortgage.totalRepaid)}</b> for borrowing{" "}
          <b>{formatMoney(mortgage.leftToPay)}</b>.
        </div>
      </Card>
    </div>
  );
}
