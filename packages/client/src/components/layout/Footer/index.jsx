import React from "react";

import { AiFillPhone } from "react-icons/ai";
import { FaLocationArrow } from "react-icons/fa";
import { SlSocialFacebook } from "react-icons/sl";
import { SlSocialYoutube } from "react-icons/sl";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => {
  return {
    container: {
      backgroundColor: "#f5f5f5",
      paddingLeft: "16rem",
      marginTop: "1rem",
      position: "sticky",
      zIndex: 999,
      bottom: 0,
      color: "#0C4DA2",
      width: "100%",
    },
    divider: {
      border: "1px solid rgba(0, 0, 0, 0.068)",
      width: "80%",
      margin: "0 auto auto",
    },
    footerList: {
      display: "flex",
      width: "90%",
      margin: "0 auto auto",
      paddingTop: "0.375rem",
      justifyContent: "space-around",
    },
    footerContent: {
      width: "30%",
    },
    footerContentDescription: {
      fontSize: "1rem",
    },
    footerContentH3: {
      textAlign: "center",
    },
    footerContactList: {
      listStyleType: "none",
    },
    footerFollowList: {
      display: "flex",
      justifyContent: "center",
      listStyleType: "none",
    },
  };
});

export const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.container}>
      <div className={classes.divider} />
      <div className={classes.footerList}>
        <div className={classes.footerContent}>
          <h3>School of Computer Science and Engineering</h3>
          <p className={classes.footerContentDescription}>
            We are committed to providing the best customer service internally
            and externally. It can be witnessed in how we treat our employees,
            our owners, our managers, our society, and our student.
          </p>
        </div>
        <div className={classes.footerContent}>
          <h3>Contact</h3>
          <ul className={classes.footerContactList}>
            <li>
              <FaLocationArrow />
              Khu phố 6, P. Linh Trung, Thành phố Thủ Đức, TP.HCM
            </li>
            <li>
              <AiFillPhone />
              PHONE: (028) 37244270 ext. 3232
            </li>
          </ul>
        </div>
        <div className={classes.footerContent}>
          <h3 style={{ textAlign: "center" }}>Follow</h3>
          <ul className={classes.footerFollowList}>
            <li>
              <a href="https://it.hcmiu.edu.vn/vi/trang-chu/" target="_blank">
                <SlSocialYoutube />
              </a>
            </li>
            <li>
              <a href="https://it.hcmiu.edu.vn/vi/trang-chu/">
                <SlSocialFacebook />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
