import { Card, Form } from "antd";
import InputNumber from "components/InputNumber/InputNumber";
import { HouseInputType, HouseType } from "utils/house";

type PropType = {
  onValuesChange: (changes: HouseInputType) => void;
  houseInput: HouseInputType;
  house: HouseType;
  className?: string;
};

export function HouseSection({ onValuesChange, houseInput, className }: PropType) {
  return (
    <div className={className}>
      <Card title="House">
        <Form
          layout="vertical"
          autoComplete="off"
          requiredMark={false}
          initialValues={houseInput}
          onValuesChange={onValuesChange}
        >
          <Form.Item<HouseInputType>
            label="Maintenance"
            name="maintenancePercent"
            rules={[{ required: true, message: "Please input a number" }]}
          >
            <InputNumber suffix="%" />
          </Form.Item>

          <Form.Item<HouseInputType>
            label="Property Tax"
            name="propertyTaxPercent"
            rules={[{ required: true, message: "Please input a number" }]}
          >
            <InputNumber suffix="%" />
          </Form.Item>

          <Form.Item<HouseInputType>
            label="Insurance"
            name="insurancePercent"
            rules={[{ required: true, message: "Please input a number" }]}
          >
            <InputNumber suffix="%" />
          </Form.Item>

          <Form.Item<HouseInputType>
            label="House Appreciation"
            name="houseAppreciationPercent"
            rules={[{ required: true, message: "Please input a number" }]}
          >
            <InputNumber suffix="%" />
          </Form.Item>

          <Form.Item<HouseInputType>
            label="Commission On Sale"
            name="commissionOnSalePercent"
            rules={[{ required: true, message: "Please input a number" }]}
          >
            <InputNumber suffix="%" />
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
