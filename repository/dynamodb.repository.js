import { ConditionalCheckFailedException, DeleteItemCommand, DynamoDBClient, GetItemCommand, PutItemCommand } from '@aws-sdk/client-dynamodb'
import AlreadyExistingError from '../errors/already-existing.error'
import AssetContractNotFoundError from '../errors/asset-contract-not-found.error'
import RepositoryError from '../errors/repository.error'

export default class DynamoDbRepository {
    client;
    table;

    constructor() {
        this.client = new DynamoDBClient({
            region: process.env.DYNAMO_DB_REGION,
            endpoint: process.env.DYNAMO_DB_ENDPOINT
        })
        this.table = process.env.DYNAMO_DB_ENV === 'prod' ? 'terragrids' : 'terragrids-dev'
    }

    async get({ key, projection, attributeNames, itemLogName = 'item' }) {
        const params = {
            TableName: this.table,
            Key: key,
            ...projection && { ProjectionExpression: projection },
            ...attributeNames && { ExpressionAttributeNames: attributeNames }
        }
        const command = new GetItemCommand(params)

        try {
            return await this.client.send(command)
        } catch (e) {
            throw new RepositoryError(e, `Unable to get ${itemLogName}`)
        }
    }

    async put({ item, itemLogName = 'item' }) {
        const params = {
            TableName: this.table,
            Item: item,
            ConditionExpression: 'attribute_not_exists(pk)'
        }

        const command = new PutItemCommand(params)

        try {
            return await this.client.send(command)
        } catch (e) {
            if (e instanceof ConditionalCheckFailedException) {
                throw new AlreadyExistingError(`${itemLogName} already existing`)
            } else {
                throw new RepositoryError(e, `Unable to put ${itemLogName}`)
            }
        }
    }

    async delete({ key, itemLogName = 'item' }) {
        const params = {
            TableName: this.table,
            Key: key,
            ConditionExpression: 'attribute_exists(pk) AND attribute_exists(sk)'
        }
        const command = new DeleteItemCommand(params)

        try {
            return await this.client.send(command)
        } catch (e) {
            if (e instanceof ConditionalCheckFailedException) throw new AssetContractNotFoundError()
            else throw new RepositoryError(e, `Unable to delete ${itemLogName}`)
        }
    }
}