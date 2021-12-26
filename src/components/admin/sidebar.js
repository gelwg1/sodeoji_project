import { useContext, useState } from 'react';
import React from 'react'
import { Navbar, Container } from 'react-bootstrap';
import * as ROUTES from '../../constants/routes';
import UserContext from '../../context/user';
import useUser from '../../hooks/use-user';

export default function Sidebar() {
    const { user: loggedInUser } = useContext(UserContext);
    const { user } = useUser(loggedInUser?.uid);
    const [open, setOpen] = useState(false);
    return (
        <div className="bg-white h-screen w-full border-gray-primary border flex flex-col items-center sticky">
            
            {window.location.pathname.includes(ROUTES.ADMIN) ? (
                <>
                    <Navbar className="bg-blue-medium mx-auto w-full mt-4">
                        <Container className="flex flex-col justify-center items-center">
                            <Navbar.Brand className="text-white text-xl" href={ROUTES.ADMIN}>ユーザー</Navbar.Brand>
                        </Container>
                    </Navbar>
                    <Navbar className="bg-blue-medium mx-auto w-full mt-4">
                        <Container className="flex flex-col justify-center items-center">
                            <Navbar.Brand>
                                <button className="text-white text-xl" href={ROUTES.ADMIN_QUIZZ}>
                                クイズ
                                </button></Navbar.Brand>
                        </Container>
                    </Navbar>
                    
                </>
            ) : null}
        </div>
    );
}