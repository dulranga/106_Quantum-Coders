import { findApplicant } from "@/constants/applicants";
import { topics } from "@/constants/topics";
import { Avatar, Table } from "antd";
import { ColumnType } from "antd/es/table";
import candidates from "backend/src/candidates.json";
import ComparisonTable from "./ComparisonTable";

const Page = ({ params }: { params: Record<string, string> }) => {
  const { candidateA: a, candidateB: b } = params;

  const candidateA = findApplicant(a);
  if (!candidateA) throw new Error("Invalid Candidate Selected");

  const candidateB = findApplicant(b);
  if (!candidateB) throw new Error("Invalid Candidate Selected");

  const candidateADetails = candidates.candidates?.[candidateA.name];
  const candidateBDetails = candidates.candidates?.[candidateB.name];

  const dataSource = topics.map((topic) => ({
    topic: topic.label,
    candidateA: candidateADetails?.manifesto?.[topic.id],
    candidateB: candidateBDetails?.manifesto?.[topic.id],
  }));

  return (
    <main className="max-w-screen-xl px-10 mx-auto my-20">
      <h2 className="text-center text-indigo-600 text-4xl font-bold my-10">
        Compare Candidates
      </h2>

      <ComparisonTable dataSource={dataSource} />
    </main>
  );
};

export default Page;
