import React from "react";
import Container from "../common/Container";
import {
  SquarePen,
  Hash,
  Mail,
  MessageCircle,
  FileText,
  Zap,
} from "lucide-react";

const Tools = () => {
  const aiTools = [
    {
      id: 1,
      title: "Landing Page Writer",
      description:
        "Generate high-converting landing pages in seconds with AI-driven copy that captures attention, communicates value, and boosts conversions effortlessly.",
      icon: SquarePen,
      bg: { from: "#3588F2", to: "#0BB0D7" },
    },
    {
      id: 2,
      title: "Ad Copy Creator",
      description:
        "Create scroll-stopping ad copy for Facebook, Google, and Instagram with persuasive messaging designed to increase clicks and drive more sales.",
      icon: Hash,
      bg: { from: "#B153EA", to: "#E549A3" },
    },
    {
      id: 3,
      title: "Email Generator",
      description:
        "Write engaging email campaigns, newsletters, and sequences that connect with your audience and improve open rates and conversions.",
      icon: Mail,
      bg: { from: "#F59E0B", to: "#EF4444" },
    },
    {
      id: 4,
      title: "Social Post Creator",
      description:
        "Generate engaging and shareable social media posts to grow your audience and boost engagement.",
      icon: MessageCircle,
      bg: { from: "#10B981", to: "#06B6D4" },
    },
    {
      id: 5,
      title: "Blog & Article Assistant",
      description:
        "Create SEO-optimized blog posts faster and drive organic traffic with AI-powered writing.",
      icon: FileText,
      bg: { from: "#6366F1", to: "#8B5CF6" },
    },
    {
      id: 6,
      title: "Headline & CTA Optimizer",
      description:
        "Craft compelling headlines and CTAs that grab attention and turn visitors into customers.",
      icon: Zap,
      bg: { from: "#F43F5E", to: "#F97316" },
    },
  ];

  return (
    <Container>
      <div className="py-14 sm:py-16 md:py-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto px-2">
          <h1 className="text-3xl sm:text-4xl md:text-[42px] font-semibold text-[#3B3B3B] leading-tight">
            Powerful <span className="text-[#5044E5]">AI Tools</span> to
            Supercharge Your Content
          </h1>

          <p className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed">
            From landing pages to social posts, create high-converting content
            faster with intelligent AI tools designed to save time and boost
            your marketing results.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 mt-12">
          {aiTools.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="group p-6 sm:p-7 md:p-8 rounded-xl bg-[rgba(253,253,254,0.60)] backdrop-blur-md shadow-[0_4px_30px_0_rgba(0,0,0,0.10)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Icon */}
                <div
                  className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl text-white mb-4 sm:mb-5"
                  style={{
                    background: `linear-gradient(135deg, ${item.bg.from}, ${item.bg.to})`,
                  }}
                >
                  <Icon size={20} />
                </div>

                {/* Title */}
                <h3 className="text-[18px] font-semibold text-[#3E3E3E] leading-snug mb-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-[#9A9A9A] text-[14px] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default Tools;
