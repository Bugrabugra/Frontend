import { Link } from "react-router-dom";
import { motion } from "framer-motion";


const Home = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div>
        <h1>Pedro's Pizzeria</h1>
        <p>Pizza to fit any taste</p>
        <Link to="/menu">
          <button>Order now</button>
        </Link>
      </div>
    </motion.div>
  )
};

export default Home;
