'use strict'

import fs from 'fs'
import { _Connectors } from '../blockchain/build/index.main.mjs'

fs.writeFileSync('./blockchain/build/app-approval.mjs', `export const appApproval = '${_Connectors.ALGO.appApproval}'`)