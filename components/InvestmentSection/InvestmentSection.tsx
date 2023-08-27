import { Card, Form } from "antd";
import InputNumber from "components/InputNumber/InputNumber";
import { InvestmentInputType, InvestmentType } from "utils/investment";
import { formatMoney } from "utils/money";
import { MortgageType } from "utils/mortgage";

type PropType = {
  onValuesChange: (changes: InvestmentInputType) => void;
  investmentInput: InvestmentInputType;
  mortgage: MortgageType;
  investment: InvestmentType;
  className?: string;
};

export function InvestmentSection({ onValuesChange, investmentInput, mortgage, investment, className }: PropType) {
  return (
    <div className={className}>
      <Card title="Renter's investments">
        <Form
          layout="vertical"
          autoComplete="off"
          requiredMark={false}
          initialValues={investmentInput}
          onValuesChange={onValuesChange}
        >
          <Form.Item<InvestmentInputType>
            label="Invesment Return"
            name="investmentReturn"
            rules={[{ required: true, message: "Please input a number" }]}
          >
            <InputNumber suffix="%" />
          </Form.Item>
          <Form.Item<InvestmentInputType>
            label="Investment Tax Rate"
            name="investmentTaxRate"
            rules={[{ required: true, message: "Please input a number" }]}
          >
            <InputNumber suffix="%" />
          </Form.Item>
        </Form>
        <div>
          {/* TODO: This gives us 31 years womp womp */}
          Your investment portfolio will be worth <b>
            {formatMoney(investment?.portfolioValueHistory.at(-1))}
          </b> after {mortgage.amortizationInYears ?? 0} full years.
        </div>
        <div>
          If you sold your portolio after {mortgage.amortizationInYears ?? 0} full years, you would net{" "}
          <b>{formatMoney(investment?.netPortfolioValueIfSoldHistory.at(-1))}</b>
        </div>
      </Card>
    </div>
  );
}
