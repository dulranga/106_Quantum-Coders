import { Button } from "antd";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="my-24 mx-auto max-w-screen-xl pb-4 px-4 items-center lg:flex md:px-8">
      <div className="space-y-4 flex-1 sm:text-center lg:text-left">
        <h1 className="text-gray-800 font-extrabold text-4xl xl:text-6xl">
          Empower Your
          <span className="text-indigo-600"> Vote</span>
        </h1>
        <p className="text-gray-500 max-w-xl leading-relaxed sm:mx-auto lg:ml-0">
          Harness the power of AI to make informed decisions in the upcoming Sri
          Lankan presidential election.
        </p>
        <div className="flex gap-5">
          <Link href="/#features">
            <Button
              icon={<ArrowRight />}
              iconPosition="end"
              size="large"
              type="primary"
            >
              Explore Features
            </Button>
          </Link>
          <Link href="/bot">
            <Button size="large">Try Chatbot</Button>
          </Link>
        </div>
      </div>
      <div className="flex-1 text-center mt-4 lg:mt-0 lg:ml-3">
        {/* <img src="https://i.postimg.cc/kgd4WhyS/container.png" /> */}
      </div>
    </section>
  );
}
