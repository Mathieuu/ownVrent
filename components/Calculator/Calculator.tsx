import { useState } from "react";
import { HouseSection } from "components/HouseSection/HouseSection";
import { MortgageSection } from "components/MortgageSection/MortgageSection";
import { RentSection } from "components/RentSection/RentSection";
import { defaultHouseInput, defaultMortgageInput, defaultRentInput } from "utils/defaultValues";
import { buildHouse, HouseInputType } from "utils/house";
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
    </div>
  );
}
