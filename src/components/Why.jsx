import { useState, useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import {
  ArrowForward,
  CheckCircle,
  IntegrationInstructions,
  Psychology,
  Scale,
  Architecture,
  Groups,
  Schedule,
  TrendingUp,
} from "@mui/icons-material";
import { dataService } from "../services/dataService";
import { itemVariants, containerVariants as sharedContainer, hoverLift } from "../animations/motionVariants";

const iconMap = {
  ArrowForward: <ArrowForward />,
  CheckCircle: <CheckCircle />,
  IntegrationInstructions: <IntegrationInstructions />,
  Psychology: <Psychology />,
  Scale: <Scale />,
  Architecture: <Architecture />,
  Groups: <Groups />,
  Schedule: <Schedule />,
  TrendingUp: <TrendingUp />,
};

function getIcon(name) {
  if (!name) return null;
  try {
    const key = name.replace?.("Icon", "");
    return iconMap[key] ?? <span aria-hidden="true" className="w-5 h-5 inline-block" />;
  } catch (e) {
    return <span aria-hidden="true" className="w-5 h-5 inline-block" />;
  }
}

export default function Why() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [forceVisible, setForceVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => {
      if (!isInView) {
        console.warn('Why: useInView did not trigger — applying forceVisible fallback');
        setForceVisible(true);
      }
    }, 1000);
    return () => clearTimeout(t);
  }, [isInView]);

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      console.log("🚀 Fetching WHY data...");
      try {
        const res = await dataService.getComponentData("why");
        console.log("✅ WHY data fetched:", res);
        if (!res) {
          setError(new Error('No data received for component: why'));
          return;
        }
        setData(res);
      } catch (err) {
        console.error("❌ Failed fetching WHY data", err);
        setError(err);
      }
    })();
  }, []);

  if (error) {
    return (
      <section className="py-20 text-center text-red-500">
        Something went wrong loading this section.
      </section>
    );
  }

  if (!data) {
    return (
      <section className="py-20 text-center text-gray-500">Loading...</section>
    );
  }

  const { badge, title, description, features, stats, bottomCta } = data;
  const containerVariants = sharedContainer;

  function StatNumber({ value, trigger }) {
    const mv = useMotionValue(0);
    const [display, setDisplay] = useState(String(value));

    useEffect(() => {
      const str = String(value).trim();
      const m = str.match(/^([0-9]+(?:\.[0-9]+)?)(%)?$/);
      if (!m) {
        setDisplay(str);
        return;
      }

      const target = parseFloat(m[1]);
      const suffix = m[2] || "";
      const decimals = m[1].includes(".") ? m[1].split(".")[1].length : 0;

      let controls;
      if (trigger) {
        controls = animate(mv, target, { duration: 1.2, ease: "easeOut" });
      }

      const unsub = mv.on("change", (v) => {
        setDisplay(Number(v).toLocaleString(undefined, { maximumFractionDigits: decimals }) + suffix);
      });

      setDisplay(Number(mv.get()).toLocaleString(undefined, { maximumFractionDigits: decimals }) + suffix);

      return () => {
        unsub();
        if (controls) controls.stop();
      };
    }, [value, trigger]);

    return <>{display}</>;
  }

  return (
    <section id="why" ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView || forceVisible ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              {badge && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200 mb-6">
                  {getIcon(badge.icon)}
                  <span className="text-sm font-medium text-gray-700 tracking-wide">
                    {badge.text}
                  </span>
                </div>
              )}

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                {title}
              </h2>

              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {description}
              </p>

              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200">
                {stats?.map((stat, index) => (
                  <motion.div key={stat.id ?? index} variants={itemVariants} className="text-center group">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {getIcon(stat.icon)}
                      <div className="text-2xl font-bold text-gray-900 group-hover:scale-110 transition-transform duration-300">
                        <StatNumber value={stat.number} trigger={isInView || forceVisible} />
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features?.map((feature, index) => (
              <motion.div
                key={feature.id ?? index}
                variants={itemVariants}
                whileHover={hoverLift.whileHover}
                transition={hoverLift.transition}
                className="relative bg-white rounded-2xl border border-gray-200/80 p-6 group cursor-pointer overflow-hidden hover:shadow-lg"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white mb-4">
                  {getIcon(feature.icon)}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {bottomCta && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView || forceVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="text-center mt-16 pt-12 border-t border-gray-200"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Wellness Journey?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of users and businesses already experiencing the future of integrated wellness technology.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-primary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto group"
            >
              <span>{bottomCta.text}</span>
              <motion.span whileHover={{ x: 6 }} className="inline-flex">
                {getIcon(bottomCta.icon)}
              </motion.span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
