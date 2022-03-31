const About = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div>
        <h1>About us</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet architecto at consectetur cupiditate dicta ea
           explicabo facilis, mollitia, quasi, rerum sapiente sed voluptate voluptatum. Ab aspernatur iste natus
           nesciunt veniam.</p>
      </div>
    </motion.div>
  )
};

export default About;
