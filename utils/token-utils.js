import { CID, digest } from 'multiformats'
import * as mfsha2 from 'multiformats/hashes/sha2'

export function cidFromAlgorandAddress(algosdk, address) {
    const decodedAddress = algosdk.decodeAddress(address)
    const multiHashDigest = digest.create(mfsha2.sha256.code, decodedAddress.publicKey)
    const cid = CID.createV0(multiHashDigest)
    return cid.toString()
}
