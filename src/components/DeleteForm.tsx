import React, { useContext, useEffect, useState } from "react";

import { 
    Box, 
    Button, 
    CircularProgress, 
    Modal, 
} from "@mui/material";
import { Folder } from "@mui/icons-material";

import { NotificationContext, NotificationType } from '../components/NotificationModal';

import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
const client = generateClient<Schema>();
type Folder = Schema['Folder']['type'];
type Password = Schema['Password']['type'];

interface addProps {
    showModal: boolean,
    currEntity: Folder|Password,
    isFolder: boolean,
    handleClose: (update?: boolean) => void,
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function DeleteForm({showModal, currEntity, isFolder, handleClose}: addProps) {
    const [entity, setEntity] = useState<Folder|Password>();
    const [loading, setLoading] = useState<boolean>(false);

    const { setNotification } = useContext(NotificationContext);

    useEffect(() => {
        setEntity(currEntity)
    }, [currEntity])

    async function handleSubmit() {
        setLoading(true);

        // Check if entity is a Folder
        if (isFolder) {
            client.models.Folder.get({ id: entity?.id! })
                .then(async (result) => {
                    const { data: folder} = result;

                    // Check if folder is the General folder
                    if (folder && folder?.name === 'General') {
                        setNotification({
                            type: NotificationType.Warning,
                            msg: 'General folder cannot be deleted!'
                        });
                        setLoading(false);
                        handleClose();
                        return;
                    } else if (folder) {
                        const { data: passwords } = await folder.passwords();

                        // Delete all the child passwords
                        Promise.all(passwords.map(
                            p => client.models.Password.delete({ id: p.id })
                        )).then(() => {
                            // Delete the folder
                            client.models.Folder.delete({
                                id: entity?.id!,
                            }).then(() => {
                                handleClose(true);
                                setLoading(false);
                                
                                setNotification({
                                    type: NotificationType.Success,
                                    msg: 'Folder was deleted!'
                                });
                            }).catch(() => {
                                setNotification({
                                    type: NotificationType.Warning,
                                    msg: 'Folder failed to delete, please try again'
                                });
                                setLoading(false);
                            });
                        }).catch(() => {
                            setNotification({
                                type: NotificationType.Warning,
                                msg: 'Folder failed to delete, please try again'
                            });
                            setLoading(false);
                        });
                    }
                }).catch(() => {
                    setNotification({
                        type: NotificationType.Warning,
                        msg: 'Folder failed to delete, please try again'
                    });
                    setLoading(false);
                });
        } else {
            // Delete the password
            client.models.Password.delete({
                id: entity?.id!,
            }).then(() => {
                handleClose(true);
                setLoading(false);
                
                setNotification({
                    type: NotificationType.Success,
                    msg: 'Password was deleted!'
                });
            }).catch(() => {
                setNotification({
                    type: NotificationType.Warning,
                    msg: 'Password failed to delete, please try again'
                });
                setLoading(false);
            });
        }
    }

    return (
        <Modal 
            open={showModal}
            onClose={() => {
                handleClose();
            }}
            aria-labelledby="modal-modal-delete"
            aria-describedby="modal-modal-delete"
        >
            <Box sx={style}>
                <p style={{fontWeight: "Bold"}}>Please confirm deletion</p>
                {
                    isFolder &&
                    <p>Deleting the folder will also delete all passwords located in folder.</p>
                }

                <Box display={"flex"} justifyContent={"flex-start"} gap={"5px"}>
                <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={() => handleClose()}
                    disabled={loading}
                >
                    Cancel
                </Button>

                <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={() => handleSubmit()}
                    disabled={loading}
                >
                    {loading ? <CircularProgress /> : 'Confirm' }
                </Button>
                </Box>
            </Box>
        </Modal>
    )
}