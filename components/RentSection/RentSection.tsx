import { Card, Form } from "antd";
import InputNumber from "components/InputNumber/InputNumber";
import MoneyInput from "components/MoneyInput/MoneyInput";
import { formatMoney } from "utils/money";
import { MortgageType } from "utils/mortgage";
import { RentInputType, RentType } from "utils/rent";

type PropType = {
  onValuesChange: (changes: RentInputType) => void;
  rentInput: RentInputType;
  mortgage: MortgageType;
  rent: RentType;
  className?: string;
};

export function RentSection({ onValuesChange, rentInput, mortgage, rent, className }: PropType) {
  return (
    <div className={className}>
      <Card title="Rent">
        <Form
          layout="vertical"
          autoComplete="off"
          requiredMark={false}
          initialValues={rentInput}
          onValuesChange={onValuesChange}
        >
          <Form.Item<RentInputType>
            label="Monthly Rent"
            name="monthlyRent"
            rules={[{ required: true, message: "Please input a number" }]}
          >
            <MoneyInput />
          </Form.Item>
          <Form.Item<RentInputType>
            label="Rent Increase"
            name="rentIncrease"
            rules={[{ required: true, message: "Please input a number" }]}
          >
            <InputNumber suffix="%" />
          </Form.Item>
          <Form.Item<RentInputType>
            label="Renter Insurance"
            name="renterInsurance"
            rules={[{ required: true, message: "Please input a number" }]}
          >
            <InputNumber suffix="%" />
          </Form.Item>
        </Form>
        <div>
          {/* TODO: This gives us 31 years womp womp */}
          You will have spent <b>{formatMoney(rent.spentOnRentHistory?.at(-1))}</b> on rent in{" "}
          {mortgage.amortizationInYears ?? 0} years.
        </div>
      </Card>
    </div>
  );
}
