import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import useWeb3 from './../hook/useWeb3'
import ContractABI from './../utils/abi/abiSmart.json';
import { toast } from "react-toastify";
import './Main.css'
import { CONTRACT_ADDRESS, SUPPORTED_WALLETS } from '../config/index';
import CardImage from './../images/apes1.jpeg'
import { FaPlus, FaMinus } from 'react-icons/fa'
import AuthModal from './components/authModal';


const Main = () => {
    const { account } = useWeb3React()
    const [loading, setLoading] = useState(false)
    const [totalMinted, setTotalMinted] = useState(0)
    const webThree = useWeb3();
    let [mintValue, setMintValue] = useState(1)
    const [showAuthModal, setShowAuthModal] = useState(false)
    const selectedWallet = sessionStorage.getItem('wallet') || ''
    const [isSucceed, setIsSucced] = useState(false)

    const getContract = async () => {
        const contract = new webThree.eth.Contract(ContractABI, CONTRACT_ADDRESS);
        return contract
    };

    const getTotalSupply = async () => {
        const contract = await getContract()

        try {
            let res = await contract.methods.totalSupply().call()
            setTotalMinted(res)
            setIsSucced(false)
        } catch (error) {
            console.log(error);
            setIsSucced(false)
        }

    }
    useEffect(() => {
        getTotalSupply()
    }, [account])

    useEffect(() => {
        isSucceed && getTotalSupply()
    }, [isSucceed])

    const fetchTotalSupply = async (value) => {
        let check = false
        const contract = await getContract()
        let res = await contract.methods.userWhitelistMintCount(account).call({ from: account })
        if (+res <= 5) {
            if (+res + +value <= 5) {
                check = true
            } else {
                toast.info(`you already minted ${res} , and limit is 5 per user`)
            }
        } else {
            check = false
            toast.info(`you already minted ${res} , and limit is 5 per user`)
        }
        return check;
    }

    const mint = async () => {
        setLoading(true)
        toast.info('Minting Start')
        let totalAmount = 0.04 * mintValue;
        const amount = webThree.utils.toWei(totalAmount.toString(), 'ether')
        const mintContractInstance = await getContract()

        //  await contract.methods.transfer('0x707db038c846d30401d25dbbdc4ace67c6585f57', amount).send({from: '0x3Ed0E4C21D742b6903828Bcdd4F802CDfD7dFEeb'})
        try {
            //from fahad
            let res = await mintContractInstance.methods.totalSupply().call()
            if (+res <= 5000) {
                // await mintContractInstance.methods.whitelistMint(mintValue).call({ from: account , gas: 200000 })
                //     .catch(
                //         revertReason => {
                //             if (selectedWallet === SUPPORTED_WALLETS.METAMASK.name) {
                //                 toast.error(revertReason['message']?.split('"message": "')[1]?.split('"')[0])
                //                 console.log(revertReason['message']?.split('"message": "')[1]?.split('"')[0]);
                //                 throw new Error(revertReason['message']?.split('"message": "')[1]?.split('"')[0])
                //             } else if (selectedWallet === SUPPORTED_WALLETS.WALLET_CONNECT.name) {
                //                 toast.error(revertReason.toString()?.split('Error:')[1]?.split('!')[0])
                //                 console.log(revertReason.toString()?.split('Error:')[1]?.split('!')[0]);
                //                 throw new Error(revertReason.toString()?.split('Error:')[1]?.split('!')[0])
                //             }
                //             setLoading(false)
                //         }
                //     );
                const txHash = await mintContractInstance.methods.publicSaleMint(mintValue).send({ from: account, value: amount, gas: 200000 })
                setLoading(false)
                setIsSucced(true)
                console.log('txHash', txHash);
            } else {
                toast.info('All NFTs are minted')
            }

            localStorage.setItem('minted', res)
            toast.info('Token minted Successfully')

            setLoading(false)
        } catch (error) {
            console.log('error', error);
            setLoading(false)
            if (error.code === 4001) {
                toast.error('User Reject transaction')
            }

        }
    }

    const handleChange = (key) => {
        let tempValue = mintValue;
        if (key === 'plus') {
            // if (tempValue === 5) {
            //     return
            // }
            tempValue = tempValue + 1;
            setMintValue(tempValue)
        } else {
            if (tempValue === 1) {
                return
            }
            tempValue = tempValue - 1;
            setMintValue(tempValue)
        }

    }
    function hasDecimal (num) {
        return !!(num % 1);
    }

    return (
        <div className='main' id="main">
            <div className='main-heading' >GENESIS SALE</div>
            <div className='price-box'>
                <img className='price-image' src={CardImage} alt="" />
                <div className='sub-flex'>
                    <div className='main-min-head'>Price Per NFT</div>
                    <div className='price-text'>0.04 ETH Each</div>

                </div>
            </div>
            <div className='input-box-xp mt-4 mt-md-5'>
                <div className='input-sec'>
                    <FaMinus  onClick={() => { handleChange('minus') }} />
                    <input className='input-xp' value={mintValue}  type="number" />
                    <FaPlus onClick={() => { handleChange('plus') }} />
                </div>
                {/* <button className='btn-set' onClick={() => { setMintValue(5) }}>
                    Set Max
                </button> */}
            </div>
            <div className='total-box mt-4 mt-md-5'>
                <div className='total-text'>
                    Total
                </div>
                <div className='total-price'>
                    {0.04 * mintValue} ETH
                </div>
            </div>
            <div className='mt-4 mt-md-5'>
                {account ?
                    <button className='btn-set' onClick={() => {
                        if (!loading) {
                            mint()
                        }
                    }}>
                        {loading ? "Loading..." : "Mint Now"}
                    </button> :
                    <button className='btn-set' onClick={() => { setShowAuthModal(true) }}>
                        CONNECT
                    </button>
                }

                <p className='main-p '>{totalMinted} / 100</p>
            </div>
            <AuthModal
                show={showAuthModal}
                handleClose={() => setShowAuthModal(false)}
            />
            {/* <p className='main-p-link'><a target="_blank" href={`https://etherscan.io/address/${CONTRACT_ADDRESS}`}>{shortenAddress(CONTRACT_ADDRESS, 10)}</a></p> */}
        </div>
    );
}

export default Main;