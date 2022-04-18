import React, { useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Modal } from 'react-bootstrap'
import walletConnectSvg from './../../images/walletC.svg'
import metamaskIcon from './../../images/metamask.png'

import './auth.css'
import useAuth from '../../hook/useAuth'
import { SUPPORTED_WALLETS } from './../../config/index'
import { toast } from 'react-toastify'

const AuthModal = ({
    show,
    handleClose,
}) => {
    const { account, library } = useWeb3React()
    const [loading, setLoading] = useState(false)
    const { login, logout } = useAuth()


    const onAuthHandler = async () => {

    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <div>
                        Connect Wallet

                    </div>

                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="my-4 d-flex align-items-center">
                <div className='wallet-box'>
                    <img className='image-wallet' onClick={async () => {

                        await login(SUPPORTED_WALLETS.METAMASK.connector , SUPPORTED_WALLETS.METAMASK.name )
                        toast.info('Wallet Connected')
                        handleClose()

                    }} src={metamaskIcon} alt="" />
                    <img className='image-wallet' onClick={ async() => { 
                        await login(SUPPORTED_WALLETS.WALLET_CONNECT.connector , SUPPORTED_WALLETS.WALLET_CONNECT.name )
                        toast.info('Wallet Connected')
                        handleClose()
                         }} src={walletConnectSvg} alt="" />
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default AuthModal
