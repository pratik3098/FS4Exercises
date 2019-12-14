import { ethers } from 'ethers'
export default async function sendTransaction({ valueInEth, gas, toAddress, message }) {
  let accounts = await window.ethereum.enable()
  console.log('Account found:', accounts)

  let provider = ethers.getDefaultProvider('goerli')
  const gasPrice =  await provider.getGasPrice()

  let transaction = {
    to: toAddress,
    from: accounts[0],
    gas: ethers.utils.hexlify(gas),
    gasPrice: gasPrice.toHexString(),
    value: ethers.utils.parseEther(valueInEth).toHexString(),
    data: ethers.utils.hexlify(ethers.utils.toUtf8Bytes(message))
  }
  console.log('Transaction:', transaction)
  const res = await window.ethereum.send('eth_sendTransaction', [transaction,])
  console.log( 'Sent transaction: %o',`https://goerli.etherscan.io/tx/${res.result}`, )
}

