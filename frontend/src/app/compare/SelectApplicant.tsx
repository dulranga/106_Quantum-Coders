import { APPLICANTS } from "@/constants/applicants";
import { Avatar, Form, Select } from "antd";
import { User } from "lucide-react";
import { useMemo } from "react";

type SelectApplicantProps = {
  name: string;
};

const SelectApplicant = ({ name }: SelectApplicantProps) => {
  const form = Form.useFormInstance();

  const value = Form.useWatch(name, form);
  const selectedApplicant = useMemo(() => {
    return APPLICANTS.find((a) => a.id === value);
  }, [value]);

  return (
    <div className="min-w-56">
      <div className="mb-10">
        <Avatar
          shape="circle"
          icon={<User size={56} />}
          src={selectedApplicant?.src}
          alt={selectedApplicant?.name}
          size={200}
        />
      </div>

      <Form.Item
        name={name}
        label="Select Candidate"
        className="w-full"
        rules={[{ required: true }]}
      >
        <Select
          className="w-full"
          options={APPLICANTS.map((a) => ({ value: a.id, label: a.name }))}
        />
      </Form.Item>
    </div>
  );
};

export default SelectApplicant;
