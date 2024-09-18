"use client";

import { Button, Form } from "antd";
import SelectApplicant from "./SelectApplicant";
import FormDebug from "@/components/FormDebug";
import { Jacques_Francois_Shadow } from "next/font/google";
import { getClass } from "@/utils/getClass";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const font = Jacques_Francois_Shadow({ weight: "400", subsets: ["latin"] });

const Page = () => {
  const [form] = Form.useForm();
  const router = useRouter();

  return (
    <main className="max-w-screen-lg px-10 mx-auto my-20">
      <h2 className="text-center text-indigo-600 text-4xl font-bold my-10">
        Compare Candidates
      </h2>

      <Form
        onFinish={({ a, b }) => router.push(`/compare/${a}/vs/${b}`)}
        layout="vertical"
        form={form}
      >
        <div className="flex md:flex-row flex-col gap-20 items-center justify-between">
          <SelectApplicant name="a" />
          <div className={getClass("text-8xl font-extrabold ", font.className)}>
            VS
          </div>
          <SelectApplicant name="b" />
        </div>
        <Button
          htmlType="submit"
          block
          size="large"
          type="primary"
          className="mt-20"
          iconPosition="end"
          icon={<ChevronRight />}
        >
          Compare Candidates
        </Button>
        <FormDebug />
      </Form>
    </main>
  );
};

export default Page;
