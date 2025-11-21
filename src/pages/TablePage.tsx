import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  CircularProgress,
  Box,
  Alert,
  Button,
} from "@mui/material";
import { useCharacter } from "../hooks/useCharacter";
import { Character } from "../types/character";
import PaginationController from "../components/PaginationController";
import OfflineModal from "../components/OfflineModal";

function TablePage(): JSX.Element {
  const navigate = useNavigate();

  const [pageNumber, setPageNumber] = useState(1);
  const [isOffline, setIsOffline] = useState(false);
  const { character, totalPages, isLoading, hasError } =
    useCharacter(pageNumber);

  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) navigate("/");
  }, [navigate]);

  useEffect(() => {
    const updateCurrentStatus = () => setIsOffline(!navigator.onLine);

    window.addEventListener("online", updateCurrentStatus);
    window.addEventListener("offline", updateCurrentStatus);

    updateCurrentStatus();

    return () => {
      window.removeEventListener("online", updateCurrentStatus);
      window.removeEventListener("offline", updateCurrentStatus);
    };
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
      <OfflineModal
        isModalOpen={isOffline}
        onCloseModal={() => setIsOffline(false)}
      />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">Star Wars Character Listing</Typography>
        <Button
          variant="outlined"
          onClick={() => {
            localStorage.removeItem("isLoggedIn");
            navigate("/");
          }}
        >
          Logout
        </Button>
      </Box>
      <Paper sx={{ p: 2 }}>
        {isLoading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight={200}
          >
            <CircularProgress />
          </Box>
        ) : hasError ? (
          <Alert severity="error">{hasError}</Alert>
        ) : (
          <Box>
            <TableContainer>
              <Table
                sx={{
                  "& .MuiTableCell-root": {
                    fontSize: 15,
                    padding: 1.2,
                    minWidth: 130,
                  },
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Mass</TableCell>
                    <TableCell>Height</TableCell>
                    <TableCell>Hair Color</TableCell>
                    <TableCell>Skin Color</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {character.map((char: Character) => (
                    <TableRow key={char.name}>
                      <TableCell>{char.name}</TableCell>
                      <TableCell>{char.mass}</TableCell>
                      <TableCell>{char.height}</TableCell>
                      <TableCell>{char.hair_color}</TableCell>
                      <TableCell>{char.skin_color}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box mt={2} display="flex" justifyContent="center">
              <PaginationController
                pageNumber={pageNumber}
                onChange={setPageNumber}
                totalPages={totalPages}
              />
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default TablePage;
