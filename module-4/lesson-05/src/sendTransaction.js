import { ethers } from 'ethers'

const NETWORK = 'goerli'

export default async function sendTransaction({ valueInEth, gas, toAddress, message }) {
  const accounts = await window.ethereum.enable()
  console.log('Accounts found:', accounts)

  const provider = ethers.getDefaultProvider(NETWORK)
  const gasPrice = await provider.getGasPrice()

  const transactionParameters = {
    to: toAddress,
    from: accounts[0],
    gas: ethers.utils.hexlify(gas),
    gasPrice: gasPrice.toHexString(),
    value: ethers.utils.parseEther(valueInEth).toHexString(),
    // data: ethers.utils.id(message),
    data: ethers.utils.hexlify(ethers.utils.toUtf8Bytes(message))
  }

  console.log('Sending transaction with params:', transactionParameters)
  const response = await window.ethereum.send('eth_sendTransaction', [
    transactionParameters,
  ])

  console.log(
    'Sent transaction: %o',
    `https://${NETWORK}.etherscan.io/tx/${response.result}`,
  )
}
// 0x67478a68098f052C3e3B609b521f88638bd3eaA5
