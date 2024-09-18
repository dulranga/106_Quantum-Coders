"use client";

import { findApplicant } from "@/constants/applicants";
import { Avatar, Table } from "antd";
import { ColumnType } from "antd/es/table";
import { useParams } from "next/navigation";

const ComparisonTable = ({ dataSource }: any) => {
  const { candidateA: a, candidateB: b } = useParams<Record<string, string>>();

  const candidateA = findApplicant(a)!;
  const candidateB = findApplicant(b)!;

  const columns: ColumnType[] = [
    {
      title: "Fields",
      dataIndex: "topic",
    },
    {
      title: (
        <div className="flex items-center justify-center gap-2">
          <Avatar
            shape="circle"
            alt={candidateA.name}
            size={50}
            src={candidateA.src}
          >
            {candidateA.name}
          </Avatar>
          <span>{candidateA.name}</span>
        </div>
      ),
      dataIndex: "candidateA",
      render: (manifesto) => (
        <div>
          <div>🔴 {manifesto?.policy}</div>
          <div className="pl-5 mt-2">
            {manifesto?.actions?.map((action: string, i: number) => (
              <div key={i}>✅ {action}</div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center justify-center gap-2">
          <Avatar
            shape="circle"
            alt={candidateB.name}
            size={50}
            src={candidateB.src}
          >
            {candidateB.name}
          </Avatar>
          <span>{candidateB.name}</span>
        </div>
      ),
      render: (manifesto) => (
        <div>
          <div>🔴 {manifesto?.policy}</div>
          <div className="pl-5 mt-2">
            {manifesto?.actions?.map((action: string, i: number) => (
              <div key={i}>✅ {action}</div>
            ))}
          </div>
        </div>
      ),
      dataIndex: "candidateB",
    },
  ];

  return <Table columns={columns} dataSource={dataSource} pagination={false} />;
};

export default ComparisonTable;
