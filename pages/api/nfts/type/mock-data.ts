const assetList = [
    {
        id: '101844947',
        name: 'Moorland#1@arc3',
        symbol: 'TRLD',
        url: 'ipfs://QmecxV7vrVEUTjvtu7VutqxhoYLFGtEENXvhBPAcJLSHxH',
        offchainUrl: 'https://images.terragrids.org/map-tile-grass.png',
        position: '0,0',
        holders: [
            {
                address: 'PYUAEMWBZY6SVVPGX27KF7J25V6GC5UZQTW6NFW2JOL42ZWZJKMKCGVCUY',
                amount: 1
            }
        ]
    },
    {
        id: '101844947',
        name: 'Forest#1@arc3',
        symbol: 'TRLD',
        url: 'ipfs://QmecxV7vrVEUTjvtu7VutqxhoYLFGtEENXvhBPAcJLSXdX',
        offchainUrl: 'https://images.terragrids.org/map-tile-clay.png',
        position: '1,0',
        holders: [
            {
                address: 'PYUAEMWBZY6SVVPGX27KF7J25V6GC5UZQTW6NFW2JOL42ZWZJKMKCGVCUY',
                amount: 1
            }
        ]
    },
    {
        id: '101844947',
        name: 'Hill#1@arc3',
        symbol: 'TRLD',
        url: 'ipfs://QmecxV7vrVEUTjvtu7VutqxhoYLFGtEENXvhBPAcJLSXdX',
        offchainUrl: 'https://images.terragrids.org/map-tile-slope.png',
        position: '2,0',
        holders: [
            {
                address: 'PYUAEMWBZY6SVVPGX27KF7J25V6GC5UZQTW6NFW2JOL42ZWZJKMKCGVCUY',
                amount: 1
            }
        ]
    }
] as const

const createPositions = () => {
    const temp: `${number},${number}`[] = []
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            temp.push(`${j},${i}`)
        }
    }
    return temp
}

const TRLD_MOCK = {
    assets: createPositions().map(el => {
        const rand = Math.floor(Math.random() * assetList.length)
        return {
            ...assetList[rand],
            position: el
        }
    }),
    'next-token': '102025249'
} as const

const TRCL_MOCK = {
    assets: [],
    'next-token': '102025249'
} as const

const TRAS_MOCK = {
    assets: [],
    'next-token': '102025249'
} as const

export const NFT_MOCKS = {
    trld: TRLD_MOCK,
    trcl: TRCL_MOCK,
    tras: TRAS_MOCK
}

type NftMockKeys = keyof typeof NFT_MOCKS

export const matchKey = (str: unknown): str is NftMockKeys => {
    return str !== undefined && (str === 'trld' || str === 'trcl' || str === 'tras')
}
