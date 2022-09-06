'use strict'

import fs from 'fs'
import { _Connectors } from '../blockchain/token-market/build/index.main.mjs'

fs.writeFileSync('./blockchain/token-market/build/app-approval.mjs', `export const appApproval = '${_Connectors.ALGO.appApproval}'`)
