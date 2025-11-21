import { useNavigate } from "react-router-dom";
import { Container, Box, Button } from "@mui/material";
import pageNotFoundImg from "../assets/images/page-not-found-image.png";

function NotFoundPage(): JSX.Element {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ mt: 15 }}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
        <Box
          component="img"
          src={pageNotFoundImg}
          alt="Page Not Found"
          sx={{
            width: { xs: 250, sm: 350, lg: 450 },
            height: { xs: 200, sm: 300, lg: 400 },
            objectFit: "contain",
          }}
        />
        <Button
          variant="contained"
          onClick={() => navigate("/table")}
          sx={{ py: 1.5, px: 3 }}
        >
          GO BACK TO HOME PAGE
        </Button>
      </Box>
    </Container>
  );
}

export default NotFoundPage;
