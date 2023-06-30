export type ElectricityMeterPoint = {
    mpan: string
    meters: Array<ElectricityMeter>
}

export type GasMeterPoint = {
    mprn: string
    meters: Array<GasMeter>
}

export type ElectricityMeter = {
    mpan: string
    serialNumber: string
}

export type GasMeter = {
    mprn: string
    serialNumber: string
}
