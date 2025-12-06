import React from "react";
import style from "./index.module.scss";
import ContactForm from "../ContactForm";

const HomeContactForm = () => {
  return <div className={style.fromMainWrap}>
    <div className="container">
    <div className={style.innerWrap}>
        <div className={style.leftWrapp}>
            <h2>{'Are you planning for growth?'}</h2>
            <div className={style.contactInfoWrap}>
                <h4>We bring you the right leads.</h4>
                <p>Contact us at <a href="mailto: contact@agreedtechnologies.com">contact@agreedtechnologies.com</a> 
                 <br/>or call +1-4085209754 , +1-4085209509</p>
            
            </div>
        </div>
        <div className={style.rightWrapp}>
            <ContactForm />
        </div>
    </div>
    </div>
  </div>;
};

export default HomeContactForm;
