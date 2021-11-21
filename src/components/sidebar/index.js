import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap';
import * as ROUTES from '../../constants/routes';

export default function Sidebar() {
    return (
        <div className="bg-white h-screen w-2/5 border-gray-primary border">
            <>
                <Navbar className="bg-blue-medium after:bg-blue-medium mx-auto mt-4 w-70">
                    <Container className="justify-content-center">
                        <Navbar.Brand className="text-white" href={ROUTES.DASHBOARD}>ホーム</Navbar.Brand>
                    </Container>
                </Navbar>
                <hr />
                {window.location.pathname == ROUTES.DASHBOARD ? (
                    <>
                        <Navbar className="bg-blue-medium mx-auto w-70">
                            <Container className="justify-content-center align-items-center">
                                <Navbar.Brand className="text-white">ポスト作成</Navbar.Brand>
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
                                <Navbar.Brand className="text-white">全てのポスト</Navbar.Brand>
                            </Container>
                        </Navbar>
                        <Navbar className="bg-blue-medium mx-auto mt-4 w-70">
                            <Container className="justify-content-center align-items-center">
                                <Navbar.Brand className="text-white">私のポスト</Navbar.Brand>
                            </Container>
                        </Navbar>
                        <Navbar className="bg-blue-medium mx-auto mt-4 w-70">
                            <Container className="justify-content-center align-items-center">
                                <Navbar.Brand className="text-white">保存ポスト</Navbar.Brand>
                            </Container>
                        </Navbar>
                    </>
                ) : null}
            </>
        </div>
    );
}