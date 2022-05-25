import DynamoDbRepository from './dynamodb.repository'

export default class TokenRepository extends DynamoDbRepository {
    pkPrefix = 'asset'
    skPrefix = 'trade'
    itemName = 'token trade contract'

    async putTokenContract({ assetId, applicationId, contractInfo, sellerAddress, assetPrice, assetPriceUnit }) {
        return await this.put({
            item: {
                pk: { S: `${this.pkPrefix}|${assetId}` },
                sk: { S: `${this.skPrefix}|${applicationId}` },
                contractInfo: { S: contractInfo },
                sellerAddress: { S: sellerAddress },
                assetPrice: { S: assetPrice },
                assetPriceUnit: { S: assetPriceUnit }
            },
            itemLogName: this.itemName
        })
    }

    async getTokenContract(assetId) {
        const data = await this.query({
            conditionExpression: 'pk = :pk and begins_with(sk, :sk)',
            attributeValues: {
                ':pk': { S: `${this.pkPrefix}|${assetId}` },
                ':sk': { S: `${this.skPrefix}|` }
            },
            itemLogName: this.itemName
        })

        return data.Items.length > 0 ? {
            id: data.Items[0].sk.S.replace(`${this.skPrefix}|`, ''),
            info: data.Items[0].contractInfo.S
        } : null
    }

    async deleteTokenContract({ assetId, applicationId }) {
        return await this.delete({
            key: {
                pk: { S: `${this.pkPrefix}|${assetId}` },
                sk: { S: `${this.skPrefix}|${applicationId}` }
            },
            itemLogName: this.itemName
        })
    }
}
