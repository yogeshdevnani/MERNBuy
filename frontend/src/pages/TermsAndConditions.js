import React from "react";
import { Box, Typography, Divider, Container } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";

function TermsAndConditions() {
  const isLoggedIn = localStorage.getItem("Token");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Show Header only if logged in */}
      {isLoggedIn && <Header />}

      <Container maxWidth="md" sx={{ flex: 1, py: 6, px: 3 }}>
        <Box sx={{ maxWidth: "3xl", mx: "auto", p: 2 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{ fontWeight: "bold", mb: 4, textAlign: "center" }}
          >
            Terms & Conditions
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              component="h3"
              sx={{ fontWeight: "bold", mb: 2 }}
            >
              About the Site
            </Typography>
            <Box component="ol" sx={{ pl: 4 }}>
              <Typography component="li" sx={{ mb: 1 }}>
                This is a demo store for showcase purposes only.
              </Typography>
              <Typography component="li" sx={{ mb: 1 }}>
                Do not enter real payment details. No charges will be processed.
              </Typography>
              <Typography component="li" sx={{ mb: 1 }}>
                No orders will be fulfilled. There are no real deliveries.
              </Typography>
              <Typography component="li" sx={{ mb: 1 }}>
                All product images and descriptions are for demonstration only.
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Box>
            <Typography
              variant="h5"
              component="h3"
              sx={{ fontWeight: "bold", mb: 2 }}
            >
              About the Developer
            </Typography>
            <Box component="ul" sx={{ pl: 4 }}>
              <Typography component="li" sx={{ mb: 1 }}>
                Unlike this store, I'm real — and I deliver.
              </Typography>
              <Typography component="li" sx={{ mb: 1 }}>
                Place an "order" (ticket), and I'll take it from cart to
                completion.
              </Typography>
              <Typography component="li" sx={{ mb: 1 }}>
                I only ask questions after fully understanding the problem, so
                solutions come with clarity and purpose.
              </Typography>
              <Typography component="li" sx={{ mb: 1 }}>
                Like this website, I stay responsive — especially to deadlines.
              </Typography>
              <Typography component="li" sx={{ mb: 1 }}>
                I don't just write code, I also dive into monitoring tools and
                logs to keep apps fast and reliable.
              </Typography>
              <Typography component="li" sx={{ mb: 1 }}>
                Debugging is just me playing (a little obsessed) detective until
                I find the real cause.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}

export default TermsAndConditions;
