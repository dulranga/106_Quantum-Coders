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
      </div>
    </main>
  );
};

export default Page;
