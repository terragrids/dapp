const trldAssets = [
    {
        id: '101844947',
        name: 'Moorland#1@arc3',
        symbol: 'TRLD',
        url: 'ipfs://QmecxV7vrVEUTjvtu7VutqxhoYLFGtEENXvhBPAcJLSHxH',
        offchainUrl: 'https://images.terragrids.org/map-tile-grass.png',
        positionX: 0,
        positiony: 0,
        holders: [
            {
                address:
                    'PYUAEMWBZY6SVVPGX27KF7J25V6GC5UZQTW6NFW2JOL42ZWZJKMKCGVCUY',
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
        positionX: 1,
        positiony: 0,
        holders: [
            {
                address:
                    'PYUAEMWBZY6SVVPGX27KF7J25V6GC5UZQTW6NFW2JOL42ZWZJKMKCGVCUY',
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
        positionX: 2,
        positiony: 0,
        holders: [
            {
                address:
                    'PYUAEMWBZY6SVVPGX27KF7J25V6GC5UZQTW6NFW2JOL42ZWZJKMKCGVCUY',
                amount: 1
            }
        ]
    }
] as const

const createPositions = () => {
    const temp: { positionX: number; positionY: number }[] = []
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            temp.push({ positionX: j, positionY: i })
        }
    }
    return temp
}

const TRLD_MOCK = {
    assets: createPositions().map(({ positionX, positionY }) => {
        const rand = Math.floor(Math.random() * trldAssets.length)
        return {
            ...trldAssets[rand],
            positionX,
            positionY
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
    return (
        str !== undefined &&
        (str === 'trld' || str === 'trcl' || str === 'tras')
    )
}
