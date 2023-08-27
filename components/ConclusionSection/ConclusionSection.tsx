import { Card, Table } from "antd";
import { ConclusionType } from "utils/conclusion";
import { formatMoney } from "utils/money";

type PropType = {
  conclusion: ConclusionType;
  className?: string;
};

export function ConclusionSection({ conclusion, className }: PropType) {
  const columns = [
    {
      key: "year",
      title: "Year",
      dataIndex: "year",
      render: (year: number) => <b>{year}</b>,
    },
    {
      key: "renterAhead",
      title: "Renter Ahead (Without Selling)",
      dataIndex: "renterAhead",
      render: (renterAhead: number) => formatMoney(renterAhead),
    },
    {
      key: "renterAheadAfterSelling",
      title: "Renter Ahead (After Selling + Taxes)",
      dataIndex: "renterAheadAfterSelling",
      render: (renterAhead: number) => formatMoney(renterAhead),
    },
  ];

  const data = [];
  const nextYear = new Date().getFullYear() + 1;

  for (let i = 0; i < conclusion.renterAheadHistory.length; i++) {
    data.push({
      key: i,
      year: nextYear + i,
      renterAhead: conclusion.renterAheadHistory[i],
      renterAheadAfterSelling: conclusion.renterAheadAfterSellingHistory[i],
    });
  }

  return (
    <div className={className}>
      <Card title="Conclusion">
        <Table columns={columns} dataSource={data} pagination={false} />
      </Card>
    </div>
  );
}
