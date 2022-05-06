import DynamoDbRepository from './dynamodb.repository'

export default class TokenRepository extends DynamoDbRepository {
    async putTokenContract({ assetId, applicationId, contractInfo, sellerAddress, assetPrice, assetPriceUnit }) {
        return await this.put({
            item: {
                pk: { S: `asset|${assetId}` },
                sk: { S: `application|${applicationId}` },
                contractInfo: { S: contractInfo },
                sellerAddress: { S: sellerAddress },
                assetPrice: { S: assetPrice },
                assetPriceUnit: { S: assetPriceUnit }
            },
            itemLogName: 'token contract'
        })
    }
}
