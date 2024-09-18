"use client";

import { Alert, Button } from "antd";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const ErrorPage = () => {
  const router = useRouter();

  return (
    <main className="flex flex-col gap-5">
      <Alert
        message="Error"
        description="Candidates are invalid"
        type="error"
        showIcon
      />

      <Button
        type="link"
        className="!text-primary"
        icon={<ChevronLeft />}
        onClick={() => router.back()}
      >
        Go Back
      </Button>
    </main>
  );
};

export default ErrorPage;
