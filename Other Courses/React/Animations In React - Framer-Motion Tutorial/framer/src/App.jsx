import './App.css'
import { motion } from "framer-motion";
import { useEffect, useState } from "react";


function App() {
  const [move, setMove] = useState(false);

  return (
    <div className="App">
      <motion.div
        whileHover={{ scale: 2 }}
      >

      </motion.div>
    </div>
  )
}

export default App
