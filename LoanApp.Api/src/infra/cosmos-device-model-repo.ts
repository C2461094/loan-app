import { CosmosClient, Container } from "@azure/cosmos";
import { DeviceModelProps, hydrateDevice } from "../domain/device-model";
import { DeviceModelRepo } from "../domain/device-model-repo";

type Options = {
  key: string;
  endpoint: string;
  databaseId: string;
  containerId: string;
}

type DeviceModelDoc = {
  id: string;
  brand: string;
  modelName: string;
  category: string;
  stock: number;
};

export class CosmosDeviceModelRepo implements DeviceModelRepo {
  private container: Container;

  constructor(options: Options) {
    const client = new CosmosClient({
      endpoint: options.endpoint,
      key: options.key,
    });
    const database = client.database(options.databaseId);
    this.container = database.container(options.containerId);
  }

    async create(deviceModel: DeviceModelProps): Promise<void> {
        const doc: DeviceModelDoc = {
        id: deviceModel.id,
        brand: deviceModel.brand,
        modelName: deviceModel.modelName,
        category: deviceModel.category,
        stock: deviceModel.stock,
        };
        await this.container.items.create(doc);
    }  

    async getById(id: string): Promise<DeviceModelProps | null> {
        try {
            const { resource } = await this.container.item(id, id).read<DeviceModelDoc>();
            if (!resource) {
                return null;
            }
            const result = hydrateDevice(resource);
            return result.success ? result.value : null;
        } catch {
            return null;
        }
    }

        async getAll(): Promise<DeviceModelProps[]> {
            const querySpec = {
                query: "SELECT * FROM c"
            };

            const { resources } = await this.container.items.query<DeviceModelDoc>(querySpec).fetchAll();
             
            const devices: DeviceModelProps[] = [];
            for (const resource of resources) {
                const result = hydrateDevice(resource);
                if (result.success) {
                    devices.push(result.value);
                }
            }
            return devices;
        }
    }