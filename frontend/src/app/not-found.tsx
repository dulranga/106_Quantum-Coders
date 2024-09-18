"use client";

import { LeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useRouter } from "next/navigation";

const Error404 = () => {
  const router = useRouter();

  return (
    <main className="grid place-items-center">
      <div className="max-w-fill-xl mx-auto px-4 flex items-center justify-start h-safe-screen md:px-8">
        <div className="max-w-lg mx-auto space-y-3 text-center">
          <h3 className="text-gray-800 text-4xl font-semibold sm:text-5xl">
            Page not found
          </h3>
          <p className="text-gray-600">
            Sorry, the page you are looking for could not be found or has been
            removed.
          </p>
          <Button
            type="link"
            className="!text-primary"
            icon={<LeftOutlined />}
            onClick={() => router.back()}
          >
            Go Back
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Error404;
