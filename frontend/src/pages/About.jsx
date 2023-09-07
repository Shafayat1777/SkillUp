import { Helmet } from "react-helmet";
import AboutSection from "../components/AboutSection";

const About = () => {
  
  return (
    <div>
      <div className="head">
        <Helmet>
          <meta charSet="utf-8" />
          <title>About</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      </div>
      <AboutSection />
    </div>
    
  );
};

export default About;
