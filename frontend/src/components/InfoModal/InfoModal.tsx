import React from "react";
import { Modal, Box } from "@mui/material";

interface InfoModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode; // Accept any content as children
}

const InfoModal: React.FC<InfoModalProps> = ({ open, onClose, children }) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: "600px",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: "8px",
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};

export default InfoModal;