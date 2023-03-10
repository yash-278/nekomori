import { motion } from "framer-motion";

const Activity = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
      key="activity-page"
    >
      Activity
    </motion.div>
  );
};

export default Activity;
