import { getClass } from "@/utils/getClass";
import Image from "next/image";
import { ReactNode } from "react";

type FeatureSectionProps = {
  title: string;
  description: string;
  action: ReactNode;
  imageSrc?: string;
  reverseOrder?: boolean;
};

const FeatureSection = ({
  title,
  description,
  action,
  imageSrc,
  reverseOrder = false,
}: FeatureSectionProps) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div
          className={getClass(
            "flex flex-col lg:flex-row-reverse items-center gap-16",
            reverseOrder && "lg:flex-row"
          )}
        >
          <div>
            <h3 className="text-4xl lg:text-5xl font-bold mb-6">{title}</h3>
            <p className="mb-8 text-gray-600">{description}</p>
            <div>{action}</div>
          </div>
          <div>
            <Image
              src={imageSrc}
              alt="Win Predictor"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
