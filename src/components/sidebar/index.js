import { useContext, useState } from 'react';
import React from 'react'
import { Navbar, Container } from 'react-bootstrap';
import * as ROUTES from '../../constants/routes';
import UserContext from '../../context/user';
import useUser from '../../hooks/use-user';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core/styles';
import NewPost from './new-post';

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function Sidebar() {
    const { user: loggedInUser } = useContext(UserContext);
    const { user } = useUser(loggedInUser?.uid);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className="bg-white h-screen w-2/5 border-gray-primary border">
            <>
                <Navbar className="bg-blue-medium after:bg-blue-medium mx-auto mt-4 w-70">
                    <Container className="justify-content-center">
                        <Navbar.Brand className="text-white" href={ROUTES.DASHBOARD}>ホーム</Navbar.Brand>
                    </Container>
                </Navbar>
                <hr />
                {window.location.pathname.includes(ROUTES.DASHBOARD) ? (
                    <>
                        <Navbar className="bg-blue-medium mx-auto w-70">
                            <Container className="justify-content-center align-items-center">
                                <Navbar.Brand>
                                    <button className="text-white" onClick={handleClickOpen}>
                                        ポスト作成
                                    </button></Navbar.Brand>
                                <Dialog open={open}>
                                    <DialogActions>
                                        <NewPost user={user} handleClose={handleClose} />
                                    </DialogActions>
                                </Dialog>
                            </Container>
                        </Navbar>
                        <hr />
                        <Navbar className="w-70 mx-auto">
                            <Container className="justify-content-center align-items-center">
                                <Navbar.Brand>ポストフィルター</Navbar.Brand>
                            </Container>
                        </Navbar>
                        <Navbar className="bg-blue-medium mx-auto mt-4 w-70">
                            <Container className="justify-content-center align-items-center">
                                <Navbar.Brand className="text-white" href={ROUTES.DASHBOARD}>全てのポスト</Navbar.Brand>
                            </Container>
                        </Navbar>
                        <Navbar className="bg-blue-medium mx-auto mt-4 w-70">
                            <Container className="justify-content-center align-items-center">
                                <Navbar.Brand className="text-white" href={`/dashboard/post/${user?.username}`}>私のポスト</Navbar.Brand>
                            </Container>
                        </Navbar>
                        <Navbar className="bg-blue-medium mx-auto mt-4 w-70">
                            <Container className="justify-content-center align-items-center">
                                <Navbar.Brand className="text-white" href={`/dashboard/save/${user?.username}`}>保存ポスト</Navbar.Brand>
                            </Container>
                        </Navbar>
                    </>
                ) : null}
            </>
        </div>
    );
}