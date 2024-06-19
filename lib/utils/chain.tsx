function coinFromChain(chain:string){
  return {'Arbitrum': 'arb'}[chain] || ''
}

function chainFromCoin(coin:string){
  return {'arb': 'Arbitrum'}[coin] || ''
}

export { coinFromChain, chainFromCoin }