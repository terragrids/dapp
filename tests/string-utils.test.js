import { maskWalletAddress } from '../utils/string-utils'

describe('String utils', function () {
    it('maskWalletAddress', async () => {
        expect(maskWalletAddress('NWGMU3UZ2IWGZT6Q6K6F473IXHCTJ5UKLEARG2ZL37B52UC2KBPSDK2UEY')).toEqual('NWGMU...2UEY')
    })
})