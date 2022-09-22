const trldAssets = [
    {
        id: '101844947',
        name: 'Moorland#1@arc3',
        symbol: 'TRLD',
        url: 'ipfs://QmecxV7vrVEUTjvtu7VutqxhoYLFGtEENXvhBPAcJLSHxH',
        offchainUrl: 'https://images.terragrids.org/map-tile-grass.png',
        positionX: 1,
        positiony: 0,
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
        positionX: 2,
        positiony: 0,
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
        positionX: 3,
        positiony: 0,
        holders: [
            {
                address: 'PYUAEMWBZY6SVVPGX27KF7J25V6GC5UZQTW6NFW2JOL42ZWZJKMKCGVCUY',
                amount: 1
            }
        ]
    }
] as const

const trclAssets = [
    {
        id: 103246718,
        name: 'Terracell #1@arc3',
        symbol: 'TRCL',
        url: 'ipfs://QmcBZCLET3u4FBkT9Dr5Qw7762XqBVCvsadDXjoxR74T67',
        offchainUrl: 'https://images.terragrids.org/09adca4e-ca5a-47c3-8eaf-7c6fd2825309',
        power: 10
    },
    {
        id: 103352115,
        name: 'Terracell #2@arc3',
        symbol: 'TRCL',
        url: 'ipfs://QmVTQWKyfMjKSjwAJJf5tnNdGjCL28CBLCQsVHMh9ztyrm',
        offchainUrl: 'https://images.terragrids.org/d76e190d-40d2-4568-9d6c-ef267ac5d790',
        power: 25
    }
]

const createPositions = () => {
    const temp: { positionX: number; positionY: number }[] = []
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            // Position (0, 0) is for Solar Power Plant
            if (i === 0 && j === 0) continue
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
    assets: [...Array(34).keys()].map(num => {
        const asset = { ...trclAssets[num % 2] }
        asset.id += num
        asset.name = `Terracell #${num}@arc3`
        return asset
    }),
    'next-token': '102025249'
} as const

const TRBD_MOCK = {
    assets: [],
    'next-token': '102025249'
} as const

export const NFT_MOCKS = {
    trld: TRLD_MOCK,
    trcl: TRCL_MOCK,
    trbd: TRBD_MOCK
}

type NftMockKeys = keyof typeof NFT_MOCKS

export const matchKey = (str: unknown): str is NftMockKeys => {
    return str !== undefined && (str === 'trld' || str === 'trcl' || str === 'trbd')
}
