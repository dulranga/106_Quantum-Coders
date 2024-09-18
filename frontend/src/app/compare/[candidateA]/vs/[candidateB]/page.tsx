import { findApplicant } from "@/constants/applicants";
import { Avatar, Table } from "antd";
import { ColumnType } from "antd/es/table";

const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];

const Page = ({ params }: { params: Record<string, string> }) => {
  const { candidateA: a, candidateB: b } = params;

  const candidateA = findApplicant(a);
  if (!candidateA) throw new Error("Invalid Candidate Selected");

  const candidateB = findApplicant(b);
  if (!candidateB) throw new Error("Invalid Candidate Selected");

  const columns: ColumnType[] = [
    {
      title: "Fields",
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
    },
  ];

  return (
    <main className="max-w-screen-xl px-10 mx-auto my-20">
      <h2 className="text-center text-indigo-600 text-4xl font-bold my-10">
        Compare Candidates
      </h2>

      <Table columns={columns} dataSource={dataSource} pagination={false} />
    </main>
  );
};

export default Page;
