import { DeviceModelRepo } from "../domain/device-model-repo";
import { DeviceModelProps } from "../domain/device-model";

type Deps = {
  deviceModelRepo: DeviceModelRepo;
};

export async function listDeviceModels({ deviceModelRepo }: Deps): Promise<DeviceModelProps[]> {
  return deviceModelRepo.getAll();
}