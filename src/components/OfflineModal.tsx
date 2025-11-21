import { Modal, Box, Typography, Paper } from "@mui/material";
import { offlineImage } from "../assets/images/offline-image";

interface OfflineModalProps {
  isModalOpen: boolean;
  onCloseModal: () => void;
}

const OfflineModal = ({
  isModalOpen,
  onCloseModal,
}: OfflineModalProps): JSX.Element => {
  return (
    <Modal open={isModalOpen} onClose={onCloseModal}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 600,
          p: 2,
        }}
      >
        <Paper
          sx={{
            width: { xs: 320, sm: 500 },
            p: 2,
            borderRadius: 3,
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <img
              src={offlineImage}
              alt="offline"
              style={{ maxHeight: 150, objectFit: "contain" }}
            />
            <Typography variant="h6" mt={2}>
              No Internet Connection
            </Typography>
            <Typography variant="body1" color="text.primary" textAlign="center">
              Your network connection appears to be offline.
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
              mt={0.5}
            >
              You can try refreshing this page once you're reconnected.
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Modal>
  );
};

export default OfflineModal;
