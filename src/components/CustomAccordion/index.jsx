import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import style from "./index.module.scss";

type AccordionTypeProps = {
  title: string;
  content: any;
  disabled?: boolean;
  titleId?: any;
  ariaControl?: any;
  customClass?: string;
  accordionParent?: any;
  expandedItem?: boolean;
  setExpandedId: any;
};
const CustomAccordion = (props: AccordionTypeProps) => {
  const {
    title,
    disabled = false,
    customClass = "",
    accordionParent,
    content,
    ariaControl,
    expandedItem,
    setExpandedId,
    ...restProps
  } = props;

  return (
      <Accordion
        className={`${style.accordMainWrap} ${style.customClass}`}
        expanded={expandedItem}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          onClick={setExpandedId}
          aria-controls={ariaControl ?? "panel1-content"}
          id={accordionParent}
          disabled={disabled}
          {...restProps}
        >
          <Typography component="span">{title}</Typography>
        </AccordionSummary>
        {expandedItem && (
          <AccordionDetails>
            {content}
          </AccordionDetails>
        )}
      </Accordion>
  );
};

export default CustomAccordion;
