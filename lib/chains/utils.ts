import Chains from '@/lib/chains/client/apis'

export type Dictionary = { [key:string]:any }

export function getChainName(currency:string){
  const chains:Dictionary = {
    'arb': 'Arbitrum'
  }
  const name = chains[currency] || 'None'
  return name
}

export function getChainWallet(currency:string){
  const wallets:Dictionary = {
    'arb':  'Metamask'
  }
  const name = wallets[currency] || 'None'
  return name
}

export function getChainNetwork(chain:string){
  const networks:Dictionary = {
    'arb':  process.env.NEXT_PUBLIC_NETWORK || ''
  }
  const name = networks[chain] || 'testnet'
  return name
}

const wallets: Dictionary = {
  metamask:  { value: 'Metamask',  image: '/wallets/metamask.png',  chainEnabled: true }
}

const chainWallets: Dictionary = {
  arb: [wallets['metamask']]
}

export function getChainWallets(chain: string) {
  return chainWallets[chain.toLowerCase()] ?? [wallets['metamask']]
}

export function getChainsList(){
  const chains = Object.values(Chains).map((chain) => {
    return {
      value:   chain?.chain,
      coinSymbol:  chain?.coinSymbol  || '???',
      image:   '/coins/' + (chain?.logo || 'none.png'),
      chainEnabled: chain?.chainEnabled || false
    }
  })
  return chains
}

export function getChainsMap(){
  let chains:Dictionary = {}
  Object.values(Chains).map((chain) => {
    chains[chain.chain] = {
      coinSymbol:  chain?.coinSymbol  || '???',
      image:   '/coins/' + (chain?.logo || 'none.png'),
      chainEnabled: chain?.chainEnabled || false
    }
  })
  return chains
}
