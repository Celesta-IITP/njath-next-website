"use client";
import Button from "@mui/material/Button";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UnlockConfirmationModal from "./UnlockConfirmationModal";

export default function QuestionList({ question, level }) {
    const [modalState, setModalState] = useState({
        isOpen: false,
        questionId: null,
        unlockLink: "",
    });

    const handleOpenConfirmationModal = (questionId, link) => {
        setModalState({
            isOpen: true,
            questionId,
            unlockLink: link,
        });
    };

    const handleCloseModal = () => {
        setModalState({
            isOpen: false,
            questionId: null,
            unlockLink: "",
        });
    };

    const handleConfirmUnlock = () => {
        if (modalState.unlockLink) {
            window.location.href = modalState.unlockLink;
        }
        handleCloseModal();
    };

    return (
        <>
            <ToastContainer autoClose={2000} />
            <UnlockConfirmationModal
                isOpen={modalState.isOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmUnlock}
            />

            {question.map(({ type, title }, index) => {
                let borderColor, icon, titleColor;

                if (type === 0) {
                    borderColor = "#FFFFFF99";
                    icon = (
                        <Image
                            src="/assets/Locked-Dimmed.svg"
                            alt="Check Icon"
                            width={24}
                            height={24}
                        />
                    );
                    titleColor = "#FFFFFF99";
                } else if (type === 1 || type === 2) {
                    borderColor = "#FDCC06";
                    icon = (
                        <Image
                            src="/assets/Property 1=Unlocked Icon.svg"
                            alt="Hint Icon"
                            width={24}
                            height={24}
                        />
                    );
                    titleColor = "white";
                } else {
                    borderColor = "#FDCC0699";
                    icon = (
                        <Image
                            src="/assets/Property 1=SolvedGOld.svg"
                            alt="Lock Icon"
                            width={24}
                            height={24}
                        />
                    );
                    titleColor = "white";
                }

                const link = type === 0 ? "" : `/question?level=${level}&order=${index + 1}`;
                const divStyle = {
                    display: "flex",
                    alignItems: "center",
                    padding: "8px",
                    margin: "30px",
                    border: `2px solid ${borderColor}`,
                    borderRadius: "8px",
                };

                const titleStyle = {
                    fontSize: "0.85em",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                    letterSpacing: "1px",
                    color: titleColor,
                };

                return (
                    <div key={`question-${level}-${index}`} style={divStyle}>
                        <div>{icon}</div>
                        <div className="ml-4">
                            <div style={titleStyle}>
                                <Link href={link}>{title}</Link>
                            </div>
                        </div>
                        <div className="ml-auto">
                            {type === 0 && (
                                <Button
                                    variant="outlined"
                                    onClick={() =>
                                        handleOpenConfirmationModal(
                                            `${level}-${index}`,
                                            `/question?safe=${1}&level=${Number(level)}&order=${
                                                index + 1
                                            }`
                                        )
                                    }
                                    style={{
                                        opacity: 0.8,
                                        color: "#FDCC06",
                                        fontWeight: "bold",
                                        backgroundColor: "#1D2D3E",
                                        fontFamily: "Montserrat",
                                        border: "1px solid #FDCC06",
                                    }}
                                >
                                    Unlock
                                </Button>
                            )}
                        </div>
                    </div>
                );
            })}
        </>
    );
}
