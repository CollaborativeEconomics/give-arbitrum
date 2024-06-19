// SERVER LIBS
import Arbitrum     from './arbitrum'

type Dictionary = { [key:string]:any }

const Chains:Dictionary = {
  'Arbitrum':    Arbitrum,
}

export default Chains