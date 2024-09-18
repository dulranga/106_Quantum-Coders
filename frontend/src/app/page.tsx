import FeatureSection from "@/components/FeatureSection";
import HeroSection from "@/components/HeroSection";
import { Button } from "antd";
import win from "@/assets/win.png";
import compare from "@/assets/compare.png";
import chat from "@/assets/chat.png";

import { ChevronRight } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <main>
      <HeroSection />

      <div>
        <h2
          id="features"
          className="text-center text-indigo-600 text-4xl font-bold"
        >
          Try Features
        </h2>
        <FeatureSection
          imageSrc={win.src}
          action={
            <Link href="/win">
              <Button
                icon={<ChevronRight />}
                iconPosition="end"
                size="large"
                type="primary"
              >
                Try Win Predictor
              </Button>
            </Link>
          }
          title="Win Predictor"
          description="Our advanced AI analyzes public opinion, polling data, and
                social media sentiment to predict potential election outcomes
                with unprecedented accuracy."
        />

        <FeatureSection
          reverseOrder
          imageSrc={compare.src}
          action={
            <Link href="/compare">
              <Button
                icon={<ChevronRight />}
                iconPosition="end"
                size="large"
                type="primary"
              >
                Compare Manifestos
              </Button>
            </Link>
          }
          title="Manifesto Comparator"
          description="Compare candidate manifestos side by side, making it easier to evaluate promises, goals, and key points. Make an informed decision based on what matters most to you."
        />

        <FeatureSection
          imageSrc={chat.src}
          action={
            <Link href="/bot">
              <Button
                icon={<ChevronRight />}
                iconPosition="end"
                size="large"
                type="primary"
              >
                Chat with Election Bot
              </Button>
            </Link>
          }
          title="Election Bot"
          description="Get instant, verified answers to your questions about candidates, their manifestos, and election details. Our AI-powered chatbot is available 24/7 to provide reliable information."
        />
      </div>
    </main>
  );
};

export default Page;
