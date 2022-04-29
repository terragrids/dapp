import { formatAlgoContractInfo, maskWalletAddress } from '../utils/string-utils'

describe('String utils', function () {
    it('maskWalletAddress', async () => {
        expect(maskWalletAddress('NWGMU3UZ2IWGZT6Q6K6F473IXHCTJ5UKLEARG2ZL37B52UC2KBPSDK2UEY')).toEqual('NWGMU...2UEY')
    })

    it('formatAlgoContractInfo', async () => {
        expect(formatAlgoContractInfo(1234)).toEqual({ hex: '0x000004d2', type: 'BigNumber' })
        expect(formatAlgoContractInfo(0)).toEqual({ hex: '0x00000000', type: 'BigNumber' })
        expect(formatAlgoContractInfo(1234567890)).toEqual({ hex: '0x499602d2', type: 'BigNumber' })
        expect(formatAlgoContractInfo()).toEqual({ hex: '0x00000000', type: 'BigNumber' })
    })
})