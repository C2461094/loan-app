import { DeviceModelProps } from '../domain/device-model'

export interface DeviceModelRepo {
  create(deviceModel: DeviceModelProps): Promise<void>
  getById(id: string): Promise<DeviceModelProps | null>
  getAll(): Promise<DeviceModelProps[]>
}   