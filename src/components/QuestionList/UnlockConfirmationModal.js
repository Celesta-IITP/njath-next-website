"use client";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function UnlockConfirmationModal({ isOpen, onClose, onConfirm, points = 10 }) {
    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="unlock-confirmation"
            aria-describedby="confirm-unlock-question"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    background: "#111A23",
                    border: "2px solid #FDCC06",
                    borderRadius: "8px",
                    p: 4,
                    width: 350,
                    textAlign: "center",
                    color: "white",
                }}
            >
                <h2>Confirm Unlock</h2>
                <p>
                    Are you sure you want to unlock this question? This will deduct {points} points.
                </p>
                <div>
                    <Button
                        variant="contained"
                        onClick={onClose}
                        style={{
                            backgroundColor: "red",
                            color: "white",
                            border: "1px solid #FDCC06",
                            margin: "5px",
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={onConfirm}
                        style={{
                            backgroundColor: "green",
                            color: "white",
                            border: "1px solid #FDCC06",
                            margin: "5px",
                        }}
                    >
                        Confirm
                    </Button>
                </div>
            </Box>
        </Modal>
    );
}
