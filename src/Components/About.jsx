import React from "react";
import "./About.css"; // Justera filvägen om du använder en separat CSS-fil

const About = () => {
  return (
    <div className="main-content">
      <div className="about-container">
        <div className="about-us">
          <p>
            <strong>Görans Bil & Gräv</strong> har varit en pålitlig partner för
            bilägare i över 25 år. Vi är en auktoriserad verkstad som har byggt
            upp ett starkt rykte genom att erbjuda högkvalitativa tjänster och
            enastående kundservice.
          </p>
          {/* <p>
            Vår långa erfarenhet i branschen ger oss en unik förståelse för våra
            kunders behov, och vi strävar alltid efter att leverera lösningar
            som överträffar förväntningarna.
          </p> */}
          <p>
            Som en auktoriserad verkstad är vi stolta över att kunna erbjuda ett
            komplett utbud av tjänster, från regelbundet underhåll och
            reparationer till mer komplexa arbeten som kräver specialiserad
            expertis.
          </p>
          <p>
            Men <strong>Görans Bil & Gräv</strong> är inte bara en verkstad – vi
            är också din lokala bilhandlare. Hos oss hittar du ett brett urval
            av bilar till konkurrenskraftiga priser.
          </p>
          <p>
            Vår engagerade personal står alltid redo att hjälpa till, oavsett om
            du behöver rådgivning kring ditt nästa bilköp eller hjälp med att
            hålla din nuvarande bil i toppskick. Hos oss är kundens behov alltid
            i fokus, och vi ser fram emot att få fortsätta serva och hjälpa våra
            kunder i många år framöver.
          </p>
          <p>
            <strong>Välkommen till Görans Bil & Gräv</strong> – där erfarenhet,
            kvalitet och kundservice möts!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
