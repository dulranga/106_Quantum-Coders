import FeatureSection from "@/components/FeatureSection";
import HeroSection from "@/components/HeroSection";
import { Button } from "antd";
import { ChevronRight } from "lucide-react";

const Page = () => {
  return (
    <main>
      <HeroSection />

      <div>
        <h2 className="text-center text-indigo-600 text-4xl font-bold">
          Try Features
        </h2>
        <FeatureSection
          action={
            <Button
              icon={<ChevronRight />}
              iconPosition="end"
              size="large"
              type="primary"
            >
              Try Win Predictor
            </Button>
          }
          title="Win Predictor"
          description="Our advanced AI analyzes public opinion, polling data, and
                social media sentiment to predict potential election outcomes
                with unprecedented accuracy."
        />

        <FeatureSection
          reverseOrder
          action={
            <Button
              icon={<ChevronRight />}
              iconPosition="end"
              size="large"
              type="primary"
            >
              Compare Manifestos
            </Button>
          }
          title="Manifesto Comparator"
          description="Compare candidate manifestos side by side, making it easier to evaluate promises, goals, and key points. Make an informed decision based on what matters most to you."
        />

        <FeatureSection
          action={
            <Button
              icon={<ChevronRight />}
              iconPosition="end"
              size="large"
              type="primary"
            >
              Chat with Election Bot
            </Button>
          }
          title="Election Bot"
          description="Get instant, verified answers to your questions about candidates, their manifestos, and election details. Our AI-powered chatbot is available 24/7 to provide reliable information."
        />
      </div>
    </main>
  );
};

export default Page;
