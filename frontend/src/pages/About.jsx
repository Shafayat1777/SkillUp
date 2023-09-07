import { Helmet } from "react-helmet";

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

      <div>
        <img src="/img/assets/certificate.svg" alt="Certificate" />
      </div>
    </div>
  );
};

export default About;
