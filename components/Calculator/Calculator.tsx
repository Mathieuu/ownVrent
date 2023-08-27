import { useState } from "react";
import { HouseSection } from "components/HouseSection/HouseSection";
import { InvestmentSection } from "components/InvestmentSection/InvestmentSection";
import { MortgageSection } from "components/MortgageSection/MortgageSection";
import { RentSection } from "components/RentSection/RentSection";
import { defaultHouseInput, defaultInvestmentInput, defaultMortgageInput, defaultRentInput } from "utils/defaultValues";
import { buildHouse, HouseInputType } from "utils/house";
import { buildInvestment, InvestmentInputType } from "utils/investment";
import { buildMortgage, MortgageInputType } from "utils/mortgage";
import { buildRent, RentInputType } from "utils/rent";

export function Calculator() {
  const [mortgageInput, setMortgageInput] = useState<MortgageInputType>(defaultMortgageInput);

  const mortgage = buildMortgage(mortgageInput);

  const onMortgageValuesChange = (changes: MortgageInputType) => {
    setMortgageInput({ ...mortgageInput, ...changes });
  };

  const [houseInput, setHouseInput] = useState<HouseInputType>(defaultHouseInput);

  const onHouseValuesChange = (changes: HouseInputType) => {
    setHouseInput({ ...houseInput, ...changes });
  };

  const house = buildHouse(houseInput, mortgage);

  const [rentInput, setRentInput] = useState<RentInputType>(defaultRentInput);

  const onRentValuesChange = (changes: RentInputType) => {
    setRentInput({ ...rentInput, ...changes });
  };

  const rent = buildRent(rentInput, mortgage, house);

  const [investmentInput, setInvestmentInput] = useState<InvestmentInputType>(defaultInvestmentInput);

  const onInvestmentValuesChange = (changes: InvestmentInputType) => {
    setInvestmentInput({ ...investmentInput, ...changes });
  };

  const investment = buildInvestment(investmentInput, mortgage, rent);

  return (
    <div>
      <MortgageSection onValuesChange={onMortgageValuesChange} mortgage={mortgage} mortgageInput={mortgageInput} />
      <HouseSection className="mt-8" onValuesChange={onHouseValuesChange} house={house} houseInput={houseInput} />
      <RentSection
        className="mt-8"
        onValuesChange={onRentValuesChange}
        mortgage={mortgage}
        rent={rent}
        rentInput={rentInput}
      />
      <InvestmentSection
        className="mt-8"
        onValuesChange={onInvestmentValuesChange}
        mortgage={mortgage}
        investment={investment}
        investmentInput={investmentInput}
      />
    </div>
  );
}
