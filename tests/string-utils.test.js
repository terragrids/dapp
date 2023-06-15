import { getIpfsHash, getQueryParameter, maskAddress } from '../utils/string-utils'

describe('String utils', function () {
    it('maskWalletAddress', async () => {
        expect(maskAddress('NWGMU3UZ2IWGZT6Q6K6F473IXHCTJ5UKLEARG2ZL37B52UC2KBPSDK2UEY')).toEqual('NWGMU...2UEY')
    })

    it('should return query parameter', async () => {
        expect(getQueryParameter()).toBeUndefined()
        expect(getQueryParameter('')).toBeUndefined()
        expect(getQueryParameter('test', 'parameter')).toBeUndefined()
        expect(getQueryParameter('?test', 'test')).toBeUndefined()
        expect(getQueryParameter('?test=true', 'test')).toEqual('true')
        expect(getQueryParameter('?test=good', 'test')).toEqual('good')
        expect(getQueryParameter('?test=good&get=it', 'test')).toEqual('good')
        expect(getQueryParameter('?test=good&get=it', 'get')).toEqual('it')
        expect(getQueryParameter('?test=good&test=it', 'get')).toBeUndefined()
        expect(getQueryParameter('?test=good&test=it', 'test')).toEqual('good')
        expect(getQueryParameter('?test=good,bad&get=it', 'test')).toEqual('good,bad')
    })

    it('should return ipfs hash', async () => {
        expect(getIpfsHash()).toBeNull()
        expect(getIpfsHash('')).toBeNull()
        expect(getIpfsHash('http://hash')).toBeNull()
        expect(getIpfsHash('ipfs://hash')).toEqual('hash')
    })
})
