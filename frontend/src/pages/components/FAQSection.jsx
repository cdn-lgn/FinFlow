import React, { useContext } from "react";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Container,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ThemeContext } from "../../context/ThemeContext";

const faqs = [
    {
      question: "How do I create an account on FinFlow?",
      answer: "Just click the 'Create Account' button and fill out a few simple details."
    },
    {
      question: "Is my data safe with FinFlow?",
      answer: "Totally encrypted & locked tight."
    },
    {
      question: "Do I need employee verification for transactions?",
      answer: "Not for regular payments. Employee verification is for account approvals & support only."
    },
    {
      question: "Is FinFlow free to use?",
      answer: "Totally! No hidden fees, no tricks — just pure banking bliss 😌."
    }
  ];
  

export default function FAQSection() {
  const { colors } = useContext(ThemeContext);

  return (
    <Box sx={{ py: 10, bgcolor: colors.background, color: colors.text }}>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
          Frequently Asked <span style={{ color: colors.text }}>Questions</span>
        </Typography>

        {faqs.map((faq, index) => (
          <Accordion key={index} sx={{ mb: 2, bgcolor: colors.card, color:colors.text }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography variant="subtitle1" fontWeight="600">
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  );
}
